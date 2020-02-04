"use strict";

(function($) {
    $.fn.fitText = function(kompressor, options) {
        var compressor = kompressor || 1,
            settings = $.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, options);
        return this.each(function() {
            var $this = $(this);

            var resizer = function resizer() {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            resizer();
            $(window).on('resize.fittext orientationchange.fittext', resizer);
        });
    };
})(jQuery);
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var desktopBP = 1024;
var windowWidth = verge.viewportW();
var windowHeight = verge.viewportH();
jQuery(function($) {
    var ResponsiveBackgroundImage =
        /*#__PURE__*/
        function() {
            function ResponsiveBackgroundImage(element) {
                var _this = this;

                _classCallCheck(this, ResponsiveBackgroundImage);

                this.element = element;
                this.img = element.querySelector('img');
                this.src = '';
                this.img.addEventListener('load', function() {
                    _this.update();
                });

                if (this.img.complete) {
                    this.update();
                }
            }

            _createClass(ResponsiveBackgroundImage, [{
                key: "update",
                value: function update() {
                    var src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;

                    if (this.src !== src) {
                        this.src = src;
                        this.element.style.backgroundImage = 'url("' + this.src + '")';
                    }
                }
            }]);

            return ResponsiveBackgroundImage;
        }();

    $.fn.extend({
        sameHeight: function sameHeight(options) {
            var settings = $.extend({
                    breakpoint: desktopBP
                }, options),
                elem = $(this);
            var elementHeights = elem.map(function() {
                    return elem.outerHeight();
                }).get(),
                minHeight = Math.max.apply(null, elementHeights);

            if (windowWidth > settings.breakpoint) {
                elem.css('min-height', minHeight);
            }

            $(window).resize(function() {
                var heights = elem.map(function() {
                        return elem.outerHeight();
                    }).get(),
                    min = Math.max.apply(null, heights);

                if (windowWidth > settings.breakpoint) {
                    elem.css('min-height', min);
                } else {
                    elem.css('min-height', '0px');
                }
            });
        },
        makeFullHeight: function makeFullHeight() {
            $(this).css('min-height', windowHeight);
            $(window).on('resize', function() {
                $(this).css('min-height', windowHeight);
            });
        }
    });

    function themeJS() {
        $('.checkbox').each(function() {
            var check = $(this).find('input[type="checkbox"]');
            $(this).addClass('custom-control').addClass('custom-checkbox').prepend(check);
            $(this).children('input').addClass('custom-control-input');
            $(this).children('label').addClass('custom-control-label');
        });
        $('.mc4wp-checkbox').each(function() {
            var check = $(this).find('input[type="checkbox"]');
            $(this).addClass('custom-control').addClass('custom-checkbox').prepend(check);
            $(this).children('input').addClass('custom-control-input');
            $(this).children('label').addClass('custom-control-label');
        });
        $('.radio').each(function() {
            var radio = $(this).find('input[type="radio"]');
            $(this).addClass('custom-control').addClass('custom-radio').prepend(radio);
            $(this).children('input').addClass('custom-control-input');
            $(this).children('label').addClass('custom-control-label');
        });
        $('.custom-control-label').each(function() {
            $(this).wrapInner('<span class="custom-control-label-text"></span>').prepend('<span class="custom-control-icon"></span>');
        });
        $('.section-full-height').makeFullHeight();
        $('.custom-select').select2({
            theme: 'bootstrap4'
        });
        $.fn.select2.defaults.set('theme', 'bootstrap4');
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        });
        bsCustomFileInput.init();
        $('.fancybox').fancybox({});
    }

    $(document).ready(function() {
        themeJS();
    });
    $(window).load(function() {
        var elements = document.querySelectorAll('[data-responsive-background-image]');

        for (var i = 0; i < elements.length; i++) {
            new ResponsiveBackgroundImage(elements[i]);
        }
    });
});
//# sourceMappingURL=maat-main.js.map
