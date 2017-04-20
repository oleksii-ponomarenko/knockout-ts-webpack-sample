import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";
import { Assessment, UserAnswer } from "../../../models/models.barrel";
import { IAssessmentService } from "../../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../../configs/injection.config";
import { QuestionType } from "../../../enums/question-type.enum";

/**
 * EditableCheckboxAnswerViewModel
 */
export class PassedCheckboxAnswerViewModel {
	private _assessmentService: IAssessmentService;

	public answer: AnswerObservable;
	public assessment: Assessment;
	public isSelected: KnockoutObservable<boolean>;
	public questionId: number;
	public correctionClass: KnockoutObservable<string>;

	constructor(params: any) {
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);

		this.answer = params.answer;
		this.assessment = params.assessment;
		this.questionId = params.questionId;

		let userAnswer = this.assessment.userAnswers.find(a => a.questionId === this.questionId && a.answerId === this.answer.id);
		this.isSelected = ko.computed(() => !!userAnswer);
		this.correctionClass = ko.computed(() => this.answer.isRight() ? 'text-success' : (this.isSelected() ? 'text-danger' : ''));
	}
};