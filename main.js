var inquirer = require('inquirer');
var words = require('./word.js');
var game = require('./game.js');
var letterCheck = require('./letter.js');


var wordObj = words.word.wordFunctions;					//Holds the word list
var letterObj = letterCheck.letter.letterFunctions;		//Holds the functions from the constructor in letter.js

var currentWord, blankCurrentWord, turns, lettersTried;


function varSet() {
	currentWord = wordObj.wordList[Math.floor(Math.random()*wordObj.wordList.length)];
	blankCurrentWord = "";

	for(var i = 0; i < currentWord.length; i++) {
		blankCurrentWord += '_ ';
	}

	lettersTried = [];
	turns = 10;
}


function userGuess() {
	console.log(blankCurrentWord);

	inquirer.prompt([
		{
			type: "input",
			message: "Guess A Letter:",
			name: "letter"
		},
	]).then(function (user) {
		var userGuessLetter = user.letter.toLowerCase();
		var isLetter = letterObj.checkIfLetter(userGuessLetter);
		var inWord = false;

		if(isLetter) {
			for(var i = 0; i < currentWord.length; i++) {
				if(userGuessLetter == currentWord[i]) {
					blankCurrentWord = letterObj.replaceLetter(blankCurrentWord, i * 2, userGuessLetter);
					inWord = true;
				}
			}

			if(!inWord && !letterObj.inArray(userGuessLetter, lettersTried)) {
				lettersTried.push(userGuessLetter);
				turns--;
			}

			console.log("You have " + turns + " turns left");
			console.log("You have guessed: " + lettersTried);
			console.log("");

			if(blankCurrentWord.indexOf("_") === -1) {
				console.log("You won!");
				console.log("The word was " + currentWord + "!");
				playAgain();
			} else if(turns == 0){
				console.log("You ran out of turns!");
				console.log("The word was " + currentWord + "!");
				playAgain();
			} else {
				userGuess();
			}
		} else {
			console.log("That was not a letter. Please enter a letter A-Z.");
			console.log("");
			userGuess();
		}

	});
}

function playAgain() {
	inquirer.prompt([
	{
		type: "confirm",
		message: "Do you want to play again?",
		name: "again"
	},
	]).then(function (user) {
		if(user.again) {
			console.log("");
			varSet();
			userGuess();
		} else {
			console.log("Good Bye!");
		}
	});
}


varSet();
userGuess();