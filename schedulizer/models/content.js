var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
	name: String,
	creator: Number, //userid of creator
	url: String,
	date: { type: Date, default: Date.now }, //date added
	hidden: Boolean,
	eventId: Number
});

contentSchema.statics.getAllContentForEvent = function (eventId, cb) {
    return this.find({ eventId: eventId, hidden: false }, cb);
}

contentSchema.methods.removeContentFromEvent = function(cb){
    return this.model('Content').find({ _id: this._id }).remove(cb);
}
 
module.exports = mongoose.model('Content', contentSchema);