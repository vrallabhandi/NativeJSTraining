let instance = null;

class Utility {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
     }

    setTotalCards(totalCards) {
        this.totalCards = totalCards;
    }

    getTotalCards() {
        return this.totalCards;
    }

    setCurrentPage(pageNumber) {
        this.pageNumber = pageNumber;
    }

    getCurrentPage() {
        return this.pageNumber;
    }

    getNumberOfCardsToRender() {
        var windowWidth = window.innerWidth;
        var numberOfCards = 1;
        var eachCardWidth = 380;
        while (numberOfCards * eachCardWidth < windowWidth) {
            numberOfCards++;
        }
        return numberOfCards - 1;
    }

    getFormattedDate(date) {
        var dt = new Date(date);
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        return year + "-" + month + "-" + day;
    }
}

export default Utility;