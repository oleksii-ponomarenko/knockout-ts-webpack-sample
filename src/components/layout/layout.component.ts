declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { LayoutViewModel } from './layout.vm';

const template = require('./layout.html');
require('./layout.scss');

ko.components.register(componentNames.layout, {
	viewModel: LayoutViewModel,
	template
});

export { LayoutViewModel };