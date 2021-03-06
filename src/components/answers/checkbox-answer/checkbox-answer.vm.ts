import * as ko from 'knockout';
import { AnswerObservable } from "../../../observable-models/observable-models.barrel";
import { Assessment, UserAnswer } from "../../../models/models.barrel";
import { IAssessmentService } from "../../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../../configs/injection.config";
import { QuestionType } from "../../../enums/question-type.enum";

/**
 * EditableCheckboxAnswerViewModel
 */
export class CheckboxAnswerViewModel {
	private _assessmentService: IAssessmentService;

	public answer: AnswerObservable;
	public assessment: Assessment;
	public isSelected: KnockoutObservable<boolean>;
	public questionId: number;

	constructor(params: any) {
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);

		this.answer = params.answer;
		this.assessment = params.assessment;
		this.questionId = params.questionId;

		this.isSelected = ko.observable(false);
		this.isSelected.subscribe(this.handleSelectionChange, this);
	}

	handleSelectionChange(isSelected: boolean) {
		if (isSelected) {
			let userAnswer = new UserAnswer();
			userAnswer.questionId = this.questionId;
			userAnswer.answerId = this.answer.id;

			this._assessmentService.upsertAnswer(this.assessment, userAnswer, QuestionType.checkbox);
		} else {
			this._assessmentService.removeAnswer(this.assessment, this.questionId, this.answer.id);
		}
	}
};