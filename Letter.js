// control whether or not a letter appears as a "_" or as itself on-screen
Letter = function(letter){
    this.letter = letter;
    this.found = false;
    this.display = function(){
        if (this.found) return this.letter;
        else return '_';
    }
}

exports.Letter = Letter; 

