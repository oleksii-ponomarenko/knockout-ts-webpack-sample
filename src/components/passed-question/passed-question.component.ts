declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { PassedQuestionViewModel } from './passed-question.vm';

const template = require('./passed-question.html');

ko.components.register(componentNames.passedQuestion, {
	viewModel: PassedQuestionViewModel,
	template
});

export { PassedQuestionViewModel };