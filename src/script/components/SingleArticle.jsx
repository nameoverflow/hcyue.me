// import React from 'react';
import {ajax, parseTime} from '../utils';

import ArticleTitle from './ArticleTitle';
import ArticleText from './ArticleText';

var SingleArticle = React.createClass({
    getInitialState() {
        return {
            body: '<p>loading...</p>'
        };
    },

    componentWillMount() {
        ajax.get('/api/article/get', {
            'id': this.props.params.id
        }).then(data => {
            if (data.err) {
                this.setState({body: data.message});
                return;
            }
            //data = data[0];
            if (!data) {
                this.setState({body: 'id not found!'});
                return;
            }
            this.setState({
                title: data['title'],
                createDate: data['createDate'],
                body: data['body'],
                editDate: data['editDate']
            });
        }).then(() => {
            let el = document.getElementsByClassName('title-single')[0];
            let h = el.clientWidth;
            el.style.top = h + 20 + 'px';

        }).catch(data => {
            console.log(data);
        });
    },
    componentDidMount() {
    },
    render() {
        return (
            <article className="SingleArticle typo">
                <ArticleTitle className="title-single">
                    {this.state.title || ''}
                </ArticleTitle>
                <div className="article-date">
                    {this.state.createDate && parseTime(this.state.createDate)[0] || ''}
                </div>
                <ArticleText>{this.state.body}</ArticleText>
                <div
                    className="edit-date"
                    style={this.state.createDate === this.state.editDate ? {display: 'none'} : {}}>编辑于{this.state.editDate}</div>
            </article>
        );
    }
});

export default SingleArticle;
