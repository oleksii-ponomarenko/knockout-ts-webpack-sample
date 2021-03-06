import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableRadioAnswerViewModel
 */
export class RadioAnswerViewModel {
	public answer: AnswerObservable;
	public questionId: number;
	public chosenRadioAnswerId: KnockoutObservable<number>;

	constructor(params: any) {
		this.answer = params.answer;
		this.questionId = params.questionId;
		this.chosenRadioAnswerId = params.chosenRadioAnswerId;
	}
};