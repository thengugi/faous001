define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ImageSurface = require('famous/surfaces/ImageSurface');

    function StripView() {
        View.apply(this, arguments);

        _createBackground.call(this);
        _createIcon.call(this);
        _createTitle.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        // stripbackground size
        width: 320,
        height: 55,
        angle: -0.2,
        iconSize: 32,
        iconUrl: 'img/strip-icons/famous.png',
        title: 'Famo.us',
        fontSize: 25
    };

    // creating the strip view: 
    // strip view has three surfaces:
    //background surface
    // title 
    //icon

    function _createBackground () {
        var background = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: '#222',
                boxShadow: '0 0 1px rgba(0,0,0,1)'
            }
        });

        var rotateModifier = new StateModifier({
            transform: Transform.rotateZ(this.options.angle)
        });

        var skewModifier = new StateModifier({
            transform: Transform.skew(0, 0, this.options.angle)
        });

        this.add(rotateModifier).add(skewModifier).add(background);
    }

    // creating the icon
    function _createIcon () {
        var iconSurface = new ImageSurface({
            size: [this.options.iconSize, this.options.iconSize],
            content: 'this.options.iconUrl',
            properties: {
                pointerEvents: 'none'
            }
        });

        var iconModifier = new StateModifier({
            // place the icon in the proper position
            transform: Transform.translate(24, 2, 0)    
        });

        this.add(iconModifier).add(iconSurface);
    }

    function _createTitle () {
        var titleSurface = new Surface({
            size: [true, true],
            content:  this.options.title,
            properties: {
                color: '#fff',
                fontSize: this.options.fontSize + 'px',
                pointerEvents: 'none'
            }
        });

        var titleModifier = new StateModifier({
            transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
        });
        
        this.add(titleModifier).add(titleSurface);
    }

    module.exports = StripView;
});
