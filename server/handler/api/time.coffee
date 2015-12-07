db = require '../../model/db/model'

module.exports = (conn, params) ->
    db.post.find {type: 'article'}
        .sort({createDate: 1}).select('createDate').limit(1)
        .exec (err, doc) ->
            fuck = new Date(doc[0]['createDate']).getFullYear()
            conn.send 'json', [new Date().getFullYear()..fuck]
