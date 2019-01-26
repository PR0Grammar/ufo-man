const UFO_ART = require('./UFO_ART');
const utils = require('./utils');

function UfoGame(word){
    if(!utils.isOnlyLetters(word))
        throw new Error(`Word must be a string with only letters from A-Z (No spaces).`);

    this.word = word.toUpperCase();
    this.guessesLeft = 6;
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
            state += ` _ `;
    }
    
    return state;
}

UfoGame.prototype.guessLetter = function(char) {
    if(!this.hasGuessesLeft())
        return `Sorry! No more guesses left.`;

    if(!utils.isOnlyLetters(char) || char.length !== 1)
        return `I cannot understand your input. Please guess a single letter.`;

    char = char.toUpperCase();

    if(this.wrongGuesses.has(char) || this.rightGuesses.has(char))
        return `You can only guess that letter once, please try again.`;

    if(this.word.includes(char)){
        this.rightGuesses.add(char);
        this.wordGuessState = this.getWordGuessState();
        return `Correct! You're closer to cracking the codeword.`;
    }

    this.wrongGuesses.add(char);
    this.guessesLeft--;
    return `Incorrect! The tractor beam pulls the person in further.`;
}

UfoGame.prototype.ufoState = function() {
    let currState = this.hasGuessesLeft() ? 6 - this.guessesLeft : 6;
    return this.ufos[currState];
}

UfoGame.prototype.haveWon = function() {
    return utils.removeSpaces(this.wordGuessState) === this.word;    
}

UfoGame.prototype.hasGuessesLeft = function(){
    return this.guessesLeft > 0;
}

UfoGame.prototype.printState = function() {
    process.stdout.write(`${this.ufoState()}\n`);
    process.stdout.write(`Incorrect Guesses:\n`);
    process.stdout.write(`${Array.from(this.wrongGuesses).join(', ') || 'None'}\n`);
    process.stdout.write(`Codeword:\n`);
    process.stdout.write(`${this.wordGuessState}\n`);
}

UfoGame.prototype.printWinningStatement = function(){
    if(!this.haveWon)
        process.stdout.write(`Oh No! The person has been abducted by the aliens. Better luck next time!\n`);
    else
        process.stdout.write(`You saved the person and earned a medal of honor!\n`);
    process.stdout.write(`The codeword is: ${this.word}\n`);
    process.stdout.write(`Goodbye!\n`);
}

module.exports = UfoGame;