import HttpHelper from './httpHelper';

let instance = null;
let httpHelper = new HttpHelper();
class Config {
    constructor() {
        if (!instance) {
            instance = this;
        }

        httpHelper.makeGetCall('./config.json', null, (response) => {
            this.configKeys = response;
        }, false);

        return instance;
    }
}

export default Config;