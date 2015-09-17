import {ajax, getEleTop} from './utils';
window.loader = (function () {

    let getList = function (elem, start, limit) {
        ajax.get('/api/article', {
            'start': start,
            'limit': limit,
            'type': 'title'
        }).then(data => {
            let list_str = ``;

            for (let i = 0; i < data.length; i++) {
                let ref = data[i];
                list_str += `
                    <li>
                        <h3>
                            <a href="/admin/edit/${ref._id}">
                                ${ref.title}
                            </a>
                        </h3>
                        <span>
                            <a href="/api/article/del?id=${ref._id}">
                                Delete
                            </a>
                        </span>
                    </li>
                `;
            }
            elem.innerHTML += list_str;
        });
    };
    return (function (get, elem, limit) {
        let num = 0;
        return () => {
            get(elem, num, limit);
            num += limit;
        }
    })(getList, document.getElementById('article-list'), 30);
})();

window.commit = (function () {
    return (elem) => {
        //ajax.
    }
})();
