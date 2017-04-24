import { NightWatchBrowser } from "../../typings/nightwatch/index";
import { HomePageObject } from "../page-objects/home.page-object";
import { EditTestPageObject } from "../page-objects/edit-test.page-object";
import { QuestionType } from "../../src/enums/question-type.enum";

let tests = {
	'Edit test page: Work with questions -> Should add, enter text, save, delete successfully': (browser: NightWatchBrowser) => {
		let home = new HomePageObject(browser);
		home
			.navigate()
			.waitLoaded()
			.clickAddTestButton()
			.clickEditLastTest()
			.waitLoaded()
			.verifyVisibilityOfSaveButton(false)
			.clickAddQuestion()
			.verifyAddedQuestion()
			.enterQuestionText('Awesome question')
			.verifyVisibilityOfSaveButton(true)
			.clickSave()
			.verifyVisibilityOfSaveButton(false)
			.verifyQuestionIsSaved()
			.clickDeleteQuestion()
			.verifyVisibilityOfSaveButton(true)
			.clickSave()
			.verifyVisibilityOfSaveButton(false)
			.verifyQuestionDeletion();

		browser.end();
	},
	'Edit test page: Work with simple answer -> Should change answer\'s text': (browser: NightWatchBrowser) => {
		let home = new HomePageObject(browser);
		home
			.navigate()
			.waitLoaded()
			.clickAddTestButton()
			.clickEditLastTest()
			.waitLoaded()
			.clickAddQuestion()
			.verifyQuestionType(QuestionType.simple)
			.enterSimpleAnswerText('Awesome simple answer')
			.verifyVisibilityOfSaveButton(true)
			.clickSave()
			.verifyChangeOfSimpleAnswerText();

		browser.end();
	}
};

export = tests;