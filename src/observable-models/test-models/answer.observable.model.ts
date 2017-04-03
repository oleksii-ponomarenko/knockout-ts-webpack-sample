import * as ko from 'knockout';
import { Answer } from "../../models/models.barrel";

/**
 * Answer
 */
export class AnswerObservable {
	private get _destroy(): boolean {
		return this.isDestroyed();
	};

	private set _destroy(value: boolean) {
		this.isDestroyed(value);
	};

	public id: number;
	public text: KnockoutObservable<string>;
	public isRight: KnockoutObservable<boolean>;
	public originalAnswer: KnockoutObservable<Answer>;
	public isChanged: KnockoutObservable<boolean>;
	public isDestroyed: KnockoutObservable<boolean>;

	constructor()
	constructor(answer: Answer)
	constructor(answer?: Answer) {
		this.originalAnswer = ko.observable(answer);

		if (!answer) {
			answer = { id: +new Date(), isRight: false, text: '' };
		}

		this.id = answer.id;
		this.text = ko.observable(answer.text);
		this.isRight = ko.observable(answer.isRight);
		this.isDestroyed = ko.observable(false);
		this.isChanged = ko.computed(() => !this.equalsTo(this.originalAnswer()));
	}

	toAnswer(): Answer {
		let answer: Answer = {
			id: this.id,
			text: this.text(),
			isRight: this.isRight()
		};

		return answer;
	}

	equalsTo(answer: Answer): boolean {
		return answer &&
			this.id === answer.id &&
			this.text() === answer.text &&
			this.isRight() === answer.isRight &&
			!this.isDestroyed();
	}
}