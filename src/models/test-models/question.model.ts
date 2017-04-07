import { QuestionType } from "../../enums/question-type.enum";
import { Answer } from "./answer.model";

/**
 * Question
 */
export class Question {
	public id: number;
	public text: string;
	public questionType: QuestionType;
	public answers: Answer[] = [];
	public sortOrder?: number;
}