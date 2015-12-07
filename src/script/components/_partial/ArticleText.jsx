import React from 'react'

export default class ArticleText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                className="article-text"
                dangerouslySetInnerHTML={{__html: this.props.children.toString()}}
                />
        );
    }
}

export default ArticleText;
