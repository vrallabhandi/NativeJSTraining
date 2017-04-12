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
    var sum = this.reduce(add, 0);
    return sum;
}

Array.prototype.average = function () {
    var sum = this.sum();
    var average = sum / this.length;
    return average;
}

Array.prototype.even = function () {
    return this.filter(function (number) {
        var remainder = number % 2;
        return remainder === 0;
    });
}

Array.prototype.odd = function () {
    return this.filter(function (number) {
        var remainder = number % 2;
        return remainder === 1;
    });
}