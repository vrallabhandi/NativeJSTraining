// partition the items array so that all values for which pred returns true are
// at the end, returning the index of the first true value
function partitionOn(pred, items) {
    var falseValues = [],
        trueValues = [];

    items.forEach(function (item) {
        if (pred(item)) {
            trueValues.push(item);
        } else {
            falseValues.push(item);
        }
    });

    items.splice(0, items.length);
    falseValues.concat(trueValues).forEach(function (item) {
        items.push(item);
    });
    
    return falseValues.length;
}
