// import React from 'react';
import {ajax, getEleTop, parseTime, getArticles, getScrollHeight} from '../utils';

// import ArticleTitle from './ArticleTitle';
// import ArticleText from './ArticleText';
import ArticleList from './_partial/ArticleList'

var Index = React.createClass({
    getInitialState() {
        return {
            archives: [],
            loaded: 0,
            end: false
        };
    },
    componentDidMount() {
        this.load('summary');
        window.addEventListener('scroll', this.handleScroll);
        // console.log(window.innerHeight, getScrollHeight());
    },
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
        let cur_scroll = document.body.scrollTop || document.documentElement.scrollTop,
            height = getScrollHeight(),
            active_height = window.innerHeight * 1.2;
        // console.log(height - cur_scroll, win_height + 100);
        if (height - cur_scroll < active_height) {
            this.load('summary', this.state.loaded);
        }
        if (this.state.end) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    },
    load(type, start=0, limit=10) {
        return getArticles(type, start, limit).then(data => {
            let end = false;
            if (!data[0]) {
                end = true;
                data = []
            }
            this.setState({
                archives: this.state.archives.concat(data),
                loaded: this.state.loaded + data.length,
                end: end
            });
        }, (data) => {
            return this.setState({
                archives: this.state.archives.concat({body: data.message})
            });
        }).then(() =>
            hljs && Array.prototype.forEach.call(document.querySelectorAll('pre code:not(.hljs)'), hljs.highlightBlock)
        ).catch(data => {
            console.log(data);
        });
    },
    render() {
        return (
            <div id="wrapper">
                <ArticleList>
                    {this.state.archives}
                </ArticleList>
                <article id="end-list" style={{'display': this.state.end ? 'block' : 'none'}}>
                    {this.state.end ? 'The End' : 'Loading....'}
                </article>
            </div>
        );
    }
});

export default Index;
