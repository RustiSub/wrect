(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.Number = window.InputElement.extend({
        inputType: 'number',
        init: function(options) {
            this._super(options);
        }
    });
})();
