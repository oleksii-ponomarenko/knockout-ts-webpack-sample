import { injectable } from "inversify";
import { Assessment } from "../models/models.barrel";
import { IAssessmentResource } from "./interfaces/resource-interfaces.barrel";

const _assessmentStorageKey: string = 'assessments';

/**
 * AssessmentResource
 */
@injectable()
export class AssessmentResource implements IAssessmentResource {
	getByTest(testId: number): Assessment[] {
		let assessments: Assessment[] = this.getAssessments();
		let foundAssessments: Assessment[] = assessments.filter(a => a.testId === testId);

		return foundAssessments;
	}

	get(id: number): Assessment {
		let assessments: Assessment[] = this.getAssessments();
		let foundAssessment: Assessment = assessments.find(a => a.id === id);

		return foundAssessment;
	}

	add(assessment: Assessment): number {
		assessment.id = +new Date();
		let assessments = this.getAssessments();

		assessments.push(assessment);
		this.saveAssessments(assessments);

		return assessment.id;
	}

	update(assessment: Assessment): void {
		let assessments: Assessment[] = this.getAssessments();
		let assessmentIndex = assessments.findIndex(a => a.id === assessment.id);

		assessments[assessmentIndex] = assessment;

		this.saveAssessments(assessments);
	}

	private getAssessments(): Assessment[] {
		return JSON.parse(window.localStorage.getItem(_assessmentStorageKey)) || [ ];
	}

	private saveAssessments(assessments: Assessment[]): void {
		window.localStorage.setItem(_assessmentStorageKey, JSON.stringify(assessments));
	}
}