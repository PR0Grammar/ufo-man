exports.removeSpaces = (str) => {
    return str.replace(/\s/g, '');
}

exports.isOnlyLetters = (str) => {
    return /^[A-Za-z]+$/.test(str);
}