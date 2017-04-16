export class HttpHelper {
    constructor() { }
    makeGetCall(url, params) {
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