declare const require: any;

import * as ko from 'knockout';

import { injectable } from "inversify";
import container, { injectionTypes } from '../../configs/injection.config';
import { ITestService } from "../../services/interfaces/i-test.service";
import { TestObservable } from "../../observable-models/observable-models.barrel";
import { Test } from "../../models/models.barrel";
import { RouterConfig, routes } from "../../configs/router.config";

/**
 * HomePageViewModel
 */
@injectable()
export class HomePageViewModel {
	private _testService: ITestService;

	public tests: KnockoutObservableArray<TestObservable>;

	constructor() {
		this._testService = container.get<ITestService>(injectionTypes.services.testService);
		this.initTests();
	}

	initTests() {
		this.tests = ko.observableArray(this._testService.getAll().map((t: Test) => new TestObservable(t)));
	}

	addTest() {
		let test: Test = new Test();
		test.name = 'New test';
		test.id = this._testService.add(test);
		
		let observableTest = new TestObservable(test);
		this.tests.push(observableTest);
	}

	saveTest(test: TestObservable) {
		let updatedTest = test.toTest();

		this._testService.update(updatedTest);

		test.originalTest(updatedTest);
	}

	goToTest(test: TestObservable) {
		RouterConfig.goToRoute(routes.test, { testId: test.id });
	}

	goToPassedTests(test: TestObservable) {
		RouterConfig.goToRoute(routes.passedTests, { testId: test.id });
	}

	goToPassTest(test: TestObservable) {
		RouterConfig.goToRoute(routes.passTest, { testId: test.id });
	}

	removeTest(test: TestObservable) {
		this._testService.remove(test.id);
		this.tests.remove(test);
	}
};