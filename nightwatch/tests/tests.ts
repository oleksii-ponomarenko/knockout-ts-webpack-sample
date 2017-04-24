let tests = [ ];
let allTests = { };

import homePageTests = require("./home-page.tests");
tests.push(homePageTests);

import editTestPageTests = require("./edit-test-page.tests");
tests.push(editTestPageTests);

tests.forEach(t => {
	Object.assign(allTests, t);
});

export = allTests;