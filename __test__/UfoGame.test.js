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

    t.equals(game._word, 'CODECADEMY', 'Sets this._word to "CODECADEMY"');
    t.end();
});


/**
 * getWordGuessState() 
 */

test('getWordGuessState(): When this._word = "CODECADEMY" and this.rightGuesses = []', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ' _  _  _  _  _  _  _  _  _  _ ';

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

test('getWordGuessState(): When this._word = "CODECADEMY" and this.rightGuesses = ["C", "A"]', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ` C  _  _  _  C  A  _  _  _  _ `;
    game.rightGuesses.add('A').add('C');

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

test('getWordGuessState(): When this._word = "CODECADEMY" and this.rightGuesses = ["C", "A", "D", "E", "O", "M", "Y"]', (t) => {
    let game = new UfoGame('CODECADEMY');
    const expectedWordGuessState = ` C  O  D  E  C  A  D  E  M  Y `;
    game.rightGuesses.add('C').add('A').add('D').add('E').add('O').add('M').add('Y');

    t.equals(game.getWordGuessState(), expectedWordGuessState, `Returns "${expectedWordGuessState}"`);
    t.end();
});

/**
 * guessLetter()
 */

test('guessLetter(): Given "A" when this.guessesLeft = 0, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 0;

    t.equals(game.guessLetter('A'), 'Sorry! No more guesses left.', 'Returns "Sorry! No more guesses left."');
    t.end();
});

test('guessLetter(): Given "ABCDEF" when this.guessesLeft = -5, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = -5;
    
    t.equals(game.guessLetter('ABCDEF'), 'Sorry! No more guesses left.', 'Returns "Sorry! No more guesses left."');
    t.end();
});

test('guessLetter(): Given "1" when this.guessesLeft = 1, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 1;

    t.equals(game.guessLetter('1'), "I cannot understand your input. Please guess a single letter.", 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});

test('guessLetter(): Given "AB" when this.guessesLeft = 6, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');

    t.equals(game.guessLetter('AB'), 'I cannot understand your input. Please guess a single letter.', 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});

test('guessLetter(): Given undefined when this.guessesLeft = 6, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');

    t.equals(game.guessLetter(), 'I cannot understand your input. Please guess a single letter.', 'Returns "I cannot understand your input. Please guess a single letter."');
    t.end();
});

test('guessLetter(): Given "A" when this.guessesLeft = 6, this._word = "WORD", this.rightGuesses = [], this.wrongGuesses = ["A"]', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 5;
    game.wrongGuesses.add('A');

    t.equals(game.guessLetter('A'), 'You can only guess that letter once, please try again.', 'Returns "You can only guess that letter once, please try again."');
    t.end();
});

test('guessLetter(): Given "A" when this.guessesLeft = 5, this._word = "WORD", this.rightGuesses = ["A"], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 5;
    game.rightGuesses.add('A');

    t.equals(game.guessLetter('A'), 'You can only guess that letter once, please try again.', 'Returns "You can only guess that letter once, please try again."');
    t.end();
});

test('guessLetter(): Given "A" when this.guessesLeft = 4, this._word = "WORD", this.rightGuesses = ["A"], this.wrongGuesses = []', (t) => {
    t.plan(2);
    let game = new UfoGame('WORD');
    game.guessesLeft = 4;
    game.rightGuesses.add('A');

    game.guessLetter('A');

    t.deepEquals(Array.from(game.rightGuesses), ['A'], 'Leaves this.rightGuesses unmodified');
    t.deepEquals(Array.from(game.wrongGuesses), [], 'Leaves this.wrongGuesses unmodified');
    t.end();
});

test('guessLetter(): Given "WORD" when this.guessesLeft = 6, this._word = "WORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    t.plan(2);
    let game = new UfoGame('WORD');

    game.guessLetter('WORD');

    t.deepEquals(Array.from(game.rightGuesses), [], 'Leaves this.rightGuesses unmodified');
    t.deepEquals(Array.from(game.wrongGuesses), [], 'Leaves this.wrongGuesses unmodified');
    t.end();
});

test('guessLetter(): Given "O" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    t.plan(2);
    let game = new UfoGame('VERYLONGWORD');

    game.guessLetter('O');

    t.deepEquals(Array.from(game.rightGuesses), ['O'], 'Adds "O" to this.rightGuesses');
    t.deepEquals(Array.from(game.wrongGuesses), [], 'Leaves wrongGuesses unmodified');
    t.end();
});

test('guessLetter(): Given "V" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('VERYLONGWORD');
    
    t.equals(game.guessLetter('V'), `Correct! You're closer to cracking the codeword.`, `Returns "Correct! You're closer to cracking the codeword."`);
    t.end();
});

test('guessLetter(): Given "O" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('VERYLONGWORD');

    game.guessLetter('O');

    t.equals(game.wordGuessState, ` _  _  _  _  _  O  _  _  _  O  _  _ `, 'Changes this.wordGuessState to " _  _  _  _  _  O  _  _  _  O  _  _ "');
    t.end();
});

test('guessLetter(): Given "H" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    t.plan(2);
    let game = new UfoGame('VERYLONGWORD');

    game.guessLetter('H');

    t.deepEquals(Array.from(game.rightGuesses), [], 'Leaves this.rightGuesses unmodified');
    t.deepEquals(Array.from(game.wrongGuesses), ['H'], 'Adds "H" to this.wrongGuesses');
    t.end();
});

test('guessLetter(): Given "M" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('VERYLONGWORD');

    game.guessLetter('M');

    t.equals(game.guessesLeft, 5, "Changes this.guessesLeft to 5");
    t.end();
});

test('guessLetter(): Given "B" when this.guessesLeft = 6, this._word = "VERYLONGWORD", this.rightGuesses = [], this.wrongGuesses = []', (t) => {
    let game = new UfoGame('VERYLONGWORD');

    t.equals(game.guessLetter('B'), 'Incorrect! The tractor beam pulls the person in further.', 'Returns "Incorrect! The tractor beam pulls the person in further."');
    t.end();
});


/**
 * ufoState()
 */

test('ufoState(): When this.guessesLeft = 6, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');

    t.equals(game.ufoState(), UFO_ART[0], `Returns ${UFO_ART[0]}`);
    t.end();
});

test('ufoState(): When this.guessesLeft = 0, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 0;

    t.equals(game.ufoState(), UFO_ART[6], `Returns ${UFO_ART[6]}`);
    t.end();
});

test('ufoState(): When this.guessesLeft = -1, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = -1;

    t.equals(game.ufoState(), UFO_ART[6], `Returns ${UFO_ART[6]}`);
    t.end();
});

 /**
  * haveWon()
  */

test('haveWon(): When this._word = "CODECADEMY", this.wordGuessState = " C  O  D  E  C  A  D  E  M  _ "', (t) => {
    let game = new UfoGame('CODECADEMY');
    game.wordGuessState = ' C  O  D  E  C  A  D  E  M  _ ';

    t.equals(game.haveWon(), false, 'Returns false');
    t.end();
});

test('haveWon(): When this._word = "CODECADEMY", this.wordGuessState = " C  O  D  E  C  A  D  E  M  Y "', (t) => {
    let game = new UfoGame('CODECADEMY');
    game.wordGuessState = ' C  O  D  E  C  A  D  E  M  Y ';

    t.equals(game.haveWon(), true, 'Returns true');
    t.end();
});

/**
 * hasGuessesLeft()
 */

test('hasGuessesLeft(): When this.guessesLeft = 1, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 1;

    t.equals(game.hasGuessesLeft(), true, 'Returns true');
    t.end();
});

test('hasGuessesLeft(): When this.guessesLeft = 0, this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.guessesLeft = 0;

    t.equals(game.hasGuessesLeft(), false, 'Returns false');
    t.end();
});


/**
 * end()
 */

test('end(): When this._word = "WORD"', (t) => {
    let game = new UfoGame('WORD');
    game.end();

    t.equals(Object.isFrozen(game), true, 'Freezes object');
    t.end();
});