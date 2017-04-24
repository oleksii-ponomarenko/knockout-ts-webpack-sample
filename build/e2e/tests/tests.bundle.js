exports["Nightwatch tests"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var edit_test_page_object_1 = __webpack_require__(3);
/**
 * HomePageObject
 */
var HomePageObject = (function () {
    function HomePageObject(browser) {
        this.browser = browser;
        this.testsCount = 0;
        this.latestTestName = '';
    }
    HomePageObject.prototype.navigate = function () {
        this.browser.url("http://localhost:4100");
        return this;
    };
    HomePageObject.prototype.waitLoaded = function (delay) {
        if (delay === void 0) { delay = 1000; }
        this.browser.waitForElementVisible(HomePageObject.homePageSelector, delay);
        return this;
    };
    HomePageObject.prototype.clickAddTestButton = function () {
        var _this = this;
        this.browser.elements('css selector', HomePageObject.testRowsSelector, function (c) {
            _this.testsCount = c.value.length;
        });
        this.browser.click(HomePageObject.addTestButtonSelector);
        return this;
    };
    HomePageObject.prototype.verifyTestAddition = function () {
        var _this = this;
        this.browser.elements('css selector', HomePageObject.testRowsSelector, function (c) {
            var oldTestCount = _this.testsCount;
            _this.testsCount = c.value.length;
            _this.browser.assert.equal(_this.testsCount - oldTestCount, 1, 'Test should be added.');
        });
        return this;
    };
    HomePageObject.prototype.verifyVisibilitySaveButtonForAddedTest = function (visible) {
        var _this = this;
        this.browser.element('css selector', HomePageObject.lastSaveButtonSelector, function (c) {
            _this.browser.elementIdDisplayed(c.value.ELEMENT, function (c1) {
                _this.browser.assert.equal(c1.value, visible, "Save button should " + (visible ? '' : 'not ') + "be visible");
            });
        });
        return this;
    };
    HomePageObject.prototype.renameLatestTest = function (name) {
        this.browser.clearValue(HomePageObject.testNameInputSelector);
        this.browser.setValue(HomePageObject.testNameInputSelector, name);
        this.browser.execute("document.querySelector(\"" + HomePageObject.testNameInputSelector + "\").blur()");
        this.latestTestName = name;
        return this;
    };
    HomePageObject.prototype.verifyRenamingOfTest = function () {
        var _this = this;
        this.browser.refresh();
        this.browser.waitForElementPresent(HomePageObject.testNameInputSelector, 1000);
        this.browser.getValue(HomePageObject.testNameInputSelector, function (c) {
            _this.browser.assert.equal(c.value, _this.latestTestName, 'Test name should be changed');
        });
        return this;
    };
    HomePageObject.prototype.clickSaveButton = function () {
        this.browser.click(HomePageObject.lastSaveButtonSelector);
        return this;
    };
    HomePageObject.prototype.deleteTest = function () {
        this.browser.click(HomePageObject.lastRemoveButtonSelector);
        return this;
    };
    HomePageObject.prototype.verifyDeletionOfTest = function () {
        var _this = this;
        this.browser.elements('css selector', HomePageObject.testRowsSelector, function (c) {
            var oldTestCount = _this.testsCount;
            _this.testsCount = c.value.length;
            _this.browser.assert.equal(oldTestCount - _this.testsCount, 1, 'Test should be removed.');
        });
        return this;
    };
    HomePageObject.prototype.clickEditLastTest = function () {
        this.browser.click(HomePageObject.lastEditButtonSelector);
        var editTestPage = new edit_test_page_object_1.EditTestPageObject(this.browser);
        return editTestPage;
    };
    return HomePageObject;
}());
HomePageObject.homePageSelector = '#homePage';
HomePageObject.testsTableSelector = '#testsList';
HomePageObject.testRowsSelector = '#testsList tbody tr';
HomePageObject.addTestButtonSelector = '#addTestBtn';
HomePageObject.lastTestRowSelector = '#testsList tbody tr:last-child';
HomePageObject.lastSaveButtonSelector = '#testsList tbody tr:last-child td:last-child > a:first-child';
HomePageObject.testNameInputSelector = '#testsList tbody tr:last-child input[name="testName"]';
HomePageObject.lastEditButtonSelector = '#testsList tbody tr:last-child td:last-child > a:nth-child(2)';
HomePageObject.lastRemoveButtonSelector = '#testsList tbody tr:last-child td:last-child > a:nth-child(3)';
exports.HomePageObject = HomePageObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var home_page_object_1 = __webpack_require__(0);
var question_type_enum_1 = __webpack_require__(5);
var tests = {
    'Edit test page: Work with questions -> Should add, enter text, save, delete successfully': function (browser) {
        var home = new home_page_object_1.HomePageObject(browser);
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
    'Edit test page: Work with simple answer -> Should change answer\'s text': function (browser) {
        var home = new home_page_object_1.HomePageObject(browser);
        home
            .navigate()
            .waitLoaded()
            .clickAddTestButton()
            .clickEditLastTest()
            .waitLoaded()
            .clickAddQuestion()
            .verifyQuestionType(question_type_enum_1.QuestionType.simple)
            .enterSimpleAnswerText('Awesome simple answer')
            .verifyVisibilityOfSaveButton(true)
            .clickSave()
            .verifyChangeOfSimpleAnswerText();
        browser.end();
    }
};
module.exports = tests;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var home_page_object_1 = __webpack_require__(0);
var tests = {
    "Home page: Work with test -> Should add, rename, save, delete successfully": function (browser) {
        var home = new home_page_object_1.HomePageObject(browser);
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
module.exports = tests;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * EditTestPageObject
 */
var EditTestPageObject = (function () {
    function EditTestPageObject(browser) {
        this.browser = browser;
        this.questionsCount = 0;
        this.latestQuestionText = '';
        this.latestSimpleAnswerText = '';
    }
    EditTestPageObject.prototype.waitLoaded = function () {
        this.browser.waitForElementVisible(EditTestPageObject.testPageSelector, 1000);
        return this;
    };
    EditTestPageObject.prototype.clickAddQuestion = function () {
        var _this = this;
        this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, function (c) {
            _this.questionsCount = c.value.length;
        });
        this.browser.click(EditTestPageObject.addQuestionButtonSelector);
        return this;
    };
    EditTestPageObject.prototype.verifyAddedQuestion = function () {
        var _this = this;
        this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, function (c) {
            var oldQuestionsCount = _this.questionsCount;
            _this.questionsCount = c.value.length;
            _this.browser.assert.equal(_this.questionsCount - oldQuestionsCount, 1, 'Question should be added.');
        });
        return this;
    };
    EditTestPageObject.prototype.enterQuestionText = function (text) {
        this.browser.clearValue(EditTestPageObject.questionTextInputSelector);
        this.browser.setValue(EditTestPageObject.questionTextInputSelector, text);
        this.browser.execute("document.querySelector(\"" + EditTestPageObject.questionTextInputSelector + "\").blur()");
        this.latestQuestionText = text;
        return this;
    };
    EditTestPageObject.prototype.verifyVisibilityOfSaveButton = function (visible) {
        var _this = this;
        this.browser.isVisible(EditTestPageObject.saveButtonSelector, function (c) {
            _this.browser.assert.equal(c.value, visible, "Save button should " + (visible ? '' : 'not ') + "be visible");
        });
        return this;
    };
    EditTestPageObject.prototype.clickSave = function () {
        this.browser.click(EditTestPageObject.saveButtonSelector);
        return this;
    };
    EditTestPageObject.prototype.verifyQuestionIsSaved = function () {
        var _this = this;
        this.browser.refresh();
        this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, function (c) {
            var oldQuestionsCount = _this.questionsCount;
            _this.questionsCount = c.value.length;
            _this.browser.assert.equal(_this.questionsCount, oldQuestionsCount, 'Question should be saved.');
        });
        this.browser.verify.value(EditTestPageObject.questionTextInputSelector, this.latestQuestionText, 'Question text should be saved.');
        return this;
    };
    EditTestPageObject.prototype.clickDeleteQuestion = function () {
        this.browser.click(EditTestPageObject.deleteQuestionButtonSelector);
        return this;
    };
    EditTestPageObject.prototype.verifyQuestionDeletion = function () {
        var _this = this;
        this.browser.refresh();
        this.browser.elements('css selector', EditTestPageObject.questionRowsSelector, function (c) {
            var oldQuestionsCount = _this.questionsCount;
            _this.questionsCount = c.value.length;
            _this.browser.assert.equal(_this.questionsCount, oldQuestionsCount - 1, 'Question should be saved.');
        });
        return this;
    };
    EditTestPageObject.prototype.verifyQuestionType = function (questionType) {
        this.browser.verify.value(EditTestPageObject.questionTypeDropDownSelector, questionType.toString());
        return this;
    };
    EditTestPageObject.prototype.enterSimpleAnswerText = function (text) {
        this.browser.clearValue(EditTestPageObject.simpleAnswerTextInputSelector);
        this.browser.setValue(EditTestPageObject.simpleAnswerTextInputSelector, text);
        this.browser.execute("document.querySelector(\"" + EditTestPageObject.simpleAnswerTextInputSelector + "\").blur()");
        this.latestSimpleAnswerText = text;
        return this;
    };
    EditTestPageObject.prototype.verifyChangeOfSimpleAnswerText = function () {
        this.browser.refresh();
        this.browser.verify.value(EditTestPageObject.simpleAnswerTextInputSelector, this.latestSimpleAnswerText, 'Simple answer text should be saved.');
        return this;
    };
    return EditTestPageObject;
}());
EditTestPageObject.testPageSelector = '#testPage';
EditTestPageObject.addQuestionButtonSelector = '#addQuestionBtn';
EditTestPageObject.questionRowsSelector = 'editable-question';
EditTestPageObject.questionTextInputSelector = 'editable-question:last-child input[name="question-text"]';
EditTestPageObject.simpleAnswerTextInputSelector = 'editable-question:last-child editable-simple-answer input';
EditTestPageObject.saveButtonSelector = '#saveTestBtn';
EditTestPageObject.deleteQuestionButtonSelector = 'editable-question:last-child > .well > .close';
EditTestPageObject.questionTypeDropDownSelector = 'editable-question:last-child select[name="type"]';
EditTestPageObject.simpleOptionSelector = 'editable-question:last-child select[name="type"] > option[value="1"]';
EditTestPageObject.radioOptionSelector = 'editable-question:last-child select[name="type"] > option[value="2"]';
EditTestPageObject.checkboxOptionSelector = 'editable-question:last-child select[name="type"] > option[value="3"]';
exports.EditTestPageObject = EditTestPageObject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tests = [];
var allTests = {};
var homePageTests = __webpack_require__(2);
tests.push(homePageTests);
var editTestPageTests = __webpack_require__(1);
tests.push(editTestPageTests);
tests.forEach(function (t) {
    Object.assign(allTests, t);
});
module.exports = allTests;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["simple"] = 1] = "simple";
    QuestionType[QuestionType["radio"] = 2] = "radio";
    QuestionType[QuestionType["checkbox"] = 3] = "checkbox";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));


/***/ })
/******/ ]);
//# sourceMappingURL=tests.bundle.js.map