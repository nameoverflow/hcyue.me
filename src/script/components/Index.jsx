import React from 'react';
import {ajax, getEleTop, parseTime, getArticles, getScrollHeight} from '../utils';

import ArticleList from './_partial/ArticleList'
import Wrapper from './_partial/Wrapper'
import 'Article.sass'
let load_state = 0,
    cache = {};
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = cache.archives ? (cache.show = false, cache) : {
            archives: [],
            next: [],
            loaded: 0,
            show: false,
            end: false
        };
    }
    componentDidMount() {
        if (cache.archives) {
            return setTimeout(() => this.setState({show: true}), 0);
        }
        this.load('summary')
        .then(() => this.load('summary', this.state.loaded))
        .then(() => this.setState({show: true}));
    }
    load(type, start=0, limit=10) {
        return getArticles(type, start, limit).then(data => {
            this.setState({
                archives: this.state.archives.concat(this.state.next),
                next: data,
                loaded: this.state.loaded + data.length,
                end: !data[0]
            }, () => Object.assign(cache, this.state));
            load_state = 0;
        }, data => {
            this.setState({
                archives: this.state.archives.concat({body: data.message})
            }, () => Object.assign(cache, this.state));
        }).then(() =>
            hljs && [].map.call(
                document.querySelectorAll('pre code:not(.hljs)'),
                hljs.highlightBlock
            )
        ).catch(data => console.log(data));
    }
    render() {
        return (
            <Wrapper show={this.state.show}>
                <ArticleList>
                    {this.state.archives}
                </ArticleList>
                <article id="end-list"
                    onClick={
                        (e) => this.state.end ?
                            e.preventDefault() : this.load('summary', this.state.loaded)
                    }
                >
                    {this.state.end ? 'The End' : 'Click to Load More'}
                </article>
            </Wrapper>
        );
    }
}
