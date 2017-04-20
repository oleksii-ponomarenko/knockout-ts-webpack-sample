declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { PassedCheckboxAnswerViewModel } from './passed-checkbox-answer.vm';

const template = require('./passed-checkbox-answer.html');

ko.components.register(componentNames.passedCheckboxAnswer, {
	viewModel: PassedCheckboxAnswerViewModel,
	template
});

export { PassedCheckboxAnswerViewModel };