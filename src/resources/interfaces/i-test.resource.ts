import { Test } from "../../models/test-models/test.model";

/**
 * ITestResource
 */
export interface ITestResource {
	getAll(): Test[];
	get(testId: number): Test;
	add(test: Test): number;
	update(test: Test): void;
	remove(testId: number): void;
}