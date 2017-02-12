Player = function(player){
    this.correct_count = 0;
    this.guesses_remaining = false;
    this.display = function(){
        if (this.found) return this.player;
        else return '_';
    }
}

exports.Player = Player; 