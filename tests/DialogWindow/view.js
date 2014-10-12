var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),
	Dropdown = require('../../libs/DialogWindow/view'),
	testContent = require('../../content/testcontent1.html');

suite('testing dropdown view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		Dropdown.prototype.onMenuItemClick = sinon.spy(Dropdown.prototype, 'onMenuItemClick');
		this.dropdown = new Dropdown({el : '#dropdown'});
	});

	teardown(function() {
		Dropdown.prototype.onMenuItemClick.restore();
	});

	test('test menu click', function() {
		this.dropdown.$(this.dropdown.ui.menuItems).eq(0).click();
		assert.isTrue(this.dropdown.onMenuItemClick.calledOnce);
	});

	test('test is menu open', function() {
		var testItem = this.dropdown.$(this.dropdown.ui.menuItems).eq(2);
		testItem.click();
		assert.isTrue(testItem.hasClass(this.dropdown.OPEN_CLASS));
	});

	test('test is menu close', function() {
		var testItem = this.dropdown.$(this.dropdown.ui.menuItems).eq(0);
		testItem.click().click();
		assert.isTrue(this.dropdown.onMenuItemClick.calledTwice);
		assert.isTrue(!testItem.hasClass(this.dropdown.OPEN_CLASS));
	});

	test('test subless menu item', function() {
		var testItem = this.dropdown.$(this.dropdown.ui.menuItems).eq(1);
		testItem.click();
		assert.isTrue(this.dropdown.onMenuItemClick.calledOnce);
		assert.isTrue(!testItem.hasClass(this.dropdown.OPEN_CLASS));
	});
});