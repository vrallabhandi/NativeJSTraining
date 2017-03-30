function getMiddle(s) {
    var startIndex = Math.ceil(s.length / 2 - 1),
        numberOfChars = s.length % 2 === 0 ? 2 : 1;
    return s.substr(startIndex, numberOfChars);
}