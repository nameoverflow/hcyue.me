import React from 'react'
const ArticleTitle = (props) =>
    <div className={props.className}>
    {
    props.display !== 'title' ? (
        <h1>{props.children}</h1>
        ) : (
        <h4>{props.children}</h4>
        )
    }
    </div>

export default ArticleTitle;