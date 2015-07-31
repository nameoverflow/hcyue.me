http = require 'http'
Conn = require './connection'

config = 
    'port': 4000

###
App类：实现路由、static文件、返回动态视图
###
class App
    constructor: (@router) ->
        router = @router
        i = i || 0
        #实例化server
        server = http.createServer (req, res) ->

            cur_conn = new Conn req, res, @session
            ###
            搜寻映射表，调用connection返回数据
            ###
            path = cur_conn.url.pathname
            result = router.match path
            if result
                i++
                console.log i
                result.handler cur_conn, result.params
            else
                cur_conn.send 'nf', '<html>not found!</html>'
        server.listen config.port, 0,0,0,0
        console.log 'server start with port ' + config.port

    get: (uri, handler) ->
        @router.add uri, handler


module.exports = App
