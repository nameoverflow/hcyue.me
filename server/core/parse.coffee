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
    origin = input
    # 检测通配符
    len = input.length
    has_s = false

    if (input.indexOf '/*') is len - 2
        input = input.replace /\*/, '(.+)'
        has_s = true

    # 生成路由正则
    re_str = '^' + (input.replace /\{[^\}]+}/g, '([^/]+)') + '$'
    output.re = new RegExp re_str
    console.log re_str
    console.log input


    # 生成参数表
    param_re = '^' + (origin.replace /\{[^\}]+}/g, '{([^/]+)}') + '$'

    output.params = input.match param_re
    output.params = output.params && output.params.splice 1
    output.params = output.params || []

    if has_s
        output.params.push('path')
    console.log output.params
    return output
    #parse.route '/post/{id}/{title}'
    #parse = require './parse'