import { NightWatchBrowser } from "../../typings/nightwatch/index";
import { QuestionType } from "../../src/enums/question-type.enum";

/**
 * EditTestPageObject
 */
export class EditTestPageObject {
	static readonly testPageSelector: string = '#testPage';
	static readonly addQuestionButtonSelector: string = '#addQuestionBtn';
	static readonly questionRowsSelector: string = 'editable-question';
	static readonly questionTextInputSelector: string = 'editable-question:last-child input[name="question-text"]';
	static readonly simpleAnswerTextInputSelector: string = 'editable-question:last-child editable-simple-answer input';
	static readonly saveButtonSelector: string = '#saveTestBtn';
	static readonly deleteQuestionButtonSelector: string = 'editable-question:last-child > .well > .close';
	static readonly questionTypeDropDownSelector: string = 'editable-question:last-child select[name="type"]';
	static readonly simpleOptionSelector: string = 'editable-question:last-child select[name="type"] > option[value="1"]';
	static readonly radioOptionSelector: string = 'editable-question:last-child select[name="type"] > option[value="2"]';
	static readonly checkboxOptionSelector: string = 'editable-question:last-child select[name="type"] > option[value="3"]';

	private questionsCount: number = 0;
	private latestQuestionText: string = '';
	private latestSimpleAnswerText: string = '';

	constructor(private browser: NightWatchBrowser) { }

	waitLoaded(): EditTestPageObject {
		this.browser.waitForElementVisible(EditTestPageObject.testPageSelector, 1000);

		return this;
	}

	clickAddQuestion(): EditTestPageObject {
		this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, c => {
			this.questionsCount = c.value.length;
		});
		this.browser.click(EditTestPageObject.addQuestionButtonSelector);

		return this;
	}

	verifyAddedQuestion(): EditTestPageObject {
		this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, c => {
			let oldQuestionsCount = this.questionsCount;
			this.questionsCount = c.value.length;
			this.browser.assert.equal(this.questionsCount - oldQuestionsCount, 1, 'Question should be added.');
		});

		return this;
	}

	enterQuestionText(text: string): EditTestPageObject {
		this.browser.clearValue(EditTestPageObject.questionTextInputSelector);
		this.browser.setValue(EditTestPageObject.questionTextInputSelector, text);
		this.browser.execute(`document.querySelector("${EditTestPageObject.questionTextInputSelector}").blur()`);

		this.latestQuestionText = text;
		return this;
	}

	verifyVisibilityOfSaveButton(visible: boolean): EditTestPageObject {
		this.browser.isVisible(EditTestPageObject.saveButtonSelector, c => {
			this.browser.assert.equal(c.value, visible, `Save button should ${visible?'':'not '}be visible`);
		});

		return this;
	}

	clickSave(): EditTestPageObject {
		this.browser.click(EditTestPageObject.saveButtonSelector);

		return this;
	}

	verifyQuestionIsSaved(): EditTestPageObject {
		this.browser.refresh();
		this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, c => {
			let oldQuestionsCount = this.questionsCount;
			this.questionsCount = c.value.length;
			this.browser.assert.equal(this.questionsCount, oldQuestionsCount, 'Question should be saved.');
		});
		this.browser.verify.value(EditTestPageObject.questionTextInputSelector, this.latestQuestionText, 'Question text should be saved.')

		return this;
	}

	clickDeleteQuestion(): EditTestPageObject {
		this.browser.click(EditTestPageObject.deleteQuestionButtonSelector);

		return this;
	}

	verifyQuestionDeletion(): EditTestPageObject {
		this.browser.refresh();
		this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, c => {
			let oldQuestionsCount = this.questionsCount;
			this.questionsCount = c.value.length;
			this.browser.assert.equal(this.questionsCount, oldQuestionsCount - 1, 'Question should be saved.');
		});

		return this;
	}

	verifyQuestionType(questionType: QuestionType): EditTestPageObject {
		this.browser.verify.value(EditTestPageObject.questionTypeDropDownSelector, questionType.toString());

		return this;
	}

	enterSimpleAnswerText(text: string): EditTestPageObject {
		this.browser.clearValue(EditTestPageObject.simpleAnswerTextInputSelector);
		this.browser.setValue(EditTestPageObject.simpleAnswerTextInputSelector, text);
		this.browser.execute(`document.querySelector("${EditTestPageObject.simpleAnswerTextInputSelector}").blur()`);

		this.latestSimpleAnswerText = text;
		return this;
	}

	verifyChangeOfSimpleAnswerText(): EditTestPageObject {
		this.browser.refresh();
		this.browser.verify.value(EditTestPageObject.simpleAnswerTextInputSelector, this.latestSimpleAnswerText, 'Simple answer text should be saved.')

		return this;
	}
}