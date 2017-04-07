declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { SimpleAnswerViewModel } from './simple-answer.vm';

const template = require('./simple-answer.html');

ko.components.register(componentNames.simpleAnswer, {
	viewModel: SimpleAnswerViewModel,
	template
});

export { SimpleAnswerViewModel };