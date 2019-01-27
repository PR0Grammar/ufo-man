const test = require('tape');
const utils = require('../utils');

/**
 * isOnlyLetters()
 */

test('isOnlyLetters(): Given "AzAb"', (t) => {
    t.equals(utils.isOnlyLetters('AzAb'), true, 'Return true');
    t.end();
});

test('isOnlyLetters(): Given "A"', (t) => {
    t.equals(utils.isOnlyLetters('A'), true, 'Returns true');
    t.end();
});

test('isOnlyLetters(): Given "Has space"', (t) => {
    t.equals(utils.isOnlyLetters('Has space'), false, 'Returns false');
    t.end();
});

test('isOnlyLetters(): Given ""', (t) => {
    t.equals(utils.isOnlyLetters(''), false, 'Returns false');
    t.end();
});

test('isOnlyLetters(): Given undefined', (t) => {
    t.equals(utils.isOnlyLetters(), false, 'Returns false');
    t.end();
});

test('isOnlyLetters(): Given null', (t) => {
    t.equals(utils.isOnlyLetters(null), false, 'Returns false');
    t.end();
});

/**
 * removeSpaces()
 */

test('removeSpaces(): Given " Lorem Ip s u    m"', (t) => {
    t.equals(utils.removeSpaces(' Lorem Ip s u    m'), 'LoremIpsum', 'Returns "LoremIpsum"');
    t.end();
});

test('removeSpaces(): Given " _ O _ E C _ D _ M _ "', (t) => {
    t.equals(utils.removeSpaces(' _ O _ E C _ D _ M _ '), '_O_EC_D_M_', 'Returns "_O_EC_D_M_"');
    t.end();
});