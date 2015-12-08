import React from 'react'

const ArticleMeta = ({tags, time}) =>
    <div className="ArticleMeta">
        创建于&nbsp;
        <time>
        {
            new Date(time).toDateString()
        }
        </time>
        {tags && tags[0] ? ' |' : ''}
        {
            tags && tags.map(tag =>
                <a href="#" key="tag">
                    {' { '}
                    <span className="meta-text">{tag}</span>
                    {' } '}
                </a>
            )
        }
    </div>

export default ArticleMeta;