db = require '../../../model/db'
render = require '../../../model/render'

module.exports = (conn, params) ->
    dbCb = (err, doc) =>
        console.log 'accepted', doc
        if err
            console.log err
            return conn.send 'err', {
                err: 500
                message: err
            }
        return conn.send 'jump', '/admin'

    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            conn.send 'jump', '/admin/login'
        else if not (conn.query || conn.query['id'])
            conn.send 'err', {
                err: 403
            }
        else
            db.rm 'Post', {_id: conn.query['id']}, dbCb
