class HttpHelper {
    constructor() { }

    makeGetCall(url, params) {
        url = url + '?' + this.buildParams(params);
        var promise = new Promise((resolve, reject) => {
            fetch(url)
                .then(function (res) {
                    resolve(res.json());
                }, function (err) {
                    reject(err);
                });
        });
        return promise;
    }

    buildParams(object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) { // no need to check it because you iterate through object's properties.
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