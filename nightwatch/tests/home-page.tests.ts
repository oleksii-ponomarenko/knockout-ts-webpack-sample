import { NightWatchBrowser } from "../../typings/nightwatch/index";
import { HomePageObject } from "../page-objects/home.page-object";

let tests = {
	"Home page: Work with test -> Should add, rename, save, delete successfully": function(browser: NightWatchBrowser) {
		let home = new HomePageObject(browser);
		home
			.navigate()
			.waitLoaded()
			.clickAddTestButton()
			.verifyTestAddition()
			.verifyVisibilitySaveButtonForAddedTest(false)
			.renameLatestTest('Awesome test')
			.verifyVisibilitySaveButtonForAddedTest(true)
			.clickSaveButton()
			.verifyVisibilitySaveButtonForAddedTest(false)
			.verifyRenamingOfTest()
			.deleteTest()
			.verifyDeletionOfTest();

		browser.end();
	}
};

export = tests;