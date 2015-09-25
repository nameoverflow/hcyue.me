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

export var parseTime = (str) => {
    str = str.split('T');
    return [str[0], str[1].split('.')[0]];
}

export var verticalTitle = (elem) => {
    let str = elem.innerHTML,
        e_arr = str.match(/(\w\s?)+/g),
        arr = [str],
        e_w;
    for (let i = 0; i < e_arr.length; i++) {
        arr.concat(arr.pop().split(e_arr[i]));
    }
    str = '';
    for (let i = 0; i < e_arr.length; i++) {
        str += arr[i]
            + '<span style="transform:rotate(90deg)">'
            + e_arr[i]
            + '</span>';
    }
    str += arr[e_arr.length];
    elem.innerHTML = str;
}

export var getArticles = function (type, start=0, limit=10) {
    return ajax.get('/api/article', {
        'start': start,
        'limit': limit,
        'type': type
    });
};

export var getScrollHeight = function () {
　　let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}

export var heightTrans = function(elem, time) { // time, 数值，可缺省
    if (typeof window.getComputedStyle == "undefined") return;

    let height = window.getComputedStyle(elem).height;

    //elem.style.transition = "none";    // 本行2015-05-20新增，mac Safari下，貌似auto也会触发transition, 故要none下~

    elem.style.height = "auto";
    let targetHeight = window.getComputedStyle(elem).height;
    elem.style.height = height;
    setTimeout(() => {
        if (time) elem.style.transition = "height "+ time +"ms ease-in-out";
        elem.style.height = targetHeight;
    }, 5);
};
