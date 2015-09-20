var ArticleText = React.createClass({
    render() {
        return (
            <div
                className="article-text"
                dangerouslySetInnerHTML={{__html: this.props.children.toString()}}
                />
        );
    }
});

export default ArticleText;
