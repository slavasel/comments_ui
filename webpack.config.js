var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
	entry: {
		main: APP_DIR + '/index.js'
	},
	output: {
		filename: 'bundle.js',
		path: BUILD_DIR,
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /(\.css|.scss)$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, 'resolve-url-loader', {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
			{
				test: /\.(jsx|js)?$/,
				exclude: /(node_modules)/,
				use: [{
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					}
				}]
			}
		],

	}
};

module.exports = config;