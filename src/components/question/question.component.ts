declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { QuestionViewModel } from './question.vm';

const template = require('./question.html');

ko.components.register(componentNames.question, {
	viewModel: QuestionViewModel,
	template
});

export { QuestionViewModel };