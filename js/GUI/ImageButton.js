(function(){
    "use strict";
    /**
     * @augments BaseGui
     * @type {void|*}
     */
    window.ImageButton = window.BaseGui.extend({
        /**
         * @param imagePath
         * @param width
         * @param height
         * @param positionCss
         */
        init: function(imagePath, width, height, positionCss) {
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