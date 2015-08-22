//require("babel/polyfill");
import "babel-core/polyfill";

export var ajax = {
    request(method, url, req_data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open(method, url, true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status <= 400) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    let data = JSON.parse(xhr.responseText);
                    reject(data);
                }
            }
            xhr.send(req_data);
        });
    },
    /*
    get(uri, search_data = {}) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest(),
                data_str = '';
            for (let key in search_data) {
                data_str += key + '=' + search_data[key] + '&';
            }
            let url = uri + '?' + data_str.slice(0, -1);

            xhr.open('GET', url, true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status <= 400) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    let data = JSON.parse(xhr.responseText);
                    reject(data);
                }
            }
            xhr.send();
        });
    },*/
    post(uri, req_data) {
        return this.request('POST', uri, JSON.stringify(req_data));
    },
    get(uri, search_data = {}) {
        let data_str = '';
        for (let key in search_data) {
            data_str += key + '=' + search_data[key] + '&';
        }
        let url = uri + '?' + data_str.slice(0, -1);

        return this.request('GET', url);
    }
};

export var getEleTop = function (elem) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null){
    　　actualTop += current.offsetTop;
    　　current = current.offsetParent;
    }
    return actualTop;
}

export var parseTime = str => {
    str = str.split('T');
    return [str[0], str[1].split('.')[0]];
}
