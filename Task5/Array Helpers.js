Array.prototype.square = function () {
    return this.map(function (number) {
        return number * number;
    });
}

Array.prototype.cube = function () {
    return this.map(function (number) {
        return number * number * number;
    });
}

Array.prototype.sum = function () {
    function add(a, b) {
        return a + b;
    }
    return this.reduce(add, 0);
}

Array.prototype.average = function () {
    return this.sum() / this.length;
}

Array.prototype.even = function () {
    return this.filter(function (number) {
        return (number % 2) === 0;
    });
}

Array.prototype.odd = function () {
    return this.filter(function (number) {
        return (number % 2) === 1;
    });
}