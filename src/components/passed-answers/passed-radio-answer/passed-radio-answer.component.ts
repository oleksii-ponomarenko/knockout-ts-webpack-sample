declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { PassedRadioAnswerViewModel } from './passed-radio-answer.vm';

const template = require('./passed-radio-answer.html');

ko.components.register(componentNames.passedRadioAnswer, {
	viewModel: PassedRadioAnswerViewModel,
	template
});

export { PassedRadioAnswerViewModel };