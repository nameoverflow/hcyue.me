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
                            <header>
                                <ArticleTitle className="title-list">
                                    <Link to="article" params={{id: item._id}}>
                                        {item.title || ''}
                                    </Link>
                                </ArticleTitle>
                                <div className="article-meta">
                                    创建于 {
                                        //item.createDate && parseTime(item.createDate)[0] || ''
                                        new Date(item.createDate).toDateString()
                                    } | {
                                        item.tags === [] ? 'None' : item.tags.map(tag =>
                                            <a href="#">
                                                {` {${tag}} `}
                                            </a>
                                        )
                                    }
                                </div>
                            </header>
                            <ArticleText>
                                {item.summary || item.body}
                            </ArticleText>
                            <div className="post-more-link" style={{'display': item.break ? 'block' : 'none'}}>
                                <Link to="article" params={{id: item._id}} className="no-ani">
                                    ReadOn »
                                </Link>
                            </div>
                        </article>
                    </li>
                )
            }
                    <footer>
                    </footer>
                </ul>

        );
    }
});

export default ArticleList;
