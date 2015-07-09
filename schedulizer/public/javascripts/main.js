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
	
	$('.event').on("click", function(){
		document.location.href = '/event';
	});
});

function createModals(){
	$(document.body).append("<div class='greyedOutOverlay'></div>");
	$(document.body).append("<div class='modal'></div>");
	$(".greyedOutOverlay").fadeIn("slow", function(){ 
		$('.modal').fadeIn(function(){
			
		});
	});
}

function createSignUpModal(){
	$('.modal').append("<h2><span class='fa fa-sign-in'></span>  Sign Up!</h2>");
	$('.modal').append("<form action='/signup' method='post'>"+
		"<div class='form-group'>" +
            "<label>Name</label>" +
            "<input type='text' class='form-control' name='name'>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Email</label>" +
            "<input type='email' class='form-control' name='email'>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Password</label>" +
            "<input type='password' class='form-control' name='password'>" +
        "</div>" +
        "<div class='form-group'>" +
            "<label>Confirm Password</label>" +
            "<input type='password' class='form-control' name='confirmPassword'>" +
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
		$('.modal').remove();
		$(document.body).append("<div class='modal'></div>");
		$('.modal').show();
		createSignUpModal();
	});
}

function removeModals(){
	$('.modal').remove();
	$('.greyedOutOverlay').remove();
}