import { QuestionObservable, TestObservable } from "../../observable-models/observable-models.barrel";
import { UserAnswer } from "../../models/models.barrel";

/**
 * ICorrectnessService
 */
export interface ICorrectnessService {
	calculateQuestionCorrectness(question: QuestionObservable, userAnswers: UserAnswer[]): number;
	calculateTestCorrectness(test: TestObservable, userAnswers: UserAnswer[]): number;
	calculateMaxMark(test: TestObservable): number;
}