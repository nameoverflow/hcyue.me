import React from 'react';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';
import ArticleMeta from './_partial/ArticleMeta';
import Comment from './_partial/Comment';
import Wrapper from './_partial/Wrapper'

import {ajax, parseTime} from '../utils';
import 'Article.sass'

export default class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            body: '<p>loading...</p>'
        };
    }
    componentDidMount() {
        ajax.get('/api/article', {
            'id': this.props.params.id
        })
            .then(data => {
                if (!data) {
                    this.setState({body: 'id not found!'});
                    return;
                }
                this.setState(data);
            }, data => this.setState({body: data.message}))
            .then(() => {
                let el = document.getElementsByClassName('title-single')[0],
                    h = el.clientWidth;
                el.style.top = h + 10 + 'px';
                this.refs.articleView.style.minHeight = h + 20 + 'px';
            })
            .catch(e => console.log(e))
            .then(() => this.setState({show: true}));
    }
    render() {
        return (
            <Wrapper show={this.state.show}>
                <article className="SingleArticle typo" ref="articleView">
                    <ArticleTitle className="title-single">
                        {this.state.title || ''}
                    </ArticleTitle>
                    <ArticleText>{this.state.body}</ArticleText>
                    <ArticleMeta time={this.state.createDate} tags={this.state.tags} />
                </article>
                <article>
                    <Comment thread={window.location.pathname} url={window.location.toString()}/>
                </article>
            </Wrapper>
        );
    }
}
