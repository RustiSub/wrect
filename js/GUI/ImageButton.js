(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.ImageButton = window.BaseGuiElement.extend({
        /**
         * @param options
         * @param options.imagePath
         * @param options.cols
         * @param options.rows
         * @param options.position
         * @param [options.id]
         */
        init: function(options) {
            var element = document.createElement('button');
            options.element = element;
            this._super(options);
            if (options.id) {
                element.id = options.id;
            }
            var cssProps = {
                backgroundImage: 'url("' + options.imagePath + '")',
                backgroundPosition: this.alignment.x + ' ' + this.alignment.y
            };
            this.setCss(cssProps);
        },
        createHtmlWrapper: function() {
            return document.createElement('div');
        }
    });
})();
