// import React from 'react';
import {ajax, getEleTop, parseTime} from '../utils';

// import ArticleTitle from './ArticleTitle';
// import ArticleText from './ArticleText';
import ArticleList from './ArticleList'

var Link = ReactRouter.Link

var ArticleList = React.createClass({
    getInitialState() {
        return {
            archives: [],
            num: 0,
            end: false
        };
    },
    componentDidMount() {
        this.loadArticles(this.props.type || 'summary');
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
            this.loadArticles(this.props.type || 'summary', this.state.num);
        }
        if (!this.state.end) {
            window.removeEventListener('scroll', this.scrollHandler, false);
        }
    },
    loadArticles(type, start=0, limit=10) {
        ajax.get('/api/article', {
            'start': start,
            'limit': limit,
            'type': type
        }).then(data => {
            let end = false;
            if (!data[0]) {
                end = true;
                data = []
            }
            this.setState({
                archives: this.state.archives.concat(data),
                num: this.state.num + limit,
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
                <ul className="ArticleList">
            {
                this.state.archives.map(item =>
                    <li key={item._id}>
                        <article className="typo">
                            <ArticleTitle className="title-list">
                                <Link to="article" params={{id: item._id}}>
                                    {item.title || ''}
                                </Link>
                            </ArticleTitle>
                        <div className="article-meta">
                            创建于 {item.createDate && parseTime(item.createDate)[0] || ''} | {item.tags.map(tag => <a href="#">{` {${tag}} `}</a>)}
                        </div>

                        <ArticleText>
                            {item.summary}
                        </ArticleText>
                    </article>
                    </li>
                )
            }
                    <li id="end-list" style={this.state.end ? {display: 'block'} : {display: 'none'}}>
                        <div>
                            The End
                        </div>
                    </li>
                </ul>

        );
    }
});

export default ArticleList;
