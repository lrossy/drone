"use strict";

let path = require("path");
let webpack = require("webpack");

let merge = require("webpack-merge");
let baseWpConfig = require("./webpack.base.config");
//let StatsPlugin = require("stats-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseWpConfig, {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: [{
						loader: "css-loader",
						options: {
							modules: true
						}
					}, {
						loader: "postcss-loader"
					}, {
						loader: "sass-loader"
					}]
				})
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: "style-loader",
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
				})
			}, {
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
						sass: ExtractTextPlugin.extract({
							fallbackLoader: "vue-style-loader",
							loader: [{
								loader: "css-loader",
								options: {
									modules: true
								}
							}, {
								loader: "postcss-loader"
							}, {
								loader: "sass-loader"
							}]
						})
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),

		new ExtractTextPlugin("styles/[name].css")

		/*new StatsPlugin(path.resolve(__dirname, "stats.json"), {
			chunkModules: true
			//exclude: [/node_modules[\\\/]react/]
		})*/
	]
});
