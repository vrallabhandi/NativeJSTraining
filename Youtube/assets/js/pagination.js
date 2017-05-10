import Utility from './utility';

let utility = new Utility();

class Pagination {
    constructor() { }
    renderPaginationControls() {
        let numberOfpages = this.calculateNumberOfPages();
        this.renderPageNumbers(numberOfpages);
    }

    renderPageNumbers(numberOfpages) {
        this.clearPaginationControls();
        let paginationEl = document.createElement('div');
        paginationEl.setAttribute('id', 'pagination');
        
        let paginationControlsEl = document.createElement('div');
        paginationControlsEl.classList.add('pagination-controls')
        
        let fragment = document.createDocumentFragment();
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
        let paginationEl = document.querySelector('#pagination');
        if (paginationEl) {
            paginationEl.parentElement.removeChild(paginationEl);
        }
    }

    calculateNumberOfPages() {
        let numberOfCardsInCurrentPage = utility.getNumberOfCardsToRender();
        let totalCards = utility.getTotalCards().length;
        let additionalPagesToAdd = totalCards % numberOfCardsInCurrentPage === 0 ? 0 : 1;
        let numberOfpages = Math.floor(totalCards / numberOfCardsInCurrentPage) + additionalPagesToAdd;
        return numberOfpages;
    }

    markCurrentPageActive() {
        let paginationEl = document.querySelector('#pagination').firstElementChild;
        let currentPage = utility.getCurrentPage();
        let aTag = paginationEl.querySelector('#page' + currentPage);

        if (!aTag) {
            currentPage = 1;
            utility.setCurrentPage(currentPage);
            aTag = paginationEl.querySelector('#page' + currentPage);
        }

        let previousActivePage = paginationEl.querySelector('.active');
        if (previousActivePage) {
            previousActivePage.classList.remove('active');
        }

        aTag.classList.add('active');
    }
}

export default Pagination;