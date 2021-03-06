///<reference types="jqueryui" />
///<reference types="knockout-sortable" />

declare const require: any;

import * as ko from 'knockout';

import { injectable } from "inversify";
import container, { injectionTypes } from '../../configs/injection.config';
import { TestObservable, QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { Test, Question, Assessment } from "../../models/models.barrel";
import { RouterConfig, routes } from "../../configs/router.config";
import { QuestionType } from "../../enums/question-type.enum";
import { ITestService, IAssessmentService } from "../../services/interfaces/service-interfaces.barrel";

/**
 * TestPageViewModel
 */
@injectable()
export class PassTestPageViewModel {
	private _testService: ITestService;
	private _assessmentService: IAssessmentService;

	public test: KnockoutObservable<TestObservable>;
	public assessment: Assessment;
	public isTestStarted: KnockoutObservable<boolean>;

	constructor() {
		this._testService = container.get<ITestService>(injectionTypes.services.testService);
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);

		let testId = +RouterConfig.routeParams.testId;
		let test = this._testService.get(testId)
		let testModel: TestObservable = null;

		if (test) {
			testModel = new TestObservable(test);

			let assessment = new Assessment();
			assessment.testId = test.id;
			this.assessment = assessment;
		}

		this.test = ko.observable(testModel);
		this.isTestStarted = ko.observable(false);
	}

	startTest() {
		this.isTestStarted(true);
	}

	finishTest() {
		this._assessmentService.add(this.assessment);
		RouterConfig.goToRoute(routes.home, { });
	}
};