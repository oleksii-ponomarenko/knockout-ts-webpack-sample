import * as ko from 'knockout';
import { QuestionObservable } from "./question.observable.model";
import { Test, Question } from "../../models/models.barrel";

/**
 * TestObservable
 */
export class TestObservable {
	public id: number;
	public name: KnockoutObservable<string>;
	public questions: KnockoutObservableArray<QuestionObservable>;
	public isChanged: KnockoutObservable<boolean>;
	public originalTest: KnockoutObservable<Test>;

	constructor(test: Test) {
		this.originalTest = ko.observable(test);
		this.id = test.id;
		this.name = ko.observable(test.name);
		this.questions = ko.observableArray(test.questions.sort((q1, q2) => q1.sortOrder - q2.sortOrder).map((q: Question) => new QuestionObservable(q)));
		this.isChanged = ko.computed(() => !this.equalsTo(this.originalTest()));
	}

	toTest() {
		let test: Test = {
			id: this.id,
			name: this.name(),
			questions: this.questions().filter(q => !q.isDestroyed()).map((q: QuestionObservable) => q.toQuestion())
		};

		return test;
	}

	equalsTo(test: Test): boolean {
		return this.id === test.id &&
			this.name() === test.name &&
			!this.questions().find((qo: QuestionObservable) => qo.isChanged());
	}
};