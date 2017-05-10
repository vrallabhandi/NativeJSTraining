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
        let windowWidth = window.innerWidth;
        let numberOfCards = 1;
        let eachCardWidth = 380;
        while (numberOfCards * eachCardWidth < windowWidth) {
            numberOfCards++;
        }
        return numberOfCards > 1 ? numberOfCards - 1 : 1;
    }

    getStartIndexForPage() {
        let numberOfCards = this.getNumberOfCardsToRender();
        let currentPage = this.getCurrentPage();
        return (currentPage * numberOfCards) - numberOfCards
    }

    getFormattedDate(date) {
        let dt = new Date(date);
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        let year = dt.getFullYear();
        return year + "-" + month + "-" + day;
    }
}

export default Utility;