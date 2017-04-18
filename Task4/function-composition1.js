function compose() {
    var functionsPassed = arguments;
    return function (input) {
        var result = input;
        for (var i = functionsPassed.length-1; i>=0; i--) {
            if (functionsPassed.hasOwnProperty(i)) {
                result = functionsPassed[i](result);
            }
        }
        return result;
    }
}