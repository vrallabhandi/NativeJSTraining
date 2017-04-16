var HttpHelper = require('./HttpHelper.js');
class Youtube {

    constructor() {
        this.renderSearchComponent();
        var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=neninthe';
        this.makeGetCall(url, null, (response) => {
            this.loadCards(response.items);
        });
    }

    renderSearchComponent() {
        var searchSection = document.createElement('div');

        var searchEl = document.createElement('input');
        searchEl.setAttribute('type', 'text');
        searchEl.setAttribute('id', 'searchText');

        var searchButton = document.createElement('input');
        searchButton.setAttribute('type', 'button');
        searchButton.setAttribute('value', 'Search');
        searchButton.addEventListener('click', this.searchVideos);

        searchSection.appendChild(searchEl);
        searchSection.appendChild(searchButton);

        document.body.appendChild(searchSection);
    }

    renderCard(card) {
        var t = document.querySelector('#videoCardTpl');
        var clone = document.importNode(t.content, true);

        var imgEl = clone.querySelector('img');
        imgEl.setAttribute('src', card.snippet.thumbnails.medium.url);

        var channelTitle = clone.querySelector('.channelTitle');
        channelTitle.appendChild(document.createTextNode(card.snippet.channelTitle));

        var publishedDate = clone.querySelector('.publishedDate');
        publishedDate.appendChild(document.createTextNode(this.getFormattedDate(card.snippet.publishedAt)));

        var description = clone.querySelector('.description');
        description.appendChild(document.createTextNode(card.snippet.description));

        document.body.appendChild(clone);
    }

    getFormattedDate(date) {
        var dt = new Date(date);
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        return year + "-" + month + "-" + day;
    }

    searchVideos(evt) {
        var searchInputEl = document.querySelector('#searchText');
        var searchKey = searchInputEl.value;
        console.log(searchKey);
    }

    loadCards(cardsData) {
        cardsData.forEach((eachCard) => {
            // create an fragment and attach it later
            this.renderCard(eachCard);
        })
    }

    makeGetCall(url, params, cb) {
        var xhr = new XMLHttpRequest();
        url = url + '?' + this.param(params);
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                cb(response);
            } else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }

    param(object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }
        return encodedString;
    }
}

export default Youtube;