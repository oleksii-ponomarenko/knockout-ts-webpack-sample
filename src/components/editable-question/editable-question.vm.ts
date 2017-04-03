import * as ko from 'knockout';
import { QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { QuestionType } from "../../enums/question-type.enum";
import { Answer } from "../../models/models.barrel";

const _questionTypes: number[] = Object.keys(QuestionType)
	.filter(key => !isNaN(+key))
	.map(key => +key);

/**
 * EditableQuestionViewModel
 */
export class EditableQuestionViewModel {
	public question: QuestionObservable;
	public questionTypes: KnockoutObservableArray<number>;
	public chosenRadioAnswerId: KnockoutObservable<number>;

	constructor(params: any) {
		this.question = params.question;
		this.questionTypes = ko.observableArray(_questionTypes);
		
		let correctAnswer = this.question.answers().find(a => a.isRight());
		this.chosenRadioAnswerId = ko.observable(correctAnswer ? correctAnswer.id : 0);
		this.chosenRadioAnswerId.subscribe(this.selectAnswer, this);
	}

	getQuestionTypeName(type: number) {
		return QuestionType[type];
	}

	addAnswer() {
		let observable: AnswerObservable = new AnswerObservable();
		observable.text('New answer');

		this.question.answers.push(observable);
	}

	selectAnswer(answerId: number) {
		let answer = this.question.answers().find((a: AnswerObservable) => a.id === answerId);
		this.question.answers().forEach((a: AnswerObservable) => a.isRight(false));
		answer.isRight(true);
	}

	removeAnswer(answer: AnswerObservable) {
		if (answer.originalAnswer()) {
			this.question.answers.destroy(answer);
		} else {
			this.question.answers.remove(answer);
		}
	}
};