declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { PassedSimpleAnswerViewModel } from './passed-simple-answer.vm';

const template = require('./passed-simple-answer.html');

ko.components.register(componentNames.passedSimpleAnswer, {
	viewModel: PassedSimpleAnswerViewModel,
	template
});

export { PassedSimpleAnswerViewModel };