(function(){
    "use strict";
    /**
     * @augments BaseGui
     * @type {void|*}
     */
    window.Panel = window.BaseGui.extend({
        children: [],
        columns: 0,
        rows: 0,
        height: 0,
        panelPosition: 'left',
        toggleButton: null,
        defaultOptions: {
            columns: 5,
            rows: 5,
            height: 0,
            width: 0,
            defaultState: 'closed',
            outerPadding: 20,
            showButton: true,
            childMargin: 20
        },
        outerPadding: 0,
        state: 'closed',
        width: 0,
        rowSize: 0,
        colSize: 0,
        childMargin: 0,

        /**
         * @param options.backgroundColor
         * @param options.width
         * @param options.height
         * @param options.defaultState
         * @param [options.columns]
         * @param [options.rows]
         * @param [options.panelPosition]
         * @param [options.id]
         * @param [options.showButton]
         */
        init: function(options) {
            options = this.mergeDefaultOptions(options);
            // Init properties
            this.children = [];
            this.width = options.width;
            this.height = options.height;
            this.panelPosition = options.panelPosition;
            this.rows = options.rows;
            this.columns = options.columns;

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
                background: options.backgroundColor,
                padding: options.outerPadding + 'px'
            };

            this.setCss(cssProps);

            if (options.showButton) {
                this.createToggleButton();
            }
            this.calculateChildSizes();
        },

        mergeDefaultOptions: function(options) {
            return window.game.getHelpers().merge(this.defaultOptions, options);
        },

        calculateChildSizes: function() {
            var totalPadding = this.outerPadding * 2;
            var totalChildMargin = this.childMargin * 2;
            this.colSize = Math.round((this.width - totalPadding) / this.columns) - (totalChildMargin * this.cols);
            this.rowSize = Math.round((this.height - totalPadding) / this.rows) - (totalChildMargin * this.rows);
        },

        createToggleButton: function() {
            var buttonCss;
            var borderToHide;
            var buttonImagePath = 'resources/gui/arrow-';
            switch (this.panelPosition) {
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
            buttonCss['background-color'] = this.backgroundColor;
            buttonImagePath += '.png';
            this.toggleButton = new window.ImageButton(buttonImagePath, 32, 32, buttonCss);
            var self = this;
            this.toggleButton.addEvent('click', function() {
                self.togglePanel();
            });
            this.children.push(this.toggleButton);
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
        },
        setWidth: function(width) {
            this.width = width;
            this.setCss({width: this.width + 'px'});
            this.togglePanel();
            this.togglePanel();
        },
        setHeight: function(height) {
            this.height = height;
            this.setCss({height: this.height + 'px'});
            this.togglePanel();
            this.togglePanel();
        },
        setRows: function(rows) {
            this.rows = rows;
        },
        setColumns: function(columns) {
            this.columns = columns;
        },
        setOuterPadding: function(padding) {
            this.outerPadding = padding;
            this.setCss({padding: padding + 'px'});
        },
        setPanelPosition: function(position) {
            this.panelPosition = position;
            var btnIndex = this.children.indexOf(this.toggleButton);
            if (btnIndex !== -1) {
                this.children.splice(btnIndex, 1);
            }
            this.toggleButton = null;
            this.createToggleButton();
        }
    });
})();
