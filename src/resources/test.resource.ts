import { ITestResource } from './interfaces/i-test.resource';
import { Test } from "../models/test-models/test.model";
import { injectable } from "inversify";

const _testStorageKey: string = 'tests';

/**
 * TestResource
 */
@injectable()
export class TestResource implements ITestResource {
	getAll(): Test[] {
		return this.getTests();
	}

	get(testId: number): Test {
		let tests: Test[] = this.getTests();
		let foundTest: Test = tests.filter((t: Test) => t.id === testId)[0];

		return foundTest;
	}

	add(test: Test): number {
		test.id = +new Date();
		let tests: Test[] = this.getTests();

		tests.push(test);
		this.saveTests(tests);

		return test.id;
	}

	update(test: Test): void {
		let tests: Test[] = this.getTests();
		let testIndex = tests.findIndex((t: Test) => t.id === test.id);

		tests[testIndex] = test;

		this.saveTests(tests);
	}

	remove(testId: number): void {
		let tests: Test[] = this.getTests();
		let testIndex = tests.findIndex((t: Test) => t.id === testId);

		tests.splice(testIndex, 1);

		this.saveTests(tests);
	}

	private getTests(): Test[] {
		return JSON.parse(window.localStorage.getItem(_testStorageKey)) || [ ];
	}

	private saveTests(tests: Test[]): void {
		window.localStorage.setItem(_testStorageKey, JSON.stringify(tests));
	}
}