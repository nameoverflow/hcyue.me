
zlib = require 'zlib'
url = require 'url'
session_funs = require './session'
Session = session_funs.session
destroySession = session_funs.destroySession


class Connection
    # constructor: (@request, @response, session) ->
    constructor: (@request, @response) -> 
        @url = url.parse @request.url

    send: (type, data, option) -> 
        ###
        @param type {Str} 'html' / 'json' / 'nf' / 'err' / 'define'
        @param data {Str / Obj[when type is json]}
        @param [option] {Obj}  {'Content-Type', 'status'}
        ###
        ###
        @response.writeHead 200, {
            'server': 'black-tech'
            'Connection': 'keep-alive'
            'Content-Encoding': 'gzip'
            'charset' : 'utf-8'
        }
        ###
        headers = 
            'server': 'black-tech'
            'Connection': 'keep-alive'
            'Content-Encoding': 'gzip'
            'charset' : 'utf-8'

        switch type
            when 'html'
                headers['Content-Type'] = 'text/html'
                @response.writeHead 200, headers
            when 'json'
                headers['Content-Type'] = 'application/json'
                @response.writeHead 200, headers
                if typeof data isnt 'string'
                    JSON.stringify data
            when 'define'
                headers['Content-Type'] = option['Content-Type']
                @response.writeHead option['status'], headers
        ###
        for i of headers
            @response.setHeader(i, headers[i])
            ###
        if data
            _this = this
            zlib.gzip data, (err, result) ->
                _this.response.end result
        else
            @response.end
            
        console.log {
            'time': new Date()
            'status': @response.statusCode
            'ip': @request['connection']['remoteAddress']
            'url': @request.url
            'user-agent': @request.headers['user-agent']
            'data': data
        }
    getCookie: () ->
        cookies = {}
        headers = @request.headers
        if headers.cookie
            for cookie in headers.cookie.split ';'
                parts = cookie.split '='
                cookies[parts[0].trim()] = (parts[1] || '').trim()
            return cookies
        return false

    setCookie: (cookie_data) ->
        ###
        @param {Obj} cookie_data
        @return void
        @public
        ###
        cookies = for k, v of cookie_data
            k + '=' + v
        # console.log 'set cookie:', cookies
        # cookie_str = cookies.join ';'
        @response.setHeader 'Set-Cookie', cookies

    session: (callback) ->
        ###
        @param {Fun} callback(session)
        ###
        cur_conn = @
        if @_session
            callback && callback @_session
            return
        cookie = @getCookie()
        _setCookie = (input) ->
            cur_conn.setCookie input
        @_session = new Session cookie, _setCookie, () ->
            callback && callback cur_conn._session

    destroySession: destroySession
            

 
module.exports = Connection