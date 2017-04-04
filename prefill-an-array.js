function prefill(n, v, arr) {
  if (isNaN(n) || !isFinite(n) || n<0 || parseInt(n) !== n) {
    throw new TypeError(n + " is invalid");
  }
  
  arr = arr || [];
  if (n > 0) {
    arr.push(v);
    return prefill(--n, v, arr);
  } else {
    return arr;
  }
}