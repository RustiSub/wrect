(function() {
    "use strict";
    window.RootGui = window.BaseGuiCollection.extend({
        cols: 16,
        elementClass: 'rootGrid fade-out',
        rows: 9,
        width: 0,
        height: 0,
        /**
         * @param options
         * @param options.canvasWidth
         * @param options.canvasHeight
         */
        init: function(options) {
            this._super({position: { x:0, y: 0 }, cols: this.cols, rows: this.rows});
            this.htmlElement.id = 'guiRoot';
            this.setCss({
                width: options.canvasWidth + 'px',
                height: options.canvasHeight + 'px'
            });
            this.width = options.canvasWidth;
            this.height = options.canvasHeight;
        }
    });
}());
