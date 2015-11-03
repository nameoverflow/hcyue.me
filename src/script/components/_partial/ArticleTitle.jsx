export default class ArticleTitle extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={this.props.className}>
        {
            this.props.display !== 'title' ? (
                <h1>{this.props.children}</h1>
            ) : (
                <h4>{this.props.children}</h4>
            )
        }
            </div>
        );
    }
}
