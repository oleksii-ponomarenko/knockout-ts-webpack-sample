import config from './webpack.config.babel';

let devConfig = Object.assign(config, {
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		inline: true,
		host: 'localhost',
		port: 4100,
		open: true
	}
});

export default devConfig;