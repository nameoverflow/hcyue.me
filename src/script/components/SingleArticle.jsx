// import React from 'react';
import {ajax, parseTime} from '../utils';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';

var SingleArticle = React.createClass({
    getInitialState() {
        return {
            body: '<p>loading...</p>'
        };
    },

    componentWillMount() {
        ajax.get('/api/article', {
            'id': this.props.params.id
        }).then(data => {
            if (!data) {
                return this.setState({body: 'id not found!'});
            }
            this.setState({
                title: data['title'],
                createDate: data['createDate'],
                body: data['body'],
                editDate: data['editDate']
            });
        }, data => {
            return this.setState({body: data.message});
        }).then(() => {
            let el = document.getElementsByClassName('title-single')[0],
                h = el.clientWidth;
            el.style.top = h + 10 + 'px';
            this.setState({
                mh: h + 20 + 'px'
            })
        }).catch(data => {
            console.log(data);
        });
    },
    render() {
        return (
            <article className="SingleArticle typo" style={{'min-height': this.state.mh}}>
                <ArticleTitle className="title-single">
                    {this.state.title || ''}
                </ArticleTitle>
                <ArticleText>{this.state.body}</ArticleText>
                <div className="article-meta">
                    <p>
                        Posted at {this.state.createDate && parseTime(this.state.createDate)[0] + ' ' + parseTime(this.state.createDate)[1] || ''}
                    </p>
                    <p style={this.state.createDate === this.state.editDate ? {display: 'none'} : {}}>
                        Edited at {this.state.editDate && parseTime(this.state.editDate)[0] + ' ' + parseTime(this.state.editDate)[1]}
                    </p>
                </div>
            </article>
        );
    }
});

export default SingleArticle;
