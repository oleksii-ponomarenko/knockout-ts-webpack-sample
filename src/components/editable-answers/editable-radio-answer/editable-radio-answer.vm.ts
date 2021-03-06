import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableRadioAnswerViewModel
 */
export class EditableRadioAnswerViewModel {
	private _removeAnswer: (answer: AnswerObservable) => void;

	public answer: AnswerObservable;
	public questionId: number;
	public chosenRadioAnswerId: KnockoutObservable<number>;
	

	constructor(params: any) {
		this.answer = params.answer;
		this.questionId = params.questionId;
		this.chosenRadioAnswerId = params.chosenRadioAnswerId;
		this._removeAnswer = params.removeAnswer;
	}

	remove() {
		this._removeAnswer(this.answer);
	}
};