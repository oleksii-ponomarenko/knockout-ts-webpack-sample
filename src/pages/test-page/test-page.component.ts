declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { TestPageViewModel } from './test-page.vm';

const template = require('./test-page.html')

ko.components.register(componentNames.testPage, {
	viewModel: TestPageViewModel,
	template
});

export { TestPageViewModel };