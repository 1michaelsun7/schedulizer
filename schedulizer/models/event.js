var mongoose = require('mongoose');

function removeAll(arr, item) {
	for(var i = arr.length; i--;) {
		if(arr[i] === item) {
			arr.splice(i, 1);
		}
	}
}

function addTo(arr, item) {
	for(var i = arr.length; i--;) {
		if(arr[i] === item) {
			return;
		}
	}
	arr.push(item);
}

var eventSchema = new mongoose.Schema({
	name: String,
	description: String,
	owner: Number, //userid of creator
	category: String,
	date: { type: Date, default: Date.now }, //date happening
	hidden: Boolean,
	upvotes: Number,
	sponsor: String,
	attendees: [Number]
});

eventSchema.statics.findByName = function (name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
}

eventSchema.statics.findByCategory = function (cat, cb) {
	return this.find({ category: new RegExp(cat, 'i') }, cb).sort({upvotes: 'desc'}).limit(20);
}

eventSchema.statics.sortByUpvotes = function(cb) {
	return this.find({ hidden: false }).sort({upvotes: 'desc'}).limit(20);
}

eventSchema.statics.sortByUpcoming = function(cb) {
	return this.find({ hidden: false }).sort({date: 'asc'}).limit(20);
}

eventSchema.statics.getPastEvents = function(cb) {
	return this.find({ hidden: true }).sort({date: 'desc'});
}

eventSchema.statics.getEventsUserAttending = function(userId, cb){
	return this.find({ hidden: false, attendees: { "$in" : [userId]} }).sort({upvotes: "desc"});
}

eventSchema.methods.signupUserForEvent = function(userId, cb){
	return this.model('Event').update({_id: this._id}, {attendees: addTo(this.attendees, userId), upvotes: this.upvotes + 1}, { multi: false }, cb);
}

eventSchema.methods.unsignupUserForEvent = function(userId, cb){
	return this.model('Event').update({_id: this._id}, {attendees: removeAll(this.attendees, userId), upvotes: this.upvotes - 1}, { multi: false }, cb);
}

module.exports = mongoose.model('Event', eventSchema);