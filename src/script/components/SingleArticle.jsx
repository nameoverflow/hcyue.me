// import React from 'react';
import {ajax, parseTime} from '../utils';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';
import ArticleMeta from './_partial/ArticleMeta';

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
            this.setState(data);
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
            <div id="wrapper">
                <article className="SingleArticle typo" style={{'minHeight': this.state.mh}}>
                    <ArticleTitle className="title-single">
                        {this.state.title || ''}
                    </ArticleTitle>
                    <ArticleText>{this.state.body}</ArticleText>
                    <ArticleMeta time={this.state.createDate} tags={this.state.tags} />
                </article>
            </div>
        );
    }
});

export default SingleArticle;
