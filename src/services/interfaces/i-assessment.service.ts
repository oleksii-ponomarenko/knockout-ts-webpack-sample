import { Assessment, UserAnswer } from "../../models/models.barrel";
import { QuestionType } from "../../enums/question-type.enum";

/**
 * IAssessmentService
 */
export interface IAssessmentService {
	getByTest(testId: number): Assessment[];
	get(id: number): Assessment;
	add(assessment: Assessment): number;
	update(assessment: Assessment): void;
	upsertAnswer(assessment: Assessment, userAnswer: UserAnswer, questionType: QuestionType): void;
	removeAnswer(assessment: Assessment, questionId: number, answerId: number): void;
}