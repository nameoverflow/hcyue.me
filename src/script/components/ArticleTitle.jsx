
// import React from 'react'

let ArticleTitle = React.createClass({
    render() {
        return (
            <div className={this.props.className}>
                <h2>
                    {this.props.children}
                </h2>
            </div>
        );
    }
});

export default ArticleTitle;
