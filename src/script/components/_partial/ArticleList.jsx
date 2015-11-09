import ArticleTitle from './ArticleTitle';
import ArticleText from './ArticleText';
import ArticleMeta from './ArticleMeta';
import {parseTime} from '../../utils'
const Link = ReactRouter.Link
export default class ArticleList extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
                <ul className="ArticleList">
            {
                this.props.children.map(item =>
                    <li key={item._id}>
                        <article className="typo">
                            <header>
                                <ArticleTitle display={this.props.display} className="title-list">
                                    <Link to="article" params={{id: item._id}}>
                                        {item.title || ''}
                                    </Link>
                                </ArticleTitle>
                                <ArticleMeta time={item.createDate} tags={item.tags} />
                            </header>
                        {
                        this.props.display == 'title' ||
                            <main>
                                <ArticleText>
                                    {item.summary || item.body}
                                </ArticleText>
                                <div className="post-more-link" style={{
                                    'display': item.break ? 'block' : 'none'
                                }}>
                                    <Link to="article" params={{id: item._id}} className="no-ani">
                                        ReadOn »
                                    </Link>
                                </div>
                            </main>
                        }
                        </article>
                    </li>
                )
            }
                </ul>

        );
    }
}
