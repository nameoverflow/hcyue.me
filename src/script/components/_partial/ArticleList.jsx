import ArticleTitle from './ArticleTitle';
import ArticleText from './ArticleText';
import {parseTime} from '../../utils'
var Link = ReactRouter.Link

var ArticleList = React.createClass({
    render() {
        return (
                <ul className="ArticleList">
            {
                this.props.children.map(item =>
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
                </ul>

        );
    }
});

export default ArticleList;
