declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { RadioAnswerViewModel } from './radio-answer.vm';

const template = require('./radio-answer.html');

ko.components.register(componentNames.radioAnswer, {
	viewModel: RadioAnswerViewModel,
	template
});

export { RadioAnswerViewModel };