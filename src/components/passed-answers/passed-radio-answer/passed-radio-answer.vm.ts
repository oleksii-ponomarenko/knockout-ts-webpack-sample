import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";
import { Assessment } from "../../../models/models.barrel";

/**
 * EditableRadioAnswerViewModel
 */
export class PassedRadioAnswerViewModel {
	public answer: AnswerObservable;
	public questionId: number;
	public chosenRadioAnswerId: KnockoutObservable<number>;
	public correctionClass: KnockoutObservable<string>;
	public assessment: Assessment;

	constructor(params: any) {
		this.answer = params.answer;
		this.questionId = params.questionId;
		this.chosenRadioAnswerId = params.chosenRadioAnswerId;

		this.correctionClass = ko.computed(() => this.answer.isRight() ? 'text-success' : (this.answer.id === this.chosenRadioAnswerId() ? 'text-danger' : ''));
	}
};