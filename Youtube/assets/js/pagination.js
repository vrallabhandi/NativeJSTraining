import Utility from './utility';

var utility = new Utility();

class Pagination {
    constructor() { }
    renderPaginationControls() {
        var numberOfpages = this.calculateNumberOfPages();
        this.renderPageNumbers(numberOfpages);
    }

    renderPageNumbers(numberOfpages) {
        this.clearPaginationControls();
        var paginationEl = document.createElement('div');
        paginationEl.setAttribute('id', 'pagination');
        
        var paginationControlsEl = document.createElement('div');
        paginationControlsEl.classList.add('pagination-controls')
        
        var fragment = document.createDocumentFragment();
        for(let i=0; i<numberOfpages; i++) {
            let aTag = document.createElement('a');
            aTag.appendChild(document.createTextNode(i+1));
            aTag.setAttribute('id', 'page' + (i+1));
            aTag.setAttribute('href', '#');
            fragment.appendChild(aTag);
        }
        paginationControlsEl.appendChild(fragment);
        paginationEl.appendChild(paginationControlsEl);
        document.body.appendChild(paginationEl);
        this.markCurrentPageActive();
    }

    clearPaginationControls() {
        var paginationEl = document.querySelector('#pagination');
        if (paginationEl) {
            paginationEl.parentElement.removeChild(paginationEl);
        }
    }

    calculateNumberOfPages() {
        var numberOfCardsInCurrentPage = utility.getNumberOfCardsToRender();
        var totalCards = utility.getTotalCards().length;
        var additionalPagesToAdd = totalCards % numberOfCardsInCurrentPage === 0 ? 0 : 1;
        var numberOfpages = Math.floor(totalCards / numberOfCardsInCurrentPage) + additionalPagesToAdd;
        return numberOfpages;
    }

    markCurrentPageActive() {
        var paginationEl = document.querySelector('#pagination').firstElementChild;
        var currentPage = utility.getCurrentPage();
        var aTag = paginationEl.querySelector('#page' + currentPage);

        if (!aTag) {
            currentPage = 1;
            utility.setCurrentPage(currentPage);
            aTag = paginationEl.querySelector('#page' + currentPage);
        }

        var previousActivePage = paginationEl.querySelector('.active');
        if (previousActivePage) {
            previousActivePage.classList.remove('active');
        }

        aTag.classList.add('active');
    }
}

export default Pagination;