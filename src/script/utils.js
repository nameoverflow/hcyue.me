//require("babel/polyfill");
import "babel-core/polyfill";

export var ajax = {
    request(method, url, req_data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open(method, url, true);

            if (xhr.status >= 200 && xhr.status <= 400) {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject(data);
            }
            xhr.send(req_data);
        });
    },
    post(uri, req_data) {
        return this.request('POST', uri, JSON.stringify(req_data));
    },
    get(uri, search_data = {}) {
        let data_str = '';
        for (key in search_data) {
            data_str += key + '=' + data[key] + '&';
        }
        url = uri + '?' + data_str.slice(0, -1);

        return this.request('GET', url);
    }
};
