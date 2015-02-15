define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var FastClick = require('famous/inputs/FastClick');

    function PageView() {
        View.apply(this, arguments);

        // create a  helper function
        _createLayout.call(this);
        _createHeader.call(this);
        _createBody.call(this);

        // _setListeners.call(this);

    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        // adding headerSize
        headerSize: 44
    };

    function _createLayout() {
        this.layout = new HeaderFooterLayout({
            headerSize: this.options.headerSize
        });

        this.layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(this.layoutModifier).add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        // adding the images
        var hamburgerSurface = new ImageSurface({
            size: [44, 44],
            content: 'img/hamburger.png'
        });

        // add search box
        var searchBox = new ImageSurface({
            size: [232, 44],
            content: 'img/search.png'
        });

        // adding icon
        var iconSurface = new  ImageSurface({
            size:[44, 44],
            content: 'img/icon.png'
        });

        // adding modifiers
        var hambugerModifier = new  StateModifier({
            origin: [0, 0.5],
            align: [0, 0.5]
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align: [1, 0.5],
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hambugerModifier).add(hamburgerSurface);
        this.layout.header.add(searchModifier).add(searchBox);
        this.layout.header.add(iconModifier).add(iconSurface);
    }

    // create body
        function _createBody () {
            this.bodySurface = new ImageSurface({
                size: [undefined, true],
                content: 'img/body.png'
            });

            this.layout.content.add(this.bodySurface);
        }

    // add event listener on clickeng the hamburger
    // function _setListeners () {
    //     this.hamburgerSurface.on('click', function() {
    //         this._eventOutput.emit('menuToggle');
    //     }.bind(this));
    // }

    module.exports = PageView;
});
