(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.InputElement = window.BaseGuiElement.extend({
        htmlTag: 'input',
        inputType: 'text',
        init: function(options) {
            var element = document.createElement(this.htmlTag);
            element.type = this.inputType;
            options.element = element;
            if (options.value) {
                this.setDefaultValue(element, options.value);
            }
            this.bindDefaultEvents(element);
            this._super(options);
        },
        setDefaultValue: function(element, value) {
            element.value = value;
        },
        getValue: function() {
            return this.htmlElement.value;
        },
        bindDefaultEvents: function(htmlElement) {
            return null;
        }
    });
})();
