(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.ImageButton = window.BaseGuiElement.extend({
        /**
         * @param imagePath
         * @param cols
         * @param rows
         * @param positionCss
         * @param [id]
         */
        init: function(imagePath, cols, rows, positionCss, id) {
            var element = document.createElement('button');
            this._super({
              element: element,
              cols: cols,
              rows: rows,
              position: [16, 9]
            });
            if (id) {
                element.id = id;
            }
            var cssProps = {
                background: 'url(' + imagePath + ')'
            };

            //cssProps = window.game.getHelpers().merge(cssProps, positionCss);
            this.setCss(cssProps);
        }
    });
})();
