(function(window, factory) {
    var globalInstall = function() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';

    if (!window.addEventListener) {
        return;
    }

    var forEach = Array.prototype.forEach;

    var imageRatio, extend$, $;

    var regPicture = /^picture$/i;
    var aspectRatioAttr = 'data-aspectratio';
    var aspectRatioSel = 'img[' + aspectRatioAttr + ']';

    var matchesMedia = function(media) {
        if (window.matchMedia) {
            matchesMedia = function(media) {
                return !media || (matchMedia(media) || {}).matches;
            };
        } else if (window.Modernizr && Modernizr.mq) {
            return !media || Modernizr.mq(media);
        } else {
            return !media;
        }
        return matchesMedia(media);
    };

    var addClass = lazySizes.aC;
    var removeClass = lazySizes.rC;
    var lazySizesConfig = lazySizes.cfg;

    function AspectRatio() {
        this.ratioElems = document.getElementsByClassName('lazyaspectratio');
        this._setupEvents();
        this.processImages();
    }

    AspectRatio.prototype = {
        _setupEvents: function() {
            var module = this;

            var addRemoveAspectRatio = function(elem) {
                if (elem.naturalWidth < 36) {
                    module.addAspectRatio(elem, true);
                } else {
                    module.removeAspectRatio(elem, true);
                }
            };
            var onload = function() {
                module.processImages();
            };

            document.addEventListener('load', function(e) {
                if (e.target.getAttribute && e.target.getAttribute(aspectRatioAttr)) {
                    addRemoveAspectRatio(e.target);
                }
            }, true);

            addEventListener('resize', (function() {
                var timer;
                var resize = function() {
                    forEach.call(module.ratioElems, addRemoveAspectRatio);
                };

                return function() {
                    clearTimeout(timer);
                    timer = setTimeout(resize, 99);
                };
            })());

            document.addEventListener('DOMContentLoaded', onload);

            addEventListener('load', onload);
        },
        processImages: function(context) {
            var elements, i;

            if (!context) {
                context = document;
            }

            if ('length' in context && !context.nodeName) {
                elements = context;
            } else {
                elements = context.querySelectorAll(aspectRatioSel);
            }

            for (i = 0; i < elements.length; i++) {
                if (elements[i].naturalWidth > 36) {
                    this.removeAspectRatio(elements[i]);
                    continue;
                }
                this.addAspectRatio(elements[i]);
            }
        },
        getSelectedRatio: function(img) {
            var i, len, sources, customMedia, ratio;
            var parent = img.parentNode;
            if (parent && regPicture.test(parent.nodeName || '')) {
                sources = parent.getElementsByTagName('source');

                for (i = 0, len = sources.length; i < len; i++) {
                    customMedia = sources[i].getAttribute('data-media') || sources[i].getAttribute('media');

                    if (lazySizesConfig.customMedia[customMedia]) {
                        customMedia = lazySizesConfig.customMedia[customMedia];
                    }

                    if (matchesMedia(customMedia)) {
                        ratio = sources[i].getAttribute(aspectRatioAttr);
                        break;
                    }
                }
            }

            return ratio || img.getAttribute(aspectRatioAttr) || '';
        },
        parseRatio: (function() {
            var regRatio = /^\s*([+\d\.]+)(\s*[\/x]\s*([+\d\.]+))?\s*$/;
            var ratioCache = {};
            return function(ratio) {
                var match;

                if (!ratioCache[ratio] && (match = ratio.match(regRatio))) {
                    if (match[3]) {
                        ratioCache[ratio] = match[1] / match[3];
                    } else {
                        ratioCache[ratio] = match[1] * 1;
                    }
                }

                return ratioCache[ratio];
            };
        })(),
        addAspectRatio: function(img, notNew) {
            var ratio;
            var width = img.offsetWidth;
            var height = img.offsetHeight;

            if (!notNew) {
                addClass(img, 'lazyaspectratio');
            }

            if (width < 36 && height <= 0) {
                if (width || height && window.console) {
                    console.log('Define width or height of image, so we can calculate the other dimension');
                }
                return;
            }

            ratio = this.getSelectedRatio(img);
            ratio = this.parseRatio(ratio);

            if (ratio) {
                if (width) {
                    img.style.height = (width / ratio) + 'px';
                } else {
                    img.style.width = (height * ratio) + 'px';
                }
            }
        },
        removeAspectRatio: function(img) {
            removeClass(img, 'lazyaspectratio');
            img.style.height = '';
            img.style.width = '';
            img.removeAttribute(aspectRatioAttr);
        }
    };

    extend$ = function() {
        $ = window.jQuery || window.Zepto || window.shoestring || window.$;
        if ($ && $.fn && !$.fn.imageRatio && $.fn.filter && $.fn.add && $.fn.find) {
            $.fn.imageRatio = function() {
                imageRatio.processImages(this.find(aspectRatioSel).add(this.filter(aspectRatioSel)));
                return this;
            };
        } else {
            $ = false;
        }
    };

    extend$();
    setTimeout(extend$);

    imageRatio = new AspectRatio();

    window.imageRatio = imageRatio;

    if (typeof module == 'object' && module.exports) {
        module.exports = imageRatio;
    } else if (typeof define == 'function' && define.amd) {
        define(imageRatio);
    }

}));

(function(window, factory) {
    var globalInstall = function() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';
    if (!window.addEventListener) {
        return;
    }

    var regWhite = /\s+/g;
    var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
    var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
    var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
    var regBgUrlEscape = /\(|\)|'/;
    var allowedBackgroundSize = {
        contain: 1,
        cover: 1
    };
    var proxyWidth = function(elem) {
        var width = lazySizes.gW(elem, elem.parentNode);

        if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
            elem._lazysizesWidth = width;
        }
        return elem._lazysizesWidth;
    };
    var getBgSize = function(elem) {
        var bgSize;

        bgSize = (getComputedStyle(elem) || {
            getPropertyValue: function() {}
        }).getPropertyValue('background-size');

        if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
            bgSize = elem.style.backgroundSize;
        }

        return bgSize;
    };
    var setTypeOrMedia = function(source, match) {
        if (match) {
            var typeMatch = match.match(regType);
            if (typeMatch && typeMatch[1]) {
                source.setAttribute('type', typeMatch[1]);
            } else {
                source.setAttribute('media', lazySizesConfig.customMedia[match] || match);
            }
        }
    };
    var createPicture = function(sets, elem, img) {
        var picture = document.createElement('picture');
        var sizes = elem.getAttribute(lazySizesConfig.sizesAttr);
        var ratio = elem.getAttribute('data-ratio');
        var optimumx = elem.getAttribute('data-optimumx');

        if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
            elem.removeChild(elem._lazybgset);
        }

        Object.defineProperty(img, '_lazybgset', {
            value: elem,
            writable: true
        });
        Object.defineProperty(elem, '_lazybgset', {
            value: picture,
            writable: true
        });

        sets = sets.replace(regWhite, ' ').split(regSplitSet);

        picture.style.display = 'none';
        img.className = lazySizesConfig.lazyClass;

        if (sets.length == 1 && !sizes) {
            sizes = 'auto';
        }

        sets.forEach(function(set) {
            var match;
            var source = document.createElement('source');

            if (sizes && sizes != 'auto') {
                source.setAttribute('sizes', sizes);
            }

            if ((match = set.match(regSource))) {
                source.setAttribute(lazySizesConfig.srcsetAttr, match[1]);

                setTypeOrMedia(source, match[2]);
                setTypeOrMedia(source, match[3]);
            } else {
                source.setAttribute(lazySizesConfig.srcsetAttr, set);
            }

            picture.appendChild(source);
        });

        if (sizes) {
            img.setAttribute(lazySizesConfig.sizesAttr, sizes);
            elem.removeAttribute(lazySizesConfig.sizesAttr);
            elem.removeAttribute('sizes');
        }
        if (optimumx) {
            img.setAttribute('data-optimumx', optimumx);
        }
        if (ratio) {
            img.setAttribute('data-ratio', ratio);
        }

        picture.appendChild(img);

        elem.appendChild(picture);
    };

    var proxyLoad = function(e) {
        if (!e.target._lazybgset) {
            return;
        }

        var image = e.target;
        var elem = image._lazybgset;
        var bg = image.currentSrc || image.src;


        if (bg) {
            var event = lazySizes.fire(elem, 'bgsetproxy', {
                src: bg,
                useSrc: regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg,
            });

            if (!event.defaultPrevented) {
                elem.style.backgroundImage = 'url(' + event.detail.useSrc + ')';
            }
        }

        if (image._lazybgsetLoading) {
            lazySizes.fire(elem, '_lazyloaded', {}, false, true);
            delete image._lazybgsetLoading;
        }
    };

    addEventListener('lazybeforeunveil', function(e) {
        var set, image, elem;

        if (e.defaultPrevented || !(set = e.target.getAttribute('data-bgset'))) {
            return;
        }

        elem = e.target;
        image = document.createElement('img');

        image.alt = '';

        image._lazybgsetLoading = true;
        e.detail.firesLoad = true;

        createPicture(set, elem, image);

        setTimeout(function() {
            lazySizes.loader.unveil(image);

            lazySizes.rAF(function() {
                lazySizes.fire(image, '_lazyloaded', {}, true, true);
                if (image.complete) {
                    proxyLoad({
                        target: image
                    });
                }
            });
        });

    });

    document.addEventListener('load', proxyLoad, true);

    window.addEventListener('lazybeforesizes', function(e) {
        if (e.detail.instance != lazySizes) {
            return;
        }
        if (e.target._lazybgset && e.detail.dataAttr) {
            var elem = e.target._lazybgset;
            var bgSize = getBgSize(elem);

            if (allowedBackgroundSize[bgSize]) {
                e.target._lazysizesParentFit = bgSize;

                lazySizes.rAF(function() {
                    e.target.setAttribute('data-parent-fit', bgSize);
                    if (e.target._lazysizesParentFit) {
                        delete e.target._lazysizesParentFit;
                    }
                });
            }
        }
    }, true);

    document.documentElement.addEventListener('lazybeforesizes', function(e) {
        if (e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes) {
            return;
        }
        e.detail.width = proxyWidth(e.target._lazybgset);
    });
}));

(function(window, factory) {
    var globalInstall = function() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';

    var slice = [].slice;
    var regBlurUp = /blur-up["']*\s*:\s*["']*(always|auto)/;
    var regType = /image\/(jpeg|png|gif|svg\+xml)/;
    var transSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    var matchesMedia = function(source) {
        var media = source.getAttribute('data-media') || source.getAttribute('media');
        var type = source.getAttribute('type');

        return (!type || regType.test(type)) && (!media || window.matchMedia(lazySizes.cfg.customMedia[media] || media).matches);
    };

    var getLowSrc = function(picture, img) {
        var sources = picture ? slice.call(picture.querySelectorAll('source, img')) : [img];
        var element = sources.find(function(src) {
            return src.getAttribute('data-lowsrc') && matchesMedia(src);
        });

        return element && element.getAttribute('data-lowsrc');
    };

    var createBlurup = function(picture, img, src, blurUp) {
        var blurImg;
        var isBlurUpLoaded = false;
        var isForced = false;
        var start = blurUp == 'always' ? 0 : Date.now();
        var isState = 0;
        var parent = (picture || img).parentNode;

        var createBlurUpImg = function() {

            if (!src) {
                return;
            }

            var onloadBlurUp = function() {
                isBlurUpLoaded = true;

                if (blurImg) {
                    lazySizes.rAF(function() {
                        if (blurImg) {
                            lazySizes.aC(blurImg, 'ls-blur-up-loaded');
                        }
                    });

                    blurImg.removeEventListener('load', onloadBlurUp);
                    blurImg.removeEventListener('error', onloadBlurUp);
                }
            };

            blurImg = document.createElement('img');

            blurImg.addEventListener('load', onloadBlurUp);
            blurImg.addEventListener('error', onloadBlurUp);

            blurImg.className = 'ls-blur-up-img';
            blurImg.src = src;
            blurImg.alt = '';
            blurImg.setAttribute('aria-hidden', 'true');

            blurImg.className += ' ls-inview';

            parent.insertBefore(blurImg, (picture || img).nextSibling);

            if (blurUp != 'always') {
                blurImg.style.visibility = 'hidden';

                setTimeout(function() {
                    lazySizes.rAF(function() {
                        if (!isForced) {
                            blurImg.style.visibility = '';
                        }
                    });
                }, 20);
            }
        };

        var remove = function() {
            if (blurImg) {
                lazySizes.rAF(function() {
                    try {
                        blurImg.parentNode.removeChild(blurImg);
                    } catch (er) {}
                    blurImg = null;
                });
            }
        };

        var setStateUp = function(force) {
            isState++;

            isForced = force || isForced;

            if (force) {
                remove();
            } else if (isState > 1) {
                setTimeout(remove, 5000);
            }
        };

        var onload = function() {
            img.removeEventListener('load', onload);
            img.removeEventListener('error', onload);

            if (blurImg) {
                lazySizes.rAF(function() {
                    lazySizes.aC(blurImg, 'ls-original-loaded');
                });
            }

            if (!isBlurUpLoaded || Date.now() - start < 66) {
                setStateUp(true);
            } else {
                setStateUp();
            }
        };

        createBlurUpImg();

        img.addEventListener('load', onload);
        img.addEventListener('error', onload);

        var parentUnveil = function(e) {
            if (parent != e.target) {
                return;
            }

            lazySizes.aC(blurImg || img, 'ls-inview');

            setStateUp();

            parent.removeEventListener('lazybeforeunveil', parentUnveil);
        };

        if (!parent.getAttribute('data-expand')) {
            parent.setAttribute('data-expand', -1);
        }

        parent.addEventListener('lazybeforeunveil', parentUnveil);

        lazySizes.aC(parent, lazySizes.cfg.lazyClass);

    };

    window.addEventListener('lazybeforeunveil', function(e) {
        var detail = e.detail;

        if (detail.instance != lazySizes || !detail.blurUp) {
            return;
        }

        var img = e.target;
        var picture = img.parentNode;

        if (picture.nodeName != 'PICTURE') {
            picture = null;
        }

        createBlurup(picture, img, getLowSrc(picture, img) || transSrc, detail.blurUp);
    });

    window.addEventListener('lazyunveilread', function(e) {
        var detail = e.detail;

        if (detail.instance != lazySizes) {
            return;
        }

        var img = e.target;
        var match = (getComputedStyle(img, null) || {
            fontFamily: ''
        }).fontFamily.match(regBlurUp);

        if (!match && !img.getAttribute('data-lowsrc')) {
            return;
        }

        detail.blurUp = match && match[1] || lazySizes.cfg.blurupMode || 'always';
    });
}));

(function(window, factory) {
    var globalInstall = function(initialEvent) {
        factory(window.lazySizes, initialEvent);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes, initialEvent) {
    'use strict';
    var style = document.createElement('a').style;
    var fitSupport = 'objectFit' in style;
    var positionSupport = fitSupport && 'objectPosition' in style;
    var regCssFit = /object-fit["']*\s*:\s*["']*(contain|cover)/;
    var regCssPosition = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/;
    var blankSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    var regBgUrlEscape = /\(|\)|'/;
    var positionDefaults = {
        center: 'center',
        '50% 50%': 'center',
    };

    function getObject(element) {
        var css = (getComputedStyle(element, null) || {});
        var content = css.fontFamily || '';
        var objectFit = content.match(regCssFit) || '';
        var objectPosition = objectFit && content.match(regCssPosition) || '';

        if (objectPosition) {
            objectPosition = objectPosition[1];
        }

        return {
            fit: objectFit && objectFit[1] || '',
            position: positionDefaults[objectPosition] || objectPosition || 'center',
        };
    }

    function initFix(element, config) {
        var switchClassesAdded, addedSrc;
        var lazysizesCfg = lazySizes.cfg;
        var styleElement = element.cloneNode(false);
        var styleElementStyle = styleElement.style;

        var onChange = function() {
            var src = element.currentSrc || element.src;

            if (src && addedSrc !== src) {
                addedSrc = src;
                styleElementStyle.backgroundImage = 'url(' + (regBgUrlEscape.test(src) ? JSON.stringify(src) : src) + ')';

                if (!switchClassesAdded) {
                    switchClassesAdded = true;
                    lazySizes.rC(styleElement, lazysizesCfg.loadingClass);
                    lazySizes.aC(styleElement, lazysizesCfg.loadedClass);
                }
            }
        };
        var rafedOnChange = function() {
            lazySizes.rAF(onChange);
        };

        element._lazysizesParentFit = config.fit;

        element.addEventListener('lazyloaded', rafedOnChange, true);
        element.addEventListener('load', rafedOnChange, true);

        styleElement.addEventListener('load', function() {
            var curSrc = styleElement.currentSrc || styleElement.src;

            if (curSrc && curSrc != blankSrc) {
                styleElement.src = blankSrc;
                styleElement.srcset = '';
            }
        });

        lazySizes.rAF(function() {

            var hideElement = element;
            var container = element.parentNode;

            if (container.nodeName.toUpperCase() == 'PICTURE') {
                hideElement = container;
                container = container.parentNode;
            }

            lazySizes.rC(styleElement, lazysizesCfg.loadedClass);
            lazySizes.rC(styleElement, lazysizesCfg.lazyClass);
            lazySizes.aC(styleElement, lazysizesCfg.loadingClass);
            lazySizes.aC(styleElement, lazysizesCfg.objectFitClass || 'lazysizes-display-clone');

            if (styleElement.getAttribute(lazysizesCfg.srcsetAttr)) {
                styleElement.setAttribute(lazysizesCfg.srcsetAttr, '');
            }

            if (styleElement.getAttribute(lazysizesCfg.srcAttr)) {
                styleElement.setAttribute(lazysizesCfg.srcAttr, '');
            }

            styleElement.src = blankSrc;
            styleElement.srcset = '';

            styleElementStyle.backgroundRepeat = 'no-repeat';
            styleElementStyle.backgroundPosition = config.position;
            styleElementStyle.backgroundSize = config.fit;

            hideElement.style.display = 'none';

            element.setAttribute('data-parent-fit', config.fit);
            element.setAttribute('data-parent-container', 'prev');

            container.insertBefore(styleElement, hideElement);

            if (element._lazysizesParentFit) {
                delete element._lazysizesParentFit;
            }

            if (element.complete) {
                onChange();
            }
        });
    }

    if (!fitSupport || !positionSupport) {
        var onRead = function(e) {
            if (e.detail.instance != lazySizes) {
                return;
            }

            var element = e.target;
            var obj = getObject(element);

            if (obj.fit && (!fitSupport || (obj.position != 'center'))) {
                initFix(element, obj);
            }
        };

        window.addEventListener('lazyunveilread', onRead, true);

        if (initialEvent && initialEvent.detail) {
            onRead(initialEvent);
        }
    }
}));

(function(window, factory) {
    var globalInstall = function() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    'use strict';

    if (!window.addEventListener) {
        return;
    }

    var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
    var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
    var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
    var regPicture = /^picture$/i;

    var getCSS = function(elem) {
        return (getComputedStyle(elem, null) || {});
    };

    var parentFit = {

        getParent: function(element, parentSel) {
            var parent = element;
            var parentNode = element.parentNode;

            if ((!parentSel || parentSel == 'prev') && parentNode && regPicture.test(parentNode.nodeName || '')) {
                parentNode = parentNode.parentNode;
            }

            if (parentSel != 'self') {
                if (parentSel == 'prev') {
                    parent = element.previousElementSibling;
                } else if (parentSel && (parentNode.closest || window.jQuery)) {
                    parent = (parentNode.closest ?
                            parentNode.closest(parentSel) :
                            jQuery(parentNode).closest(parentSel)[0]) ||
                        parentNode;
                } else {
                    parent = parentNode;
                }
            }

            return parent;
        },

        getFit: function(element) {
            var tmpMatch, parentObj;
            var css = getCSS(element);
            var content = css.content || css.fontFamily;
            var obj = {
                fit: element._lazysizesParentFit || element.getAttribute('data-parent-fit')
            };

            if (!obj.fit && content && (tmpMatch = content.match(regCssFit))) {
                obj.fit = tmpMatch[1];
            }

            if (obj.fit) {
                parentObj = element._lazysizesParentContainer || element.getAttribute('data-parent-container');

                if (!parentObj && content && (tmpMatch = content.match(regCssObject))) {
                    parentObj = tmpMatch[1];
                }

                obj.parent = parentFit.getParent(element, parentObj);


            } else {
                obj.fit = css.objectFit;
            }

            return obj;
        },

        getImageRatio: function(element) {
            var i, srcset, media, ratio, match;
            var parent = element.parentNode;
            var elements = parent && regPicture.test(parent.nodeName || '') ?
                parent.querySelectorAll('source, img') : [element];

            for (i = 0; i < elements.length; i++) {
                element = elements[i];
                srcset = element.getAttribute(lazySizesConfig.srcsetAttr) || element.getAttribute('srcset') || element.getAttribute('data-pfsrcset') || element.getAttribute('data-risrcset') || '';
                media = element._lsMedia || element.getAttribute('media');
                media = lazySizesConfig.customMedia[element.getAttribute('data-media') || media] || media;

                if (srcset && (!media || (window.matchMedia && matchMedia(media) || {}).matches)) {
                    ratio = parseFloat(element.getAttribute('data-aspectratio'));

                    if (!ratio && (match = srcset.match(regDescriptors))) {
                        if (match[2] == 'w') {
                            ratio = match[1] / match[3];
                        } else {
                            ratio = match[3] / match[1];
                        }
                    }
                    break;
                }
            }

            return ratio;
        },

        calculateSize: function(element, width) {
            var displayRatio, height, imageRatio, retWidth;
            var fitObj = this.getFit(element);
            var fit = fitObj.fit;
            var fitElem = fitObj.parent;

            if (fit != 'width' && ((fit != 'contain' && fit != 'cover') || !(imageRatio = this.getImageRatio(element)))) {
                return width;
            }

            if (fitElem) {
                width = fitElem.clientWidth;
            } else {
                fitElem = element;
            }

            retWidth = width;

            if (fit == 'width') {
                retWidth = width;
            } else {
                height = fitElem.clientHeight;

                if (height > 40 && (displayRatio = width / height) && ((fit == 'cover' && displayRatio < imageRatio) || (fit == 'contain' && displayRatio > imageRatio))) {
                    retWidth = width * (imageRatio / displayRatio);
                }
            }

            return retWidth;
        }
    };

    lazySizes.parentFit = parentFit;

    document.addEventListener('lazybeforesizes', function(e) {
        if (e.defaultPrevented || e.detail.instance != lazySizes) {
            return;
        }

        var element = e.target;
        e.detail.width = parentFit.calculateSize(element, e.detail.width);
    });
}));

/*
This lazysizes plugin optimizes perceived performance by adding better support for rendering progressive JPGs/PNGs in conjunction with the LQIP pattern.
*/
(function(window, factory) {
    var globalInstall = function() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if (typeof module == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
}(window, function(window, document, lazySizes) {
    /*jshint eqnull:true */
    'use strict';
    var regImg, onLoad;

    if ('srcset' in document.createElement('img')) {
        regImg = /^img$/i;

        onLoad = function(e) {
            e.target.style.backgroundSize = '';
            e.target.style.backgroundImage = '';
            e.target.removeEventListener(e.type, onLoad);
        };

        document.addEventListener('lazybeforeunveil', function(e) {
            if (e.detail.instance != lazySizes) {
                return;
            }

            var img = e.target;
            if (!regImg.test(img.nodeName)) {
                return;
            }
            var src = img.getAttribute('src');
            if (src) {
                img.style.backgroundSize = '100% 100%';
                img.style.backgroundImage = 'url(' + src + ')';
                img.removeAttribute('src');
                img.addEventListener('load', onLoad);
            }
        }, false);
    }
}));

(function(window, factory) {
    var lazySizes = factory(window, window.document);
    window.lazySizes = lazySizes;
    if (typeof module == 'object' && module.exports) {
        module.exports = lazySizes;
    }
}(window, function l(window, document) {
    'use strict';
    /*jshint eqnull:true */
    if (!document.getElementsByClassName) {
        return;
    }

    var lazysizes, lazySizesConfig;

    var docElem = document.documentElement;

    var Date = window.Date;

    var supportPicture = window.HTMLPictureElement;

    var _addEventListener = 'addEventListener';

    var _getAttribute = 'getAttribute';

    var addEventListener = window[_addEventListener];

    var setTimeout = window.setTimeout;

    var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

    var requestIdleCallback = window.requestIdleCallback;

    var regPicture = /^picture$/i;

    var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

    var regClassCache = {};

    var forEach = Array.prototype.forEach;

    var hasClass = function(ele, cls) {
        if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        }
        return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
    };

    var addClass = function(ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
        }
    };

    var removeClass = function(ele, cls) {
        var reg;
        if ((reg = hasClass(ele, cls))) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
        }
    };

    var addRemoveLoadEvents = function(dom, fn, add) {
        var action = add ? _addEventListener : 'removeEventListener';
        if (add) {
            addRemoveLoadEvents(dom, fn);
        }
        loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
        });
    };

    var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
        var event = document.createEvent('Event');

        if (!detail) {
            detail = {};
        }

        detail.instance = lazysizes;

        event.initEvent(name, !noBubbles, !noCancelable);

        event.detail = detail;

        elem.dispatchEvent(event);
        return event;
    };

    var updatePolyfill = function(el, full) {
        var polyfill;
        if (!supportPicture && (polyfill = (window.picturefill || lazySizesConfig.pf))) {
            if (full && full.src && !el[_getAttribute]('srcset')) {
                el.setAttribute('srcset', full.src);
            }
            polyfill({
                reevaluate: true,
                elements: [el]
            });
        } else if (full && full.src) {
            el.src = full.src;
        }
    };

    var getCSS = function(elem, style) {
        return (getComputedStyle(elem, null) || {})[style];
    };

    var getWidth = function(elem, parent, width) {
        width = width || elem.offsetWidth;

        while (width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
        }

        return width;
    };

    var rAF = (function() {
        var running, waiting;
        var firstFns = [];
        var secondFns = [];
        var fns = firstFns;

        var run = function() {
            var runFns = fns;

            fns = firstFns.length ? secondFns : firstFns;

            running = true;
            waiting = false;

            while (runFns.length) {
                runFns.shift()();
            }

            running = false;
        };

        var rafBatch = function(fn, queue) {
            if (running && !queue) {
                fn.apply(this, arguments);
            } else {
                fns.push(fn);

                if (!waiting) {
                    waiting = true;
                    (document.hidden ? setTimeout : requestAnimationFrame)(run);
                }
            }
        };

        rafBatch._lsFlush = run;

        return rafBatch;
    })();

    var rAFIt = function(fn, simple) {
        return simple ?
            function() {
                rAF(fn);
            } :
            function() {
                var that = this;
                var args = arguments;
                rAF(function() {
                    fn.apply(that, args);
                });
            };
    };

    var throttle = function(fn) {
        var running;
        var lastTime = 0;
        var gDelay = lazySizesConfig.throttleDelay;
        var rICTimeout = lazySizesConfig.ricTimeout;
        var run = function() {
            running = false;
            lastTime = Date.now();
            fn();
        };
        var idleCallback = requestIdleCallback && rICTimeout > 49 ?
            function() {
                requestIdleCallback(run, {
                    timeout: rICTimeout
                });

                if (rICTimeout !== lazySizesConfig.ricTimeout) {
                    rICTimeout = lazySizesConfig.ricTimeout;
                }
            } :
            rAFIt(function() {
                setTimeout(run);
            }, true);

        return function(isPriority) {
            var delay;

            if ((isPriority = isPriority === true)) {
                rICTimeout = 33;
            }

            if (running) {
                return;
            }

            running = true;

            delay = gDelay - (Date.now() - lastTime);

            if (delay < 0) {
                delay = 0;
            }

            if (isPriority || delay < 9) {
                idleCallback();
            } else {
                setTimeout(idleCallback, delay);
            }
        };
    };

    //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
    var debounce = function(func) {
        var timeout, timestamp;
        var wait = 99;
        var run = function() {
            timeout = null;
            func();
        };
        var later = function() {
            var last = Date.now() - timestamp;

            if (last < wait) {
                setTimeout(later, wait - last);
            } else {
                (requestIdleCallback || run)(run);
            }
        };

        return function() {
            timestamp = Date.now();

            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };

    (function() {
        var prop;

        var lazySizesDefaults = {
            lazyClass: 'lazyload',
            loadedClass: 'lazyloaded',
            loadingClass: 'lazyloading',
            preloadClass: 'lazypreload',
            errorClass: 'lazyerror',
            //strictClass: 'lazystrict',
            autosizesClass: 'lazyautosizes',
            srcAttr: 'data-src',
            srcsetAttr: 'data-srcset',
            sizesAttr: 'data-sizes',
            //preloadAfterLoad: false,
            minSize: 40,
            customMedia: {},
            init: true,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: true,
            ricTimeout: 0,
            throttleDelay: 125,
        };

        lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

        for (prop in lazySizesDefaults) {
            if (!(prop in lazySizesConfig)) {
                lazySizesConfig[prop] = lazySizesDefaults[prop];
            }
        }

        window.lazySizesConfig = lazySizesConfig;

        setTimeout(function() {
            if (lazySizesConfig.init) {
                init();
            }
        });
    })();

    var loader = (function() {
        var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;

        var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

        var shrinkExpand = 0;
        var currentExpand = 0;

        var isLoading = 0;
        var lowRuns = -1;

        var resetPreloading = function(e) {
            isLoading--;
            if (!e || isLoading < 0 || !e.target) {
                isLoading = 0;
            }
        };

        var isVisible = function(elem) {
            if (isBodyHidden == null) {
                isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
            }

            return isBodyHidden || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');
        };

        var isNestedVisible = function(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);

            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;

            while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
                visible = ((getCSS(parent, 'opacity') || 1) > 0);

                if (visible && getCSS(parent, 'overflow') != 'visible') {
                    outerRect = parent.getBoundingClientRect();
                    visible = eLright > outerRect.left &&
                        eLleft < outerRect.right &&
                        eLbottom > outerRect.top - 1 &&
                        eLtop < outerRect.bottom + 1;
                }
            }

            return visible;
        };

        var checkElements = function() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
                beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;

            if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {

                i = 0;

                lowRuns++;

                defaultExpand = (!lazySizesConfig.expand || lazySizesConfig.expand < 1) ?
                    docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
                    lazySizesConfig.expand;

                lazysizes._defEx = defaultExpand;

                preloadExpand = defaultExpand * lazySizesConfig.expFactor;
                hFac = lazySizesConfig.hFac;
                isBodyHidden = null;

                if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
                    currentExpand = preloadExpand;
                    lowRuns = 0;
                } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                    currentExpand = defaultExpand;
                } else {
                    currentExpand = shrinkExpand;
                }

                for (; i < eLlen; i++) {

                    if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
                        continue;
                    }

                    if (!supportScroll) {
                        unveilElement(lazyloadElems[i]);
                        continue;
                    }

                    if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
                        elemExpand = currentExpand;
                    }

                    if (beforeExpandVal !== elemExpand) {
                        eLvW = innerWidth + (elemExpand * hFac);
                        elvH = innerHeight + elemExpand;
                        elemNegativeExpand = elemExpand * -1;
                        beforeExpandVal = elemExpand;
                    }

                    rect = lazyloadElems[i].getBoundingClientRect();

                    if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
                        (eLtop = rect.top) <= elvH &&
                        (eLright = rect.right) >= elemNegativeExpand * hFac &&
                        (eLleft = rect.left) <= eLvW &&
                        (eLbottom || eLright || eLleft || eLtop) &&
                        (lazySizesConfig.loadHidden || isVisible(lazyloadElems[i])) &&
                        ((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                        unveilElement(lazyloadElems[i]);
                        loadedSomething = true;
                        if (isLoading > 9) {
                            break;
                        }
                    } else if (!loadedSomething && isCompleted && !autoLoadElem &&
                        isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
                        (preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
                        (preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))) {
                        autoLoadElem = preloadElems[0] || lazyloadElems[i];
                    }
                }

                if (autoLoadElem && !loadedSomething) {
                    unveilElement(autoLoadElem);
                }
            }
        };

        var throttledCheckElements = throttle(checkElements);

        var switchLoadingClass = function(e) {
            var elem = e.target;

            if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
            }

            resetPreloading(e);
            addClass(elem, lazySizesConfig.loadedClass);
            removeClass(elem, lazySizesConfig.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass);
            triggerEvent(elem, 'lazyloaded');
        };
        var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
        var rafSwitchLoadingClass = function(e) {
            rafedSwitchLoadingClass({
                target: e.target
            });
        };

        var changeIframeSrc = function(elem, src) {
            try {
                elem.contentWindow.location.replace(src);
            } catch (e) {
                elem.src = src;
            }
        };

        var handleSources = function(source) {
            var customMedia;

            var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

            if ((customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')])) {
                source.setAttribute('media', customMedia);
            }

            if (sourceSrcset) {
                source.setAttribute('srcset', sourceSrcset);
            }
        };

        var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
            var src, srcset, parent, isPicture, event, firesLoad;

            if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {

                if (sizes) {
                    if (isAuto) {
                        addClass(elem, lazySizesConfig.autosizesClass);
                    } else {
                        elem.setAttribute('sizes', sizes);
                    }
                }

                srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
                src = elem[_getAttribute](lazySizesConfig.srcAttr);

                if (isImg) {
                    parent = elem.parentNode;
                    isPicture = parent && regPicture.test(parent.nodeName || '');
                }

                firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

                event = {
                    target: elem
                };

                addClass(elem, lazySizesConfig.loadingClass);

                if (firesLoad) {
                    clearTimeout(resetPreloadingTimer);
                    resetPreloadingTimer = setTimeout(resetPreloading, 2500);
                    addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }

                if (isPicture) {
                    forEach.call(parent.getElementsByTagName('source'), handleSources);
                }

                if (srcset) {
                    elem.setAttribute('srcset', srcset);
                } else if (src && !isPicture) {
                    if (regIframe.test(elem.nodeName)) {
                        changeIframeSrc(elem, src);
                    } else {
                        elem.src = src;
                    }
                }

                if (isImg && (srcset || isPicture)) {
                    updatePolyfill(elem, {
                        src: src
                    });
                }
            }

            if (elem._lazyRace) {
                delete elem._lazyRace;
            }
            removeClass(elem, lazySizesConfig.lazyClass);

            rAF(function() {
                // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
                if (!firesLoad || (elem.complete && elem.naturalWidth > 1)) {
                    switchLoadingClass(event);
                    elem._lazyCache = true;
                    setTimeout(function() {
                        if ('_lazyCache' in elem) {
                            delete elem._lazyCache;
                        }
                    }, 9);
                }
            }, true);
        });

        var unveilElement = function(elem) {
            var detail;

            var isImg = regImg.test(elem.nodeName);

            //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
            var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
            var isAuto = sizes == 'auto';

            if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)) {
                return;
            }

            detail = triggerEvent(elem, 'lazyunveilread').detail;

            if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
            }

            elem._lazyRace = true;
            isLoading++;

            lazyUnveil(elem, detail, isAuto, sizes, isImg);
        };

        var onload = function() {
            if (isCompleted) {
                return;
            }
            if (Date.now() - started < 999) {
                setTimeout(onload, 999);
                return;
            }
            var afterScroll = debounce(function() {
                lazySizesConfig.loadMode = 3;
                throttledCheckElements();
            });

            isCompleted = true;

            lazySizesConfig.loadMode = 3;

            throttledCheckElements();

            addEventListener('scroll', function() {
                if (lazySizesConfig.loadMode == 3) {
                    lazySizesConfig.loadMode = 2;
                }
                afterScroll();
            }, true);
        };

        return {
            _: function() {
                started = Date.now();

                lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
                preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);

                addEventListener('scroll', throttledCheckElements, true);

                addEventListener('resize', throttledCheckElements, true);

                if (window.MutationObserver) {
                    new MutationObserver(throttledCheckElements).observe(docElem, {
                        childList: true,
                        subtree: true,
                        attributes: true
                    });
                } else {
                    docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
                    docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
                    setInterval(throttledCheckElements, 999);
                }

                addEventListener('hashchange', throttledCheckElements, true);

                //, 'fullscreenchange'
                ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name) {
                    document[_addEventListener](name, throttledCheckElements, true);
                });

                if ((/d$|^c/.test(document.readyState))) {
                    onload();
                } else {
                    addEventListener('load', onload);
                    document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
                    setTimeout(onload, 20000);
                }

                if (lazysizes.elements.length) {
                    checkElements();
                    rAF._lsFlush();
                } else {
                    throttledCheckElements();
                }
            },
            checkElems: throttledCheckElements,
            unveil: unveilElement
        };
    })();


    var autoSizer = (function() {
        var autosizesElems;

        var sizeElement = rAFIt(function(elem, parent, event, width) {
            var sources, i, len;
            elem._lazysizesWidth = width;
            width += 'px';

            elem.setAttribute('sizes', width);

            if (regPicture.test(parent.nodeName || '')) {
                sources = parent.getElementsByTagName('source');
                for (i = 0, len = sources.length; i < len; i++) {
                    sources[i].setAttribute('sizes', width);
                }
            }

            if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
            }
        });
        var getSizeElement = function(elem, dataAttr, width) {
            var event;
            var parent = elem.parentNode;

            if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, 'lazybeforesizes', {
                    width: width,
                    dataAttr: !!dataAttr
                });

                if (!event.defaultPrevented) {
                    width = event.detail.width;

                    if (width && width !== elem._lazysizesWidth) {
                        sizeElement(elem, parent, event, width);
                    }
                }
            }
        };

        var updateElementsSizes = function() {
            var i;
            var len = autosizesElems.length;
            if (len) {
                i = 0;

                for (; i < len; i++) {
                    getSizeElement(autosizesElems[i]);
                }
            }
        };

        var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

        return {
            _: function() {
                autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
                addEventListener('resize', debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
        };
    })();

    var init = function() {
        if (!init.i) {
            init.i = true;
            autoSizer._();
            loader._();
        }
    };

    lazysizes = {
        cfg: lazySizesConfig,
        autoSizer: autoSizer,
        loader: loader,
        init: init,
        uP: updatePolyfill,
        aC: addClass,
        rC: removeClass,
        hC: hasClass,
        fire: triggerEvent,
        gW: getWidth,
        rAF: rAF,
    };

    return lazysizes;
}));