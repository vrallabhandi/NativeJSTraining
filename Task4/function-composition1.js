function compose() {
    var functionsPassed = arguments;
    return function (input) {
        var result = input;
        for (var index in functionsPassed) {
            if (functionsPassed.hasOwnProperty(index)) {
                var positionOfFunction = (functionsPassed.length - 1) - index;
                result = functionsPassed[positionOfFunction](result);
            }
        }
        return result;
    }
}