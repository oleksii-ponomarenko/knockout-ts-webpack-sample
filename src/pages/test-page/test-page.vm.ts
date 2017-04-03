declare const require: any;

import * as ko from 'knockout';

import { injectable } from "inversify";
import container, { injectionTypes } from '../../configs/injection.config';
import { ITestService } from "../../services/interfaces/i-test.service";
import { TestObservable, QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { Test, Question } from "../../models/models.barrel";
import { RouterConfig } from "../../configs/router.config";
import { QuestionType } from "../../enums/question-type.enum";

/**
 * TestPageViewModel
 */
@injectable()
export class TestPageViewModel {
	private _testService: ITestService;

	public test: KnockoutObservable<TestObservable>;

	constructor() {
		this._testService = container.get<ITestService>(injectionTypes.services.testService);

		let testId = +RouterConfig.routeParams.testId;
		let testModel = new TestObservable(this._testService.get(testId));
		this.test = ko.observable(testModel);
	}

	addQuestion() {
		let observable = new QuestionObservable();
		observable.text('New question');

		let observableAnswer = new AnswerObservable();
		observableAnswer.text('New answer');
		observable.answers.push(observableAnswer);

		this.test().questions.push(observable);
	}

	saveTest() {
		this._testService.update(this.test().toTest());
		let testModel = new TestObservable(this._testService.get(this.test().id));
		this.test(testModel);
	}
};