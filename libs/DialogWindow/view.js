/**
 * @module views/DialogWindow
 */
var Backbone = require('backbone'),
	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
	DialogWindow = Backbone.Marionette.View.extend(
		/** @lends module:DialogWindow.prototype */
		{
			ui : {
				close  : '.close',
				cancel : '[rel=btn-cancel]',
				ok     : '[rel=btn-ok]'
			},

			events : {
				'click @ui.close'  : 'onDialogCloseClick',
				'click @ui.cancel' : 'onDialogCancelClick',
				'click @ui.ok'     : 'onDialogOkClick'
			},

			show : function() {
				this.$el.show();
			},

			onDialogCloseClick : function() {
				this.$el.hide();
				this.trigger('dialogClose');
			},

			onDialogCancelClick : function() {
				this.$el.hide();
				this.trigger('dialogCancel');
			},

			onDialogOkClick : function() {
				this.$el.hide();
				this.trigger('dialogOk');
			}
		}
	);
module.exports = DialogWindow;
