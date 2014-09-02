(function(){
    "use strict";
    /**
     * @augments BaseGui
     * @type {void|*}
     */
    window.Panel = window.BaseGui.extend({
        children: [],
        height: 0,
        panelPosition: 'left',
        toggleButton: null,
        defaultOptions: {
            height: 0,
            width: 0,
            defaultState: 'closed'
        },
        state: 'closed',
        width: 0,

        /**
         * @param options.backgroundColor
         * @param options.width
         * @param options.height
         * @param options.defaultState
         * @param [options.panelPosition]
         * @param [options.id]
         */
        init: function(options) {
            options = this.mergeDefaultOptions(options);
            // Init properties
            this.children = [];
            this.width = options.width;
            this.height = options.height;
            this.panelPosition = options.panelPosition;

            // Parent constructor
            var element = document.createElement('div');
            element.className = 'panel';
            this._super(element);

            // Options
            if (options.defaultState === 'open') {
                this.openPanel();
            }
            else {
                this.closePanel();
            }
            if (options.id) {
                element.id = options.id;
            }
            var cssProps = {
                display: 'block',
                height: options.height + 'px',
                position: 'absolute',
                width: options.width + 'px',
                background: options.backgroundColor
            };

            this.setCss(cssProps);

            var buttonCss;
            var buttonImagePath = 'resources/gui/arrow-';
            var borderToHide;
            switch (options.panelPosition) {
                case 'top':
                    buttonCss = {
                        bottom: '-32px',
                        left: '25%',
                        padding: '0 6px'
                    };
                    buttonImagePath += 'down';
                    borderToHide = 'Top';
                    break;
                case 'right':
                    buttonCss = {
                        left: '-32px',
                        top: '25%',
                        padding: '6px 0'
                    };
                    buttonImagePath += 'left';
                    borderToHide = 'Right';
                    break;
                case 'bottom':
                    buttonCss = {
                        top: '-32px',
                        left: '25%',
                        padding: '0 6px'
                    };
                    buttonImagePath += 'up';
                    borderToHide = 'Bottom';
                    break;
                case 'left':
                    buttonCss = {
                        right: '-32px',
                        top: '25%',
                        padding: '6px 0'
                    };
                    buttonImagePath += 'right';
                    borderToHide = 'Left';
                    break;
            }
            buttonCss.border = '1px solid #eee';
            buttonCss['border' + borderToHide] = 'none';
            buttonCss['background-color'] = options.backgroundColor;
            buttonImagePath += '.png';
            this.toggleButton = new window.ImageButton(buttonImagePath, 32, 32, buttonCss);
            var self = this;
            this.toggleButton.addEvent('click', function() {
                self.togglePanel();
            });
            this.children.push(this.toggleButton);
        },

        mergeDefaultOptions: function(options) {
            return window.game.getHelpers().merge(this.defaultOptions, options);
        },

        /**
         * @param {BaseGui} guiElement
         */
        addChild: function(guiElement) {
            this.children.push(guiElement);
            window.game.getGuiManager().addElement(guiElement, this.htmlElement);
        },

        toDomCallback: function() {
            var l = this.children.length;
            var gm = window.game.getGuiManager();
            for (var i = 0; i < l; i++) {
                gm.addElement(this.children[i], this.htmlElement);
            }
        },

        openPanel: function() {
            this.state = 'open';
            switch (this.panelPosition) {
                case 'top':
                    this.setCss({top: 0});
                    break;
                case 'right':
                    this.setCss({right: 0});
                    break;
                case 'bottom':
                    this.setCss({bottom: 0});
                    break;
                case 'left':
                    this.setCss({left: 0});
                    break;
                default:
                    this.state = 'closed';
                    break;
            }
        },

        closePanel: function() {
            this.state = 'closed';
            switch (this.panelPosition) {
                case 'top':
                    this.setCss({top: (-this.height) + 'px'});
                    break;
                case 'right':
                    this.setCss({right: (-this.width) + 'px'});
                    break;
                case 'bottom':
                    this.setCss({bottom: (-this.height) + 'px'});
                    break;
                case 'left':
                    this.setCss({left: (-this.width) + 'px'});
                    break;
                default:
                    this.state = 'open';
                    break;
            }
        },
        togglePanel: function() {
            if (this.state === 'closed') {
                this.openPanel();
            }
            else {
                this.closePanel();
            }
        }
    });
})();
