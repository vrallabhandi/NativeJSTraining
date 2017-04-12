// return a function that returns n
function always (n) {
  return function sameEverytime() {
    return n;
  }
}
