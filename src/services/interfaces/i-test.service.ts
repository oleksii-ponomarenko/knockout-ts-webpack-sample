import { Test } from "../../models/models.barrel";

/**
 * ITestService
 */
export interface ITestService {
	getAll(): Test[];
	get(id: number): Test;
	add(test: Test): number;
	update(test: Test): void;
	remove(testId: number): void;
}