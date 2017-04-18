import HttpHelper from './httpHelper';
import Pagination from './pagination';
import Config from './config';
import Utility from './utility';

var config = new Config();
var httpHelper = new HttpHelper();
var pagination = new Pagination();
var utility = new Utility();

class Youtube {

    constructor() { }

    renderCard(card, index) {
        var t = document.querySelector('#videoCardTpl');
        var clone = document.importNode(t.content, true);
        clone.querySelector('.video-card').setAttribute('id', 'video_' + index);

        var imgEl = clone.querySelector('img');
        imgEl.setAttribute('src', card.snippet.thumbnails.medium.url);

        var title = clone.querySelector('.title');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', config.configKeys.youtubeWatchLink + card.id.videoId);
        aTag.setAttribute('target', '_blank');
        aTag.appendChild(document.createTextNode(card.snippet.title));
        title.appendChild(aTag);

        var channelTitle = clone.querySelector('.channelTitle');
        channelTitle.appendChild(document.createTextNode(card.snippet.channelTitle));

        var publishedDate = clone.querySelector('.publishedDate');
        publishedDate.appendChild(document.createTextNode(utility.getFormattedDate(card.snippet.publishedAt)));

        var description = clone.querySelector('.description');
        description.appendChild(document.createTextNode(card.snippet.description));

        return clone;
    }

    renderCards() {
        var cardsData = utility.getTotalCards();
        var allCardsEl = document.createElement('div');
        var allCardsFragment = document.createDocumentFragment();
        var numberOfCards = utility.getNumberOfCardsToRender();
        var startIndex = utility.getStartIndexForPage();

        this.clearSearchResults();

        allCardsEl.setAttribute('id', 'search-results');
        allCardsEl.classList.add('search-results');
        
        for (let i=startIndex; i < (startIndex + numberOfCards); i++) {
            allCardsFragment.appendChild(this.renderCard(cardsData[i], i));
        }

        allCardsEl.appendChild(allCardsFragment);
        document.body.appendChild(allCardsEl);

        pagination.renderPaginationControls(cardsData);
        
        this.attachPageChangeListener();
    }

    clearSearchResults() {
        var allcardsEl = document.querySelector('#search-results');
        if (allcardsEl) {
            allcardsEl.parentElement.removeChild(allcardsEl);
        }
    }

    attachPageChangeListener() {
        var paginationControlsEl = document.querySelector('#pagination').firstElementChild;
        paginationControlsEl.addEventListener('click', (evt) => {
            if (evt.target.tagName === 'A') {
                utility.setCurrentPage(evt.target.text);
                this.renderCards();
                pagination.markCurrentPageActive();
            }
        });
    }
}

export default Youtube;