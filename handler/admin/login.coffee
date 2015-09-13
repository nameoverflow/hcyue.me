render = require '../../model/render'
module.exports = (conn, params) ->
    conn.send 'html', render './view/admin_login.jade'
