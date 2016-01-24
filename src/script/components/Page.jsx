import React from 'react';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';
import ArticleMeta from './_partial/ArticleMeta';
import Wrapper from './_partial/Wrapper'

import {ajax, parseTime} from '../utils';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            body: '<p>loading...</p>'
        };
    }

    componentDidMount() {
        //this.setState({body: 'Loading....'});
        ajax.get('/api/article', {
            'title': this.props.params.title,
            'page': true
        }).then(data => {
            if (!data) {
                this.setState({body: 'Not found!'});
                return;
            }
            this.setState(data);
        }, data => {
            this.setState({body: data.message});
            return;
        }).then(() =>
            hljs && Array.prototype.forEach.call(
                document.querySelectorAll('pre code:not(.hljs)'),
                hljs.highlightBlock
            )
        ).then(() =>
            this.setState({show: true})
        ).catch(data => {
            console.log(data);
        });
    }
    render() {
        return (
            <Wrapper show={this.state.show}>
                <article className="Page typo">
                    <ArticleTitle>{this.props.params.title.toString().toUpperCase()}</ArticleTitle>
                    <ArticleText>{this.state.body}</ArticleText>
                </article>
            </Wrapper>
        );
    }
}
