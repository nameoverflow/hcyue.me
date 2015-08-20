// import React from 'react';
import {ajax, getEleTop} from '../utils';

import ArticleTitle from './ArticleTitle';

var Link = ReactRouter.Link

var ArticleList = React.createClass({
    getInitialState() {
        return {
            archives: [],
            num: 0,
            end: false
        };
    },
    componentDidMount() {
        this.loadArchives();
        window.addEventListener('scroll', this.scrollHandler);
    },
    scrollHandler() {
        let cur_scroll = document.body.scrollTop || document.documentElement.scrollTop,
            height = document.body.offsetHeight,
            win_height = window.innerHeight;
        if (win_height - cur_scroll < win_height + 100) {
            this.loadArchives(num);
        }
        if (this.state.end) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    },
    loadArchives(start=0, limit=10) {
        ajax.get('/api/article/get', {
            'start': start,
            'limit': limit,
            'type': 'summary'
        }).then(data => {
            if (!data[0]) {
                this.setState({
                    end: true
                })
                return;
            }
            this.setState({
                archives: this.state.archives.concat(data),
                num: this.state.num + limit
            });
        }).catch(data => {
            this.setState({body: data[0] && data[0].message});
        });
    },
    render() {
        return (
            <main className="archives">
                <ul>
            {
                this.state.archives.map(item => 
                    <li>
                        <Link to="article" params={{id: item._id}}>
                            <ArticleTitle className="title-list"></ArticleTitle>
                        </Link>
                        <div className="article-date">
                            {item.createDate}
                        </div>
                        <AriticleText>{item.body}</AriticleText>
                    </li>
                )
            }
                </ul>

            </main>
        );
    }
});

export default ArticleList;
