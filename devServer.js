var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
      "/": "http://127.0.0.1:4000",
      "/archives": "http://127.0.0.1:4000",
      "/lab": "http://127.0.0.1:4000",
      "/about": "http://127.0.0.1:4000",
      "/article*": "http://127.0.0.1:4000",
      "/api*": "http://127.0.0.1:4000",
      "/static/img*": "http://127.0.0.1:4000"
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});