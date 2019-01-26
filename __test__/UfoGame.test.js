const test = require('tape');
const UfoGame = require('../UfoGame');
const UFO_ART = require('../UFO_ART');

/**
 * Constructor
 */

test('constructor(): Given undefined', (t) => {
    t.throws(() => {new UfoGame()}, Error, 'Throws Error');
    t.end();
});

test('constructor(): Given "two words"', (t) => {
    t.throws(() => {new UfoGame('two words')}, Error, 'Throws Error');
    t.end();
});

test('constructor(): Given "codecademy"', (t) => {
    let game = new UfoGame('codecademy');

    t.equals(game.word, 'CODECADEMY', 'Sets this.word to "CODECADEMY"');
    t.end();
});


/**
 * getWordGuessState() 
 */

test('getWordGuessState(): When this.word = "CODECADEMY" and this.rightGuesses = []', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ' _  _  _  _  _  _  _  _  _  _ ';

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

test('getWordGuessState(): When this.word = "CODECADEMY" and this.rightGuesses = ["C", "A"]', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ` C  _  _  _  C  A  _  _  _  _ `;
    game.rightGuesses.add('A').add('C');

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

test('getWordGuessState(): When this.word = "CODECADEMY" and this.rightGuesses = ["C", "A", "D", "E", "O", "M", "Y"]', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ` C  O  D  E  C  A  D  E  M  Y `;
    game.rightGuesses.add('C').add('A').add('D').add('E').add('O').add('M').add('Y');

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

/**
 * guessLetter()
 */

test('guessLetter(): Given "A" when this.guessesLeft = 0, this.word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 0;

    t.equals(game.guessLetter('A'), 'Sorry! No more guesses left.', 'Returns "Sorry! No more guesses left."');
    t.end();
});

test('guessLetter(): Given "ABCDEF" when this.guessesLeft = -5, this.word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = -5;
    
    t.equals(game.guessLetter('ABCDEF'), 'Sorry! No more guesses left.', 'Returns "Sorry! No more guesses left."');
    t.end();
});

test('guessLetter(): Given "1" when this.guessesLeft = 1, this.word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 1;

    t.equals(game.guessLetter('1'), "I cannot understand your input. Please guess a single letter.", 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});

test('guessLetter(): Given "AB" when this.guessesLeft = 6, this.word = "WORD"', (t) => {
    let game = new UfoGame('WORD');

    t.equals(game.guessLetter('AB'), 'I cannot understand your input. Please guess a single letter.', 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});

test('guessLetter(): Given undefined when this.guessesLeft = 6, this.word = "WORD"', (t) => {
    let game = new UfoGame('WORD');

    t.equals(game.guessLetter(), 'I cannot understand your input. Please guess a single letter.', 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});


test('guessLetter(): Given "a" when this.guessesLeft = 6, this.word = "WORD", this.rightGuesses = [], this.wrongGuesses = ["A"]', (t) => {
    let game = new UfoGame('WORD');
    game.wrongGuesses.add('A');

    t.equals(game.guessLetter('a'), 'You can only guess that letter once, please try again.', 'Returns "You can only guess that letter once, please try again."');
    t.end();
});

test('guessLetter(): Given "A" when this.guessesLeft = 6, this.word = "WORD", this.rightGuesses = ["A"], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('WORD');
    game.rightGuesses.add('A');

    t.equals(game.guessLetter('A'), 'You can only guess that letter once, please try again.', 'Returns "You can only guess that letter once, please try again."');
    t.end();
});