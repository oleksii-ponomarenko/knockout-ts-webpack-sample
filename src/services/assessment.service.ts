import { injectable, inject } from "inversify";
import { IAssessmentService } from "./interfaces/service-interfaces.barrel";
import { injectionTypes } from "../configs/injection.config";
import { IAssessmentResource } from "../resources/interfaces/resource-interfaces.barrel";
import { Assessment, UserAnswer } from "../models/models.barrel";
import { QuestionType } from "../enums/question-type.enum";

/**
 * AssessmentService
 */
@injectable()
export class AssessmentService implements IAssessmentService {
	constructor(
		@inject(injectionTypes.resources.assessmentResource)
		private _testResource: IAssessmentResource
	) { }

	getByTest(testId: number): Assessment[] {
		return this._testResource.getByTest(testId);
	}

	get(id: number): Assessment {
		return this._testResource.get(id);
	}

	add(assessment: Assessment): number {
		return this._testResource.add(assessment);
	}

	update(assessment: Assessment): void {
		this._testResource.update(assessment);
	}

	upsertAnswer(assessment: Assessment, userAnswer: UserAnswer, questionType: QuestionType): void {
		let answers = assessment.userAnswers;
		let existingAnswers = answers.filter(a => a.questionId === userAnswer.questionId);

		if (questionType === QuestionType.radio || questionType === QuestionType.simple) {
			existingAnswers.forEach(a => answers.splice(answers.indexOf(a), 1));
		}

		userAnswer.id = +new Date();
		answers.push(userAnswer);
	}

	removeAnswer(assessment: Assessment, questionId: number, answerId: number): void {
		let answerIndex = assessment.userAnswers.findIndex(a => a.answerId === answerId && a.questionId === questionId);
		assessment.userAnswers.splice(answerIndex, 1);
	}
}