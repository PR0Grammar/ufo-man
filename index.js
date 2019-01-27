const fs = require('fs');
const rl = require('readline-sync');
const UfoGame = require('./UfoGame');
const utils = require('./utils');

/**
 * UFO: The Game! Client
 */

const wordList = fs.readFileSync('./words.txt', 'utf8').split('\n');

while(true){
    let word = utils.getRandomElem(wordList);
    let game = new UfoGame(word);

    process.stdout.write('\nUFO: The GAME!\n');
    process.stdout.write('Instructions: save us from alien abduction by guessing letters in the codeword.\n');
    game.printState();

    while(game.hasGuessesLeft() && !game.haveWon()){
        const guess = rl.question('Please enter your guess: ');
        const result = game.guessLetter(guess);

        process.stdout.write(`\n${result}\n`);
        game.printState();
    }

    game.end();

    if(game.haveWon())
        process.stdout.write(`\nCorrect! You saved the person and earned a medal of honor!\n`);
    else
        process.stdout.write(`\nOh no! The aliens won. Better luck next time.\n`);
    
    process.stdout.write(`\nThe codeword was: ${game.word}\n`);

    const playAgain = rl.keyInYN('Would you like to play again?');
    
    if(!playAgain){
        process.stdout.write('Thanks for playing! Goodbye.\n');
        break;
    }
}
