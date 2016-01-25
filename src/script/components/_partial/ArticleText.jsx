import React from 'react'
import 'ref/github.css'

const ArticleText = ({children}) =>
    <div
        className="article-text"
        dangerouslySetInnerHTML={{__html: children.toString()}}
        />

export default ArticleText;
