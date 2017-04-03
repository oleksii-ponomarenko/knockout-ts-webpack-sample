import * as ko from 'knockout';
import { UserAnswer } from "../../models/models.barrel";

/**
 * UserAnswer
 */
export class UserAnswerObservable {
	id: number;
	questionId: KnockoutObservable<number>;
	answerId: KnockoutObservable<number>;
	assessmentId: KnockoutObservable<number>;

	constructor(userAnswer: UserAnswer) {
		this.id = userAnswer.id;
		this.questionId = ko.observable(userAnswer.questionId);
		this.answerId = ko.observable(userAnswer.answerId);
		this.assessmentId = ko.observable(userAnswer.assessmentId);
	}
}