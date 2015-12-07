db = require '../../model/db'
fs = require 'fs'
auth = require '../../model/auth'

module.exports = (conn, params) ->
    auth conn, () =>
        