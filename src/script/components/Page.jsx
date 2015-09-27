import {ajax, parseTime} from '../utils';

import ArticleTitle from './_partial/ArticleTitle';
import ArticleText from './_partial/ArticleText';
import ArticleMeta from './_partial/ArticleMeta';

var Page = React.createClass({
    getInitialState() {
        return {
            body: '<p>loading...</p>'
        };
    },

    componentDidMount() {
        this.setState({body: 'Loading....'});
        ajax.get('/api/article', {
            'title': this.props.params.title,
            'page': true
        }).then(data => {
            if (!data[0] || !data) {
                return this.setState({body: 'Not found!'});
            }
            this.setState(data[0]);
        }, data => {
            return this.setState({body: data.message});
        }).then(() =>
            hljs && Array.prototype.forEach.call(
                document.querySelectorAll('pre code:not(.hljs)'),
                hljs.highlightBlock
            )
        ).catch(data => {
            console.log(data);
        });
    },
    componentWillReceiveProps() {
    },
    render() {
        return (
            <div id="wrapper">
                <article className="Page typo">
                    <ArticleTitle>{this.props.params.title.toString().toUpperCase()}</ArticleTitle>
                    <ArticleText>{this.state.body}</ArticleText>
                </article>
            </div>
        );
    }
});

export default Page;
