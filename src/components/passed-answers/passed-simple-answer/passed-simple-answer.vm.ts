import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";
import { QuestionType } from "../../../enums/question-type.enum";
import { UserAnswer, Assessment } from "../../../models/models.barrel";
import { IAssessmentService } from "../../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../../configs/injection.config";

/**
 * EditableSimpleAnswerViewModel
 */
export class PassedSimpleAnswerViewModel {
	public answer: AnswerObservable;
	public assessment: Assessment;
	public answerText: KnockoutObservable<string>;
	public questionId: number;
	public isRight: KnockoutObservable<boolean>;

	constructor(params: any) {
		this.answer = params.answer();
		this.questionId = params.questionId;
		this.assessment = params.assessment;

		let userAnswer = this.assessment.userAnswers.find(a => a.questionId === this.questionId && a.answerId === this.answer.id);
		userAnswer.text = userAnswer.text || '';
		this.answerText = ko.computed(() => userAnswer.text);
		this.isRight = ko.computed(() => this.answerText().toLowerCase() === this.answer.text().toLowerCase());
	}
};