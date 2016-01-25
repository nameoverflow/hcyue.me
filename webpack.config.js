var path = require('path');
var webpack = require('webpack');

var script_src = path.resolve(__dirname, 'src', 'script');
var style_src = path.resolve(__dirname, 'src', 'style');

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/script/main'
    ],
    admin: './src/script/admin'
  },
  output: {
    path: path.join(__dirname, 'public', 'script'),
    filename: '[name].js',
    publicPath: '/static/script/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      include: script_src
    }, {
      test: /\.sass$/,
      loaders: ['style', 'css', 'sass?indentedSyntax'],
      include: style_src
    }, {
      test: /\.s?css$/,
      loaders: ['style', 'css', 'sass'],
      include: style_src
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      style_src,
      script_src
    ]
  }
};