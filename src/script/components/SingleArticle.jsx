import React from 'react';
import {ajax} from '../utils';

import ArticleTitle from './ArticleTitle';

var ArticleSingle = React.createClass({
    getInitialState() {
        return {
            body: 'loading...'
        };
    },

    componentDidMount() {
        ajax.get('/api/article/get', {
            'id': this.props.params.post_id
        }).then(data => {
            if (data.error) {
                this.setState({body:data.error.message});
                return;
            }
            data = data[0];
            this.setState({
                title: data['title'];
                createDate: data['createDate'];
                body: data['body'];
                editDate: data['editDate']
        });
        })
    },

    render() {
        return (
            <article className="article-single">
                <ArticleTitle className="title-single">
                    {this.state.title || ''}
                </ArticleTitle>
                <div className="article-date">
                    {this.state.createDate || ''}
                </div>
                <AriticleText>{this.state.body}</AriticleText>
                <div className="edit-date">{this.state.editDate}</div>
            </article>
        );
    }
});

export default ArticleSingle;