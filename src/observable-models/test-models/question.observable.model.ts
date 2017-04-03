import * as ko from 'knockout';
import { QuestionType } from "../../enums/question-type.enum";
import { AnswerObservable } from "./answer.observable.model";
import { TestObservable } from "./test.observable.model";
import { Question, Answer } from "../../models/models.barrel";

/**
 * Question
 */
export class QuestionObservable {
	public id: number;
	public text: KnockoutObservable<string>;
	public questionType: KnockoutObservable<QuestionType>;
	public answers: KnockoutObservableArray<AnswerObservable>;
	public isChanged: KnockoutObservable<boolean>;
	public originalQuestion: KnockoutObservable<Question>;

	constructor()
	constructor(question: Question)
	constructor(question?: Question) {
		this.originalQuestion = ko.observable(question);

		if (!question) {
			question = { id: +new Date(), text: '', questionType: QuestionType.simple, answers: [] };
		}

		this.id = question.id;
		this.text = ko.observable(question.text);
		this.questionType = ko.observable(question.questionType);
		this.answers = ko.observableArray(question.answers.map((a: Answer) => new AnswerObservable(a)));
		this.isChanged = ko.computed(() => !this.equalsTo(this.originalQuestion()));
	}

	toQuestion(): Question {
		let question: Question = {
			id: this.id,
			text: this.text(),
			questionType: this.questionType(),
			answers: this.answers().filter(a => !a.isDestroyed()).map((a: AnswerObservable) => a.toAnswer())
		};

		return question;
	}

	equalsTo(question: Question): boolean {
		return question &&
			this.id === question.id &&
			this.text() === question.text &&
			this.questionType() === question.questionType &&
			!this.answers().find(a => a.isChanged());
	}
}