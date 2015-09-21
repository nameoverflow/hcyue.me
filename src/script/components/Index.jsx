// import React from 'react';
import {ajax, getEleTop, parseTime, getArticles} from '../utils';

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
        this.load(this.props.type || 'summary');
        window.addEventListener('scroll', this.scrollHandler, false);
    },
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler, false);
    },
    scrollHandler() {
        let cur_scroll = document.body.scrollTop || document.documentElement.scrollTop,
            height = document.body.offsetHeight,
            win_height = window.innerHeight;
        if (win_height - cur_scroll < win_height + 100) {
            this.load(this.props.type || 'summary', this.state.loaded);
        }
        if (!this.state.end) {
            window.removeEventListener('scroll', this.scrollHandler, false);
        }
    },
    load(type, start=0, limit=10) {
        getArticles(type, start, limit).then(data => {
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
        }).catch(data => {
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
                    The End
                </article>
            </div>
        );
    }
});

export default Index;
