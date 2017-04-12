var Cat = (function () {
    var sumOfWeights = 0;
    var noOfCats = 0;
    function Cat(name, weight) {
        if (!name || !weight) {
            throw new Error("name or weight values cannot be empty");
        }

        this.name = name
        noOfCats++;
        sumOfWeights += weight;

        Object.defineProperty(this, 'weight', {
            get: function () {
                return weight;
            },
            set: function (value) {
                sumOfWeights -= weight;
                sumOfWeights += value;
                weight = value;
            }
        });
    };

    Object.defineProperty(Cat, 'averageWeight', {
        get: function () {
            return function () {
                return sumOfWeights / noOfCats;
            }
        }
    });
    return Cat;
})();
