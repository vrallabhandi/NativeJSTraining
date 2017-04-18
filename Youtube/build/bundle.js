/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpHelper = __webpack_require__(5);

var _httpHelper2 = _interopRequireDefault(_httpHelper);

var _pagination = __webpack_require__(7);

var _pagination2 = _interopRequireDefault(_pagination);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _utility = __webpack_require__(8);

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = new _config2.default();
var httpHelper = new _httpHelper2.default();
var pagination = new _pagination2.default();
var utility = new _utility2.default();

var Youtube = function () {
    function Youtube() {
        _classCallCheck(this, Youtube);
    }

    _createClass(Youtube, [{
        key: 'renderCard',
        value: function renderCard(card, index) {
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
    }, {
        key: 'renderCards',
        value: function renderCards() {
            var cardsData = utility.getTotalCards();
            var allCardsEl = document.createElement('div');
            var allCardsFragment = document.createDocumentFragment();
            var numberOfCards = utility.getNumberOfCardsToRender();
            var startIndex = utility.getStartIndexForPage();

            this.clearSearchResults();

            allCardsEl.setAttribute('id', 'search-results');
            allCardsEl.classList.add('search-results');

            for (var i = startIndex; i < startIndex + numberOfCards; i++) {
                if (cardsData[i]) {
                    allCardsFragment.appendChild(this.renderCard(cardsData[i], i));
                } else {
                    // get next page of records
                }
            }

            allCardsEl.appendChild(allCardsFragment);
            document.body.appendChild(allCardsEl);

            pagination.renderPaginationControls(cardsData);

            this.attachPageChangeListener();
        }
    }, {
        key: 'clearSearchResults',
        value: function clearSearchResults() {
            var allcardsEl = document.querySelector('#search-results');
            if (allcardsEl) {
                allcardsEl.parentElement.removeChild(allcardsEl);
            }
        }
    }, {
        key: 'attachPageChangeListener',
        value: function attachPageChangeListener() {
            var _this = this;

            var paginationControlsEl = document.querySelector('#pagination').firstElementChild;
            paginationControlsEl.addEventListener('click', function (evt) {
                if (evt.target.tagName === 'A') {
                    utility.setCurrentPage(evt.target.text);
                    _this.renderCards();
                    pagination.markCurrentPageActive();
                }
            });
        }
    }]);

    return Youtube;
}();

exports.default = Youtube;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _youtube = __webpack_require__(0);

var _youtube2 = _interopRequireDefault(_youtube);

var _searchComponent = __webpack_require__(6);

var _searchComponent2 = _interopRequireDefault(_searchComponent);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = new _config2.default();
var yt = new _youtube2.default();
var sc = new _searchComponent2.default();

sc.renderSearchComponent();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _httpHelper = __webpack_require__(5);

var _httpHelper2 = _interopRequireDefault(_httpHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;
var httpHelper = new _httpHelper2.default();

var Config = function Config() {
    var _this = this;

    _classCallCheck(this, Config);

    if (!instance) {
        instance = this;
    }

    httpHelper.makeGetCall('./config.json', null).then(function (response) {
        _this.configKeys = response;
    });

    return instance;
};

new Config();

exports.default = Config;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpHelper = function () {
    function HttpHelper() {
        _classCallCheck(this, HttpHelper);
    }

    _createClass(HttpHelper, [{
        key: 'makeGetCall',
        value: function makeGetCall(url, params) {
            url = url + '?' + this.buildParams(params);
            var promise = new Promise(function (resolve, reject) {
                fetch(url).then(function (res) {
                    resolve(res.json());
                }, function (err) {
                    reject(err);
                });
            });
            return promise;
        }
    }, {
        key: 'buildParams',
        value: function buildParams(object) {
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
    }]);

    return HttpHelper;
}();

exports.default = HttpHelper;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _httpHelper = __webpack_require__(5);

var _httpHelper2 = _interopRequireDefault(_httpHelper);

var _youtube = __webpack_require__(0);

var _youtube2 = _interopRequireDefault(_youtube);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _utility = __webpack_require__(8);

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = new _config2.default();
var httpHelper = new _httpHelper2.default();
var yt = new _youtube2.default();
var utility = new _utility2.default();

var SearchComponent = function () {
    function SearchComponent() {
        _classCallCheck(this, SearchComponent);
    }

    _createClass(SearchComponent, [{
        key: 'renderSearchComponent',
        value: function renderSearchComponent() {
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

            this.attachResizeHandler();
        }
    }, {
        key: 'searchVideos',
        value: function searchVideos(evt) {
            var _this = this;

            var searchInputEl = document.querySelector('#searchText');
            var searchKey = searchInputEl.value;
            var url = config.configKeys.youtubeAPI;
            var params = {
                key: config.configKeys.apiKey,
                maxResults: config.configKeys.maxResults,
                part: config.configKeys.part,
                type: config.configKeys.type,
                q: searchKey
            };
            utility.resetTotalCards();

            httpHelper.makeGetCall(url, params).then(function (response) {
                utility.setTotalCards(response.items);
                _this.renderVideoCards();
            });
        }
    }, {
        key: 'renderVideoCards',
        value: function renderVideoCards() {
            yt.renderCards();
        }
    }, {
        key: 'attachResizeHandler',
        value: function attachResizeHandler() {
            var _this2 = this;

            window.addEventListener('resize', function (evt) {
                _this2.renderVideoCards();
            });
        }
    }]);

    return SearchComponent;
}();

exports.default = SearchComponent;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(8);

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utility = new _utility2.default();

var Pagination = function () {
    function Pagination() {
        _classCallCheck(this, Pagination);
    }

    _createClass(Pagination, [{
        key: 'renderPaginationControls',
        value: function renderPaginationControls() {
            var numberOfpages = this.calculateNumberOfPages();
            this.renderPageNumbers(numberOfpages);
        }
    }, {
        key: 'renderPageNumbers',
        value: function renderPageNumbers(numberOfpages) {
            this.clearPaginationControls();
            var paginationEl = document.createElement('div');
            paginationEl.setAttribute('id', 'pagination');

            var paginationControlsEl = document.createElement('div');
            paginationControlsEl.classList.add('pagination-controls');

            var fragment = document.createDocumentFragment();
            for (var i = 0; i < numberOfpages; i++) {
                var aTag = document.createElement('a');
                aTag.appendChild(document.createTextNode(i + 1));
                aTag.setAttribute('id', 'page' + (i + 1));
                aTag.setAttribute('href', '#');
                fragment.appendChild(aTag);
            }
            paginationControlsEl.appendChild(fragment);
            paginationEl.appendChild(paginationControlsEl);
            document.body.appendChild(paginationEl);
            this.markCurrentPageActive();
        }
    }, {
        key: 'clearPaginationControls',
        value: function clearPaginationControls() {
            var paginationEl = document.querySelector('#pagination');
            if (paginationEl) {
                paginationEl.parentElement.removeChild(paginationEl);
            }
        }
    }, {
        key: 'calculateNumberOfPages',
        value: function calculateNumberOfPages() {
            var numberOfCardsInCurrentPage = utility.getNumberOfCardsToRender();
            var totalCards = utility.getTotalCards().length;
            var additionalPagesToAdd = totalCards % numberOfCardsInCurrentPage === 0 ? 0 : 1;
            var numberOfpages = Math.floor(totalCards / numberOfCardsInCurrentPage) + additionalPagesToAdd;
            return numberOfpages;
        }
    }, {
        key: 'markCurrentPageActive',
        value: function markCurrentPageActive() {
            var paginationEl = document.querySelector('#pagination').firstElementChild;
            var currentPage = utility.getCurrentPage();
            var aTag = paginationEl.querySelector('#page' + currentPage);

            var previousActivePage = paginationEl.querySelector('.active');
            if (previousActivePage) {
                previousActivePage.classList.remove('active');
            }

            aTag.classList.add('active');
        }
    }]);

    return Pagination;
}();

exports.default = Pagination;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var Utility = function () {
    function Utility() {
        _classCallCheck(this, Utility);

        if (!instance) {
            instance = this;
        }
        return instance;
    }

    _createClass(Utility, [{
        key: "setTotalCards",
        value: function setTotalCards(totalCards) {
            this.totalCards = (this.totalCards || []).concat(totalCards);
        }
    }, {
        key: "getTotalCards",
        value: function getTotalCards() {
            return this.totalCards;
        }
    }, {
        key: "resetTotalCards",
        value: function resetTotalCards() {
            this.totalCards = [];
            this.currentPage = null;
        }
    }, {
        key: "setCurrentPage",
        value: function setCurrentPage(pageNumber) {
            this.pageNumber = parseInt(pageNumber);
        }
    }, {
        key: "getCurrentPage",
        value: function getCurrentPage() {
            return this.pageNumber || 1;
        }
    }, {
        key: "getNumberOfCardsToRender",
        value: function getNumberOfCardsToRender() {
            var windowWidth = window.innerWidth;
            var numberOfCards = 1;
            var eachCardWidth = 380;
            while (numberOfCards * eachCardWidth < windowWidth) {
                numberOfCards++;
            }
            return numberOfCards - 1;
        }
    }, {
        key: "getStartIndexForPage",
        value: function getStartIndexForPage() {
            var numberOfCards = this.getNumberOfCardsToRender();
            var currentPage = this.getCurrentPage();
            return currentPage * numberOfCards - numberOfCards;
        }
    }, {
        key: "getFormattedDate",
        value: function getFormattedDate(date) {
            var dt = new Date(date);
            var month = dt.getMonth() + 1;
            var day = dt.getDate();
            var year = dt.getFullYear();
            return year + "-" + month + "-" + day;
        }
    }]);

    return Utility;
}();

exports.default = Utility;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map