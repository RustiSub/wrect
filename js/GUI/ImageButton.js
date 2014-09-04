(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.ImageButton = window.BaseGuiElement.extend({
        /**
         * @param imagePath
         * @param width
         * @param height
         * @param positionCss
         * @param [id]
         */
        init: function(imagePath, width, height, positionCss, id) {
            var element = document.createElement('button');
            this._super(element);
            if (id) {
                element.id = id;
            }
            var cssProps = {
                background: 'url(' + imagePath + ')',
                display: 'block',
                height: height + 'px',
                position: 'absolute',
                width: width + 'px'
            };

            cssProps = window.game.getHelpers().merge(cssProps, positionCss);
            this.setCss(cssProps);
        }
    });
})();
