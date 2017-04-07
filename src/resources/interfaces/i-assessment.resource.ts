import { Assessment } from "../../models/models.barrel";

/*
 * IAssessmentResource
 */

export interface IAssessmentResource {
	get(id: number): Assessment;
	add(assessment: Assessment): number;
	update(assessment: Assessment): number;
}