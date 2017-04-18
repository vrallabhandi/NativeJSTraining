import HttpHelper from './httpHelper';
import Youtube from './youtube'
import Config from './config';
import Utility from './utility';

var config = new Config();
var httpHelper = new HttpHelper();
var yt = new Youtube();
var utility = new Utility();

class SearchComponent {
    constructor() { }

    renderSearchComponent() {
        var searchSection = document.createElement('div');
        searchSection.classList.add('search-section');

        var searchEl = document.createElement('input');
        searchEl.setAttribute('type', 'text');
        searchEl.setAttribute('id', 'searchText');

        var searchButton = document.createElement('input');
        searchButton.setAttribute('type', 'button');
        searchButton.setAttribute('value', 'Search');
        searchButton.addEventListener('click', this.searchVideos.bind(this));

        searchSection.appendChild(searchEl);
        searchSection.appendChild(searchButton);

        document.body.appendChild(searchSection);
    }

    searchVideos(evt) {
        var searchInputEl = document.querySelector('#searchText');
        var searchKey = searchInputEl.value;
        var url = config.configKeys.youtubeAPI;
        var params = {
            key: config.configKeys.apiKey,
            maxResults: config.configKeys.maxResults,
            part: config.configKeys.part,
            type: config.configKeys.type,
            q: searchKey
        }

        this.clearSearchResults();

        httpHelper.makeGetCall(url, params, (response) => {
            utility.setTotalCards(response.items);
            this.renderVideoCards();
        });
    }

    renderVideoCards() {
        yt.renderCards();
    }

    clearSearchResults() {
        var allcardsEl = document.querySelector('#search-results');
        if (allcardsEl) {
            allcardsEl.parentElement.removeChild(allcardsEl);
        }
    }
}

export default SearchComponent;