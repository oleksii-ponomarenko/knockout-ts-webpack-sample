import { Assessment } from "../../models/models.barrel";

/*
 * IAssessmentResource
 */

export interface IAssessmentResource {
	getByTest(testId: number): Assessment[];
	get(id: number): Assessment;
	add(assessment: Assessment): number;
	update(assessment: Assessment): void;
}