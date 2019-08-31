const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  entry: './index.tsx',
  source: path.join(__dirname, './src'),
  out: path.join(__dirname, './build'),
  assets: path.join(__dirname, './assets'),
  nodeModules: path.join(__dirname, './node_modules'),
};

const webpackModulesRule = {
  rules: [
    {
      test: /.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: path.nodeModules,
    },
    {
      test: /.js$/,
      loader: 'source-map-loader',
      enforce: 'pre',
    },
    {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
      ],
    }
  ]
};

const commonConfig = {
  entry: paths.entry,
  context: paths.source,
  output: {
    path: paths.out,
    filename: '[name].js',
  },
  devtool: isProduction ? undefined : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', paths.source],
    alias: {
      src: paths.source,
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: paths.out,
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: webpackModulesRule,
};

module.exports = commonConfig;
