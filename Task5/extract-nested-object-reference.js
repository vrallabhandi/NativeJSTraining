// return the nested property value if it exists,
// otherwise return undefined
Object.prototype.hash = function (inputString) {
    var nestedProperties = inputString.split('.');
    var index = 0;
    var result = this;
    for (var i = 0; i < nestedProperties.length; i++) {
        if (result[nestedProperties[i]]) {
            result = result[nestedProperties[i]];
        } else {
            result = undefined; // Setting undefined here as the test cases expect the reurn value to be undefined
            break;
        }
    }
    return result;
}