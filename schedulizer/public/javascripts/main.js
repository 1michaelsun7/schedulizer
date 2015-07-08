$(document).ready(function(){
	$("#categories").on("mouseenter", function(){
		$(".inner-tab-container").show();
	});
	$(".tab-container").on("mouseleave", function(){
		$(".inner-tab-container").hide();
	});

	$("#loginButton").on("click", function(){
		$(".greyedOutOverlay").fadeIn("slow", function(){ 
			$('.modal').fadeIn(function(){
				
			});
		});
	});
});