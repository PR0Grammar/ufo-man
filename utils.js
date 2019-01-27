exports.removeSpaces = (str) => {
    return str.replace(/\s/g, '');
}

exports.isOnlyLetters = (str) => {
    return typeof str === 'string' && /^[A-Za-z]+$/.test(str);
}

exports.getRandomElem = (arr) => {
    if(!Array.isArray(arr))
        return null;
    return arr[Math.floor(Math.random() * arr.length)];
}