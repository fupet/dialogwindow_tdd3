var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),
	DialogWindow = require('../../libs/DialogWindow/view'),
	testContent = require('../../content/testcontent1.html');

suite('testing dialog view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		DialogWindow.prototype.onDialogCloseClick = sinon.spy(DialogWindow.prototype, 'onDialogCloseClick');
		DialogWindow.prototype.onDialogCancelClick = sinon.spy(DialogWindow.prototype, 'onDialogCancelClick');
		DialogWindow.prototype.onDialogOkClick = sinon.spy(DialogWindow.prototype, 'onDialogOkClick');

		this.dialogWindow = new DialogWindow({el : '#dialog-window'});
	});

	teardown(function() {
		DialogWindow.prototype.onDialogCloseClick.restore();
		DialogWindow.prototype.onDialogCancelClick.restore();
		DialogWindow.prototype.onDialogOkClick.restore();
	});

	test('test dialog hidden on start', function() {
		assert.isFalse(this.dialogWindow.$el.is(':visible'), 'dialog is visible');
	});

	test('test if we can show the dialog', function() {
		this.dialogWindow.show();
		assert.isTrue(this.dialogWindow.$el.is(':visible'), 'dialog is not visible');
	});

	test('test the close button', function() {
		this.dialogWindow.show();

		this.dialogWindow.$(this.dialogWindow.ui.close).click();
		assert.isTrue(this.dialogWindow.onDialogCloseClick.calledOnce);
		assert.isFalse(this.dialogWindow.$el.is(':visible'), 'dialog is visible');
	});

	test('test the cancel button', function() {
		this.dialogWindow.show();

		this.dialogWindow.$(this.dialogWindow.ui.cancel).click();
		assert.isTrue(this.dialogWindow.onDialogCancelClick.calledOnce);
		assert.isFalse(this.dialogWindow.$el.is(':visible'), 'dialog is visible');
	});

	test('test the ok button', function() {
		this.dialogWindow.show();

		this.dialogWindow.$(this.dialogWindow.ui.ok).click();
		assert.isTrue(this.dialogWindow.onDialogOkClick.calledOnce);
		assert.isFalse(this.dialogWindow.$el.is(':visible'), 'dialog is visible');
	});
});
