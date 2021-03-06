import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableCheckboxAnswerViewModel
 */
export class EditableCheckboxAnswerViewModel {
	private _removeAnswer: (answer: AnswerObservable) => void;

	public answer: AnswerObservable;

	constructor(params: any) {
		this.answer = params.answer;
		this._removeAnswer = params.removeAnswer;
	}

	remove() {
		this._removeAnswer(this.answer);
	}
};