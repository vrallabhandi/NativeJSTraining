// return the nested property value if it exists,
// otherwise return undefined
Object.prototype.hash = function (inputString) {
    var nestedProperties = inputString.split('.'),
        result = this,
        propsLength = nestedProperties.length;

    for (var i = 0; i < propsLength; i++) {
        if (result[nestedProperties[i]]) {
            result = result[nestedProperties[i]];
        } else {
            result = undefined; // Setting undefined here as the test cases expect the reurn value to be undefined
            break;
        }
    }
    return result;
}