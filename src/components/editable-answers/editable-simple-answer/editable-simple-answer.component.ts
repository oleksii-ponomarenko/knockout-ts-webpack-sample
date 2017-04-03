declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../../constants/component-names';
import { EditableSimpleAnswerViewModel } from './editable-simple-answer.vm';

const template = require('./editable-simple-answer.html');

ko.components.register(componentNames.editableSimpleAnswer, {
	viewModel: EditableSimpleAnswerViewModel,
	template
});

export { EditableSimpleAnswerViewModel };