function add(firstInput) {
    var result = firstInput;
    function sum(nextInput) {
        result += nextInput;
        return sum;
    }

    sum.valueOf = function () {
        return result;
    }

    return sum;
}