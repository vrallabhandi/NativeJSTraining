class HttpHelper {
    constructor() { }

    makeGetCall(url, params) {
        url = url + '?' + this.buildParams(params);
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(function (res) {
                    resolve(res.json());
                }, function (err) {
                    reject(err);
                });
        });
    }

    buildParams(object) {
        let encodedString = '';
        for (let prop in object) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
        return encodedString;
    }
}

export default HttpHelper;