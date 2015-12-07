import React from 'react'

export default class ArticleMeta extends React.Component {
    render() {
        return (
            <div className="ArticleMeta">
                创建于&nbsp;
                <time>
                {
                    new Date(this.props.time).toDateString()
                }
                </time>
                {this.props.tags && this.props.tags[0] ? ' |' : ''}
                {
                    this.props.tags && this.props.tags.map(tag =>
                        <a href="#">
                            {' { '}
                            <span className="meta-text">{tag}</span>
                            {' } '}
                        </a>
                    )
                }
            </div>
    )
    }
}
