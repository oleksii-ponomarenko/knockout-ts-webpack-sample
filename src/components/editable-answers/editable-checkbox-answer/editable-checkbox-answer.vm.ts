import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableCheckboxAnswerViewModel
 */
export class EditableCheckboxAnswerViewModel {
	private removeAnswer: (answer: AnswerObservable) => void;

	public answer: AnswerObservable;

	constructor(params: any) {
		this.answer = params.answer;
		this.removeAnswer = params.removeAnswer;
	}

	remove() {
		this.removeAnswer(this.answer);
	}
};