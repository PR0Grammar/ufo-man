const test = require('tape');
const TrieNode = require('../TrieNode');

/**
 * Constructor
 */

test('constructor(): Given undefined', (t) => {
    let trie = new TrieNode();

    t.equals(trie.root, '*', 'Sets this.root to "*"');
    t.end();
});

test('constructor(): Given "AB"', (t) => {
    t.throws(() => {new TrieNode('AB')}, Error, 'Throws Error');
    t.end();
});

test('constructor(): Given "a"', (t) => {
    let trie = new TrieNode('a');

    t.equals(trie.root, 'A', 'Sets this.root to "A"');
    t.end();
});


/**
 * insertWord()
 */

 test('insertWord(): Given "CODE"', (t) => {
    let trie = new TrieNode();

    trie.insertWord('CODE');

    t.equals(trie.children['C'].children['O'].children['D'].children['E'].isWord, true, 'Creates word path and sets "E" node isWord prop to true');
    t.end();
 });

 test('insertWord(): Given "code$"', (t) => {
    let trie = new TrieNode();

    t.throws(() => {trie.insertWord('code$')}, Error, 'Throws Error');
    t.end();
 });

 /**
  * insertMany()
  */

test('insertMany(): Given ["CoDe", "WOrd"]', (t) => {
    t.plan(2);

    let trie = new TrieNode();
    trie.insertMany(['CoDe', 'WOrd']);

    t.equals(trie.children['C'].children['O'].children['D'].children['E'].isWord, true, 'Creates word path for "CODE" and sets "E" node isWord prop to true.');
    t.equals(trie.children['W'].children['O'].children['R'].children['D'].isWord, true, 'Creates word path for "WORD" and sets "D" node isWord prop to true.');
    t.end();
});

/**
 * removeWord()
 */

test('removeWord(): Given "code" when there is a path to the word "CODE" and "E" node isWord prop is true', (t) => {
    let trie = new TrieNode();

    trie.children['C'] = new TrieNode('C');
    trie.children['C'].children['O'] = new TrieNode('O');
    trie.children['C'].children['O'].children['D'] = new TrieNode('D');
    trie.children['C'].children['O'].children['D'].children['E'] = new TrieNode('E');
    trie.children['C'].children['O'].children['D'].children['E'].isWord = true;

    trie.removeWord('code');

    t.equals(trie.children['C'].children['O'].children['D'].children['E'].isWord, false, 'Sets isWord prop for "E" node in the word path of "code" to false');
    t.end();
});

/**
 * has()
 */

test('has(): Given "code" when there is a path to the word "CODE" and "E" node isWord prop is true', (t) => {
    let trie = new TrieNode();

    trie.children['C'] = new TrieNode('C');
    trie.children['C'].children['O'] = new TrieNode('O');
    trie.children['C'].children['O'].children['D'] = new TrieNode('D');
    trie.children['C'].children['O'].children['D'].children['E'] = new TrieNode('E');
    trie.children['C'].children['O'].children['D'].children['E'].isWord = true;

    t.equals(trie.has('code'), true, 'Returns true');
    t.end();
});

test('has(): Given "code" when there is no path to the word "CODE"', (t) => {
    let trie = new TrieNode();

    t.equals(trie.has('code'), false, 'Returns false');
    t.end();
});

test('has(): Given "code" when there is a path to the word "CODE" and "E" node isWord prop is false', (t) => {
    let trie = new TrieNode();

    trie.children['C'] = new TrieNode('C');
    trie.children['C'].children['O'] = new TrieNode('O');
    trie.children['C'].children['O'].children['D'] = new TrieNode('D');
    trie.children['C'].children['O'].children['D'].children['E'] = new TrieNode('E');

    t.equals(trie.has('code'), false, 'Returns false');
    t.end();
});