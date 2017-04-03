declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { EditableCheckboxAnswerViewModel } from './editable-checkbox-answer.vm';

const template = require('./editable-checkbox-answer.html');

ko.components.register(componentNames.editableCheckboxAnswer, {
	viewModel: EditableCheckboxAnswerViewModel,
	template
});

export { EditableCheckboxAnswerViewModel };