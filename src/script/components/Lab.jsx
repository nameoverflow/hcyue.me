import React from 'react';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';
import ArticleMeta from './_partial/ArticleMeta';
import Wrapper from './_partial/Wrapper'

import {ajax, parseTime} from '../utils';
import 'Article.sass'

export default class Lab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '<p>Building...</p>'
        };
    }
    render() {
        return (
            <Wrapper show={true}>
                <article className="Page typo">
                    <ArticleTitle>Lab</ArticleTitle>
                    <ArticleText>{this.state.body}</ArticleText>
                </article>
            </Wrapper>
        );
    }
}
