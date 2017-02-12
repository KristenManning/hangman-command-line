var L = require("./Letter.js");

// contains all of the methods which will check the letters guessed versus the random word selected

Word = function(word){
	// stores word [string]
	this.word = word;
	// contains letter objects of each letter in word
	// repeated letters are repeated
	this.word_letters = []; 
	// intialize this.word_letters
	this.create_letters = function(){
		for (i in this.word)
			this.word_letters.push(new Letter(this.word[i]))
		};
	// displays word using '_'s and letters according to guesses
	this.show_letters = function(){
		display_string = ""
		for (i in this.word_letters){
			display_string += this.word_letters[i].display()
		}
		return display_string
	};
	// searches word for letters that match guess 
	this.search_word = function(guess){
		if (this.word.indexOf(guess) != -1){
			for (i in this.word_letters){
				if (this.word_letters[i].letter == guess){
					this.word_letters[i].found = true;
				}
			}
		}
	}
};



exports.Word = Word; 