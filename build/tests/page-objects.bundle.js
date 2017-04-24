console.log('Trolololo!!!');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        this.browser.waitForElementVisible('#homePage', delay);
        return this;
    };
    HomePageObject.prototype.clickAddTestButton = function () {
        var _this = this;
        this.browser.elements('css selector', '#testsList tbody tr', function (c) {
            _this.testsCount = c.value.length;
        });
        this.browser.click('#addTestBtn');
        return this;
    };
    HomePageObject.prototype.verifyTestAddition = function () {
        var _this = this;
        this.browser.elements('css selector', '#testsList tbody tr', function (c) {
            var oldTestCount = _this.testsCount;
            _this.testsCount = c.value.length;
            _this.browser.assert.equal(_this.testsCount - oldTestCount, 1, 'Test should be added.');
        });
        return this;
    };
    HomePageObject.prototype.verifyVisibilitySaveButtonForAddedTest = function (visible) {
        var _this = this;
        this.browser.element('css selector', '#testsList tbody tr:last-child td:last-child > a:first-child', function (c) {
            _this.browser.elementIdDisplayed(c.value.ELEMENT, function (c1) {
                _this.browser.assert.equal(c1.value, visible, "Save button should " + (visible ? '' : 'not ') + "be visible");
            });
        });
        return this;
    };
    HomePageObject.prototype.renameLatestTest = function (name) {
        this.browser.clearValue('#testsList tbody tr:last-child input[name="testName"]');
        this.browser.setValue('#testsList tbody tr:last-child input[name="testName"]', name);
        this.browser.execute('document.querySelector("#testsList tbody tr:last-child input[name=\'testName\']").blur()');
        this.latestTestName = name;
        return this;
    };
    HomePageObject.prototype.verifyRenamingOfTest = function () {
        var _this = this;
        this.browser.refresh();
        this.browser.waitForElementPresent('#testsList tbody tr:last-child input[name="testName"]', 1000);
        this.browser.getValue('#testsList tbody tr:last-child input[name="testName"]', function (c) {
            _this.browser.assert.equal(c.value, _this.latestTestName, 'Test name should be changed');
        });
        return this;
    };
    HomePageObject.prototype.clickSaveButton = function () {
        this.browser.click('#testsList tbody tr:last-child td:last-child > a:first-child');
        return this;
    };
    HomePageObject.prototype.deleteTest = function () {
        this.browser.click('#testsList tbody tr:last-child td:last-child > a:nth-child(3)');
        this.browser.pause(2000);
        return this;
    };
    HomePageObject.prototype.verifyDeletionOfTest = function () {
        var _this = this;
        this.browser.elements('css selector', '#testsList tbody tr', function (c) {
            var oldTestCount = _this.testsCount;
            _this.testsCount = c.value.length;
            _this.browser.assert.equal(oldTestCount - _this.testsCount, 1, 'Test should be removed.');
        });
        return this;
    };
    return HomePageObject;
}());
exports.HomePageObject = HomePageObject;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pageObjects = {};
var HomePageObject = __webpack_require__(0);
pageObjects[HomePageObject.HomePageObject.name] = HomePageObject;
module.exports = pageObjects;


/***/ })
/******/ ]);
//# sourceMappingURL=page-objects.bundle.js.map