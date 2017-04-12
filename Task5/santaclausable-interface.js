function isSantaClausable(obj) {
    var result = false;
    if (obj.sayHoHoHo && typeof obj.sayHoHoHo === 'function'
        && obj.distributeGifts && typeof obj.distributeGifts === 'function'
        && obj.goDownTheChimney && typeof obj.goDownTheChimney === 'function') {
        result = true;
    }
    return result;
}