declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { PassTestPageViewModel } from './pass-test-page.vm';

const template = require('./pass-test-page.html')

ko.components.register(componentNames.passTestPage, {
	viewModel: PassTestPageViewModel,
	template
});

export { PassTestPageViewModel };