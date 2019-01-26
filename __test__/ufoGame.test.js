const test = require('tape');
const UfoGame = require('../ufoGame');

/**
 * Constructor Unit Tests
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