declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { EditableRadioAnswerViewModel } from './editable-radio-answer.vm';

const template = require('./editable-radio-answer.html');

ko.components.register(componentNames.editableRadioAnswer, {
	viewModel: EditableRadioAnswerViewModel,
	template
});

export { EditableRadioAnswerViewModel };