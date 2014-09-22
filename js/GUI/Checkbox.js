(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.Checkbox = window.BaseGuiElement.extend({
        htmlTag: 'input',
        characterLimit: 0,
        init: function(options) {
            this._super(options);
        }
    });
})();
