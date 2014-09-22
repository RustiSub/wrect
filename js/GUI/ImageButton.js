(function(){
    "use strict";
    /**
     * @augments BaseGuiElement
     * @type {void|*}
     */
    window.ImageButton = window.BaseGuiElement.extend({
        htmlTag: 'button',
        imgWidth: 0,
        imgHeight: 0,
        getDefaultOptions: function() {
            return {
                alignment: {
                    x: 'center',
                    y: 'center'
                }
            };
        },
        /**
         * @param options
         * @param options.imgPath
         * @param options.cols
         * @param options.rows
         * @param options.position
         * @param [options.id]
         */
        init: function(options) {
            options = window.game.getHelpers().merge(this.getDefaultOptions(), options);
            var element = document.createElement(this.htmlTag);
            options.element = element;
            this._super(options);
            this.imgWidth = options.imgWidth;
            this.imgHeight = options.imgHeight;
            if (options.id) {
                element.id = options.id;
            }
            this.setDomPosition(options);
        },
        createHtmlWrapper: function() {
            return document.createElement('div');
        },
        setDomPosition: function(options) {
            var wrapperStyle = {};
            var elementStyle = {
                width: this.imgWidth + 'px',
                height: this.imgHeight + 'px'
            };
            switch (options.alignment.x) {
                case 'left':
                    elementStyle.position = 'absolute';
                    elementStyle.left = 0;
                    break;
                case 'right':
                    elementStyle.position = 'absolute';
                    elementStyle.right = 0;
                    break;
                case 'center':
                    elementStyle.left = '50%';
                    elementStyle.marginLeft = '-' + this.imgWidth/2 + 'px';
                    break;
                default:
                    elementStyle.left = options.alignment.x;
                    break;
            }
            switch (options.alignment.y) {
                case 'top':
                    elementStyle.top = 0;
                    break;
                case 'center':
                    elementStyle.top = '50%';
                    elementStyle.marginTop = '-' + this.imgHeight/2 + 'px';
                    break;
                case 'bottom':
                    elementStyle.bottom = 0;
                    break;
                default:
                    elementStyle.top = options.alignment.y;
                    break;
            }

            this.setCss(elementStyle, false);
            this.setCss(wrapperStyle, true);
        }
    });
})();
