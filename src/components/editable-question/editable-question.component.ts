declare const require: Function;

import * as ko from 'knockout';

import { componentNames } from '../../constants/component-names';
import { EditableQuestionViewModel } from './editable-question.vm';

const template = require('./editable-question.html');

ko.components.register(componentNames.editableQuestion, {
	viewModel: EditableQuestionViewModel,
	template
});

export { EditableQuestionViewModel };