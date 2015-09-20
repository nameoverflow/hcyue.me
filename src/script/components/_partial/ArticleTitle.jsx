
let ArticleTitle = React.createClass({
    render() {
        return (
            <div className={this.props.className}>
                <h1>
                    {this.props.children}
                </h1>
            </div>
        );
    }
});

export default ArticleTitle;
