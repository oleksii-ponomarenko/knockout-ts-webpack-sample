declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { HomePageViewModel } from './home.vm';

const template = require('./home.html')

ko.components.register(componentNames.homePage, {
	viewModel: HomePageViewModel,
	template
});

export { HomePageViewModel };