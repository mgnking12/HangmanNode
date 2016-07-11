var inquirer = require('inquirer');
var words = require('./word.js');
var game = require('./game.js');
var letterCheck = require('./letter.js');

var letterObj = letterCheck.letter.letterFunctions;	

var currentWord, blankz, turns, lettersTried;

function blankSet() {
	currentWord = game.game.wordBank[Math.floor(Math.random()*game.game.wordBank.length)];
	blankz = "";

	for(var i = 0; i < currentWord.length; i++) {
		blankz += '_ ';
	}

	lettersTried = [];
	turns = 10;
}

function userGuess() {
	console.log(blankz);

	inquirer.prompt([
		{
			type: "input",
			message: "Choose a Letter:",
			name: "letter"
		},
	]).then(function (user) {
		var userGuessLetter = user.letter.toLowerCase();
		var isLetter = letterObj.checkLetz(userGuessLetter);
		var inWord = false;

		if(isLetter) {
			for(var i = 0; i < currentWord.length; i++) {
				if(userGuessLetter == currentWord[i]) {
					blankz = letterObj.replaceLetter(blankz, i * 2, userGuessLetter);
					inWord = true;
				}
			}

			if(!inWord && !letterObj.inArray(userGuessLetter, lettersTried)) {
				lettersTried.push(userGuessLetter);
				turns--;
			}

			console.log("You have " + turns + " tries left");
			console.log("Your guesses have been: " + lettersTried);
			console.log("");

			if(blankz.indexOf("_") === -1) {
				console.log("You won!");
				console.log("The word was " + currentWord + "!");
				playAgain();
			} else if(turns == 0){
				console.log("You ran out of turns!");
				console.log("Game over bro it was " + currentWord);
				playAgain();
			} else {
				userGuess();
			}
		} else {
			console.log("That was not a letter or a space. Please enter a letter A-Z or a space.");
			console.log("");
			userGuess();
		}

	});
}

function playAgain() {
	inquirer.prompt([
	{
		type: "confirm",
		message: "Want to play again?",
		name: "again"
	},
	]).then(function (user) {
		if(user.again) {
			console.log("");
			blankSet();
			userGuess();
		} else {
			console.log("Good Bye!");
		}
	});
}


blankSet();
userGuess();