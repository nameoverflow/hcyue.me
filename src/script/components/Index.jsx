// import React from 'react';
import {ajax, getEleTop, parseTime, getArticles, getScrollHeight} from '../utils';

// import ArticleTitle from './ArticleTitle';
// import ArticleText from './ArticleText';
import ArticleList from './_partial/ArticleList'
import Wrapper from './_partial/Wrapper'

let load_state = 0;
var Index = React.createClass({
    getInitialState() {
        return {
            archives: [],
            loaded: 0,
            show: false,
            end: false
        };
    },
    componentDidMount() {
        this.load('summary')
        .then(() =>
            this.setState({show: true})
        );
        window.addEventListener('scroll', this.handleScroll);

    },
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
        let cur_scroll = document.body.scrollTop || document.documentElement.scrollTop,
            height = getScrollHeight(),
            active_height = window.innerHeight * 1.2;

        if (height - cur_scroll < active_height && !load_state && !this.state.end) {
            load_state = 1;
            this.load('summary', this.state.loaded);
        }
    },
    load(type, start=0, limit=10) {
        return getArticles(type, start, limit).then(data => {
            let end = false;
            if (!data[0]) {
                end = true;
                window.removeEventListener('scroll', this.handleScroll);
            }
            this.setState({
                archives: this.state.archives.concat(data),
                loaded: this.state.loaded + data.length,
                end: end
            });
            load_state = 0;
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
            <Wrapper show={this.state.show}>
                <ArticleList>
                    {this.state.archives}
                </ArticleList>
                <article id="end-list">
                    {this.state.end ? 'The End' : 'Loading....'}
                </article>
            </Wrapper>
        );
    }
});

export default Index;
