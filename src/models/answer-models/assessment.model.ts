import { UserAnswer } from './user-answer.model';

/**
 * Assessment
 */
export class Assessment {
	id: number;
	testId: number;
	userAnswers: UserAnswer[] = [];
	isFinished: boolean = false;
}