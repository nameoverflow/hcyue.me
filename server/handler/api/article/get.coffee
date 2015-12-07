db = require '../../../model/db/post'
article = db.article
module.exports = (conn, params) ->
    _sendData = (err, row) =>
        if err
            conn.die {
                err: 500
                message: err
            }
        else
            # console.log row
            conn.send 'json', row

    if not conn.query
        article.getSummary 0, 5, _sendData
    else
        if id = conn.query['id']
            db.singleById id, _sendData
        else if title = conn.query['title']
            db.singleByTitle title, _sendData
        else
            if (s_t = conn.query['st']) and (e_t = conn.query['et'])
                article.timeLine s_t, e_t, _sendData
            else
                start = +conn.query['start'] || 0
                limit = +conn.query['limit'] || 5
                if conn.query['page']
                    db.pageList start, limit, _sendData
                else
                    type = conn.query['type'] || 'summary'
                    console.log type
                    article[type] start, limit, _sendData
                    # summary | title | all
