///<reference types="jqueryui" />
///<reference types="knockout-sortable" />

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
export class PassTestPageViewModel {
	private _testService: ITestService;

	public test: KnockoutObservable<TestObservable>;
	public isTestStarted: KnockoutObservable<boolean>;

	constructor() {
		this._testService = container.get<ITestService>(injectionTypes.services.testService);

		let testId = +RouterConfig.routeParams.testId;
		let test = this._testService.get(testId)
		let testModel: TestObservable = null;

		if (test) {
			testModel = new TestObservable(test);
		}

		this.test = ko.observable(testModel);
		this.isTestStarted = ko.observable(false);
	}

	startTest() {
		this.isTestStarted(true);
	}
};