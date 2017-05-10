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

export default new Config();