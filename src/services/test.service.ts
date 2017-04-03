import { injectable, inject } from "inversify";
import { injectionTypes } from '../configs/injection.config';
import { ITestService } from './interfaces/i-test.service';
import { Test } from "../models/models.barrel";
import { ITestResource } from "../resources/interfaces/i-test.resource";

/**
 * TestService
 */
@injectable()
export class TestService implements ITestService {
	constructor(@inject(injectionTypes.resources.testResource) private _testResource: ITestResource) { }

	public getAll(): Test[] {
		return this._testResource.getAll();
	}

	get(id: number): Test {
		return this._testResource.get(id);
	}

	add(test: Test): number {
		return this._testResource.add(test);
	}

	update(test: Test): void {
		this._testResource.update(test);
	}

	remove(testId: number): void {
		this._testResource.remove(testId);
	}
}