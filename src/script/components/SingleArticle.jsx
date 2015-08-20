// import React from 'react';
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
            data = data[0];
            if (!data) {
                this.setState({body: 'id not found!'});
            }
            this.setState({
                title: data['title'],
                createDate: data['createDate'],
                body: data['body'],
                editDate: data['editDate']
            });
        }).catch(data => {
            this.setState({body: data[0].message});
        });
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