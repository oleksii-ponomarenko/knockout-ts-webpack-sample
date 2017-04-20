import * as ko from 'knockout';
import { QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { QuestionType } from "../../enums/question-type.enum";
import { Answer, Assessment, UserAnswer } from "../../models/models.barrel";
import { IAssessmentService } from "../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../configs/injection.config";

/**
 * EditableQuestionViewModel
 */
export class QuestionViewModel {
	private _removeQuestion: (answer: QuestionObservable) => void;
	private _assessmentService: IAssessmentService;

	public question: QuestionObservable;
	public questionTypes: KnockoutObservableArray<number>;
	public chosenRadioAnswerId: KnockoutObservable<number>;
	public assessment: Assessment;

	constructor(params: any) {
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);

		this.question = params.question;
		this._removeQuestion = params.removeQuestion;

		this.chosenRadioAnswerId = ko.observable(0);
		this.chosenRadioAnswerId.subscribe(this.selectAnswer, this);
		this.assessment = params.assessment;
	}

	selectAnswer(answerId: number) {
		let answer = new UserAnswer();
		answer.answerId = answerId;
		answer.questionId = this.question.id;
		this._assessmentService.upsertAnswer(this.assessment, answer, QuestionType.radio);
	}
};