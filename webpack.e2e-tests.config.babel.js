import path from 'path';
import webpack from 'webpack';
import config from './webpack.dev.config.babel.js';

config.entry = {
	'tests/tests': './nightwatch/tests/tests.ts'
}

config.output.path = path.resolve(__dirname, 'build/e2e');
config.output.library = 'Nightwatch tests';
config.output.libraryTarget = 'commonjs';

config.plugins = [ ];

export default config;