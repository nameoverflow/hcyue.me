module.exports = (conn, params) ->
    conn.session (session) ->
        session.destroySession ()=>
            conn.send 'jump', '/'
        return
