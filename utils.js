exports.removeSpaces = (str) => {
    return str.replace(/\s/g, '');
}

exports.isOnlyLetters = (str) => {
    return typeof str === 'string' && /^[A-Za-z]+$/.test(str);
}