import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";
import { QuestionType } from "../../../enums/question-type.enum";
import { UserAnswer, Assessment } from "../../../models/models.barrel";
import { IAssessmentService } from "../../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../../configs/injection.config";

/**
 * EditableSimpleAnswerViewModel
 */
export class SimpleAnswerViewModel {
	private _assessmentService: IAssessmentService;

	public answer: AnswerObservable;
	public assessment: Assessment;
	public answerText: KnockoutObservable<string>;
	public questionId: number;

	constructor(params: any) {
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);

		this.answer = params.answer();
		this.questionId = params.questionId;
		this.assessment = params.assessment;

		this.answerText = ko.observable('');
		this.answerText.subscribe(this.handleTextChange, this);
	}

	handleTextChange(text: string) {
		let answer = new UserAnswer();
		answer.answerId = this.answer.id;
		answer.questionId = this.questionId;
		answer.text = text || '';
		this._assessmentService.upsertAnswer(this.assessment, answer, QuestionType.simple);
	}
};