import Utility from './utility';
import Youtube from './youtube';

var utility = new Utility();
var yt = new Youtube();

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
            aTag.setAttribute('href', '#');
            fragment.appendChild(aTag);
        }
        paginationControlsEl.appendChild(fragment);
        paginationEl.appendChild(paginationControlsEl);
        document.body.appendChild(paginationEl);

        paginationControlsEl.addEventListener('click', function (evt) {
            if (evt.target.tagName === 'A') {
                utility.setCurrentPage(evt.target.text);
                yt.renderCards();
            }
        });
    }

    getCardsInViewPort(allCardEls) {
        allCardEls = Array.prototype.slice.call(allCardEls, 0, allCardEls.length);
        return allCardEls.filter((card) => {
            return this.isInViewport(card);
        });
    }

    isInViewport(element) {
        var rect = element.getBoundingClientRect();
        var html = document.documentElement;
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
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
        var numberOfpages = (totalCards / numberOfCardsInCurrentPage) + additionalPagesToAdd;
        return numberOfpages;
    }
}

export default Pagination;