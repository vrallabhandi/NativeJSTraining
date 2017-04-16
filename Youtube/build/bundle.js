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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpHelper = __webpack_require__(2);

var Youtube = function () {
    function Youtube() {
        var _this = this;

        _classCallCheck(this, Youtube);

        this.renderSearchComponent();
        var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=neninthe';
        this.makeGetCall(url, null, function (response) {
            _this.loadCards(response.items);
        });
    }

    _createClass(Youtube, [{
        key: 'renderSearchComponent',
        value: function renderSearchComponent() {
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
    }, {
        key: 'renderCard',
        value: function renderCard(card) {
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
    }, {
        key: 'getFormattedDate',
        value: function getFormattedDate(date) {
            var dt = new Date(date);
            var month = dt.getMonth() + 1;
            var day = dt.getDate();
            var year = dt.getFullYear();
            return year + "-" + month + "-" + day;
        }
    }, {
        key: 'searchVideos',
        value: function searchVideos(evt) {
            var searchInputEl = document.querySelector('#searchText');
            var searchKey = searchInputEl.value;
            console.log(searchKey);
        }
    }, {
        key: 'loadCards',
        value: function loadCards(cardsData) {
            var _this2 = this;

            cardsData.forEach(function (eachCard) {
                // create an fragment and attach it later
                _this2.renderCard(eachCard);
            });
        }
    }, {
        key: 'makeGetCall',
        value: function makeGetCall(url, params, cb) {
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
    }, {
        key: 'param',
        value: function param(object) {
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

    return Youtube;
}();

exports.default = Youtube;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _youtube = __webpack_require__(0);

var _youtube2 = _interopRequireDefault(_youtube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yt = new _youtube2.default();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpHelper = exports.HttpHelper = function () {
    function HttpHelper() {
        _classCallCheck(this, HttpHelper);
    }

    _createClass(HttpHelper, [{
        key: 'makeGetCall',
        value: function makeGetCall(url, params) {
            var xhr = new XMLHttpRequest();
            url = url + '?' + param(params);
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    alert('User\'s name is ' + xhr.status);
                } else {
                    alert('Request failed.  Returned status of ' + xhr.status);
                }
            };
            xhr.send();
        }
    }, {
        key: 'param',
        value: function param(object) {
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map