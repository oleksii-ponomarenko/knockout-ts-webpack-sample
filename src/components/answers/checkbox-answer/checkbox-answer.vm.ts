import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableCheckboxAnswerViewModel
 */
export class CheckboxAnswerViewModel {
	public answer: AnswerObservable;

	constructor(params: any) {
		this.answer = params.answer;
	}
};