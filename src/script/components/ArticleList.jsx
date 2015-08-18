import React from 'react';
import {ajax} from '../utils';

import ArticleTitle from './ArticleTitle';

var Archive = React.createClass({
    getInitialState() {
        return {
            archives: [],
            num: 0,
            end: false
        };
    },
    componentDidMount() {

    },
    loadArchives(start=0, limit=10) {
        ajax.get('/api/article/get', {
            'start': start,
            'limit': limit,
            'type': 'summary'
        }).then(data => {
            if (data.error) {
                
            }
        })
    },
    render() {
        return (
            <main className="archives">
        {
            this.state.archives.map(item => {
                <ArticleTitle className="title-list"></ArticleTitle>
                <div className="article-date">
                    {item.create_date}
                </div>
                <AriticleText>{item.body}</AriticleText>
            });
        }

            </main>
        );
    }
});
