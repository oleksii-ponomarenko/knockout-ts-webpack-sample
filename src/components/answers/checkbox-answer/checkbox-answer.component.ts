declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { CheckboxAnswerViewModel } from './checkbox-answer.vm';

const template = require('./checkbox-answer.html');

ko.components.register(componentNames.checkboxAnswer, {
	viewModel: CheckboxAnswerViewModel,
	template
});

export { CheckboxAnswerViewModel };