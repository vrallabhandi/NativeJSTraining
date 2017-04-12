function construct(func) {
    var args = [].slice.call(arguments, 1, arguments.length);
    var responseObject = Object.create(func.prototype);
    func.apply(responseObject, args);
    return responseObject;
}