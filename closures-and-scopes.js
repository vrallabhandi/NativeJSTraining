function createFunctions(n) {
  var callbacks = [];

  for (var i=0; i<n; i++) {
    callbacks.push(declaration(i));
  }
  
  function declaration(i) {
    return function () {
      return i;
    }
  }
  return callbacks;
}