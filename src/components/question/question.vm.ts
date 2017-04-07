import * as ko from 'knockout';
import { QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { QuestionType } from "../../enums/question-type.enum";
import { Answer } from "../../models/models.barrel";

/**
 * EditableQuestionViewModel
 */
export class QuestionViewModel {
	private _removeQuestion: (answer: QuestionObservable) => void;

	public question: QuestionObservable;
	public questionTypes: KnockoutObservableArray<number>;
	public chosenRadioAnswerId: KnockoutObservable<number>;

	constructor(params: any) {
		this.question = params.question;
		this._removeQuestion = params.removeQuestion;
		
		let correctAnswer = this.question.answers().find(a => a.isRight());
		this.chosenRadioAnswerId = ko.observable(correctAnswer ? correctAnswer.id : 0);
		this.chosenRadioAnswerId.subscribe(this.selectAnswer, this);
	}

	selectAnswer(answerId: number) {
		let answer = this.question.answers().find((a: AnswerObservable) => a.id === answerId);
		this.question.answers().forEach((a: AnswerObservable) => a.isRight(false));
		answer.isRight(true);
	}
};