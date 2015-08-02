parse = require './parse'
###
Router类：路由
###
Router =
    ###
    实现映射：
    url模式匹配
    数组储存url参数
    ###
    _map: []

    match: (url) ->
        ###
         @param {Str} url
         @return {Func} [handler]
         @return {Obj} [params]
         @public
        ###
        for item in @_map
            result = url.match item.route.re
            if result
                params = {}
                for param, i in item.route.params
                    params[param] = result[i + 1]
                return {
                    'handler': item.handler
                    'params': params
                }

        return false

    add: (route, handler) ->
        ###
         @param {Str} route
         @param {Func} handler
         @public
        ###
        @_map.push {'route': (parse.route route), 'handler': handler}

module.exports = Router