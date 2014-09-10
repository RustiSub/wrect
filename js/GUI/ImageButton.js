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
            this._super({
              element: element,
              cols: options.cols,
              rows: options.rows,
              position: [options.position[0], options.position[1]]
            });
            if (options.id) {
                element.id = options.id;
            }
            var cssProps = {
                'background-image': 'url(' + options.imagePath + ')'
            };

            this.setCss(cssProps);
        }
    });
})();
