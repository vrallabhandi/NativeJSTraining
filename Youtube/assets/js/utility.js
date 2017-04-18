let instance = null;

class Utility {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
     }

    setTotalCards(totalCards) {
        this.totalCards = (this.totalCards || []).concat(totalCards);
    }

    getTotalCards() {
        return this.totalCards;
    }

    resetTotalCards() {
        this.totalCards = [];
        this.currentPage = null;
    }

    setCurrentPage(pageNumber) {
        this.pageNumber = parseInt(pageNumber);
    }

    getCurrentPage() {
        return this.pageNumber || 1;
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

    getStartIndexForPage() {
        var numberOfCards = this.getNumberOfCardsToRender();
        var currentPage = this.getCurrentPage();
        return (currentPage * numberOfCards) - numberOfCards
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