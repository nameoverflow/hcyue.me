db = require '../../model/db/model'
render = require '../../model/render'
auth = require '../../model/auth'
query = require 'querystring'
module.exports = (conn, params) ->
    render conn
    auth conn, () =>
        fuck = {}
        fuck.page = if conn.query && conn.query['pages'] then true else false
        conn.view 'admin/index', fuck
