define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ImageSurface = require('famous/surfaces/ImageSurface');

    function StripView() {
        View.apply(this, arguments);

        _createBackground.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        // stripbackground size
        width: 320,
        height: 55,
        angle: -0.2
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


    module.exports = StripView;
});
