import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";

/**
 * EditableSimpleAnswerViewModel
 */
export class EditableSimpleAnswerViewModel {
	public answer: AnswerObservable;

	constructor(params: any) {
		this.answer = params.answer();
	}
};