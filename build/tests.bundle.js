webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
///<reference types="nightwatch" />

var tests = {
    "Demo test Google": function (client) {
        client
            .url("http://www.google.com")
            .waitForElementVisible("body", 1000)
            .assert.title("Google")
            .assert.visible("input[type=text]")
            .setValue("input[type=text]", "nightwatch")
            .waitForElementVisible("button[name=btnG]", 1000)
            .click("button[name=btnG]")
            .pause(1000)
            .assert.containsText("#main", "The Night Watch")
            .end();
    }
};
module.exports = tests;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tests = [];
var allTests = {};
var test1 = __webpack_require__(0);
tests.push(test1);
tests.forEach(function (t) {
    Object.assign(allTests, t);
});
module.exports = allTests;


/***/ })
],[1]);
//# sourceMappingURL=tests.bundle.js.map