http = require 'http'
Conn = require './connection'
fs = require 'fs'
router = require './router'

conf = (require '../config').server
###
    port: 4000
###

###
App类：实现路由、static文件、返回动态视图
###
class App
    constructor: () ->
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
                return
            else

            cur_conn.send 'define', '<html>not found!</html>', {
                'status': 404
                'Content-Type': 'text/html'
            }
        server.listen conf.port, 0,0,0,0
        console.log 'server start with port ' + conf.port

    get: (uri, handler) ->
        if typeof uri is 'string'
            router.add uri, handler
            return
        if not uri.length
            return console.log 'uri must be string or array'
        for i in uri
            router.add i, handler
        
    setStatic: (path) ->
        @get path + '/{static}', _static


module.exports = App
