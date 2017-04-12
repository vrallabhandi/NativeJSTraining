function cache(func) {
    var cachedResult = {};
    return function () {
        var key = JSON.stringify(arguments);
        if (!cachedResult.hasOwnProperty(key)) {
            cachedResult[key] = func.apply(this, arguments);
        }
        return cachedResult[key];
    };
}