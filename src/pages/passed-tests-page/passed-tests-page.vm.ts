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
import { ITestService, IAssessmentService, ICorrectnessService } from "../../services/interfaces/service-interfaces.barrel";

/**
 * TestPageViewModel
 */
@injectable()
export class PassedTestsPageViewModel {
	private _testService: ITestService;
	private _assessmentService: IAssessmentService;
	private _correctnessService: ICorrectnessService;

	public test: KnockoutObservable<TestObservable>;
	public assessments: KnockoutObservableArray<Assessment>;
	public marksMap: { [assessmentId: number]: number };

	constructor() {
		this._testService = container.get<ITestService>(injectionTypes.services.testService);
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);
		this._correctnessService = container.get<ICorrectnessService>(injectionTypes.services.correctnessService);

		let testId = +RouterConfig.routeParams.testId;
		let test = this._testService.get(testId);
		let testModel: TestObservable = null;
		this.marksMap = { };

		if (test) {
			testModel = new TestObservable(test);
			this.assessments = ko.observableArray(this._assessmentService.getByTest(testId));

			this.assessments().forEach(a => {
				this.marksMap[a.id] = this._correctnessService.calculateTestCorrectness(testModel, a.userAnswers);
			});

			testModel.maxMark = ko.observable(this._correctnessService.calculateMaxMark(testModel));
		}

		this.test = ko.observable(testModel);
	}
};