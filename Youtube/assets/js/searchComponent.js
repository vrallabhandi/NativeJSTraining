import HttpHelper from './httpHelper';
import Youtube from './youtube'
import Utility from './utility';
import Pagination from './pagination';
import config from './config';

let httpHelper = new HttpHelper();
let yt = new Youtube();
let utility = new Utility();
let pagination = new Pagination();

class SearchComponent {
    constructor() { }

    renderSearchComponent() {
        let searchSection = document.createElement('div');
        searchSection.classList.add('search-section');

        let searchEl = document.createElement('input');
        searchEl.setAttribute('type', 'text');
        searchEl.setAttribute('id', 'searchText');

        let searchButton = document.createElement('input');
        searchButton.setAttribute('type', 'button');
        searchButton.setAttribute('value', 'Search');
        searchButton.addEventListener('click', this.searchVideos.bind(this));

        searchSection.appendChild(searchEl);
        searchSection.appendChild(searchButton);

        document.body.appendChild(searchSection);

        this.attachResizeHandler();
    }

    searchVideos(evt) {
        let searchInputEl,
            searchKey,
            searchUrl,
            params;
        searchInputEl = document.querySelector('#searchText');
        searchKey = searchInputEl.value;
        searchUrl = config.configKeys.youtubeAPI;
        params = {
            key: config.configKeys.apiKey,
            maxResults: config.configKeys.maxResults,
            part: config.configKeys.part,
            type: config.configKeys.type,
            q: searchKey
        };

        utility.resetTotalCards();

        httpHelper.makeGetCall(searchUrl, params).then((response) => {
            utility.setTotalCards(response.items);
            this.renderVideoCards();
        });
    }

    renderVideoCards() {
        yt.renderCards();
    }

    attachResizeHandler() {
        window.addEventListener('resize', (evt) => {
            let numberOfCardsToRender = utility.getNumberOfCardsToRender(),
                currentNumberOfCardsInPage = document.querySelectorAll('.video-card').length;

            if (currentNumberOfCardsInPage === 0) {
                return;
            }

            if (numberOfCardsToRender > currentNumberOfCardsInPage) {
                this.renderVideoCards();
            } else {
                if (numberOfCardsToRender < currentNumberOfCardsInPage) {
                    let searchResults = document.getElementById('search-results');
                    searchResults.removeChild(searchResults.lastChild);
                    pagination.renderPaginationControls();
                }
            }
        })
    }
}

export default SearchComponent;