"use strict";
/* global gus garry:true */
/* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */

var finishedMeetings = 10,
	meetingDays = ["Past", "Past",
		"Fri, Oct 16", "Mon, Oct 26",
		"Wed, Nov 4", "Fri, Nov 13", "Mon, Nov 23",
		"Thu, Dec 3", "Fri, Dec 11",
		"Mon, Jan 4", " Tue, Jan 12", "Thu, Jan 21 (?)"
	],
	i;

/* http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffle (array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
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

var people = ["", "Becca", "Florence", "Jason", "Kauai", "Sabine", "Brandon"],
	colors = ["red", "orange", "yellow", "green", "blue", "violet"];

console.log(people);

function colorCode () {
	console.log("Started colorCode function.");

	for (i = 0; i < people.length; i++) {
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

	for (i = 1; i <= finishedMeetings; i++) {
		$("body")
		.find("h3:contains(" + i + ")")
		.each(function removeFinishedMeetingsInner () {
			if ($(this).text().length === 8 + i.toString().length) {
				$(this).css("text-decoration", "line-through");
			}
		});
	}
	$("body")
		.find("h3:contains(" + i + ")")
		.each(function () {
			if ($(this).text().length === 8 + i.toString().length) {
				$(this).css("font-weight", "bold");
			}
		});
}

function generateCombos (randomness) {
	var comb = [[]];
	var i, j;

	for (i = 1; i < 7; i++) {
		for (j = 1; j < 7; j++) {
			if (i !== j && i < j) {
				comb.push([people[i], people[j]]);
			}
		}
	}

	console.log(comb);
	comb.shift();
	comb.shift();
	comb.sort(function generateCombosRandomAlgorithm () {
		return 0.5 - randomness;
	});
	console.log(comb);

	var meeting = 1,
		$block;

	$block = $("#left");
	$block.empty();
	$block.append("<h3>Meeting " + meeting + "</h3>");
	$block.append("<span class='date'>" + meetingDays[meeting - 1] + "</span><br />");
	$block.append("<span>" + "Becca" + "</span>, <span>" + "Florence" + "</span><br /><br />");

	for (i = 0; i < comb.length; i++) {
		meeting++;
		if (i < comb.length / 2 - 1) {
			$block = $("#left");
		} else {
			$block = $("#right");
		}
		$block.append("<h3>Meeting " + meeting + "</h3>");
		if (meetingDays.length >= meeting) {
			$block.append("<span class='date'>" + meetingDays[meeting - 1] + "</span><br />");
		} else {
			$block.append("<span class='date'>" + "Future" + "</span><br />");
		}
		$block.append("<span>" + comb[i][0] + "</span>, <span>" + comb[i][1] + "</span><br /><br />");
	}

	colorCode();

	removeFinishedMeetings();

	console.log("Program finished.");
}

$(document).ready(function documentReadyHappens () {
	generateCombos(0.9);
});