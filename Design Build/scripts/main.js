var cardsArray = [];
var cards2Array = [];

$(document).ready(function () {
    	
    	$('.disableLink').on("click", function(event){
    		event.preventDefault();
    		return false;
    	});
    
});



function onSelectCardClick(event){
	event.preventDefault();
	var item = this;
	var selected = $(this).attr("title");
	var isActive = $(this).hasClass("active");

	if(isActive){
		$(this).removeClass("active");
		updateCardsArray(selected, false);
	}else{
		$(this).addClass("active");
		updateCardsArray(selected, true);
	}

	return false;
}

function onSelectCard2Click(event){
	event.preventDefault();
	var item = this;
	var selected = $(this).attr("title");
	var isActive = $(this).hasClass("active");

	if(isActive){
		$(this).removeClass("active");
		updateCards2Array(selected, false);
	}else{
		$(this).addClass("active");
		updateCards2Array(selected, true);
	}

	return false;
}

function updateCardsArray(selected, action){

	if(action){
		// Add to array
		cardsArray.push(selected);
	}else{
		// Subtract from array
		for (var i=cardsArray.length-1; i>=0; i--) {
		    if (cardsArray[i] === selected) {
		        cardsArray.splice(i, 1);
		        // break;       //<-- Uncomment  if only the first term has to be removed
		    }
		}
	}
	var newarray = cardsArray.join(",  ");
	$.cookie("q1selections", newarray);
	console.log("New Array: " + $.cookie("q1selections"));
}


function updateCards2Array(selected, action){

	if(action){
		// Add to array
		cards2Array.push(selected);
	}else{
		// Subtract from array
		for (var i=cards2Array.length-1; i>=0; i--) {
		    if (cards2Array[i] === selected) {
		        cards2Array.splice(i, 1);
		        // break;       //<-- Uncomment  if only the first term has to be removed
		    }
		}
	}
	var newarray = cards2Array.join(",  ");
	$.cookie("q2selections", newarray);
	console.log("New Array: " + $.cookie("q2selections"));
}

function onQuestion1Submit(event){

	window.location.href = "consumer-survey-a1.html"

}

function onQuestion2Submit(event){

	window.location.href = "consumer-survey-a2.html"

}


function showPopover(){
$(this).popover('show');
}

function hidePopover(){
$(this).popover('hide');
}