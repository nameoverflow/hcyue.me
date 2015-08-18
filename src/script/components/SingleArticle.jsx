import React from 'react';
import {ajax} from '../utils';

import ArticleTitle from './ArticleTitle';

var ArticleSingle = React.createClass({
    getInitialState() {
        return {
            article: {
                body: 'loading...'
            }
        };
    },

    componentDidMount() {
        ajax.get('/api/article/get', {
            'id': this.props.params.post_id
        }).then(data => {
            if (data.error) {
                this.state.article.bady = data.error.message;
                return;
            }
            /*
            this.state.title = data['title'];
            this.state.create_date = data['createDate'];
            this.state.body = data['body'];
            this.state.edit_date = data['editDate'];
            */
           this.state.article = data;
        })
    },

    render() {
        return (
            <article className="article-single">
                <ArticleTitle className="title-single">
                    {this.state.article.title || ''}
                </ArticleTitle>
                <div className="article-date">
                    {this.state.article.createDate || ''}
                </div>
                <AriticleText>{this.state.article.body}</AriticleText>
                <div className="edit-date">{this.state.article.editDate}</div>
            </article>
        );
    }
});

export default ArticleSingle;