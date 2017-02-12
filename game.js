// Game logic
// Retrieve Letter and Word constructors from Letter.js and Word.js 
var L = require("./Letter.js");
var W = require("./Word.js");
var inquirer = require("inquirer")

var myWord = new W.Word("hello");
word_status = "_____";
wins = 0;
guesses = "";
incorrect_guesses = "";
guess_count = 6; 

myWord.create_letters()
console.log(myWord.word_letters)

function askForLetter(){

inquirer.prompt([
    {type: "input",
      name: "letter_input",
      message: "Pick a letter."}
    ]).then(function(data){
    	l = data.letter_input
    	myWord.search_word(l)
    	updated_word_status = myWord.show_letters()
    	// If the letters shown have not changed since the last turn 
    	if (updated_word_status == word_status){
    		// If the user's guess was already guessed 
    		if (guesses.indexOf(l) != -1){
    			console.log("Please choose a unique letter on each turn.");
    			askForLetter();
    		// If the user's guess was not in t
    		}else{
    			console.log("Oops!")
    			incorrect_guesses += l
    			guesses += l
    			if (incorrect_guesses.length <= guess_count){
    				askForLetter();
    			}
    		}

    	// If a correct letter was added to the letters shown 
    	} else{
    		console.log(updated_word_status)
    		// if the word is incomplete 
    		if (updated_word_status.indexOf("_") != -1){
    			askForLetter();
    		// if the word is complete 
    		}else{
    			console.log("congrats")
    		}
    	}

       
  });
}

askForLetter()






// var words = ['jeff', 'john', 'rhyna'];

// var wordToPlay = words[Math.floor(Math.random()*words.length)];

// var wordObject = new Word(wordToPlay);
// wordObject.makeAndPushLettersIntoWord();
// console.log(wordObject.display());

// function askLetter(){
//     inquirer.prompt([
//     {
//     type: "input",
//     name: "guess",
//     message: "What letter do you guess? If you are done then say no."},
//     ]).then(function(data){
//         if (data.guess != 'no') {
//             wordObject.updateLetter(data.guess);

//             console.log(wordObject.display());

//             askLetter();
//         }
//     });
// }

// askLetter();