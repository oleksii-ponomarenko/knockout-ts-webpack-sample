import { injectable } from "inversify";
import { IAssessmentResource } from "./interfaces/i-assessment.resource";
import { Assessment } from "../models/models.barrel";

const _assessmentStorageKey: string = 'assessments';

/**
 * AssessmentResource
 */
@injectable()
export class AssessmentResource implements IAssessmentResource {
	get(id: number): Assessment {
		throw new Error('Method not implemented.');
	}
	add(assessment: Assessment): number {
		throw new Error('Method not implemented.');
	}
	update(assessment: Assessment): number {
		throw new Error('Method not implemented.');
	}

	private getTests(): Assessment[] {
		return JSON.parse(window.localStorage.getItem(_assessmentStorageKey)) || [ ];
	}

	private saveTests(tests: Assessment[]): void {
		window.localStorage.setItem(_assessmentStorageKey, JSON.stringify(tests));
	}
}