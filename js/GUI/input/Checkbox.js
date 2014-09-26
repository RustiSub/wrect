(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.Checkbox = window.InputElement.extend({
        checked: false,
        inputType: 'checkbox',
        init: function(options) {
            this._super(options);
        },
        getValue: function() {
            return this.checked;
        },
        bindDefaultEvents: function(htmlElement) {
            var self = this;
            htmlElement.addEventListener('change', function() {
                self.checked = self.htmlElement.checked;
            });
        },
        setDefaultValue: function(element, value) {
            if (value) {
                this.checked = true;
                element.checked = true;
            }
            else {
                this.checked = false;
                element.checked = false;
            }
        }
    });
})();
