$(document).ready(function(){
	$("#categories").on("mouseenter", function(){
		$(".inner-tab-container").show();
	});

	$(".tab-container").on("mouseleave", function(){
		$(".inner-tab-container").hide();
	});

	$("#signupButton").on("click", function(){
		createModals();
		createSignUpModal();

		$('.greyedOutOverlay').on("click", function(){
			removeModals();
		});
	});

	$("#loginButton").on("click", function(){
		createModals();
		createLogInModal();

		$('.greyedOutOverlay').on("click", function(){
			removeModals();
		});
	});

	if ($('#eventsWrapper').length){
		var targetHeight = window.innerHeight - 2*$('#mainNavbar').height() - $('#wrapper h1').height();
		$('#eventsWrapper').css({
			'height': targetHeight,
		});
		
	} 

	if ($('.tab-container').length){
		$('#wrapper').css({
			'width': '85%',
		});
		$('#wrapper h1').css({
			'font-size': '28pt'
		});
	} else {
		$('#wrapper').css({
			'width': '100%',
		});
		$('#wrapper h1').css({
			'font-size': '40pt'
		});
	}

	$('#sponsorThis').on("click", function(e){
		var target = $('#sponsorThis');
		if (target.hasClass('btn-default')){
			target.removeClass('btn-default');
			target.addClass('btn-success');
			target.html("You are the sponsor");
		} else {
			target.removeClass('btn-success');
			target.addClass('btn-default');
			target.html("Sponsor this event!");
		}
	});

	$('.event').on('click', '.likeButton', function(e){
		var target = $(e.target);
		var parent = $(e.target.parentNode.parentNode.parentNode);
		var params = { eventID: parent.find(".eventid").html(), userID: $("#eventsWrapper").find(".userid").html() };
		$.get('/upvote', params, function(data){
			console.log(data);
			parent.find(".glyphicon").html(data);
		});
		target.addClass("unlikeButton");
		target.addClass("btn-success");
		target.removeClass("btn-default");
		target.removeClass("likeButton");
	});

	$('.event').on('click', '.unlikeButton', function(e){
		var target = $(e.target);
		var parent = $(e.target.parentNode.parentNode.parentNode);
		var params = { eventID: parent.find(".eventid").html(), userID: $("#eventsWrapper").find(".userid").html() };
		$.get('/downvote', params, function(data){
			console.log(data);
			parent.find(".glyphicon").html(data);
		})
		target.addClass("likeButton");
		target.addClass("btn-default");
		target.removeClass("btn-success");
		target.removeClass("unlikeButton");
	});

	$('#viewPastEvents').on("click", function(){
		$('#viewPastEvents').hide();
		$('#viewAllEvents').show();
	});

	$('#viewAllEvents').on("click", function(){
		$('#viewPastEvents').show();
		$('#viewAllEvents').hide();
	});

	$(window).on('resize', function(){
		if ($(window).width() < 700){
			$('.tab-container').css({
				'width': 'auto',
			});
			$('#wrapper').css({
				'width': ($(window).width() - $('.tab-container').width() + 'px'),
			});
		} else {
			if ($('.tab-container').length){
				$('.tab-container').css({
					'width': '15%',
				});
				$('#wrapper').css({
					'width': '85%',
				});
				$('#wrapper h1').css({
					'font-size': '28pt'
				});
			} else {
				$('#wrapper').css({
					'width': '100%',
				});
				$('#wrapper h1').css({
					'font-size': '40pt'
				});
			}
		}

		if ($(window).width() < 500){
			if ($('#helloMessage').length){
				$('#helloMessage').hide();
			}
		} else {
			if ($('#helloMessage').length){
				$('#helloMessage').show();
			}
		}
	});
});

function createModals(){
	$(".greyedOutOverlay").fadeIn("slow", function(){ 
		$('.modal').fadeIn(function(){
			
		});
	});
}

function createSignUpModal(){
	$('.modal').append("<h2><span class='fa fa-sign-in'></span>  Sign Up!</h2>");
	$('.modal').append("<form action='/signup' method='post'>" +
		"<div class='form-group'>" +
            "<label>Name</label>" +
            "<input type='text' class='form-control' name='name' required>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Email</label>" +
            "<input type='email' class='form-control' name='email' required>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Password</label>" +
            "<input type='password' class='form-control' name='password' required>" +
        "</div>" +
		"<button type='submit' class='btn btn-lg'>Sign Up!</button>" +
    "</form>");
    $('.modal form').css({
    	'font-size': '12pt'
    });
}

function createLogInModal(){
	$('.modal').append("<h2><span class='fa fa-sign-in'></span>  Log In or <a id='createAccount'>Create Account</a></h2>");
	$('.modal').append("<form action='/login' method='post'>"+
        "<div class='form-group'>" +
            "<label>Email</label>" +
            "<input type='text' class='form-control' name='email'>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Password</label>" +
            "<input type='password' class='form-control' name='password'>" +
        "</div>" +
		"<button type='submit' class='btn btn-lg'>Login</button>" +
    "</form>");
	$('a#createAccount').on("click", function(){
		$('.modal').empty();
		createSignUpModal();
	});
}

function removeModals(){
	$('.modal').empty();
	$('.modal').hide();
	$('.greyedOutOverlay').hide();
}