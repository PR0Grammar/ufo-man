const utils = require('./utils');

function TrieNode(char){
    if((!utils.isOnlyLetters(char) || char.length !== 1) && char !== undefined)
        throw new Error('TrieNode root must be a single letter.');

    this.root = char === undefined ? '*' : char.toUpperCase();
    this.children = {};
    this.isWord = false;
}

TrieNode.prototype.insertWord = function(word){
    if(!utils.isOnlyLetters(word))
        throw new Error('Word must only contain letters with at least one letter.');
    
    word = word.toUpperCase();
    let i = 0;
    let currNode = this;

    while(i < word.length){
        if(currNode.children[word[i]] === undefined)
            currNode.children[word[i]] = new TrieNode(word[i]);
        currNode = currNode.children[word[i]];
        i++;
    }
    currNode.isWord = true;
}

TrieNode.prototype.insertMany = function(words){
    if(!Array.isArray(words))
        throw new Error('Must provide an array of words.');
    
    words.forEach(word => this.insertWord(word));
}

TrieNode.prototype.removeWord = function(word){
    if(!utils.isOnlyLetters(word))
        return;
    
    word = word.toUpperCase();
    let i = 0;
    let currNode = this;

    while(i < word.length){
        if(currNode.children[word[i]] === undefined)
            return;
        currNode = currNode.children[word[i]];
        i++;
    }
    currNode.isWord = false;
}

TrieNode.prototype.has = function(word){
    if(!utils.isOnlyLetters(word))
        return false;

    word = word.toUpperCase();
    let i = 0;
    let currNode = this;

    while(i < word.length){
        if(currNode.children[word[i]] === undefined)
            return false;
        currNode = currNode.children[word[i]];
        i++;
    }
    return currNode.isWord;
}

module.exports = TrieNode;