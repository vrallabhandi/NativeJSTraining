function isSantaClausable(obj) {
    if (obj.sayHoHoHo && typeof obj.sayHoHoHo === 'function'
        && obj.distributeGifts && typeof obj.distributeGifts === 'function'
        && obj.goDownTheChimney && typeof obj.goDownTheChimney === 'function') {
        return true;
    } else {
        return false;
    }
}