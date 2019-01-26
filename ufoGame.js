const UFO_ART = require('./UFO_ART');
const utils = require('./utils');

function UfoGame(word){
    if(!utils.isOnlyLetters(word))
        throw new Error('Word must be a string with only letters from A-Z (No spaces).');

    this.word = word.toUpperCase();
    this.movesLeft = 6;
    this.wrongGuesses = new Set();
    this.rightGuesses = new Set();
    this.ufos = UFO_ART;
    this.wordGuessState = this.getWordGuessState();
}

UfoGame.prototype.getWordGuessState = function() {
    let state = '';

    for(let i = 0; i < this.word.length; i++){
        if(this.rightGuesses.has(this.word[i]))
            state += ` ${this.word[i]} `;
        else
            state += ' _ '
    }
    return state;
}

UfoGame.prototype.guessLetter = function(char) {
    if(this.movesLeft <= 0)
        return `Sorry! You're out of moves.`;
    if(!utils.isOnlyLetters(char) || char.length !== 1)
        return `Input must be one alphabet letter (A-Z)`;

    char = char.ToUpperCase();

    if(this.wrongGuesses.has(char) || this.rightGuesses.has(char))
        return `This letter has already been guessed. Try another.`;
    
    if(this.word.contains(char)){
        this.rightGuesses.add(char);
        this.currentState = this.getWordGuessState();
        return 'You got a letter!';
    }
    this.wrongGuesses.add(char);
    this.movesLeft--;
    return 'Wrong guess!';
}

UfoGame.prototype.ufoState = function() {
    let currState = 6 - this.movesLeft;
    return this.ufos[currState];
}

UfoGame.prototype.haveWon = function() {
    return utils.removeSpaces(this.wordGuessState) === this.word;    
}

module.exports = UfoGame;