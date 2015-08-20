// import React from 'react';
import {ajax, getEleTop} from '../utils';

import ArticleTitle from './ArticleTitle';
import ArticleText from './ArticleText';

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
            if (data.err) {
                let end_data = {
                        body: data.message
                    },
                    new_list = this.state.archives.concat([end_data]);
                this.setState({archives: new_list});
                return;
            }
            if (!data[0]) {
                let end_data = {
                        body: 'The End'
                    },
                    new_list = this.state.archives.concat([end_data]);
                this.setState({
                    end: true,
                    archives: new_list
                });
                return;
            }
            let new_list = this.state.archives.concat(data);
            this.setState({
                archives: new_list,
                num: this.state.num + limit
            });
        }).catch(data => {
            console.log(data);
        });
    },
    render() {
        return (
                <ul>
            {
                this.state.archives.map(item => 
            item.id ? (
                    <li>
                        <Link to="article" params={{id: item._id}}>
                            <ArticleTitle className="title-list"></ArticleTitle>
                        </Link>
                        <div className="article-date">
                            {item.createDate}
                        </div>

                        <ArticleText>{item.body}</ArticleText>
                    </li>
            ) : (
                    <li>
                        <ArticleText>{item.body}</ArticleText>
                    </li>
            )
                )
            }
                </ul>

        );
    }
});

export default ArticleList;
