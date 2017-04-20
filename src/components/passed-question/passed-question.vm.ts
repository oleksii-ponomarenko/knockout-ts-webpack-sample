import * as ko from 'knockout';
import { QuestionObservable, AnswerObservable } from "../../observable-models/observable-models.barrel";
import { QuestionType } from "../../enums/question-type.enum";
import { Answer, Assessment, UserAnswer } from "../../models/models.barrel";
import { IAssessmentService, ICorrectnessService } from "../../services/interfaces/service-interfaces.barrel";
import container, { injectionTypes } from "../../configs/injection.config";

/**
 * PassedQuestionViewModel
 */
export class PassedQuestionViewModel {
	private _removeQuestion: (answer: QuestionObservable) => void;
	private _assessmentService: IAssessmentService;
	private _correctnessService: ICorrectnessService;

	public question: QuestionObservable;
	public questionTypes: KnockoutObservableArray<number>;
	public chosenRadioAnswerId: KnockoutObservable<number>;
	public assessment: Assessment;
	public correctionClass: KnockoutObservable<string>;

	constructor(params: any) {
		this._assessmentService = container.get<IAssessmentService>(injectionTypes.services.assessmentService);
		this._correctnessService = container.get<ICorrectnessService>(injectionTypes.services.correctnessService);

		this.question = params.question;
		this._removeQuestion = params.removeQuestion;
		this.assessment = params.assessment;

		if (this.question.questionType() === QuestionType.radio) {
			let selectedUserAnswer = this.assessment.userAnswers.find(a => a.questionId === this.question.id);

			this.chosenRadioAnswerId = ko.computed(() => selectedUserAnswer ? selectedUserAnswer.answerId : 0);
		}

		let userAnswers = this.assessment.userAnswers.filter(ua => ua.questionId === this.question.id);

		// this.setCorrectnessClass();
		this.correctionClass = ko.computed(() =>
			this._correctnessService.calculateQuestionCorrectness(this.question, userAnswers)
				? 'well-success'
				: 'well-danger');
	}

	setCorrectnessClass() {
		let userAnswers = this.assessment.userAnswers.filter(ua => ua.questionId === this.question.id);

		if (this.question.questionType() === QuestionType.simple) {
			let simpleUserAnswer = userAnswers[0];
			let simpleAnswer = this.question.answers()[0];
			simpleUserAnswer.text = simpleUserAnswer.text || '';

			this.correctionClass = ko.computed(() => simpleUserAnswer.text.toLowerCase() === simpleAnswer.text().toLowerCase()
				? 'well-success'
				: 'well-danger');
		} else {
			let answers = this.question.answers;

			let selectedAnswers = ko.computed(() => answers().filter(a => userAnswers.find(ua => ua.answerId === a.id)));
			this.correctionClass = ko.computed(() => selectedAnswers().filter(a => a.isRight()).length > 0 && selectedAnswers().filter(a => !a.isRight()).length === 0
				? 'well-success'
				: 'well-danger');
		}
	}
};