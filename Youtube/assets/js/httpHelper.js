class HttpHelper {
    constructor() { }
    makeGetCall(url, params, cb, isAsync) {
        var xhr = new XMLHttpRequest();

        url = url + '?' + this.buildParams(params);

        xhr.open('GET', url, isAsync);
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

    buildParams(object) {
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

export default HttpHelper;