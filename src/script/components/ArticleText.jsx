import React from 'react';

var ArticleText = React.createClass({
    render() {
        return (
            <div 
                className="article-text" 
                dangerouslySetInnerHTML={this.props.children}
                />
        );
    }
});