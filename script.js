var finishedMeetings = 7,
	meetingDays = ["Past", "Past",
		"Fri, Oct 16", "Mon, Oct 26",
		"Wed, Nov 4", "Fri, Nov 13", "Mon, Nov 23",
		"Thu, Dec 3", "Fri, Dec 11"
	],
	shion;

/* http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// var people = {
// 	1: "Becca",
// 	2: "Florence",
// 	3: "Jason",
// 	4: "Kauai",
// 	5: "Sabine",
// 	6: "Brandon"
// }

var people = ["", "Becca", "Florence", "Jason", "Kauai", "Sabine", "Brandon"];
var colors = ["red", "orange", "yellow", "green", "blue", "violet"];

console.log(people);

function generateCombos (randomness) {
	var comb = [[]];
	
	for (var i = 1; i < 7; i++) {
		for (var j = 1; j < 7; j++) {
			if (i !== j && i < j) {
				comb.push([people[i], people[j]]);
			}
		}
	}
	
	console.log(comb);
	comb.shift();
	comb.shift();
	comb.sort(function() {
		return 0.5 - randomness;
	});
	console.log(comb);
	
	var meeting = 1;

	$b = $("#left");
	$b.empty();
	$b.append("<h3>Meeting " + meeting + "</h3>");
	$b.append("<span class='date'>" + meetingDays[meeting - 1] + "</span><br />");
	$b.append("<span>" + "Becca" + "</span>, <span>" + "Florence" + "</span><br /><br />");
	
	for (var i = 0; i < comb.length; i++) {
		meeting++;
		if (i < comb.length / 2 - 1) {
			$b = $("#left");
		} else {
			$b = $("#right");
		}
		$b.append("<h3>Meeting " + meeting + "</h3>");
		if (meetingDays.length >= meeting) {
			$b.append("<span class='date'>" + meetingDays[meeting - 1] + "</span><br />");
		} else {
			$b.append("<span class='date'>" + "Future" + "</span><br />");
		}
		$b.append("<span>" + comb[i][0] + "</span>, <span>" + comb[i][1] + "</span><br /><br />");
	}

	colorCode();

	removeFinishedMeetings();

	console.log("Program finished.");
}

var $f, $s, submitButton;

$(document).ready(function () {
	generateCombos(0.9);
	// $f = $("form");
	// $s = $f.find("input[type=submit]");


	// $f.submit(function () {
	// 	alert(submitButton.value);
	// 	generateCombos(Number(submitButton.value));
	// 	return false;
	// })
	
	// $s.click(function () {
	// 	submitButton = this;
	// })

});

function colorCode () {
	console.log("Started colorCode function.");

	for (var i = 0; i < people.length; i++) {
		$("body")
		.find("span:contains(" + people[i] + ")")
		.each(function (j) {
			if (!$(this).hasClass("addedStyle") && !$(this).hasClass("date")) {
				$(this).css("backgroundColor", colors[j]);
			}
		});
		// var peoplez = $('div:contains(' + people[i] + ')');
		// console.log(peoplez);
	}
}

function removeFinishedMeetings () {
	console.log("Started removeFinishedMeetings function.");

	for (var i = 1; i <= finishedMeetings; i++) {
		$("body")
		.find("h3:contains(" + i + ")")
		.each(function () {
			if ($(this).text().length == 8 + i.toString().length) {
				$(this).css("text-decoration", "line-through");
			}
		});
	}
	$("body")
		.find("h3:contains(" + i + ")")
		.each(function () {
			if ($(this).text().length == 8 + i.toString().length) {
				$(this).css("font-weight", "bold");
			}
		});
}