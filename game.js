// Game logic
// Retrieve Letter and Word constructors from Letter.js and Word.js 
var L = require("./Letter.js");
var W = require("./Word.js");
var inquirer = require("inquirer")
var wins = 0;

// Allow for 7 guesses, guess count value must include spaces 
var guess_count = 12;
var incorrect_guesses;
var correct_guesses;


// Storing phrases to be randomly used after guesses 
var negative_exclamations = ["Oops!", "Sorry!", "Too bad...", "Nope!", "Uh-oh!", "Not this time...", "Yikes", "Better luck next time"] 
var positive_exclamations = ["WOW!", "You rock!", "Nice work!", "Lucky guess...", "Keep it up!", "Woohoo!", "YAY"]

// Storing alphabet for type checking 
var alphabet = "abcdefghijklmnopqrstuvwxyz"

// Word lists for game 
var animal = ["bryozoa", "chordata", "loricifera", "mollusca", "nematoda", "rhombozoa", "tardigrada", "xenacoelomorpha"];
var color = ["salmon", "goldenrod", "chartreuse", "thistle", "tomato", "cornsilk", "bisque", "gainsboro"];
var lang = ["java", "javascript", "python", "ruby", "matlab", "fortran", "julia", "basic"];
var boardgame = ["avalon", "splendor", "spyfall", "dominion", "codenames", "monopoly", "scattergories", "battleship"];

// Get a random item from a list 
function randFromList(phrase_list){
	return phrase_list[Math.floor((Math.random() * phrase_list.length))]

}

// Ask user to play the game 
function playGame(){
	inquirer.prompt([
	    {type: "list",
	    name: "play",
	      choices: ["Yes", "No"],
	      message: "Welcome to Hangman! Would you like to play?"}
	    ]).then(function(data){
	    	if (data.play == "Yes"){


	    		inquirer.prompt([
				     {type: "list",
				      name: "cat",
				      choices: ["Animal Phyla", "HTML Color Names", "Programming Languages", "Board Games"],
				      message: "Choose a category"}
				    ]).then(function(data){
				    	initializeWord(data.cat)
				    });
	    	}else{
	    		console.log("Come back soon!")
	    	}

		});
}

// Ask user to play again 
function playAgain(){
	inquirer.prompt([
	    {type: "list",
	    name: "play",
	      choices: ["Yes", "No"],
	      message: "Would you like to play again?"}
	    ]).then(function(data){
	    	if (data.play == "Yes"){


	    		inquirer.prompt([
				     {type: "list",
				      name: "cat",
				      choices: ["Animal Phyla", "HTML Color Names", "Programming Languages", "Board Games"],
				      message: "Choose your next category"}
				    ]).then(function(data){
				    	initializeWord(data.cat)
				    });
	    	}else{
	    		console.log("Come back soon!")
	    	}

		});
}

// Initialize the word object, and empty display string for comparing against 
// Reset storage of guesses 
function initializeWord(category){
	incorrect_guesses = "";
	correct_guesses = ""

	var word_obj; 

	switch (category) {
	    case "Animal Phyla":
	        word_obj = new W.Word(randFromList(animal));
	        break;
	    case "HTML Color Names":
	        word_obj = new W.Word(randFromList(color));
	        break;
	    case "Programming Languages":
	        word_obj = new W.Word(randFromList(lang));
	        break;
	    case "Board Games":
	        word_obj = new W.Word(randFromList(boardgame));
	        break;
	}

	// initialize word object 
	word_obj.create_letters()
	var word_status = word_obj.empty()
	askForLetter(word_obj, word_status)
	
};

// Main game functionality. 
// Take in a letter from the user and send back information according to the rules of hangman  
function askForLetter(word_obj, word_status){

	// accept a guess from the user 
	inquirer.prompt([
	    {type: "input",
	      name: "letter_input",
	      message: "Pick a letter."}
	    ]).then(function(data){
	    	l = data.letter_input
	    	word_obj.search_word(l)
	    	updated_word_status = word_obj.show_letters()

	    	// If the letters shown have not changed since the last turn 
	    	if (updated_word_status == word_status){

	    		// If the user's guess was already guessed 
	    		// Or if user's guess is not a letter
	    		if ((incorrect_guesses.indexOf(l) != -1) || (alphabet.indexOf(l) == -1) || (correct_guesses.indexOf(l) != -1) ){
	    			console.log("")
	    			console.log("Please choose a unique letter of the alphabet on each turn.");
	    			console.log("")
	    			askForLetter(word_obj, word_status);

	    		// If the user's guess was not in the word 
	    		}else{
	    			incorrect_guesses += l + " "

	    			console.log("")
	    			console.log(randFromList(negative_exclamations))
	    			console.log("")
	    			console.log("Incorrect Guesses: " + incorrect_guesses)

	    			// If guesses remain 
	    			if (incorrect_guesses.length <= guess_count){
	    				console.log('\x1b[36m%s\x1b[0m', word_status)
	    				console.log("")

	    				askForLetter(word_obj, word_status);

	    			// If user is out of guesses 
	    			}else{
	    				console.log("")
	    				console.log("---------")
	    				console.log("GAME OVER")
	    				console.log("---------")
	    				console.log("Score: " + wins)
	    				console.log("")
	    				playAgain()
	    			}
	    		}

	    	// If a correct letter was added to the letters shown 
	    	} else{

	    		// if the word is incomplete 
	    		if (updated_word_status.indexOf("_") != -1){
	    			word_status = updated_word_status
	    			correct_guesses += l

	    			console.log("")
	    			console.log(randFromList(positive_exclamations))
	    			console.log("")
	    			console.log("Incorrect Guesses: " + incorrect_guesses)
	    			console.log('\x1b[36m%s\x1b[0m', word_status)
	    			console.log("")

	    			askForLetter(word_obj, word_status);

	    		// if the word is complete 
	    		}else{
	    			word_status = updated_word_status
	    			wins ++ 

	    			console.log('\x1b[36m%s\x1b[0m', word_status)
	    			console.log("Congratulations! You've won!")
	    			console.log("Score: " + wins)
	    			console.log("--------------------------------")
	    			console.log("")

	    			playAgain()
	    		}
	    	}

	       
	  });
}

playGame()

