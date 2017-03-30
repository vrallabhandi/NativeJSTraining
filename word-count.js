function countWords(str) {
    str = str.trim();
    if (str.length === 0) {
        return 0;
    }
    return str.split(/\s+/).length;
}