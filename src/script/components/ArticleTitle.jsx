
import React from 'react'

let ArticleTitle = React.createClass({
    render() {
        <div className={this.prop.className}>
            <h2>
                {this.props.children}
            </h2>
        </div>
    }
});
