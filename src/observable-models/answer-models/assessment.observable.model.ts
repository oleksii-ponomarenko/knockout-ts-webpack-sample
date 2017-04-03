import * as ko from 'knockout';
import { UserAnswerObservable } from './user-answer.observable.model';
import { Assessment, UserAnswer } from "../../models/models.barrel";

/**
 * Assessment
 */
export class AssessmentObservable {
	id: number;
	userAnswers: KnockoutObservableArray<UserAnswerObservable>;

	constructor(assessment: Assessment) {
		this.id = assessment.id;
		this.userAnswers = ko.observableArray(
			assessment.userAnswers.map((ua: UserAnswer) => new UserAnswerObservable(ua))
		);
	}
}