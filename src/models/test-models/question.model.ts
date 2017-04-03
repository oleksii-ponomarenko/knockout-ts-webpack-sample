import { QuestionType } from "../../enums/question-type.enum";
import { Answer } from "./answer.model";

/**
 * Question
 */
export class Question {
	id: number;
	text: string;
	questionType: QuestionType;
	answers: Answer[] = [];
}