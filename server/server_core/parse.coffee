url = require 'url'

###
route

@param {Str} input 开头带/末尾无/的路径
@return {Obj} {
        re: 模式匹配正则
        params: 参数名称表
    }
###
exports.route = (input) ->

    output = {}
    ###
    参数路由: /path/{param_name}
    Type: [Int, String]
    ###

    # 生成路由正则
    re_str = '^' + (input.replace /\{[^\}]+}/g, '([^/]+)') + '$'
    output.re = new RegExp re_str


    # 生成参数表
    param_re = '^' + (input.replace /\{[^\}]+}/g, '{([^/]+)}') + '$'
    output.params = (input.match param_re).splice 1

    return output
    #parse.route '/post/{id}/{title}'
    #parse = require './parse'