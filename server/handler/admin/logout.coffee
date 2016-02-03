module.exports = (conn, params) ->
    conn.session (session) ->
        session.destroySession ()=>
            conn.jump '/'
        return
