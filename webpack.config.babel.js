import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	entry: {
		'main': './src/main.ts',
		'vendor': './src/vendor.ts'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	externals: {
		"jquery": "jQuery"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			'knockout': path.resolve(__dirname, 'node_modules/knockout/build/output/knockout-latest.js')
		}
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loaders: ['ts-loader'] },
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.html$/, loaders: [ 'to-string-loader', 'raw-loader' ], exclude: /index.html$/ },
			{ test: /index\.html$/, loader: 'raw-loader' },
			{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
			{ test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader:"url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
			{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true,
			hash: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		})
	]
};