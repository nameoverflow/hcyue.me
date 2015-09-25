
let ArticleTitle = React.createClass({
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
});

export default ArticleTitle;
