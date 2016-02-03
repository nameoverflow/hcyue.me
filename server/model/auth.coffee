
module.exports = (conn, next) ->
    conn.session (session) =>
        console.log '\n\n\n\n\n\n'+(JSON.stringify session._data)+'\n\n\n\n\n'
        if (session.get 'auth') isnt 'admin'
            conn.jump '/admin/login'
        else
            next()
