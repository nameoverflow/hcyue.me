import React from 'react'

const ArticleText = ({children}) =>
    <div
        className="article-text"
        dangerouslySetInnerHTML={{__html: children.toString()}}
        />

export default ArticleText;
