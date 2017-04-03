import { UserAnswer } from './user-answer.model';

/**
 * Assessment
 */
export class Assessment {
	id: number;
	userAnswers: UserAnswer[]
}