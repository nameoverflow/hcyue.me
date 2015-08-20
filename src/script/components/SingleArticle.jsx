// import React from 'react';
import {ajax} from '../utils';

import ArticleTitle from './ArticleTitle';
import ArticleText from './ArticleText';

var SingleArticle = React.createClass({
    getInitialState() {
        return {
            body: '<p>loading...</p>'
        };
    },

    componentDidMount() {
        ajax.get('/api/article/get', {
            'id': this.props.params.post_id
        }).then(data => {
            if (data.err) {
                this.setState({body: data.message});
                return;
            }
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
            console.log(data);
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
                <ArticleText>{this.state.body}</ArticleText>
                <div className="edit-date">{this.state.editDate}</div>
            </article>
        );
    }
});

export default SingleArticle;