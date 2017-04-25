import HttpHelper from './httpHelper';

let instance = null;
let httpHelper = new HttpHelper();
class Config {
    constructor() {
        if (!instance) {
            instance = this;
        }

        httpHelper.makeGetCall('./config.json', null)
            .then((response) => {
                this.configKeys = response;
            });

        return instance;
    }
}

new Config(); // You could export default instance and not check in consr=tructor whether instance has been already created.

export default Config;