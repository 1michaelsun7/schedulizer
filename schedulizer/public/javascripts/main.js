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
	$('.modal').append("<h2>Sign Up!</h2>");
}

function createLogInModal(){
	$('.modal').append("<h2>Log In or <a id='createAccount'>Create Account</a></h2>");
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