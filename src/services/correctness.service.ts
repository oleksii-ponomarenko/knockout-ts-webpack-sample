import { ICorrectnessService } from "./interfaces/service-interfaces.barrel";
import { UserAnswer } from "../models/models.barrel";
import { QuestionObservable, TestObservable } from "../observable-models/observable-models.barrel";
import { QuestionType } from "../enums/question-type.enum";
import { injectable } from "inversify";

/**
 * CorrectnessService
 */
@injectable()
export class CorrectnessService implements ICorrectnessService {
	constructor() {
		
	}

	calculateQuestionCorrectness(question:QuestionObservable, userAnswers: UserAnswer[]): number {
		let isCorrect: boolean = false;
		
		if (question.questionType() === QuestionType.simple) {
			let simpleUserAnswer = userAnswers[0];
			let simpleAnswer = question.answers()[0];
			simpleUserAnswer.text = simpleUserAnswer.text || '';

			isCorrect = simpleUserAnswer.text.toLowerCase() === simpleAnswer.text().toLowerCase();
		} else {
			let answers = question.answers;

			let selectedAnswers = answers().filter(a => userAnswers.find(ua => ua.answerId === a.id));
			isCorrect = selectedAnswers.filter(a => a.isRight()).length === answers().filter(a => a.isRight()).length &&
				selectedAnswers.filter(a => a.isRight()).length > 0 &&
				selectedAnswers.filter(a => !a.isRight()).length === 0;
		}

		return +isCorrect;
	}

	calculateTestCorrectness(test: TestObservable, userAnswers: UserAnswer[]): number {
		let finalMark: number = 0;
		let answersMap: { [questionId: number]: UserAnswer[] } = { };

		test.questions().forEach(q => {
			answersMap[q.id] = [ ];
		});

		userAnswers.forEach(ua => {
			answersMap[ua.questionId].push(ua);
		});

		test.questions().forEach(q => {
			finalMark += this.calculateQuestionCorrectness(q, answersMap[q.id]);
		});

		return finalMark;
	}

	calculateMaxMark(test: TestObservable): number {
		return test.questions().length;
	}
}