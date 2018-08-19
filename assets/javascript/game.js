//VARIABLES AND EXPLANATIONS
var wins = 0;
var currentArray = [];
var correctArray = [];
var scoredArray = [];
var lettersGuessed = [];
var word = [];
var currentPlaceholder = "";
var userGuess = "";
var guessesLeft = 13;

// wins = win counter set to 0
// currentArray = empty array used to store current word
// correctArray = empty array that stores the correct guesses and is displayed to the DOM
// scoredArray = empty array used to convert current word into underscores
// lettersGuessed = empty array used to store letters already guessed
// word = empty array that stores the random curret word 
// currentPlaceholder = stores the correctly guessed keys
// userGuess = What keys a user presses
// guessesLeft = number of guesses left set to 13



//HOLDS WORDS IN OBJECT
var tooFastWords = {
	word1: ["R", "A", "C", "E", "W", "A", "R", "S"],
	word2: ["B", "U", "S", "T", "E", "R"],
	word3: ["M", "A", "Z", "D", "A"],
	word4: ["N", "I", "S", "S", "A", "N"],
  word5: ["Q", "U", "A", "R", "T", "E", "R", "M", "I", "L", "E"],
  word6: ["T", "O", "R", "E", "T", "T", "O"],
  word7: ["N", "I", "T", "R", "O", "U", "S"],
  word8: ["H", "E", "I", "S", "T"],
  word9: ["P", "I", "N", "K", "S", "L", "I", "P", "S"],
  word10: ["N", "A", "R", "C"],
  word11: ["M", "I", "T", "S", "U", "B", "I", "S", "H", "I"],
  word12: ["G", "O", "F", "A", "S", "T"],
};

//CREATES ONE ARRAY FROM ALL WORDS
var wordArray = [tooFastWords.word1, tooFastWords.word2, tooFastWords.word3, tooFastWords.word4, tooFastWords.word5, tooFastWords.word6, tooFastWords.word7, tooFastWords.word8, tooFastWords.word9, tooFastWords.word10, tooFastWords.word11, tooFastWords.word12];

//STARTS GAME
start();

//USER INPUT LOGIC
document.onkeyup = function(event) {
	console.log('Key entered is ', event.key);
	var keyPress;

	if (typeof event != 'undefined') {
		keyPress = event.keyCode;
		// UPPERCARE userGuess AND CALLS FUNCTIONS
		userGuess = String.fromCharCode(keyPress).toUpperCase();
		userGuesses(userGuess);
    pauseAudio();
    guessShow(userGuess);
	}
};

//TAKES RANDOM WORDS AND CREATES AND ARRAY
function randoWord(wordArray) {
	word = wordArray[Math.floor(Math.random()*wordArray.length)];
	console.log(word);
};

//CREATES PLACEHOLDER FOR CURRENT WORD AS _ _ _ 
function placeHolder(word) {	
  var scoredArray = [];
  
	for (i = 0; i < word.length; i++) {
		scoredArray.push("_");
	}

	document.getElementById("guess_left").textContent = currentPlaceholder;
	return scoredArray;
};

//USER GUESS FUNCTIONS
function userGuesses(userGuess) {

	for (i = 0; i < lettersGuessed.length; i++) {
		if (userGuess == lettersGuessed[i]) {
			return;
		}
	}
	guessesLeft--;
	//SHOWS GUESSES LEFT
	document.getElementById("guess_left").innerHTML = guessesLeft;
	console.log("Guesses left " + guessesLeft);

	if (guessesLeft == 0) {
		restart();
	}

	//PUSH GUSSED LETTERS ONTO DOM
	lettersGuessed.push(userGuess);
	console.log("Letters Guessed array now contains: " + lettersGuessed[0]);
	
	//ADDS A SPACE BETWEEN EACH GUESSED LETTER
	var lettersGuessedString = lettersGuessed.join(", ");
	document.getElementById("letters_guessed").innerHTML = lettersGuessedString;

	

	return lettersGuessedString;
};

//FUNCTION TO DISPLAYS GUESSED LETTERS 
function guessShow(userGuess) {

	//UNDERSCORES CURRENT WORD
	if (correctArray.length == 0) {
		currentArray = placeHolder(word);
  } 
  else {
		currentArray = correctArray;
	}

	//REPLACES UNDERSCORES WITH CORRECT GUESS
	for (var i = 0; i < word.length; i++) {
	  console.log('Current word is ' + word);
	  if (userGuess == word[i]) {
	  	currentArray[i] = userGuess;
	  }
	}

	correctArray = currentArray;

	//CURRENT ARRAY IS CONVERTED TO BE DISPLAYED.
	placeholder = currentArray.join(" ");
	document.getElementById("current_word").innerHTML = placeholder;

	console.log("Current word length is " + currentArray.length);
	console.log("Current word split is " + placeholder.split(","));
	console.log("Current word joined is " + word.join(" "));
	console.log("==================================================");
	
	//WIN CONDITIONS
	if (placeholder.split(',') == word.join(" ")) {
    wins++;
    playAudio();
		document.getElementById("counter").innerHTML = wins;
		restart();
	}
};

//AUDIO
function playAudio() { 
	var vid = document.getElementById("win_music"); 
  vid.play(); 
}

function pauseAudio() { 
	var vid = document.getElementById("win_music"); 
  vid.pause(); 
}

//RESTART FUNCTION
function restart(scoredArray) {
	
	//CHOOSES NEW WORD
	randoWord(wordArray);

	//RESETS ALL INPUTS AND GUESSES
  userGuess = "";
	correctArray = [];
	currentArray = [];
	guessesLeft = 13;

	//RESETS ALL COUNTERS
	document.getElementById("guess_left").innerHTML = guessesLeft;
	lettersGuessed = [];
	document.getElementById("letters_guessed").innerHTML = lettersGuessed;
};

function start(scoredArray) {
	
	//CHOOSES NEW WORD
	randoWord(wordArray);

	//RESETS ALL INPUTS AND GUESSES
	wins = 0
	guessesLeft = 13;

	//RESETS ALL COUNTERS
	document.getElementById("guess_left").innerHTML = guessesLeft;
	document.getElementById("counter").innerHTML = wins;
};