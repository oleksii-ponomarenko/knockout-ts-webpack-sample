declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { PassedTestsPageViewModel } from './passed-tests-page.vm';

const template = require('./passed-tests-page.html')

ko.components.register(componentNames.passedTestsPage, {
	viewModel: PassedTestsPageViewModel,
	template
});

export { PassedTestsPageViewModel };