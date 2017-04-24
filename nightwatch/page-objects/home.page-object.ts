import { NightWatchBrowser } from "../../typings/nightwatch/index";
import { EditTestPageObject } from "./edit-test.page-object";

/**
 * HomePageObject
 */
export class HomePageObject {
	static readonly homePageSelector: string = '#homePage';
	static readonly testsTableSelector: string = '#testsList';
	static readonly testRowsSelector: string = '#testsList tbody tr';
	static readonly addTestButtonSelector: string = '#addTestBtn';
	static readonly lastTestRowSelector: string = '#testsList tbody tr:last-child';
	static readonly lastSaveButtonSelector: string = '#testsList tbody tr:last-child td:last-child > a:first-child';
	static readonly testNameInputSelector: string = '#testsList tbody tr:last-child input[name="testName"]';
	static readonly lastEditButtonSelector: string = '#testsList tbody tr:last-child td:last-child > a:nth-child(2)';
	static readonly lastRemoveButtonSelector: string = '#testsList tbody tr:last-child td:last-child > a:nth-child(3)';

	private testsCount: number = 0;
	private latestTestName: string = '';

	constructor(private browser: NightWatchBrowser) { }

	navigate(): HomePageObject {
		this.browser.url("http://localhost:4100");

		return this;
	}

	waitLoaded(delay: number = 1000): HomePageObject {
		this.browser.waitForElementVisible(HomePageObject.homePageSelector, delay);

		return this;
	}

	clickAddTestButton(): HomePageObject {
		this.browser.elements('css selector', HomePageObject.testRowsSelector, c => {
			this.testsCount = c.value.length;
		});
		this.browser.click(HomePageObject.addTestButtonSelector);

		return this;
	}

	verifyTestAddition(): HomePageObject {
		this.browser.elements('css selector', HomePageObject.testRowsSelector, c => {
			let oldTestCount = this.testsCount;
			this.testsCount = c.value.length;
			this.browser.assert.equal(this.testsCount - oldTestCount, 1, 'Test should be added.');
		});

		return this;
	}

	verifyVisibilitySaveButtonForAddedTest(visible: boolean): HomePageObject {
		this.browser.element('css selector', HomePageObject.lastSaveButtonSelector, c => {
			this.browser.elementIdDisplayed(c.value.ELEMENT, c1 => {
				this.browser.assert.equal(c1.value, visible, `Save button should ${visible?'':'not '}be visible`);
			});
		});

		return this;
	}

	renameLatestTest(name: string): HomePageObject {
		this.browser.clearValue(HomePageObject.testNameInputSelector);
		this.browser.setValue(HomePageObject.testNameInputSelector, name);
		this.browser.execute(`document.querySelector("${HomePageObject.testNameInputSelector}").blur()`);

		this.latestTestName = name;
		return this;
	}

	verifyRenamingOfTest(): HomePageObject {
		this.browser.refresh();
		this.browser.waitForElementPresent(HomePageObject.testNameInputSelector, 1000);
		this.browser.getValue(HomePageObject.testNameInputSelector, c => {
			this.browser.assert.equal(c.value, this.latestTestName, 'Test name should be changed');
		});

		return this;
	}

	clickSaveButton(): HomePageObject {
		this.browser.click(HomePageObject.lastSaveButtonSelector);

		return this;
	}

	deleteTest(): HomePageObject {
		this.browser.click(HomePageObject.lastRemoveButtonSelector);

		return this;
	}

	verifyDeletionOfTest(): HomePageObject {
		this.browser.elements('css selector', HomePageObject.testRowsSelector, c => {
			let oldTestCount = this.testsCount;
			this.testsCount = c.value.length;
			this.browser.assert.equal(oldTestCount - this.testsCount, 1, 'Test should be removed.');
		});

		return this;
	}

	clickEditLastTest(): EditTestPageObject {
		this.browser.click(HomePageObject.lastEditButtonSelector);
		let editTestPage = new EditTestPageObject(this.browser);

		return editTestPage;
	}
}