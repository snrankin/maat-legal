;
(function(window, document, undefined) {

    var tests = [];








    var ModernizrProto = {

        _version: '3.7.1',



        _config: {
            'classPrefix': '',
            'enableClasses': true,
            'enableJSClass': true,
            'usePrefixes': true
        },


        _q: [],


        on: function(test, cb) {






            var self = this;
            setTimeout(function() {
                cb(self[test]);
            }, 0);
        },

        addTest: function(name, fn, options) {
            tests.push({
                name: name,
                fn: fn,
                options: options
            });
        },

        addAsyncTest: function(fn) {
            tests.push({
                name: null,
                fn: fn
            });
        }
    };




    var Modernizr = function() {};
    Modernizr.prototype = ModernizrProto;



    Modernizr = new Modernizr();



    var classes = [];











    function is(obj, type) {
        return typeof obj === type;
    }

    ;







    function testRunner() {
        var featureNames;
        var feature;
        var aliasIdx;
        var result;
        var nameIdx;
        var featureName;
        var featureNameSplit;

        for (var featureIdx in tests) {
            if (tests.hasOwnProperty(featureIdx)) {
                featureNames = [];
                feature = tests[featureIdx];







                if (feature.name) {
                    featureNames.push(feature.name.toLowerCase());

                    if (feature.options && feature.options.aliases && feature.options.aliases.length) {

                        for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
                            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                        }
                    }
                }


                result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


                for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
                    featureName = featureNames[nameIdx];






                    featureNameSplit = featureName.split('.');

                    if (featureNameSplit.length === 1) {
                        Modernizr[featureNameSplit[0]] = result;
                    } else {

                        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                            Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                        }

                        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
                    }

                    classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
                }
            }
        }
    };







    var docElement = document.documentElement;








    var isSVG = docElement.nodeName.toLowerCase() === 'svg';












    function setClasses(classes) {
        var className = docElement.className;
        var classPrefix = Modernizr._config.classPrefix || '';

        if (isSVG) {
            className = className.baseVal;
        }



        if (Modernizr._config.enableJSClass) {
            var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
            className = className.replace(reJS, '$1' + classPrefix + 'js$2');
        }

        if (Modernizr._config.enableClasses) {

            if (classes.length > 0) {
                className += ' ' + classPrefix + classes.join(' ' + classPrefix);
            }
            if (isSVG) {
                docElement.className.baseVal = className;
            } else {
                docElement.className = className;
            }
        }
    }

    ;













    var hasOwnProp;

    (function() {
        var _hasOwnProperty = ({}).hasOwnProperty;



        if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
            hasOwnProp = function(object, property) {
                return _hasOwnProperty.call(object, property);
            };
        } else {
            hasOwnProp = function(object, property) {
                return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
            };
        }
    })();





    ModernizrProto._l = {};

























    ModernizrProto.on = function(feature, cb) {

        if (!this._l[feature]) {
            this._l[feature] = [];
        }


        this._l[feature].push(cb);


        if (Modernizr.hasOwnProperty(feature)) {

            setTimeout(function() {
                Modernizr._trigger(feature, Modernizr[feature]);
            }, 0);
        }
    };














    ModernizrProto._trigger = function(feature, res) {
        if (!this._l[feature]) {
            return;
        }

        var cbs = this._l[feature];


        setTimeout(function() {
            var i, cb;
            for (i = 0; i < cbs.length; i++) {
                cb = cbs[i];
                cb(res);
            }
        }, 0);


        delete this._l[feature];
    };







































































    function addTest(feature, test) {

        if (typeof feature === 'object') {
            for (var key in feature) {
                if (hasOwnProp(feature, key)) {
                    addTest(key, feature[key]);
                }
            }
        } else {

            feature = feature.toLowerCase();
            var featureNameSplit = feature.split('.');
            var last = Modernizr[featureNameSplit[0]];


            if (featureNameSplit.length === 2) {
                last = last[featureNameSplit[1]];
            }

            if (typeof last !== 'undefined') {





                return Modernizr;
            }

            test = typeof test === 'function' ? test() : test;


            if (featureNameSplit.length === 1) {
                Modernizr[featureNameSplit[0]] = test;
            } else {

                if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                    Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                }

                Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
            }


            setClasses([(!!test && test !== false ? '' : 'no-') + featureNameSplit.join('-')]);


            Modernizr._trigger(feature, test);
        }

        return Modernizr;
    }


    Modernizr._q.push(function() {
        ModernizrProto.addTest = addTest;
    });



















    var omPrefixes = 'Moz O ms Webkit';


    var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
    ModernizrProto._cssomPrefixes = cssomPrefixes;



























    var atRule = function(prop) {
        var length = prefixes.length;
        var cssrule = window.CSSRule;
        var rule;

        if (typeof cssrule === 'undefined') {
            return undefined;
        }

        if (!prop) {
            return false;
        }


        prop = prop.replace(/^@/, '');


        rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

        if (rule in cssrule) {
            return '@' + prop;
        }

        for (var i = 0; i < length; i++) {

            var prefix = prefixes[i];
            var thisRule = prefix.toUpperCase() + '_' + rule;

            if (thisRule in cssrule) {
                return '@-' + prefix.toLowerCase() + '-' + prop;
            }
        }

        return false;
    };

    ModernizrProto.atRule = atRule;




















    var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
    ModernizrProto._domPrefixes = domPrefixes;












    function createElement() {
        if (typeof document.createElement !== 'function') {


            return document.createElement(arguments[0]);
        } else if (isSVG) {
            return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
        } else {
            return document.createElement.apply(document, arguments);
        }
    }

    ;




























    var hasEvent = (function() {



        var needsFallback = !('onblur' in docElement);

        function inner(eventName, element) {

            var isSupported;
            if (!eventName) {
                return false;
            }
            if (!element || typeof element === 'string') {
                element = createElement(element || 'div');
            }




            eventName = 'on' + eventName;
            isSupported = eventName in element;


            if (!isSupported && needsFallback) {
                if (!element.setAttribute) {


                    element = createElement('div');
                }

                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                if (element[eventName] !== undefined) {

                    element[eventName] = undefined;
                }
                element.removeAttribute(eventName);
            }

            return isSupported;
        }
        return inner;
    })();

    ModernizrProto.hasEvent = hasEvent;








    var html5;
    if (!isSVG) {



        ;
        (function(window, document) {


            var version = '3.7.3';


            var options = window.html5 || {};


            var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;


            var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;


            var supportsHtml5Styles;


            var expando = '_html5shiv';


            var expanID = 0;


            var expandoData = {};


            var supportsUnknownElements;

            (function() {
                try {
                    var a = document.createElement('a');
                    a.innerHTML = '<xyz></xyz>';

                    supportsHtml5Styles = ('hidden' in a);

                    supportsUnknownElements = a.childNodes.length == 1 || (function() {

                        (document.createElement)('a');
                        var frag = document.createDocumentFragment();
                        return (
                            typeof frag.cloneNode == 'undefined' ||
                            typeof frag.createDocumentFragment == 'undefined' ||
                            typeof frag.createElement == 'undefined'
                        );
                    }());
                } catch (e) {

                    supportsHtml5Styles = true;
                    supportsUnknownElements = true;
                }

            }());










            function addStyleSheet(ownerDocument, cssText) {
                var p = ownerDocument.createElement('p'),
                    parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

                p.innerHTML = 'x<style>' + cssText + '</style>';
                return parent.insertBefore(p.lastChild, parent.firstChild);
            }






            function getElements() {
                var elements = html5.elements;
                return typeof elements == 'string' ? elements.split(' ') : elements;
            }







            function addElements(newElements, ownerDocument) {
                var elements = html5.elements;
                if (typeof elements != 'string') {
                    elements = elements.join(' ');
                }
                if (typeof newElements != 'string') {
                    newElements = newElements.join(' ');
                }
                html5.elements = elements + ' ' + newElements;
                shivDocument(ownerDocument);
            }







            function getExpandoData(ownerDocument) {
                var data = expandoData[ownerDocument[expando]];
                if (!data) {
                    data = {};
                    expanID++;
                    ownerDocument[expando] = expanID;
                    expandoData[expanID] = data;
                }
                return data;
            }








            function createElement(nodeName, ownerDocument, data) {
                if (!ownerDocument) {
                    ownerDocument = document;
                }
                if (supportsUnknownElements) {
                    return ownerDocument.createElement(nodeName);
                }
                if (!data) {
                    data = getExpandoData(ownerDocument);
                }
                var node;

                if (data.cache[nodeName]) {
                    node = data.cache[nodeName].cloneNode();
                } else if (saveClones.test(nodeName)) {
                    node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
                } else {
                    node = data.createElem(nodeName);
                }








                return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
            }







            function createDocumentFragment(ownerDocument, data) {
                if (!ownerDocument) {
                    ownerDocument = document;
                }
                if (supportsUnknownElements) {
                    return ownerDocument.createDocumentFragment();
                }
                data = data || getExpandoData(ownerDocument);
                var clone = data.frag.cloneNode(),
                    i = 0,
                    elems = getElements(),
                    l = elems.length;
                for (; i < l; i++) {
                    clone.createElement(elems[i]);
                }
                return clone;
            }







            function shivMethods(ownerDocument, data) {
                if (!data.cache) {
                    data.cache = {};
                    data.createElem = ownerDocument.createElement;
                    data.createFrag = ownerDocument.createDocumentFragment;
                    data.frag = data.createFrag();
                }


                ownerDocument.createElement = function(nodeName) {

                    if (!html5.shivMethods) {
                        return data.createElem(nodeName);
                    }
                    return createElement(nodeName, ownerDocument, data);
                };

                ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                    'var n=f.cloneNode(),c=n.createElement;' +
                    'h.shivMethods&&(' +

                    getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                        data.createElem(nodeName);
                        data.frag.createElement(nodeName);
                        return 'c("' + nodeName + '")';
                    }) +
                    ');return n}'
                )(html5, data.frag);
            }









            function shivDocument(ownerDocument) {
                if (!ownerDocument) {
                    ownerDocument = document;
                }
                var data = getExpandoData(ownerDocument);

                if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                    data.hasCSS = !!addStyleSheet(ownerDocument,

                        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +

                        'mark{background:#FF0;color:#000}' +

                        'template{display:none}'
                    );
                }
                if (!supportsUnknownElements) {
                    shivMethods(ownerDocument, data);
                }
                return ownerDocument;
            }












            var html5 = {






                'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',




                'version': version,






                'shivCSS': (options.shivCSS !== false),






                'supportsUnknownElements': supportsUnknownElements,







                'shivMethods': (options.shivMethods !== false),






                'type': 'default',


                'shivDocument': shivDocument,


                createElement: createElement,


                createDocumentFragment: createDocumentFragment,


                addElements: addElements
            };




            window.html5 = html5;


            shivDocument(document);




            var reMedia = /^$|\b(?:all|print)\b/;


            var shivNamespace = 'html5shiv';


            var supportsShivableSheets = !supportsUnknownElements && (function() {

                var docEl = document.documentElement;
                return !(
                    typeof document.namespaces == 'undefined' ||
                    typeof document.parentWindow == 'undefined' ||
                    typeof docEl.applyElement == 'undefined' ||
                    typeof docEl.removeNode == 'undefined' ||
                    typeof window.attachEvent == 'undefined'
                );
            }());










            function addWrappers(ownerDocument) {
                var node,
                    nodes = ownerDocument.getElementsByTagName('*'),
                    index = nodes.length,
                    reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
                    result = [];

                while (index--) {
                    node = nodes[index];
                    if (reElements.test(node.nodeName)) {
                        result.push(node.applyElement(createWrapper(node)));
                    }
                }
                return result;
            }







            function createWrapper(element) {
                var node,
                    nodes = element.attributes,
                    index = nodes.length,
                    wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);


                while (index--) {
                    node = nodes[index];
                    node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
                }

                wrapper.style.cssText = element.style.cssText;
                return wrapper;
            }








            function shivCssText(cssText) {
                var pair,
                    parts = cssText.split('{'),
                    index = parts.length,
                    reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
                    replacement = '$1' + shivNamespace + '\\:$2';

                while (index--) {
                    pair = parts[index] = parts[index].split('}');
                    pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
                    parts[index] = pair.join('}');
                }
                return parts.join('{');
            }






            function removeWrappers(wrappers) {
                var index = wrappers.length;
                while (index--) {
                    wrappers[index].removeNode();
                }
            }









            function shivPrint(ownerDocument) {
                var shivedSheet,
                    wrappers,
                    data = getExpandoData(ownerDocument),
                    namespaces = ownerDocument.namespaces,
                    ownerWindow = ownerDocument.parentWindow;

                if (!supportsShivableSheets || ownerDocument.printShived) {
                    return ownerDocument;
                }
                if (typeof namespaces[shivNamespace] == 'undefined') {
                    namespaces.add(shivNamespace);
                }

                function removeSheet() {
                    clearTimeout(data._removeSheetTimer);
                    if (shivedSheet) {
                        shivedSheet.removeNode(true);
                    }
                    shivedSheet = null;
                }

                ownerWindow.attachEvent('onbeforeprint', function() {

                    removeSheet();

                    var imports,
                        length,
                        sheet,
                        collection = ownerDocument.styleSheets,
                        cssText = [],
                        index = collection.length,
                        sheets = Array(index);


                    while (index--) {
                        sheets[index] = collection[index];
                    }

                    while ((sheet = sheets.pop())) {


                        if (!sheet.disabled && reMedia.test(sheet.media)) {

                            try {
                                imports = sheet.imports;
                                length = imports.length;
                            } catch (er) {
                                length = 0;
                            }

                            for (index = 0; index < length; index++) {
                                sheets.push(imports[index]);
                            }

                            try {
                                cssText.push(sheet.cssText);
                            } catch (er) {}
                        }
                    }


                    cssText = shivCssText(cssText.reverse().join(''));
                    wrappers = addWrappers(ownerDocument);
                    shivedSheet = addStyleSheet(ownerDocument, cssText);

                });

                ownerWindow.attachEvent('onafterprint', function() {

                    removeWrappers(wrappers);
                    clearTimeout(data._removeSheetTimer);
                    data._removeSheetTimer = setTimeout(removeSheet, 500);
                });

                ownerDocument.printShived = true;
                return ownerDocument;
            }




            html5.type += ' print';
            html5.shivPrint = shivPrint;


            shivPrint(document);

            if (typeof module == 'object' && module.exports) {
                module.exports = html5;
            }

        }(typeof window !== "undefined" ? window : this, document));
    }

    ;

    var err = function() {};
    var warn = function() {};

    if (window.console) {
        err = function() {
            var method = console.error ? 'error' : 'log';
            window.console[method].apply(window.console, Array.prototype.slice.call(arguments));
        };

        warn = function() {
            var method = console.warn ? 'warn' : 'log';
            window.console[method].apply(window.console, Array.prototype.slice.call(arguments));
        };
    }












    ModernizrProto.load = function() {
        if ('yepnope' in window) {
            warn('yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. yepnope appears to be available on the page, so we’ll use it to handle this call to Modernizr.load, but please update your code to use yepnope directly.\n See http://github.com/Modernizr/Modernizr/issues/1182 for more information.');
            window.yepnope.apply(window, [].slice.call(arguments, 0));
        } else {
            err('yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. Get it from http://yepnopejs.com. See http://github.com/Modernizr/Modernizr/issues/1182 for more information.');
        }
    };











    function getBody() {

        var body = document.body;

        if (!body) {

            body = createElement(isSVG ? 'svg' : 'body');
            body.fake = true;
        }

        return body;
    }

    ;












    function injectElementWithStyles(rule, callback, nodes, testnames) {
        var mod = 'modernizr';
        var style;
        var ret;
        var node;
        var docOverflow;
        var div = createElement('div');
        var body = getBody();

        if (parseInt(nodes, 10)) {


            while (nodes--) {
                node = createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }

        style = createElement('style');
        style.type = 'text/css';
        style.id = 's' + mod;



        (!body.fake ? div : body).appendChild(style);
        body.appendChild(div);

        if (style.styleSheet) {
            style.styleSheet.cssText = rule;
        } else {
            style.appendChild(document.createTextNode(rule));
        }
        div.id = mod;

        if (body.fake) {

            body.style.background = '';

            body.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(body);
        }

        ret = callback(div, rule);

        if (body.fake) {
            body.parentNode.removeChild(body);
            docElement.style.overflow = docOverflow;


            docElement.offsetHeight;
        } else {
            div.parentNode.removeChild(div);
        }

        return !!ret;
    }

    ;














































    var mq = (function() {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) {
            return function(mq) {
                var mql = matchMedia(mq);
                return mql && mql.matches || false;
            };
        }

        return function(mq) {
            var bool = false;

            injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function(node) {
                bool = (window.getComputedStyle ?
                    window.getComputedStyle(node, null) :
                    node.currentStyle).position === 'absolute';
            });

            return bool;
        };
    })();

    ModernizrProto.mq = mq;












    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    ;






    var modElem = {
        elem: createElement('modernizr')
    };


    Modernizr._q.push(function() {
        delete modElem.elem;
    });



    var mStyle = {
        style: modElem.elem.style
    };



    Modernizr._q.unshift(function() {
        delete mStyle.style;
    });












    function domToCSS(name) {
        return name.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
    }

    ;













    function computedStyle(elem, pseudo, prop) {
        var result;

        if ('getComputedStyle' in window) {
            result = getComputedStyle.call(window, elem, pseudo);
            var console = window.console;

            if (result !== null) {
                if (prop) {
                    result = result.getPropertyValue(prop);
                }
            } else {
                if (console) {
                    var method = console.error ? 'error' : 'log';
                    console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
                }
            }
        } else {
            result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
        }

        return result;
    }

    ;













    function nativeTestProps(props, value) {
        var i = props.length;

        if ('CSS' in window && 'supports' in window.CSS) {

            while (i--) {
                if (window.CSS.supports(domToCSS(props[i]), value)) {
                    return true;
                }
            }
            return false;
        } else if ('CSSSupportsRule' in window) {

            var conditionText = [];
            while (i--) {
                conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
            }
            conditionText = conditionText.join(' or ');
            return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
                return computedStyle(node, null, 'position') === 'absolute';
            });
        }
        return undefined;
    };










    function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
            return m1 + m2.toUpperCase();
        }).replace(/^-/, '');
    }

    ;














    function testProps(props, prefixed, value, skipValueTest) {
        skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;


        if (!is(value, 'undefined')) {
            var result = nativeTestProps(props, value);
            if (!is(result, 'undefined')) {
                return result;
            }
        }


        var afterInit, i, propsLength, prop, before;








        var elems = ['modernizr', 'tspan', 'samp'];
        while (!mStyle.style && elems.length) {
            afterInit = true;
            mStyle.modElem = createElement(elems.shift());
            mStyle.style = mStyle.modElem.style;
        }


        function cleanElems() {
            if (afterInit) {
                delete mStyle.style;
                delete mStyle.modElem;
            }
        }

        propsLength = props.length;
        for (i = 0; i < propsLength; i++) {
            prop = props[i];
            before = mStyle.style[prop];

            if (contains(prop, '-')) {
                prop = cssToDOM(prop);
            }

            if (mStyle.style[prop] !== undefined) {




                if (!skipValueTest && !is(value, 'undefined')) {



                    try {
                        mStyle.style[prop] = value;
                    } catch (e) {}





                    if (mStyle.style[prop] !== before) {
                        cleanElems();
                        return prefixed === 'pfx' ? prop : true;
                    }
                } else {
                    cleanElems();
                    return prefixed === 'pfx' ? prop : true;
                }
            }
        }
        cleanElems();
        return false;
    }

    ;










    function fnBind(fn, that) {
        return function() {
            return fn.apply(that, arguments);
        };
    }

    ;












    function testDOMProps(props, obj, elem) {
        var item;

        for (var i in props) {
            if (props[i] in obj) {


                if (elem === false) {
                    return props[i];
                }

                item = obj[props[i]];


                if (is(item, 'function')) {

                    return fnBind(item, elem || obj);
                }


                return item;
            }
        }
        return false;
    }

    ;
















    function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');


        if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
            return testProps(props, prefixed, value, skipValueTest);


        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }






    ModernizrProto.testAllProps = testPropsAll;



































































    var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
        if (prop.indexOf('@') === 0) {
            return atRule(prop);
        }

        if (prop.indexOf('-') !== -1) {

            prop = cssToDOM(prop);
        }
        if (!obj) {
            return testPropsAll(prop, 'pfx');
        } else {

            return testPropsAll(prop, obj, elem);
        }
    };




































    var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', '']);


    ModernizrProto._prefixes = prefixes;






























    var prefixedCSS = ModernizrProto.prefixedCSS = function(prop) {
        var prefixedProp = prefixed(prop);
        return prefixedProp && domToCSS(prefixedProp);
    };








































    function testAllProps(prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest);
    }

    ModernizrProto.testAllProps = testAllProps;




































    var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
        return testProps([prop], undefined, value, useValue);
    };


























































    var testStyles = ModernizrProto.testStyles = injectElementWithStyles;



    testRunner();


    setClasses(classes);

    delete ModernizrProto.addTest;
    delete ModernizrProto.addAsyncTest;


    for (var i = 0; i < Modernizr._q.length; i++) {
        Modernizr._q[i]();
    }


    window.Modernizr = Modernizr;


    ;

})(window, document);





(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
        (global = global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, function(exports, $) {
    'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

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

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }

            ownKeys.forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        }

        return target;
    }

    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }













    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000;

    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
        return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments);
                }

                return undefined;
            }
        };
    }

    function transitionEndEmulator(duration) {
        var _this = this;

        var called = false;
        $(this).one(Util.TRANSITION_END, function() {
            called = true;
        });
        setTimeout(function() {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);
        return this;
    }

    function setTransitionEndSupport() {
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }







    var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
            do {

                prefix += ~~(Math.random() * MAX_UID);
            } while (document.getElementById(prefix));

            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');

            if (!selector || selector === '#') {
                var hrefAttr = element.getAttribute('href');
                selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
            }

            try {
                return document.querySelector(selector) ? selector : null;
            } catch (err) {
                return null;
            }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
            if (!element) {
                return 0;
            }


            var transitionDuration = $(element).css('transition-duration');
            var transitionDelay = $(element).css('transition-delay');
            var floatTransitionDuration = parseFloat(transitionDuration);
            var floatTransitionDelay = parseFloat(transitionDelay);

            if (!floatTransitionDuration && !floatTransitionDelay) {
                return 0;
            }


            transitionDuration = transitionDuration.split(',')[0];
            transitionDelay = transitionDelay.split(',')[0];
            return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(TRANSITION_END);
        },

        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
                if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                    }
                }
            }
        },
        findShadowRoot: function findShadowRoot(element) {
            if (!document.documentElement.attachShadow) {
                return null;
            }


            if (typeof element.getRootNode === 'function') {
                var root = element.getRootNode();
                return root instanceof ShadowRoot ? root : null;
            }

            if (element instanceof ShadowRoot) {
                return element;
            }


            if (!element.parentNode) {
                return null;
            }

            return Util.findShadowRoot(element.parentNode);
        }
    };
    setTransitionEndSupport();







    var NAME = 'alert';
    var VERSION = '4.3.1';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
        DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
        CLOSE: "close" + EVENT_KEY,
        CLOSED: "closed" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        ALERT: 'alert',
        FADE: 'fade',
        SHOW: 'show'






    };

    var Alert =

        function() {
            function Alert(element) {
                this._element = element;
            }


            var _proto = Alert.prototype;


            _proto.close = function close(element) {
                var rootElement = this._element;

                if (element) {
                    rootElement = this._getRootElement(element);
                }

                var customEvent = this._triggerCloseEvent(rootElement);

                if (customEvent.isDefaultPrevented()) {
                    return;
                }

                this._removeElement(rootElement);
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            };

            _proto._getRootElement = function _getRootElement(element) {
                var selector = Util.getSelectorFromElement(element);
                var parent = false;

                if (selector) {
                    parent = document.querySelector(selector);
                }

                if (!parent) {
                    parent = $(element).closest("." + ClassName.ALERT)[0];
                }

                return parent;
            };

            _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
                var closeEvent = $.Event(Event.CLOSE);
                $(element).trigger(closeEvent);
                return closeEvent;
            };

            _proto._removeElement = function _removeElement(element) {
                var _this = this;

                $(element).removeClass(ClassName.SHOW);

                if (!$(element).hasClass(ClassName.FADE)) {
                    this._destroyElement(element);

                    return;
                }

                var transitionDuration = Util.getTransitionDurationFromElement(element);
                $(element).one(Util.TRANSITION_END, function(event) {
                    return _this._destroyElement(element, event);
                }).emulateTransitionEnd(transitionDuration);
            };

            _proto._destroyElement = function _destroyElement(element) {
                $(element).detach().trigger(Event.CLOSED).remove();
            };

            Alert._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Alert(this);
                        $element.data(DATA_KEY, data);
                    }

                    if (config === 'close') {
                        data[config](this);
                    }
                });
            };

            Alert._handleDismiss = function _handleDismiss(alertInstance) {
                return function(event) {
                    if (event) {
                        event.preventDefault();
                    }

                    alertInstance.close(this);
                };
            };

            _createClass(Alert, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }]);

            return Alert;
        }();







    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));






    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
    };







    var NAME$1 = 'button';
    var VERSION$1 = '4.3.1';
    var DATA_KEY$1 = 'bs.button';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var ClassName$1 = {
        ACTIVE: 'active',
        BUTTON: 'btn',
        FOCUS: 'focus'
    };
    var Selector$1 = {
        DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
        DATA_TOGGLE: '[data-toggle="buttons"]',
        INPUT: 'input:not([type="hidden"])',
        ACTIVE: '.active',
        BUTTON: '.btn'
    };
    var Event$1 = {
        CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
        FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)






    };

    var Button =

        function() {
            function Button(element) {
                this._element = element;
            }


            var _proto = Button.prototype;


            _proto.toggle = function toggle() {
                var triggerChangeEvent = true;
                var addAriaPressed = true;
                var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

                if (rootElement) {
                    var input = this._element.querySelector(Selector$1.INPUT);

                    if (input) {
                        if (input.type === 'radio') {
                            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                                triggerChangeEvent = false;
                            } else {
                                var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

                                if (activeElement) {
                                    $(activeElement).removeClass(ClassName$1.ACTIVE);
                                }
                            }
                        }

                        if (triggerChangeEvent) {
                            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                                return;
                            }

                            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
                            $(input).trigger('change');
                        }

                        input.focus();
                        addAriaPressed = false;
                    }
                }

                if (addAriaPressed) {
                    this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
                }

                if (triggerChangeEvent) {
                    $(this._element).toggleClass(ClassName$1.ACTIVE);
                }
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY$1);
                this._element = null;
            };

            Button._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$1);

                    if (!data) {
                        data = new Button(this);
                        $(this).data(DATA_KEY$1, data);
                    }

                    if (config === 'toggle') {
                        data[config]();
                    }
                });
            };

            _createClass(Button, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$1;
                }
            }]);

            return Button;
        }();







    $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function(event) {
        event.preventDefault();
        var button = event.target;

        if (!$(button).hasClass(ClassName$1.BUTTON)) {
            button = $(button).closest(Selector$1.BUTTON);
        }

        Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function(event) {
        var button = $(event.target).closest(Selector$1.BUTTON)[0];
        $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });






    $.fn[NAME$1] = Button._jQueryInterface;
    $.fn[NAME$1].Constructor = Button;

    $.fn[NAME$1].noConflict = function() {
        $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
        return Button._jQueryInterface;
    };







    var NAME$2 = 'carousel';
    var VERSION$2 = '4.3.1';
    var DATA_KEY$2 = 'bs.carousel';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$2 = '.data-api';
    var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
    var ARROW_LEFT_KEYCODE = 37;

    var ARROW_RIGHT_KEYCODE = 39;

    var TOUCHEVENT_COMPAT_WAIT = 500;

    var SWIPE_THRESHOLD = 40;
    var Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true,
        touch: true
    };
    var DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean',
        touch: 'boolean'
    };
    var Direction = {
        NEXT: 'next',
        PREV: 'prev',
        LEFT: 'left',
        RIGHT: 'right'
    };
    var Event$2 = {
        SLIDE: "slide" + EVENT_KEY$2,
        SLID: "slid" + EVENT_KEY$2,
        KEYDOWN: "keydown" + EVENT_KEY$2,
        MOUSEENTER: "mouseenter" + EVENT_KEY$2,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
        TOUCHSTART: "touchstart" + EVENT_KEY$2,
        TOUCHMOVE: "touchmove" + EVENT_KEY$2,
        TOUCHEND: "touchend" + EVENT_KEY$2,
        POINTERDOWN: "pointerdown" + EVENT_KEY$2,
        POINTERUP: "pointerup" + EVENT_KEY$2,
        DRAG_START: "dragstart" + EVENT_KEY$2,
        LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
        CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
    };
    var ClassName$2 = {
        CAROUSEL: 'carousel',
        ACTIVE: 'active',
        SLIDE: 'slide',
        RIGHT: 'carousel-item-right',
        LEFT: 'carousel-item-left',
        NEXT: 'carousel-item-next',
        PREV: 'carousel-item-prev',
        ITEM: 'carousel-item',
        POINTER_EVENT: 'pointer-event'
    };
    var Selector$2 = {
        ACTIVE: '.active',
        ACTIVE_ITEM: '.active.carousel-item',
        ITEM: '.carousel-item',
        ITEM_IMG: '.carousel-item img',
        NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
        INDICATORS: '.carousel-indicators',
        DATA_SLIDE: '[data-slide], [data-slide-to]',
        DATA_RIDE: '[data-ride="carousel"]'
    };
    var PointerType = {
        TOUCH: 'touch',
        PEN: 'pen'






    };

    var Carousel =

        function() {
            function Carousel(element, config) {
                this._items = null;
                this._interval = null;
                this._activeElement = null;
                this._isPaused = false;
                this._isSliding = false;
                this.touchTimeout = null;
                this.touchStartX = 0;
                this.touchDeltaX = 0;
                this._config = this._getConfig(config);
                this._element = element;
                this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
                this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
                this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

                this._addEventListeners();
            }


            var _proto = Carousel.prototype;


            _proto.next = function next() {
                if (!this._isSliding) {
                    this._slide(Direction.NEXT);
                }
            };

            _proto.nextWhenVisible = function nextWhenVisible() {


                if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
                    this.next();
                }
            };

            _proto.prev = function prev() {
                if (!this._isSliding) {
                    this._slide(Direction.PREV);
                }
            };

            _proto.pause = function pause(event) {
                if (!event) {
                    this._isPaused = true;
                }

                if (this._element.querySelector(Selector$2.NEXT_PREV)) {
                    Util.triggerTransitionEnd(this._element);
                    this.cycle(true);
                }

                clearInterval(this._interval);
                this._interval = null;
            };

            _proto.cycle = function cycle(event) {
                if (!event) {
                    this._isPaused = false;
                }

                if (this._interval) {
                    clearInterval(this._interval);
                    this._interval = null;
                }

                if (this._config.interval && !this._isPaused) {
                    this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
                }
            };

            _proto.to = function to(index) {
                var _this = this;

                this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

                var activeIndex = this._getItemIndex(this._activeElement);

                if (index > this._items.length - 1 || index < 0) {
                    return;
                }

                if (this._isSliding) {
                    $(this._element).one(Event$2.SLID, function() {
                        return _this.to(index);
                    });
                    return;
                }

                if (activeIndex === index) {
                    this.pause();
                    this.cycle();
                    return;
                }

                var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

                this._slide(direction, this._items[index]);
            };

            _proto.dispose = function dispose() {
                $(this._element).off(EVENT_KEY$2);
                $.removeData(this._element, DATA_KEY$2);
                this._items = null;
                this._config = null;
                this._element = null;
                this._interval = null;
                this._isPaused = null;
                this._isSliding = null;
                this._activeElement = null;
                this._indicatorsElement = null;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default, config);
                Util.typeCheckConfig(NAME$2, config, DefaultType);
                return config;
            };

            _proto._handleSwipe = function _handleSwipe() {
                var absDeltax = Math.abs(this.touchDeltaX);

                if (absDeltax <= SWIPE_THRESHOLD) {
                    return;
                }

                var direction = absDeltax / this.touchDeltaX;

                if (direction > 0) {
                    this.prev();
                }


                if (direction < 0) {
                    this.next();
                }
            };

            _proto._addEventListeners = function _addEventListeners() {
                var _this2 = this;

                if (this._config.keyboard) {
                    $(this._element).on(Event$2.KEYDOWN, function(event) {
                        return _this2._keydown(event);
                    });
                }

                if (this._config.pause === 'hover') {
                    $(this._element).on(Event$2.MOUSEENTER, function(event) {
                        return _this2.pause(event);
                    }).on(Event$2.MOUSELEAVE, function(event) {
                        return _this2.cycle(event);
                    });
                }

                if (this._config.touch) {
                    this._addTouchEventListeners();
                }
            };

            _proto._addTouchEventListeners = function _addTouchEventListeners() {
                var _this3 = this;

                if (!this._touchSupported) {
                    return;
                }

                var start = function start(event) {
                    if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                        _this3.touchStartX = event.originalEvent.clientX;
                    } else if (!_this3._pointerEvent) {
                        _this3.touchStartX = event.originalEvent.touches[0].clientX;
                    }
                };

                var move = function move(event) {

                    if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
                        _this3.touchDeltaX = 0;
                    } else {
                        _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
                    }
                };

                var end = function end(event) {
                    if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                        _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
                    }

                    _this3._handleSwipe();

                    if (_this3._config.pause === 'hover') {







                        _this3.pause();

                        if (_this3.touchTimeout) {
                            clearTimeout(_this3.touchTimeout);
                        }

                        _this3.touchTimeout = setTimeout(function(event) {
                            return _this3.cycle(event);
                        }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
                    }
                };

                $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function(e) {
                    return e.preventDefault();
                });

                if (this._pointerEvent) {
                    $(this._element).on(Event$2.POINTERDOWN, function(event) {
                        return start(event);
                    });
                    $(this._element).on(Event$2.POINTERUP, function(event) {
                        return end(event);
                    });

                    this._element.classList.add(ClassName$2.POINTER_EVENT);
                } else {
                    $(this._element).on(Event$2.TOUCHSTART, function(event) {
                        return start(event);
                    });
                    $(this._element).on(Event$2.TOUCHMOVE, function(event) {
                        return move(event);
                    });
                    $(this._element).on(Event$2.TOUCHEND, function(event) {
                        return end(event);
                    });
                }
            };

            _proto._keydown = function _keydown(event) {
                if (/input|textarea/i.test(event.target.tagName)) {
                    return;
                }

                switch (event.which) {
                    case ARROW_LEFT_KEYCODE:
                        event.preventDefault();
                        this.prev();
                        break;

                    case ARROW_RIGHT_KEYCODE:
                        event.preventDefault();
                        this.next();
                        break;

                    default:
                }
            };

            _proto._getItemIndex = function _getItemIndex(element) {
                this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
                return this._items.indexOf(element);
            };

            _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
                var isNextDirection = direction === Direction.NEXT;
                var isPrevDirection = direction === Direction.PREV;

                var activeIndex = this._getItemIndex(activeElement);

                var lastItemIndex = this._items.length - 1;
                var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

                if (isGoingToWrap && !this._config.wrap) {
                    return activeElement;
                }

                var delta = direction === Direction.PREV ? -1 : 1;
                var itemIndex = (activeIndex + delta) % this._items.length;
                return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
            };

            _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
                var targetIndex = this._getItemIndex(relatedTarget);

                var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

                var slideEvent = $.Event(Event$2.SLIDE, {
                    relatedTarget: relatedTarget,
                    direction: eventDirectionName,
                    from: fromIndex,
                    to: targetIndex
                });
                $(this._element).trigger(slideEvent);
                return slideEvent;
            };

            _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
                if (this._indicatorsElement) {
                    var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
                    $(indicators).removeClass(ClassName$2.ACTIVE);

                    var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                    if (nextIndicator) {
                        $(nextIndicator).addClass(ClassName$2.ACTIVE);
                    }
                }
            };

            _proto._slide = function _slide(direction, element) {
                var _this4 = this;

                var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

                var activeElementIndex = this._getItemIndex(activeElement);

                var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

                var nextElementIndex = this._getItemIndex(nextElement);

                var isCycling = Boolean(this._interval);
                var directionalClassName;
                var orderClassName;
                var eventDirectionName;

                if (direction === Direction.NEXT) {
                    directionalClassName = ClassName$2.LEFT;
                    orderClassName = ClassName$2.NEXT;
                    eventDirectionName = Direction.LEFT;
                } else {
                    directionalClassName = ClassName$2.RIGHT;
                    orderClassName = ClassName$2.PREV;
                    eventDirectionName = Direction.RIGHT;
                }

                if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
                    this._isSliding = false;
                    return;
                }

                var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

                if (slideEvent.isDefaultPrevented()) {
                    return;
                }

                if (!activeElement || !nextElement) {

                    return;
                }

                this._isSliding = true;

                if (isCycling) {
                    this.pause();
                }

                this._setActiveIndicatorElement(nextElement);

                var slidEvent = $.Event(Event$2.SLID, {
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                });

                if ($(this._element).hasClass(ClassName$2.SLIDE)) {
                    $(nextElement).addClass(orderClassName);
                    Util.reflow(nextElement);
                    $(activeElement).addClass(directionalClassName);
                    $(nextElement).addClass(directionalClassName);
                    var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

                    if (nextElementInterval) {
                        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                        this._config.interval = nextElementInterval;
                    } else {
                        this._config.interval = this._config.defaultInterval || this._config.interval;
                    }

                    var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
                    $(activeElement).one(Util.TRANSITION_END, function() {
                        $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
                        $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
                        _this4._isSliding = false;
                        setTimeout(function() {
                            return $(_this4._element).trigger(slidEvent);
                        }, 0);
                    }).emulateTransitionEnd(transitionDuration);
                } else {
                    $(activeElement).removeClass(ClassName$2.ACTIVE);
                    $(nextElement).addClass(ClassName$2.ACTIVE);
                    this._isSliding = false;
                    $(this._element).trigger(slidEvent);
                }

                if (isCycling) {
                    this.cycle();
                }
            };

            Carousel._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$2);

                    var _config = _objectSpread({}, Default, $(this).data());

                    if (typeof config === 'object') {
                        _config = _objectSpread({}, _config, config);
                    }

                    var action = typeof config === 'string' ? config : _config.slide;

                    if (!data) {
                        data = new Carousel(this, _config);
                        $(this).data(DATA_KEY$2, data);
                    }

                    if (typeof config === 'number') {
                        data.to(config);
                    } else if (typeof action === 'string') {
                        if (typeof data[action] === 'undefined') {
                            throw new TypeError("No method named \"" + action + "\"");
                        }

                        data[action]();
                    } else if (_config.interval && _config.ride) {
                        data.pause();
                        data.cycle();
                    }
                });
            };

            Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
                var selector = Util.getSelectorFromElement(this);

                if (!selector) {
                    return;
                }

                var target = $(selector)[0];

                if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
                    return;
                }

                var config = _objectSpread({}, $(target).data(), $(this).data());

                var slideIndex = this.getAttribute('data-slide-to');

                if (slideIndex) {
                    config.interval = false;
                }

                Carousel._jQueryInterface.call($(target), config);

                if (slideIndex) {
                    $(target).data(DATA_KEY$2).to(slideIndex);
                }

                event.preventDefault();
            };

            _createClass(Carousel, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$2;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);

            return Carousel;
        }();







    $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event$2.LOAD_DATA_API, function() {
        var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

        for (var i = 0, len = carousels.length; i < len; i++) {
            var $carousel = $(carousels[i]);

            Carousel._jQueryInterface.call($carousel, $carousel.data());
        }
    });






    $.fn[NAME$2] = Carousel._jQueryInterface;
    $.fn[NAME$2].Constructor = Carousel;

    $.fn[NAME$2].noConflict = function() {
        $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
        return Carousel._jQueryInterface;
    };







    var NAME$3 = 'collapse';
    var VERSION$3 = '4.3.1';
    var DATA_KEY$3 = 'bs.collapse';
    var EVENT_KEY$3 = "." + DATA_KEY$3;
    var DATA_API_KEY$3 = '.data-api';
    var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
    var Default$1 = {
        toggle: true,
        parent: ''
    };
    var DefaultType$1 = {
        toggle: 'boolean',
        parent: '(string|element)'
    };
    var Event$3 = {
        SHOW: "show" + EVENT_KEY$3,
        SHOWN: "shown" + EVENT_KEY$3,
        HIDE: "hide" + EVENT_KEY$3,
        HIDDEN: "hidden" + EVENT_KEY$3,
        CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
    };
    var ClassName$3 = {
        SHOW: 'show',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
    };
    var Dimension = {
        WIDTH: 'width',
        HEIGHT: 'height'
    };
    var Selector$3 = {
        ACTIVES: '.show, .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'






    };

    var Collapse =

        function() {
            function Collapse(element, config) {
                this._isTransitioning = false;
                this._element = element;
                this._config = this._getConfig(config);
                this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
                var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

                for (var i = 0, len = toggleList.length; i < len; i++) {
                    var elem = toggleList[i];
                    var selector = Util.getSelectorFromElement(elem);
                    var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function(foundElem) {
                        return foundElem === element;
                    });

                    if (selector !== null && filterElement.length > 0) {
                        this._selector = selector;

                        this._triggerArray.push(elem);
                    }
                }

                this._parent = this._config.parent ? this._getParent() : null;

                if (!this._config.parent) {
                    this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                }

                if (this._config.toggle) {
                    this.toggle();
                }
            }


            var _proto = Collapse.prototype;


            _proto.toggle = function toggle() {
                if ($(this._element).hasClass(ClassName$3.SHOW)) {
                    this.hide();
                } else {
                    this.show();
                }
            };

            _proto.show = function show() {
                var _this = this;

                if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
                    return;
                }

                var actives;
                var activesData;

                if (this._parent) {
                    actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function(elem) {
                        if (typeof _this._config.parent === 'string') {
                            return elem.getAttribute('data-parent') === _this._config.parent;
                        }

                        return elem.classList.contains(ClassName$3.COLLAPSE);
                    });

                    if (actives.length === 0) {
                        actives = null;
                    }
                }

                if (actives) {
                    activesData = $(actives).not(this._selector).data(DATA_KEY$3);

                    if (activesData && activesData._isTransitioning) {
                        return;
                    }
                }

                var startEvent = $.Event(Event$3.SHOW);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                if (actives) {
                    Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

                    if (!activesData) {
                        $(actives).data(DATA_KEY$3, null);
                    }
                }

                var dimension = this._getDimension();

                $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
                this._element.style[dimension] = 0;

                if (this._triggerArray.length) {
                    $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
                }

                this.setTransitioning(true);

                var complete = function complete() {
                    $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
                    _this._element.style[dimension] = '';

                    _this.setTransitioning(false);

                    $(_this._element).trigger(Event$3.SHOWN);
                };

                var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
                var scrollSize = "scroll" + capitalizedDimension;
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                this._element.style[dimension] = this._element[scrollSize] + "px";
            };

            _proto.hide = function hide() {
                var _this2 = this;

                if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
                    return;
                }

                var startEvent = $.Event(Event$3.HIDE);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                var dimension = this._getDimension();

                this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
                Util.reflow(this._element);
                $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
                var triggerArrayLength = this._triggerArray.length;

                if (triggerArrayLength > 0) {
                    for (var i = 0; i < triggerArrayLength; i++) {
                        var trigger = this._triggerArray[i];
                        var selector = Util.getSelectorFromElement(trigger);

                        if (selector !== null) {
                            var $elem = $([].slice.call(document.querySelectorAll(selector)));

                            if (!$elem.hasClass(ClassName$3.SHOW)) {
                                $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
                            }
                        }
                    }
                }

                this.setTransitioning(true);

                var complete = function complete() {
                    _this2.setTransitioning(false);

                    $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
                };

                this._element.style[dimension] = '';
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            };

            _proto.setTransitioning = function setTransitioning(isTransitioning) {
                this._isTransitioning = isTransitioning;
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY$3);
                this._config = null;
                this._parent = null;
                this._element = null;
                this._triggerArray = null;
                this._isTransitioning = null;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$1, config);
                config.toggle = Boolean(config.toggle);

                Util.typeCheckConfig(NAME$3, config, DefaultType$1);
                return config;
            };

            _proto._getDimension = function _getDimension() {
                var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
                return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
            };

            _proto._getParent = function _getParent() {
                var _this3 = this;

                var parent;

                if (Util.isElement(this._config.parent)) {
                    parent = this._config.parent;

                    if (typeof this._config.parent.jquery !== 'undefined') {
                        parent = this._config.parent[0];
                    }
                } else {
                    parent = document.querySelector(this._config.parent);
                }

                var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
                var children = [].slice.call(parent.querySelectorAll(selector));
                $(children).each(function(i, element) {
                    _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
                });
                return parent;
            };

            _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
                var isOpen = $(element).hasClass(ClassName$3.SHOW);

                if (triggerArray.length) {
                    $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                }
            };

            Collapse._getTargetFromElement = function _getTargetFromElement(element) {
                var selector = Util.getSelectorFromElement(element);
                return selector ? document.querySelector(selector) : null;
            };

            Collapse._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY$3);

                    var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

                    if (!data && _config.toggle && /show|hide/.test(config)) {
                        _config.toggle = false;
                    }

                    if (!data) {
                        data = new Collapse(this, _config);
                        $this.data(DATA_KEY$3, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Collapse, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$3;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$1;
                }
            }]);

            return Collapse;
        }();







    $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function(event) {

        if (event.currentTarget.tagName === 'A') {
            event.preventDefault();
        }

        var $trigger = $(this);
        var selector = Util.getSelectorFromElement(this);
        var selectors = [].slice.call(document.querySelectorAll(selector));
        $(selectors).each(function() {
            var $target = $(this);
            var data = $target.data(DATA_KEY$3);
            var config = data ? 'toggle' : $trigger.data();

            Collapse._jQueryInterface.call($target, config);
        });
    });






    $.fn[NAME$3] = Collapse._jQueryInterface;
    $.fn[NAME$3].Constructor = Collapse;

    $.fn[NAME$3].noConflict = function() {
        $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
        return Collapse._jQueryInterface;
    };

























    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    var timeoutDuration = 0;
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
            timeoutDuration = 1;
            break;
        }
    }

    function microtaskDebounce(fn) {
        var called = false;
        return function() {
            if (called) {
                return;
            }
            called = true;
            window.Promise.resolve().then(function() {
                called = false;
                fn();
            });
        };
    }

    function taskDebounce(fn) {
        var scheduled = false;
        return function() {
            if (!scheduled) {
                scheduled = true;
                setTimeout(function() {
                    scheduled = false;
                    fn();
                }, timeoutDuration);
            }
        };
    }

    var supportsMicroTasks = isBrowser && window.Promise;










    var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;








    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }








    function getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
            return [];
        }

        var window = element.ownerDocument.defaultView;
        var css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }








    function getParentNode(element) {
        if (element.nodeName === 'HTML') {
            return element;
        }
        return element.parentNode || element.host;
    }








    function getScrollParent(element) {

        if (!element) {
            return document.body;
        }

        switch (element.nodeName) {
            case 'HTML':
            case 'BODY':
                return element.ownerDocument.body;
            case '#document':
                return element.body;
        }



        var _getStyleComputedProp = getStyleComputedProperty(element),
            overflow = _getStyleComputedProp.overflow,
            overflowX = _getStyleComputedProp.overflowX,
            overflowY = _getStyleComputedProp.overflowY;

        if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return element;
        }

        return getScrollParent(getParentNode(element));
    }

    var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);








    function isIE(version) {
        if (version === 11) {
            return isIE11;
        }
        if (version === 10) {
            return isIE10;
        }
        return isIE11 || isIE10;
    }








    function getOffsetParent(element) {
        if (!element) {
            return document.documentElement;
        }

        var noOffsetParent = isIE(10) ? document.body : null;


        var offsetParent = element.offsetParent || null;

        while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
        }

        var nodeName = offsetParent && offsetParent.nodeName;

        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
        }



        if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
            return getOffsetParent(offsetParent);
        }

        return offsetParent;
    }

    function isOffsetContainer(element) {
        var nodeName = element.nodeName;

        if (nodeName === 'BODY') {
            return false;
        }
        return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
    }








    function getRoot(node) {
        if (node.parentNode !== null) {
            return getRoot(node.parentNode);
        }

        return node;
    }









    function findCommonOffsetParent(element1, element2) {

        if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return document.documentElement;
        }


        var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
        var start = order ? element1 : element2;
        var end = order ? element2 : element1;


        var range = document.createRange();
        range.setStart(start, 0);
        range.setEnd(end, 0);
        var commonAncestorContainer = range.commonAncestorContainer;



        if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
            if (isOffsetContainer(commonAncestorContainer)) {
                return commonAncestorContainer;
            }

            return getOffsetParent(commonAncestorContainer);
        }


        var element1root = getRoot(element1);
        if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
        } else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
        }
    }









    function getScroll(element) {
        var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

        var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
        var nodeName = element.nodeName;

        if (nodeName === 'BODY' || nodeName === 'HTML') {
            var html = element.ownerDocument.documentElement;
            var scrollingElement = element.ownerDocument.scrollingElement || html;
            return scrollingElement[upperSide];
        }

        return element[upperSide];
    }










    function includeScroll(rect, element) {
        var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        var modifier = subtract ? -1 : 1;
        rect.top += scrollTop * modifier;
        rect.bottom += scrollTop * modifier;
        rect.left += scrollLeft * modifier;
        rect.right += scrollLeft * modifier;
        return rect;
    }











    function getBordersSize(styles, axis) {
        var sideA = axis === 'x' ? 'Left' : 'Top';
        var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

        return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
    }

    function getSize(axis, body, html, computedStyle) {
        return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
    }

    function getWindowSizes(document) {
        var body = document.body;
        var html = document.documentElement;
        var computedStyle = isIE(10) && getComputedStyle(html);

        return {
            height: getSize('Height', body, html, computedStyle),
            width: getSize('Width', body, html, computedStyle)
        };
    }

    var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();





    var defineProperty = function(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    };

    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };








    function getClientRect(offsets) {
        return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
        });
    }








    function getBoundingClientRect(element) {
        var rect = {};




        try {
            if (isIE(10)) {
                rect = element.getBoundingClientRect();
                var scrollTop = getScroll(element, 'top');
                var scrollLeft = getScroll(element, 'left');
                rect.top += scrollTop;
                rect.left += scrollLeft;
                rect.bottom += scrollTop;
                rect.right += scrollLeft;
            } else {
                rect = element.getBoundingClientRect();
            }
        } catch (e) {}

        var result = {
            left: rect.left,
            top: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };


        var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
        var width = sizes.width || element.clientWidth || result.right - result.left;
        var height = sizes.height || element.clientHeight || result.bottom - result.top;

        var horizScrollbar = element.offsetWidth - width;
        var vertScrollbar = element.offsetHeight - height;



        if (horizScrollbar || vertScrollbar) {
            var styles = getStyleComputedProperty(element);
            horizScrollbar -= getBordersSize(styles, 'x');
            vertScrollbar -= getBordersSize(styles, 'y');

            result.width -= horizScrollbar;
            result.height -= vertScrollbar;
        }

        return getClientRect(result);
    }

    function getOffsetRectRelativeToArbitraryNode(children, parent) {
        var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var isIE10 = isIE(10);
        var isHTML = parent.nodeName === 'HTML';
        var childrenRect = getBoundingClientRect(children);
        var parentRect = getBoundingClientRect(parent);
        var scrollParent = getScrollParent(children);

        var styles = getStyleComputedProperty(parent);
        var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
        var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);


        if (fixedPosition && isHTML) {
            parentRect.top = Math.max(parentRect.top, 0);
            parentRect.left = Math.max(parentRect.left, 0);
        }
        var offsets = getClientRect({
            top: childrenRect.top - parentRect.top - borderTopWidth,
            left: childrenRect.left - parentRect.left - borderLeftWidth,
            width: childrenRect.width,
            height: childrenRect.height
        });
        offsets.marginTop = 0;
        offsets.marginLeft = 0;





        if (!isIE10 && isHTML) {
            var marginTop = parseFloat(styles.marginTop, 10);
            var marginLeft = parseFloat(styles.marginLeft, 10);

            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft;


            offsets.marginTop = marginTop;
            offsets.marginLeft = marginLeft;
        }

        if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
            offsets = includeScroll(offsets, parent);
        }

        return offsets;
    }

    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
        var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var html = element.ownerDocument.documentElement;
        var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
        var width = Math.max(html.clientWidth, window.innerWidth || 0);
        var height = Math.max(html.clientHeight, window.innerHeight || 0);

        var scrollTop = !excludeScroll ? getScroll(html) : 0;
        var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

        var offset = {
            top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
            left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
            width: width,
            height: height
        };

        return getClientRect(offset);
    }









    function isFixed(element) {
        var nodeName = element.nodeName;
        if (nodeName === 'BODY' || nodeName === 'HTML') {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        var parentNode = getParentNode(element);
        if (!parentNode) {
            return false;
        }
        return isFixed(parentNode);
    }









    function getFixedPositionOffsetParent(element) {

        if (!element || !element.parentElement || isIE()) {
            return document.documentElement;
        }
        var el = element.parentElement;
        while (el && getStyleComputedProperty(el, 'transform') === 'none') {
            el = el.parentElement;
        }
        return el || document.documentElement;
    }












    function getBoundaries(popper, reference, padding, boundariesElement) {
        var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;



        var boundaries = {
            top: 0,
            left: 0
        };
        var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);


        if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
        } else {

            var boundariesNode = void 0;
            if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(reference));
                if (boundariesNode.nodeName === 'BODY') {
                    boundariesNode = popper.ownerDocument.documentElement;
                }
            } else if (boundariesElement === 'window') {
                boundariesNode = popper.ownerDocument.documentElement;
            } else {
                boundariesNode = boundariesElement;
            }

            var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);


            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
                var _getWindowSizes = getWindowSizes(popper.ownerDocument),
                    height = _getWindowSizes.height,
                    width = _getWindowSizes.width;

                boundaries.top += offsets.top - offsets.marginTop;
                boundaries.bottom = height + offsets.top;
                boundaries.left += offsets.left - offsets.marginLeft;
                boundaries.right = width + offsets.left;
            } else {

                boundaries = offsets;
            }
        }


        padding = padding || 0;
        var isPaddingNumber = typeof padding === 'number';
        boundaries.left += isPaddingNumber ? padding : padding.left || 0;
        boundaries.top += isPaddingNumber ? padding : padding.top || 0;
        boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
        boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

        return boundaries;
    }

    function getArea(_ref) {
        var width = _ref.width,
            height = _ref.height;

        return width * height;
    }










    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
        var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

        if (placement.indexOf('auto') === -1) {
            return placement;
        }

        var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

        var rects = {
            top: {
                width: boundaries.width,
                height: refRect.top - boundaries.top
            },
            right: {
                width: boundaries.right - refRect.right,
                height: boundaries.height
            },
            bottom: {
                width: boundaries.width,
                height: boundaries.bottom - refRect.bottom
            },
            left: {
                width: refRect.left - boundaries.left,
                height: boundaries.height
            }
        };

        var sortedAreas = Object.keys(rects).map(function(key) {
            return _extends({
                key: key
            }, rects[key], {
                area: getArea(rects[key])
            });
        }).sort(function(a, b) {
            return b.area - a.area;
        });

        var filteredAreas = sortedAreas.filter(function(_ref2) {
            var width = _ref2.width,
                height = _ref2.height;
            return width >= popper.clientWidth && height >= popper.clientHeight;
        });

        var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

        var variation = placement.split('-')[1];

        return computedPlacement + (variation ? '-' + variation : '');
    }











    function getReferenceOffsets(state, popper, reference) {
        var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
        return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }








    function getOuterSizes(element) {
        var window = element.ownerDocument.defaultView;
        var styles = window.getComputedStyle(element);
        var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
        var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
        var result = {
            width: element.offsetWidth + y,
            height: element.offsetHeight + x
        };
        return result;
    }








    function getOppositePlacement(placement) {
        var hash = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return placement.replace(/left|right|bottom|top/g, function(matched) {
            return hash[matched];
        });
    }











    function getPopperOffsets(popper, referenceOffsets, placement) {
        placement = placement.split('-')[0];


        var popperRect = getOuterSizes(popper);


        var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
        };


        var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
        var mainSide = isHoriz ? 'top' : 'left';
        var secondarySide = isHoriz ? 'left' : 'top';
        var measurement = isHoriz ? 'height' : 'width';
        var secondaryMeasurement = !isHoriz ? 'height' : 'width';

        popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
        if (placement === secondarySide) {
            popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
        } else {
            popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
        }

        return popperOffsets;
    }










    function find(arr, check) {

        if (Array.prototype.find) {
            return arr.find(check);
        }


        return arr.filter(check)[0];
    }










    function findIndex(arr, prop, value) {

        if (Array.prototype.findIndex) {
            return arr.findIndex(function(cur) {
                return cur[prop] === value;
            });
        }


        var match = find(arr, function(obj) {
            return obj[prop] === value;
        });
        return arr.indexOf(match);
    }











    function runModifiers(modifiers, data, ends) {
        var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

        modifiersToRun.forEach(function(modifier) {
            if (modifier['function']) {

                console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }
            var fn = modifier['function'] || modifier.fn;
            if (modifier.enabled && isFunction(fn)) {



                data.offsets.popper = getClientRect(data.offsets.popper);
                data.offsets.reference = getClientRect(data.offsets.reference);

                data = fn(data, modifier);
            }
        });

        return data;
    }








    function update() {

        if (this.state.isDestroyed) {
            return;
        }

        var data = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: false,
            offsets: {}
        };


        data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);




        data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);


        data.originalPlacement = data.placement;

        data.positionFixed = this.options.positionFixed;


        data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

        data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';


        data = runModifiers(this.modifiers, data);



        if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
        } else {
            this.options.onUpdate(data);
        }
    }







    function isModifierEnabled(modifiers, modifierName) {
        return modifiers.some(function(_ref) {
            var name = _ref.name,
                enabled = _ref.enabled;
            return enabled && name === modifierName;
        });
    }








    function getSupportedPropertyName(property) {
        var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
        var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var toCheck = prefix ? '' + prefix + upperProp : property;
            if (typeof document.body.style[toCheck] !== 'undefined') {
                return toCheck;
            }
        }
        return null;
    }






    function destroy() {
        this.state.isDestroyed = true;


        if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style.left = '';
            this.popper.style.right = '';
            this.popper.style.bottom = '';
            this.popper.style.willChange = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
        }

        this.disableEventListeners();



        if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
        }
        return this;
    }






    function getWindow(element) {
        var ownerDocument = element.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView : window;
    }

    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
        var isBody = scrollParent.nodeName === 'BODY';
        var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
        target.addEventListener(event, callback, {
            passive: true
        });

        if (!isBody) {
            attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
        }
        scrollParents.push(target);
    }







    function setupEventListeners(reference, options, state, updateBound) {

        state.updateBound = updateBound;
        getWindow(reference).addEventListener('resize', state.updateBound, {
            passive: true
        });


        var scrollElement = getScrollParent(reference);
        attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
        state.scrollElement = scrollElement;
        state.eventsEnabled = true;

        return state;
    }







    function enableEventListeners() {
        if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
        }
    }







    function removeEventListeners(reference, state) {

        getWindow(reference).removeEventListener('resize', state.updateBound);


        state.scrollParents.forEach(function(target) {
            target.removeEventListener('scroll', state.updateBound);
        });


        state.updateBound = null;
        state.scrollParents = [];
        state.scrollElement = null;
        state.eventsEnabled = false;
        return state;
    }








    function disableEventListeners() {
        if (this.state.eventsEnabled) {
            cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
        }
    }








    function isNumeric(n) {
        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }









    function setStyles(element, styles) {
        Object.keys(styles).forEach(function(prop) {
            var unit = '';

            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }









    function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(function(prop) {
            var value = attributes[prop];
            if (value !== false) {
                element.setAttribute(prop, attributes[prop]);
            } else {
                element.removeAttribute(prop);
            }
        });
    }










    function applyStyle(data) {




        setStyles(data.instance.popper, data.styles);



        setAttributes(data.instance.popper, data.attributes);


        if (data.arrowElement && Object.keys(data.arrowStyles).length) {
            setStyles(data.arrowElement, data.arrowStyles);
        }

        return data;
    }











    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {

        var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);




        var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

        popper.setAttribute('x-placement', placement);



        setStyles(popper, {
            position: options.positionFixed ? 'fixed' : 'absolute'
        });

        return options;
    }




















    function getRoundedOffsets(data, shouldRound) {
        var _data$offsets = data.offsets,
            popper = _data$offsets.popper,
            reference = _data$offsets.reference;
        var round = Math.round,
            floor = Math.floor;

        var noRound = function noRound(v) {
            return v;
        };

        var referenceWidth = round(reference.width);
        var popperWidth = round(popper.width);

        var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
        var isVariation = data.placement.indexOf('-') !== -1;
        var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
        var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

        var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
        var verticalToInteger = !shouldRound ? noRound : round;

        return {
            left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
            top: verticalToInteger(popper.top),
            bottom: verticalToInteger(popper.bottom),
            right: horizontalToInteger(popper.right)
        };
    }

    var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);








    function computeStyle(data, options) {
        var x = options.x,
            y = options.y;
        var popper = data.offsets.popper;



        var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
            return modifier.name === 'applyStyle';
        }).gpuAcceleration;
        if (legacyGpuAccelerationOption !== undefined) {
            console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
        }
        var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

        var offsetParent = getOffsetParent(data.instance.popper);
        var offsetParentRect = getBoundingClientRect(offsetParent);


        var styles = {
            position: popper.position
        };

        var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

        var sideA = x === 'bottom' ? 'top' : 'bottom';
        var sideB = y === 'right' ? 'left' : 'right';




        var prefixedProperty = getSupportedPropertyName('transform');










        var left = void 0,
            top = void 0;
        if (sideA === 'bottom') {


            if (offsetParent.nodeName === 'HTML') {
                top = -offsetParent.clientHeight + offsets.bottom;
            } else {
                top = -offsetParentRect.height + offsets.bottom;
            }
        } else {
            top = offsets.top;
        }
        if (sideB === 'right') {
            if (offsetParent.nodeName === 'HTML') {
                left = -offsetParent.clientWidth + offsets.right;
            } else {
                left = -offsetParentRect.width + offsets.right;
            }
        } else {
            left = offsets.left;
        }
        if (gpuAcceleration && prefixedProperty) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles[sideA] = 0;
            styles[sideB] = 0;
            styles.willChange = 'transform';
        } else {

            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
        }


        var attributes = {
            'x-placement': data.placement
        };


        data.attributes = _extends({}, attributes, data.attributes);
        data.styles = _extends({}, styles, data.styles);
        data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

        return data;
    }











    function isModifierRequired(modifiers, requestingName, requestedName) {
        var requesting = find(modifiers, function(_ref) {
            var name = _ref.name;
            return name === requestingName;
        });

        var isRequired = !!requesting && modifiers.some(function(modifier) {
            return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
        });

        if (!isRequired) {
            var _requesting = '`' + requestingName + '`';
            var requested = '`' + requestedName + '`';
            console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
        }
        return isRequired;
    }








    function arrow(data, options) {
        var _data$offsets$arrow;


        if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
        }

        var arrowElement = options.element;


        if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement);


            if (!arrowElement) {
                return data;
            }
        } else {


            if (!data.instance.popper.contains(arrowElement)) {
                console.warn('WARNING: `arrow.element` must be child of its popper element!');
                return data;
            }
        }

        var placement = data.placement.split('-')[0];
        var _data$offsets = data.offsets,
            popper = _data$offsets.popper,
            reference = _data$offsets.reference;

        var isVertical = ['left', 'right'].indexOf(placement) !== -1;

        var len = isVertical ? 'height' : 'width';
        var sideCapitalized = isVertical ? 'Top' : 'Left';
        var side = sideCapitalized.toLowerCase();
        var altSide = isVertical ? 'left' : 'top';
        var opSide = isVertical ? 'bottom' : 'right';
        var arrowElementSize = getOuterSizes(arrowElement)[len];







        if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
        }

        if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
        }
        data.offsets.popper = getClientRect(data.offsets.popper);


        var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;



        var css = getStyleComputedProperty(data.instance.popper);
        var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
        var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
        var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;


        sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

        data.arrowElement = arrowElement;
        data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

        return data;
    }








    function getOppositeVariation(variation) {
        if (variation === 'end') {
            return 'start';
        } else if (variation === 'start') {
            return 'end';
        }
        return variation;
    }
































    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];


    var validPlacements = placements.slice(3);











    function clockwise(placement) {
        var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var index = validPlacements.indexOf(placement);
        var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
        return counter ? arr.reverse() : arr;
    }

    var BEHAVIORS = {
        FLIP: 'flip',
        CLOCKWISE: 'clockwise',
        COUNTERCLOCKWISE: 'counterclockwise'
    };








    function flip(data, options) {

        if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
        }

        if (data.flipped && data.placement === data.originalPlacement) {

            return data;
        }

        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

        var placement = data.placement.split('-')[0];
        var placementOpposite = getOppositePlacement(placement);
        var variation = data.placement.split('-')[1] || '';

        var flipOrder = [];

        switch (options.behavior) {
            case BEHAVIORS.FLIP:
                flipOrder = [placement, placementOpposite];
                break;
            case BEHAVIORS.CLOCKWISE:
                flipOrder = clockwise(placement);
                break;
            case BEHAVIORS.COUNTERCLOCKWISE:
                flipOrder = clockwise(placement, true);
                break;
            default:
                flipOrder = options.behavior;
        }

        flipOrder.forEach(function(step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
                return data;
            }

            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);

            var popperOffsets = data.offsets.popper;
            var refOffsets = data.offsets.reference;


            var floor = Math.floor;
            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;


            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

            if (overlapsRef || overflowsBoundaries || flippedVariation) {

                data.flipped = true;

                if (overlapsRef || overflowsBoundaries) {
                    placement = flipOrder[index + 1];
                }

                if (flippedVariation) {
                    variation = getOppositeVariation(variation);
                }

                data.placement = placement + (variation ? '-' + variation : '');



                data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

                data = runModifiers(data.instance.modifiers, data, 'flip');
            }
        });
        return data;
    }








    function keepTogether(data) {
        var _data$offsets = data.offsets,
            popper = _data$offsets.popper,
            reference = _data$offsets.reference;

        var placement = data.placement.split('-')[0];
        var floor = Math.floor;
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        var side = isVertical ? 'right' : 'bottom';
        var opSide = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';

        if (popper[side] < floor(reference[opSide])) {
            data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
        }
        if (popper[opSide] > floor(reference[side])) {
            data.offsets.popper[opSide] = floor(reference[side]);
        }

        return data;
    }













    function toValue(str, measurement, popperOffsets, referenceOffsets) {

        var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
        var value = +split[1];
        var unit = split[2];


        if (!value) {
            return str;
        }

        if (unit.indexOf('%') === 0) {
            var element = void 0;
            switch (unit) {
                case '%p':
                    element = popperOffsets;
                    break;
                case '%':
                case '%r':
                default:
                    element = referenceOffsets;
            }

            var rect = getClientRect(element);
            return rect[measurement] / 100 * value;
        } else if (unit === 'vh' || unit === 'vw') {

            var size = void 0;
            if (unit === 'vh') {
                size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            } else {
                size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
            return size / 100 * value;
        } else {


            return value;
        }
    }












    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
        var offsets = [0, 0];




        var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;



        var fragments = offset.split(/(\+|\-)/).map(function(frag) {
            return frag.trim();
        });



        var divider = fragments.indexOf(find(fragments, function(frag) {
            return frag.search(/,|\s/) !== -1;
        }));

        if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        }



        var splitRegex = /\s*,\s*|\s+/;
        var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];


        ops = ops.map(function(op, index) {

            var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
            var mergeWithPrevious = false;
            return op


                .reduce(function(a, b) {
                    if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
                        a[a.length - 1] = b;
                        mergeWithPrevious = true;
                        return a;
                    } else if (mergeWithPrevious) {
                        a[a.length - 1] += b;
                        mergeWithPrevious = false;
                        return a;
                    } else {
                        return a.concat(b);
                    }
                }, [])

                .map(function(str) {
                    return toValue(str, measurement, popperOffsets, referenceOffsets);
                });
        });


        ops.forEach(function(op, index) {
            op.forEach(function(frag, index2) {
                if (isNumeric(frag)) {
                    offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
                }
            });
        });
        return offsets;
    }










    function offset(data, _ref) {
        var offset = _ref.offset;
        var placement = data.placement,
            _data$offsets = data.offsets,
            popper = _data$offsets.popper,
            reference = _data$offsets.reference;

        var basePlacement = placement.split('-')[0];

        var offsets = void 0;
        if (isNumeric(+offset)) {
            offsets = [+offset, 0];
        } else {
            offsets = parseOffset(offset, popper, reference, basePlacement);
        }

        if (basePlacement === 'left') {
            popper.top += offsets[0];
            popper.left -= offsets[1];
        } else if (basePlacement === 'right') {
            popper.top += offsets[0];
            popper.left += offsets[1];
        } else if (basePlacement === 'top') {
            popper.left += offsets[0];
            popper.top -= offsets[1];
        } else if (basePlacement === 'bottom') {
            popper.left += offsets[0];
            popper.top += offsets[1];
        }

        data.popper = popper;
        return data;
    }








    function preventOverflow(data, options) {
        var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);




        if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
        }




        var transformProp = getSupportedPropertyName('transform');
        var popperStyles = data.instance.popper.style;
        var top = popperStyles.top,
            left = popperStyles.left,
            transform = popperStyles[transformProp];

        popperStyles.top = '';
        popperStyles.left = '';
        popperStyles[transformProp] = '';

        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);



        popperStyles.top = top;
        popperStyles.left = left;
        popperStyles[transformProp] = transform;

        options.boundaries = boundaries;

        var order = options.priority;
        var popper = data.offsets.popper;

        var check = {
            primary: function primary(placement) {
                var value = popper[placement];
                if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
                    value = Math.max(popper[placement], boundaries[placement]);
                }
                return defineProperty({}, placement, value);
            },
            secondary: function secondary(placement) {
                var mainSide = placement === 'right' ? 'left' : 'top';
                var value = popper[mainSide];
                if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
                    value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
                }
                return defineProperty({}, mainSide, value);
            }
        };

        order.forEach(function(placement) {
            var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
            popper = _extends({}, popper, check[side](placement));
        });

        data.offsets.popper = popper;

        return data;
    }








    function shift(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftvariation = placement.split('-')[1];


        if (shiftvariation) {
            var _data$offsets = data.offsets,
                reference = _data$offsets.reference,
                popper = _data$offsets.popper;

            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
            var side = isVertical ? 'left' : 'top';
            var measurement = isVertical ? 'width' : 'height';

            var shiftOffsets = {
                start: defineProperty({}, side, reference[side]),
                end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
            };

            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
        }

        return data;
    }








    function hide(data) {
        if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
        }

        var refRect = data.offsets.reference;
        var bound = find(data.instance.modifiers, function(modifier) {
            return modifier.name === 'preventOverflow';
        }).boundaries;

        if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {

            if (data.hide === true) {
                return data;
            }

            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
        } else {

            if (data.hide === false) {
                return data;
            }

            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
        }

        return data;
    }








    function inner(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var _data$offsets = data.offsets,
            popper = _data$offsets.popper,
            reference = _data$offsets.reference;

        var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

        var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

        popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

        data.placement = getOppositePlacement(placement);
        data.offsets.popper = getClientRect(popper);

        return data;
    }






















    var modifiers = {








        shift: {

            order: 100,

            enabled: true,

            fn: shift
        },







































        offset: {

            order: 200,

            enabled: true,

            fn: offset,



            offset: 0
        },


















        preventOverflow: {

            order: 300,

            enabled: true,

            fn: preventOverflow,





            priority: ['left', 'right', 'top', 'bottom'],






            padding: 5,





            boundariesElement: 'scrollParent'
        },










        keepTogether: {

            order: 400,

            enabled: true,

            fn: keepTogether
        },











        arrow: {

            order: 500,

            enabled: true,

            fn: arrow,

            element: '[x-arrow]'
        },












        flip: {

            order: 600,

            enabled: true,

            fn: flip,






            behavior: 'flip',




            padding: 5,






            boundariesElement: 'viewport'
        },








        inner: {

            order: 700,

            enabled: false,

            fn: inner
        },











        hide: {

            order: 800,

            enabled: true,

            fn: hide
        },
















        computeStyle: {

            order: 850,

            enabled: true,

            fn: computeStyle,





            gpuAcceleration: true,





            x: 'bottom',





            y: 'right'
        },
















        applyStyle: {

            order: 900,

            enabled: true,

            fn: applyStyle,

            onLoad: applyStyleOnLoad,






            gpuAcceleration: undefined
        }
    };




































    var Defaults = {




        placement: 'bottom',





        positionFixed: false,





        eventsEnabled: true,






        removeOnDestroy: false,







        onCreate: function onCreate() {},









        onUpdate: function onUpdate() {},






        modifiers: modifiers
    };













    var Popper = function() {








        function Popper(reference, popper) {
            var _this = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);

            this.scheduleUpdate = function() {
                return requestAnimationFrame(_this.update);
            };


            this.update = debounce(this.update.bind(this));


            this.options = _extends({}, Popper.Defaults, options);


            this.state = {
                isDestroyed: false,
                isCreated: false,
                scrollParents: []
            };


            this.reference = reference && reference.jquery ? reference[0] : reference;
            this.popper = popper && popper.jquery ? popper[0] : popper;


            this.options.modifiers = {};
            Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function(name) {
                _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
            });


            this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
                    return _extends({
                        name: name
                    }, _this.options.modifiers[name]);
                })

                .sort(function(a, b) {
                    return a.order - b.order;
                });





            this.modifiers.forEach(function(modifierOptions) {
                if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
                }
            });


            this.update();

            var eventsEnabled = this.options.eventsEnabled;
            if (eventsEnabled) {

                this.enableEventListeners();
            }

            this.state.eventsEnabled = eventsEnabled;
        }





        createClass(Popper, [{
            key: 'update',
            value: function update$$1() {
                return update.call(this);
            }
        }, {
            key: 'destroy',
            value: function destroy$$1() {
                return destroy.call(this);
            }
        }, {
            key: 'enableEventListeners',
            value: function enableEventListeners$$1() {
                return enableEventListeners.call(this);
            }
        }, {
            key: 'disableEventListeners',
            value: function disableEventListeners$$1() {
                return disableEventListeners.call(this);
            }

























        }]);
        return Popper;
    }();






















    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;







    var NAME$4 = 'dropdown';
    var VERSION$4 = '4.3.1';
    var DATA_KEY$4 = 'bs.dropdown';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var DATA_API_KEY$4 = '.data-api';
    var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
    var ESCAPE_KEYCODE = 27;

    var SPACE_KEYCODE = 32;

    var TAB_KEYCODE = 9;

    var ARROW_UP_KEYCODE = 38;

    var ARROW_DOWN_KEYCODE = 40;

    var RIGHT_MOUSE_BUTTON_WHICH = 3;

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event$4 = {
        HIDE: "hide" + EVENT_KEY$4,
        HIDDEN: "hidden" + EVENT_KEY$4,
        SHOW: "show" + EVENT_KEY$4,
        SHOWN: "shown" + EVENT_KEY$4,
        CLICK: "click" + EVENT_KEY$4,
        CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
        KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
        KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
    };
    var ClassName$4 = {
        DISABLED: 'disabled',
        SHOW: 'show',
        DROPUP: 'dropup',
        DROPRIGHT: 'dropright',
        DROPLEFT: 'dropleft',
        MENURIGHT: 'dropdown-menu-right',
        MENULEFT: 'dropdown-menu-left',
        POSITION_STATIC: 'position-static'
    };
    var Selector$4 = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: '.dropdown form',
        MENU: '.dropdown-menu',
        NAVBAR_NAV: '.navbar-nav',
        VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
        TOP: 'top-start',
        TOPEND: 'top-end',
        BOTTOM: 'bottom-start',
        BOTTOMEND: 'bottom-end',
        RIGHT: 'right-start',
        RIGHTEND: 'right-end',
        LEFT: 'left-start',
        LEFTEND: 'left-end'
    };
    var Default$2 = {
        offset: 0,
        flip: true,
        boundary: 'scrollParent',
        reference: 'toggle',
        display: 'dynamic'
    };
    var DefaultType$2 = {
        offset: '(number|string|function)',
        flip: 'boolean',
        boundary: '(string|element)',
        reference: '(string|element)',
        display: 'string'






    };

    var Dropdown =

        function() {
            function Dropdown(element, config) {
                this._element = element;
                this._popper = null;
                this._config = this._getConfig(config);
                this._menu = this._getMenuElement();
                this._inNavbar = this._detectNavbar();

                this._addEventListeners();
            }


            var _proto = Dropdown.prototype;


            _proto.toggle = function toggle() {
                if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
                    return;
                }

                var parent = Dropdown._getParentFromElement(this._element);

                var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

                Dropdown._clearMenus();

                if (isActive) {
                    return;
                }

                var relatedTarget = {
                    relatedTarget: this._element
                };
                var showEvent = $.Event(Event$4.SHOW, relatedTarget);
                $(parent).trigger(showEvent);

                if (showEvent.isDefaultPrevented()) {
                    return;
                }


                if (!this._inNavbar) {




                    if (typeof Popper === 'undefined') {
                        throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
                    }

                    var referenceElement = this._element;

                    if (this._config.reference === 'parent') {
                        referenceElement = parent;
                    } else if (Util.isElement(this._config.reference)) {
                        referenceElement = this._config.reference;

                        if (typeof this._config.reference.jquery !== 'undefined') {
                            referenceElement = this._config.reference[0];
                        }
                    }




                    if (this._config.boundary !== 'scrollParent') {
                        $(parent).addClass(ClassName$4.POSITION_STATIC);
                    }

                    this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
                }





                if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
                    $(document.body).children().on('mouseover', null, $.noop);
                }

                this._element.focus();

                this._element.setAttribute('aria-expanded', true);

                $(this._menu).toggleClass(ClassName$4.SHOW);
                $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
            };

            _proto.show = function show() {
                if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
                    return;
                }

                var relatedTarget = {
                    relatedTarget: this._element
                };
                var showEvent = $.Event(Event$4.SHOW, relatedTarget);

                var parent = Dropdown._getParentFromElement(this._element);

                $(parent).trigger(showEvent);

                if (showEvent.isDefaultPrevented()) {
                    return;
                }

                $(this._menu).toggleClass(ClassName$4.SHOW);
                $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
            };

            _proto.hide = function hide() {
                if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
                    return;
                }

                var relatedTarget = {
                    relatedTarget: this._element
                };
                var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

                var parent = Dropdown._getParentFromElement(this._element);

                $(parent).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                    return;
                }

                $(this._menu).toggleClass(ClassName$4.SHOW);
                $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY$4);
                $(this._element).off(EVENT_KEY$4);
                this._element = null;
                this._menu = null;

                if (this._popper !== null) {
                    this._popper.destroy();

                    this._popper = null;
                }
            };

            _proto.update = function update() {
                this._inNavbar = this._detectNavbar();

                if (this._popper !== null) {
                    this._popper.scheduleUpdate();
                }
            };

            _proto._addEventListeners = function _addEventListeners() {
                var _this = this;

                $(this._element).on(Event$4.CLICK, function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    _this.toggle();
                });
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
                Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
                return config;
            };

            _proto._getMenuElement = function _getMenuElement() {
                if (!this._menu) {
                    var parent = Dropdown._getParentFromElement(this._element);

                    if (parent) {
                        this._menu = parent.querySelector(Selector$4.MENU);
                    }
                }

                return this._menu;
            };

            _proto._getPlacement = function _getPlacement() {
                var $parentDropdown = $(this._element.parentNode);
                var placement = AttachmentMap.BOTTOM;

                if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
                    placement = AttachmentMap.TOP;

                    if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                        placement = AttachmentMap.TOPEND;
                    }
                } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
                    placement = AttachmentMap.RIGHT;
                } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
                    placement = AttachmentMap.LEFT;
                } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                    placement = AttachmentMap.BOTTOMEND;
                }

                return placement;
            };

            _proto._detectNavbar = function _detectNavbar() {
                return $(this._element).closest('.navbar').length > 0;
            };

            _proto._getOffset = function _getOffset() {
                var _this2 = this;

                var offset = {};

                if (typeof this._config.offset === 'function') {
                    offset.fn = function(data) {
                        data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
                        return data;
                    };
                } else {
                    offset.offset = this._config.offset;
                }

                return offset;
            };

            _proto._getPopperConfig = function _getPopperConfig() {
                var popperConfig = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }

                };

                if (this._config.display === 'static') {
                    popperConfig.modifiers.applyStyle = {
                        enabled: false
                    };
                }

                return popperConfig;
            };

            Dropdown._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$4);

                    var _config = typeof config === 'object' ? config : null;

                    if (!data) {
                        data = new Dropdown(this, _config);
                        $(this).data(DATA_KEY$4, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            Dropdown._clearMenus = function _clearMenus(event) {
                if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
                    return;
                }

                var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

                for (var i = 0, len = toggles.length; i < len; i++) {
                    var parent = Dropdown._getParentFromElement(toggles[i]);

                    var context = $(toggles[i]).data(DATA_KEY$4);
                    var relatedTarget = {
                        relatedTarget: toggles[i]
                    };

                    if (event && event.type === 'click') {
                        relatedTarget.clickEvent = event;
                    }

                    if (!context) {
                        continue;
                    }

                    var dropdownMenu = context._menu;

                    if (!$(parent).hasClass(ClassName$4.SHOW)) {
                        continue;
                    }

                    if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                        continue;
                    }

                    var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
                    $(parent).trigger(hideEvent);

                    if (hideEvent.isDefaultPrevented()) {
                        continue;
                    }



                    if ('ontouchstart' in document.documentElement) {
                        $(document.body).children().off('mouseover', null, $.noop);
                    }

                    toggles[i].setAttribute('aria-expanded', 'false');
                    $(dropdownMenu).removeClass(ClassName$4.SHOW);
                    $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
                }
            };

            Dropdown._getParentFromElement = function _getParentFromElement(element) {
                var parent;
                var selector = Util.getSelectorFromElement(element);

                if (selector) {
                    parent = document.querySelector(selector);
                }

                return parent || element.parentNode;
            };

            Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {







                if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
                    return;
                }

                var parent = Dropdown._getParentFromElement(this);

                var isActive = $(parent).hasClass(ClassName$4.SHOW);

                if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                    if (event.which === ESCAPE_KEYCODE) {
                        var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
                        $(toggle).trigger('focus');
                    }

                    $(this).trigger('click');
                    return;
                }

                var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

                if (items.length === 0) {
                    return;
                }

                var index = items.indexOf(event.target);

                if (event.which === ARROW_UP_KEYCODE && index > 0) {

                    index--;
                }

                if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {

                    index++;
                }

                if (index < 0) {
                    index = 0;
                }

                items[index].focus();
            };

            _createClass(Dropdown, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$4;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$2;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$2;
                }
            }]);

            return Dropdown;
        }();







    $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function(event) {
        event.preventDefault();
        event.stopPropagation();

        Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function(e) {
        e.stopPropagation();
    });






    $.fn[NAME$4] = Dropdown._jQueryInterface;
    $.fn[NAME$4].Constructor = Dropdown;

    $.fn[NAME$4].noConflict = function() {
        $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
        return Dropdown._jQueryInterface;
    };







    var NAME$5 = 'modal';
    var VERSION$5 = '4.3.1';
    var DATA_KEY$5 = 'bs.modal';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$5 = '.data-api';
    var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
    var ESCAPE_KEYCODE$1 = 27;

    var Default$3 = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
    };
    var DefaultType$3 = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
    };
    var Event$5 = {
        HIDE: "hide" + EVENT_KEY$5,
        HIDDEN: "hidden" + EVENT_KEY$5,
        SHOW: "show" + EVENT_KEY$5,
        SHOWN: "shown" + EVENT_KEY$5,
        FOCUSIN: "focusin" + EVENT_KEY$5,
        RESIZE: "resize" + EVENT_KEY$5,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
        CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
    };
    var ClassName$5 = {
        SCROLLABLE: 'modal-dialog-scrollable',
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$5 = {
        DIALOG: '.modal-dialog',
        MODAL_BODY: '.modal-body',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top'






    };

    var Modal =

        function() {
            function Modal(element, config) {
                this._config = this._getConfig(config);
                this._element = element;
                this._dialog = element.querySelector(Selector$5.DIALOG);
                this._backdrop = null;
                this._isShown = false;
                this._isBodyOverflowing = false;
                this._ignoreBackdropClick = false;
                this._isTransitioning = false;
                this._scrollbarWidth = 0;
            }


            var _proto = Modal.prototype;


            _proto.toggle = function toggle(relatedTarget) {
                return this._isShown ? this.hide() : this.show(relatedTarget);
            };

            _proto.show = function show(relatedTarget) {
                var _this = this;

                if (this._isShown || this._isTransitioning) {
                    return;
                }

                if ($(this._element).hasClass(ClassName$5.FADE)) {
                    this._isTransitioning = true;
                }

                var showEvent = $.Event(Event$5.SHOW, {
                    relatedTarget: relatedTarget
                });
                $(this._element).trigger(showEvent);

                if (this._isShown || showEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = true;

                this._checkScrollbar();

                this._setScrollbar();

                this._adjustDialog();

                this._setEscapeEvent();

                this._setResizeEvent();

                $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function(event) {
                    return _this.hide(event);
                });
                $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function() {
                    $(_this._element).one(Event$5.MOUSEUP_DISMISS, function(event) {
                        if ($(event.target).is(_this._element)) {
                            _this._ignoreBackdropClick = true;
                        }
                    });
                });

                this._showBackdrop(function() {
                    return _this._showElement(relatedTarget);
                });
            };

            _proto.hide = function hide(event) {
                var _this2 = this;

                if (event) {
                    event.preventDefault();
                }

                if (!this._isShown || this._isTransitioning) {
                    return;
                }

                var hideEvent = $.Event(Event$5.HIDE);
                $(this._element).trigger(hideEvent);

                if (!this._isShown || hideEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = false;
                var transition = $(this._element).hasClass(ClassName$5.FADE);

                if (transition) {
                    this._isTransitioning = true;
                }

                this._setEscapeEvent();

                this._setResizeEvent();

                $(document).off(Event$5.FOCUSIN);
                $(this._element).removeClass(ClassName$5.SHOW);
                $(this._element).off(Event$5.CLICK_DISMISS);
                $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

                if (transition) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                    $(this._element).one(Util.TRANSITION_END, function(event) {
                        return _this2._hideModal(event);
                    }).emulateTransitionEnd(transitionDuration);
                } else {
                    this._hideModal();
                }
            };

            _proto.dispose = function dispose() {
                [window, this._element, this._dialog].forEach(function(htmlElement) {
                    return $(htmlElement).off(EVENT_KEY$5);
                });






                $(document).off(Event$5.FOCUSIN);
                $.removeData(this._element, DATA_KEY$5);
                this._config = null;
                this._element = null;
                this._dialog = null;
                this._backdrop = null;
                this._isShown = null;
                this._isBodyOverflowing = null;
                this._ignoreBackdropClick = null;
                this._isTransitioning = null;
                this._scrollbarWidth = null;
            };

            _proto.handleUpdate = function handleUpdate() {
                this._adjustDialog();
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$3, config);
                Util.typeCheckConfig(NAME$5, config, DefaultType$3);
                return config;
            };

            _proto._showElement = function _showElement(relatedTarget) {
                var _this3 = this;

                var transition = $(this._element).hasClass(ClassName$5.FADE);

                if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {

                    document.body.appendChild(this._element);
                }

                this._element.style.display = 'block';

                this._element.removeAttribute('aria-hidden');

                this._element.setAttribute('aria-modal', true);

                if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
                    this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
                } else {
                    this._element.scrollTop = 0;
                }

                if (transition) {
                    Util.reflow(this._element);
                }

                $(this._element).addClass(ClassName$5.SHOW);

                if (this._config.focus) {
                    this._enforceFocus();
                }

                var shownEvent = $.Event(Event$5.SHOWN, {
                    relatedTarget: relatedTarget
                });

                var transitionComplete = function transitionComplete() {
                    if (_this3._config.focus) {
                        _this3._element.focus();
                    }

                    _this3._isTransitioning = false;
                    $(_this3._element).trigger(shownEvent);
                };

                if (transition) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
                    $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
                } else {
                    transitionComplete();
                }
            };

            _proto._enforceFocus = function _enforceFocus() {
                var _this4 = this;

                $(document).off(Event$5.FOCUSIN)
                    .on(Event$5.FOCUSIN, function(event) {
                        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                            _this4._element.focus();
                        }
                    });
            };

            _proto._setEscapeEvent = function _setEscapeEvent() {
                var _this5 = this;

                if (this._isShown && this._config.keyboard) {
                    $(this._element).on(Event$5.KEYDOWN_DISMISS, function(event) {
                        if (event.which === ESCAPE_KEYCODE$1) {
                            event.preventDefault();

                            _this5.hide();
                        }
                    });
                } else if (!this._isShown) {
                    $(this._element).off(Event$5.KEYDOWN_DISMISS);
                }
            };

            _proto._setResizeEvent = function _setResizeEvent() {
                var _this6 = this;

                if (this._isShown) {
                    $(window).on(Event$5.RESIZE, function(event) {
                        return _this6.handleUpdate(event);
                    });
                } else {
                    $(window).off(Event$5.RESIZE);
                }
            };

            _proto._hideModal = function _hideModal() {
                var _this7 = this;

                this._element.style.display = 'none';

                this._element.setAttribute('aria-hidden', true);

                this._element.removeAttribute('aria-modal');

                this._isTransitioning = false;

                this._showBackdrop(function() {
                    $(document.body).removeClass(ClassName$5.OPEN);

                    _this7._resetAdjustments();

                    _this7._resetScrollbar();

                    $(_this7._element).trigger(Event$5.HIDDEN);
                });
            };

            _proto._removeBackdrop = function _removeBackdrop() {
                if (this._backdrop) {
                    $(this._backdrop).remove();
                    this._backdrop = null;
                }
            };

            _proto._showBackdrop = function _showBackdrop(callback) {
                var _this8 = this;

                var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

                if (this._isShown && this._config.backdrop) {
                    this._backdrop = document.createElement('div');
                    this._backdrop.className = ClassName$5.BACKDROP;

                    if (animate) {
                        this._backdrop.classList.add(animate);
                    }

                    $(this._backdrop).appendTo(document.body);
                    $(this._element).on(Event$5.CLICK_DISMISS, function(event) {
                        if (_this8._ignoreBackdropClick) {
                            _this8._ignoreBackdropClick = false;
                            return;
                        }

                        if (event.target !== event.currentTarget) {
                            return;
                        }

                        if (_this8._config.backdrop === 'static') {
                            _this8._element.focus();
                        } else {
                            _this8.hide();
                        }
                    });

                    if (animate) {
                        Util.reflow(this._backdrop);
                    }

                    $(this._backdrop).addClass(ClassName$5.SHOW);

                    if (!callback) {
                        return;
                    }

                    if (!animate) {
                        callback();
                        return;
                    }

                    var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
                    $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
                } else if (!this._isShown && this._backdrop) {
                    $(this._backdrop).removeClass(ClassName$5.SHOW);

                    var callbackRemove = function callbackRemove() {
                        _this8._removeBackdrop();

                        if (callback) {
                            callback();
                        }
                    };

                    if ($(this._element).hasClass(ClassName$5.FADE)) {
                        var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

                        $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
                    } else {
                        callbackRemove();
                    }
                } else if (callback) {
                    callback();
                }
            }



            ;

            _proto._adjustDialog = function _adjustDialog() {
                var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

                if (!this._isBodyOverflowing && isModalOverflowing) {
                    this._element.style.paddingLeft = this._scrollbarWidth + "px";
                }

                if (this._isBodyOverflowing && !isModalOverflowing) {
                    this._element.style.paddingRight = this._scrollbarWidth + "px";
                }
            };

            _proto._resetAdjustments = function _resetAdjustments() {
                this._element.style.paddingLeft = '';
                this._element.style.paddingRight = '';
            };

            _proto._checkScrollbar = function _checkScrollbar() {
                var rect = document.body.getBoundingClientRect();
                this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth();
            };

            _proto._setScrollbar = function _setScrollbar() {
                var _this9 = this;

                if (this._isBodyOverflowing) {


                    var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                    var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT));

                    $(fixedContent).each(function(index, element) {
                        var actualPadding = element.style.paddingRight;
                        var calculatedPadding = $(element).css('padding-right');
                        $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                    });

                    $(stickyContent).each(function(index, element) {
                        var actualMargin = element.style.marginRight;
                        var calculatedMargin = $(element).css('margin-right');
                        $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                    });

                    var actualPadding = document.body.style.paddingRight;
                    var calculatedPadding = $(document.body).css('padding-right');
                    $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
                }

                $(document.body).addClass(ClassName$5.OPEN);
            };

            _proto._resetScrollbar = function _resetScrollbar() {

                var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                $(fixedContent).each(function(index, element) {
                    var padding = $(element).data('padding-right');
                    $(element).removeData('padding-right');
                    element.style.paddingRight = padding ? padding : '';
                });

                var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
                $(elements).each(function(index, element) {
                    var margin = $(element).data('margin-right');

                    if (typeof margin !== 'undefined') {
                        $(element).css('margin-right', margin).removeData('margin-right');
                    }
                });

                var padding = $(document.body).data('padding-right');
                $(document.body).removeData('padding-right');
                document.body.style.paddingRight = padding ? padding : '';
            };

            _proto._getScrollbarWidth = function _getScrollbarWidth() {

                var scrollDiv = document.createElement('div');
                scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            };

            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$5);

                    var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

                    if (!data) {
                        data = new Modal(this, _config);
                        $(this).data(DATA_KEY$5, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config](relatedTarget);
                    } else if (_config.show) {
                        data.show(relatedTarget);
                    }
                });
            };

            _createClass(Modal, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$5;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$3;
                }
            }]);

            return Modal;
        }();







    $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function(event) {
        var _this10 = this;

        var target;
        var selector = Util.getSelectorFromElement(this);

        if (selector) {
            target = document.querySelector(selector);
        }

        var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

        if (this.tagName === 'A' || this.tagName === 'AREA') {
            event.preventDefault();
        }

        var $target = $(target).one(Event$5.SHOW, function(showEvent) {
            if (showEvent.isDefaultPrevented()) {

                return;
            }

            $target.one(Event$5.HIDDEN, function() {
                if ($(_this10).is(':visible')) {
                    _this10.focus();
                }
            });
        });

        Modal._jQueryInterface.call($(target), config, this);
    });






    $.fn[NAME$5] = Modal._jQueryInterface;
    $.fn[NAME$5].Constructor = Modal;

    $.fn[NAME$5].noConflict = function() {
        $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
        return Modal._jQueryInterface;
    };







    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {

        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []






    };
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;






    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function allowedAttribute(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();

        if (allowedAttributeList.indexOf(attrName) !== -1) {
            if (uriAttrs.indexOf(attrName) !== -1) {
                return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }

            return true;
        }

        var regExp = allowedAttributeList.filter(function(attrRegex) {
            return attrRegex instanceof RegExp;
        });

        for (var i = 0, l = regExp.length; i < l; i++) {
            if (attrName.match(regExp[i])) {
                return true;
            }
        }

        return false;
    }

    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        if (unsafeHtml.length === 0) {
            return unsafeHtml;
        }

        if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml);
        }

        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
        var whitelistKeys = Object.keys(whiteList);
        var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

        var _loop = function _loop(i, len) {
            var el = elements[i];
            var elName = el.nodeName.toLowerCase();

            if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
                el.parentNode.removeChild(el);
                return "continue";
            }

            var attributeList = [].slice.call(el.attributes);
            var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
            attributeList.forEach(function(attr) {
                if (!allowedAttribute(attr, whitelistedAttributes)) {
                    el.removeAttribute(attr.nodeName);
                }
            });
        };

        for (var i = 0, len = elements.length; i < len; i++) {
            var _ret = _loop(i, len);

            if (_ret === "continue") continue;
        }

        return createdDocument.body.innerHTML;
    }







    var NAME$6 = 'tooltip';
    var VERSION$6 = '4.3.1';
    var DATA_KEY$6 = 'bs.tooltip';
    var EVENT_KEY$6 = "." + DATA_KEY$6;
    var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var DefaultType$4 = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string|function)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        whiteList: 'object'
    };
    var AttachmentMap$1 = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };
    var Default$4 = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent',
        sanitize: true,
        sanitizeFn: null,
        whiteList: DefaultWhitelist
    };
    var HoverState = {
        SHOW: 'show',
        OUT: 'out'
    };
    var Event$6 = {
        HIDE: "hide" + EVENT_KEY$6,
        HIDDEN: "hidden" + EVENT_KEY$6,
        SHOW: "show" + EVENT_KEY$6,
        SHOWN: "shown" + EVENT_KEY$6,
        INSERTED: "inserted" + EVENT_KEY$6,
        CLICK: "click" + EVENT_KEY$6,
        FOCUSIN: "focusin" + EVENT_KEY$6,
        FOCUSOUT: "focusout" + EVENT_KEY$6,
        MOUSEENTER: "mouseenter" + EVENT_KEY$6,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$6
    };
    var ClassName$6 = {
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$6 = {
        TOOLTIP: '.tooltip',
        TOOLTIP_INNER: '.tooltip-inner',
        ARROW: '.arrow'
    };
    var Trigger = {
        HOVER: 'hover',
        FOCUS: 'focus',
        CLICK: 'click',
        MANUAL: 'manual'






    };

    var Tooltip =

        function() {
            function Tooltip(element, config) {




                if (typeof Popper === 'undefined') {
                    throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
                }


                this._isEnabled = true;
                this._timeout = 0;
                this._hoverState = '';
                this._activeTrigger = {};
                this._popper = null;

                this.element = element;
                this.config = this._getConfig(config);
                this.tip = null;

                this._setListeners();
            }


            var _proto = Tooltip.prototype;


            _proto.enable = function enable() {
                this._isEnabled = true;
            };

            _proto.disable = function disable() {
                this._isEnabled = false;
            };

            _proto.toggleEnabled = function toggleEnabled() {
                this._isEnabled = !this._isEnabled;
            };

            _proto.toggle = function toggle(event) {
                if (!this._isEnabled) {
                    return;
                }

                if (event) {
                    var dataKey = this.constructor.DATA_KEY;
                    var context = $(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $(event.currentTarget).data(dataKey, context);
                    }

                    context._activeTrigger.click = !context._activeTrigger.click;

                    if (context._isWithActiveTrigger()) {
                        context._enter(null, context);
                    } else {
                        context._leave(null, context);
                    }
                } else {
                    if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
                        this._leave(null, this);

                        return;
                    }

                    this._enter(null, this);
                }
            };

            _proto.dispose = function dispose() {
                clearTimeout(this._timeout);
                $.removeData(this.element, this.constructor.DATA_KEY);
                $(this.element).off(this.constructor.EVENT_KEY);
                $(this.element).closest('.modal').off('hide.bs.modal');

                if (this.tip) {
                    $(this.tip).remove();
                }

                this._isEnabled = null;
                this._timeout = null;
                this._hoverState = null;
                this._activeTrigger = null;

                if (this._popper !== null) {
                    this._popper.destroy();
                }

                this._popper = null;
                this.element = null;
                this.config = null;
                this.tip = null;
            };

            _proto.show = function show() {
                var _this = this;

                if ($(this.element).css('display') === 'none') {
                    throw new Error('Please use show on visible elements');
                }

                var showEvent = $.Event(this.constructor.Event.SHOW);

                if (this.isWithContent() && this._isEnabled) {
                    $(this.element).trigger(showEvent);
                    var shadowRoot = Util.findShadowRoot(this.element);
                    var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

                    if (showEvent.isDefaultPrevented() || !isInTheDom) {
                        return;
                    }

                    var tip = this.getTipElement();
                    var tipId = Util.getUID(this.constructor.NAME);
                    tip.setAttribute('id', tipId);
                    this.element.setAttribute('aria-describedby', tipId);
                    this.setContent();

                    if (this.config.animation) {
                        $(tip).addClass(ClassName$6.FADE);
                    }

                    var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                    var attachment = this._getAttachment(placement);

                    this.addAttachmentClass(attachment);

                    var container = this._getContainer();

                    $(tip).data(this.constructor.DATA_KEY, this);

                    if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                        $(tip).appendTo(container);
                    }

                    $(this.element).trigger(this.constructor.Event.INSERTED);
                    this._popper = new Popper(this.element, tip, {
                        placement: attachment,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: Selector$6.ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function onCreate(data) {
                            if (data.originalPlacement !== data.placement) {
                                _this._handlePopperPlacementChange(data);
                            }
                        },
                        onUpdate: function onUpdate(data) {
                            return _this._handlePopperPlacementChange(data);
                        }
                    });
                    $(tip).addClass(ClassName$6.SHOW);




                    if ('ontouchstart' in document.documentElement) {
                        $(document.body).children().on('mouseover', null, $.noop);
                    }

                    var complete = function complete() {
                        if (_this.config.animation) {
                            _this._fixTransition();
                        }

                        var prevHoverState = _this._hoverState;
                        _this._hoverState = null;
                        $(_this.element).trigger(_this.constructor.Event.SHOWN);

                        if (prevHoverState === HoverState.OUT) {
                            _this._leave(null, _this);
                        }
                    };

                    if ($(this.tip).hasClass(ClassName$6.FADE)) {
                        var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
                        $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                    } else {
                        complete();
                    }
                }
            };

            _proto.hide = function hide(callback) {
                var _this2 = this;

                var tip = this.getTipElement();
                var hideEvent = $.Event(this.constructor.Event.HIDE);

                var complete = function complete() {
                    if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                        tip.parentNode.removeChild(tip);
                    }

                    _this2._cleanTipClass();

                    _this2.element.removeAttribute('aria-describedby');

                    $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

                    if (_this2._popper !== null) {
                        _this2._popper.destroy();
                    }

                    if (callback) {
                        callback();
                    }
                };

                $(this.element).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                    return;
                }

                $(tip).removeClass(ClassName$6.SHOW);


                if ('ontouchstart' in document.documentElement) {
                    $(document.body).children().off('mouseover', null, $.noop);
                }

                this._activeTrigger[Trigger.CLICK] = false;
                this._activeTrigger[Trigger.FOCUS] = false;
                this._activeTrigger[Trigger.HOVER] = false;

                if ($(this.tip).hasClass(ClassName$6.FADE)) {
                    var transitionDuration = Util.getTransitionDurationFromElement(tip);
                    $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }

                this._hoverState = '';
            };

            _proto.update = function update() {
                if (this._popper !== null) {
                    this._popper.scheduleUpdate();
                }
            };

            _proto.isWithContent = function isWithContent() {
                return Boolean(this.getTitle());
            };

            _proto.addAttachmentClass = function addAttachmentClass(attachment) {
                $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
            };

            _proto.getTipElement = function getTipElement() {
                this.tip = this.tip || $(this.config.template)[0];
                return this.tip;
            };

            _proto.setContent = function setContent() {
                var tip = this.getTipElement();
                this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
                $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
            };

            _proto.setElementContent = function setElementContent($element, content) {
                if (typeof content === 'object' && (content.nodeType || content.jquery)) {

                    if (this.config.html) {
                        if (!$(content).parent().is($element)) {
                            $element.empty().append(content);
                        }
                    } else {
                        $element.text($(content).text());
                    }

                    return;
                }

                if (this.config.html) {
                    if (this.config.sanitize) {
                        content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
                    }

                    $element.html(content);
                } else {
                    $element.text(content);
                }
            };

            _proto.getTitle = function getTitle() {
                var title = this.element.getAttribute('data-original-title');

                if (!title) {
                    title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
                }

                return title;
            };

            _proto._getOffset = function _getOffset() {
                var _this3 = this;

                var offset = {};

                if (typeof this.config.offset === 'function') {
                    offset.fn = function(data) {
                        data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
                        return data;
                    };
                } else {
                    offset.offset = this.config.offset;
                }

                return offset;
            };

            _proto._getContainer = function _getContainer() {
                if (this.config.container === false) {
                    return document.body;
                }

                if (Util.isElement(this.config.container)) {
                    return $(this.config.container);
                }

                return $(document).find(this.config.container);
            };

            _proto._getAttachment = function _getAttachment(placement) {
                return AttachmentMap$1[placement.toUpperCase()];
            };

            _proto._setListeners = function _setListeners() {
                var _this4 = this;

                var triggers = this.config.trigger.split(' ');
                triggers.forEach(function(trigger) {
                    if (trigger === 'click') {
                        $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function(event) {
                            return _this4.toggle(event);
                        });
                    } else if (trigger !== Trigger.MANUAL) {
                        var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
                        var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
                        $(_this4.element).on(eventIn, _this4.config.selector, function(event) {
                            return _this4._enter(event);
                        }).on(eventOut, _this4.config.selector, function(event) {
                            return _this4._leave(event);
                        });
                    }
                });
                $(this.element).closest('.modal').on('hide.bs.modal', function() {
                    if (_this4.element) {
                        _this4.hide();
                    }
                });

                if (this.config.selector) {
                    this.config = _objectSpread({}, this.config, {
                        trigger: 'manual',
                        selector: ''
                    });
                } else {
                    this._fixTitle();
                }
            };

            _proto._fixTitle = function _fixTitle() {
                var titleType = typeof this.element.getAttribute('data-original-title');

                if (this.element.getAttribute('title') || titleType !== 'string') {
                    this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                    this.element.setAttribute('title', '');
                }
            };

            _proto._enter = function _enter(event, context) {
                var dataKey = this.constructor.DATA_KEY;
                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
                }

                if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
                    context._hoverState = HoverState.SHOW;
                    return;
                }

                clearTimeout(context._timeout);
                context._hoverState = HoverState.SHOW;

                if (!context.config.delay || !context.config.delay.show) {
                    context.show();
                    return;
                }

                context._timeout = setTimeout(function() {
                    if (context._hoverState === HoverState.SHOW) {
                        context.show();
                    }
                }, context.config.delay.show);
            };

            _proto._leave = function _leave(event, context) {
                var dataKey = this.constructor.DATA_KEY;
                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
                }

                if (context._isWithActiveTrigger()) {
                    return;
                }

                clearTimeout(context._timeout);
                context._hoverState = HoverState.OUT;

                if (!context.config.delay || !context.config.delay.hide) {
                    context.hide();
                    return;
                }

                context._timeout = setTimeout(function() {
                    if (context._hoverState === HoverState.OUT) {
                        context.hide();
                    }
                }, context.config.delay.hide);
            };

            _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
                for (var trigger in this._activeTrigger) {
                    if (this._activeTrigger[trigger]) {
                        return true;
                    }
                }

                return false;
            };

            _proto._getConfig = function _getConfig(config) {
                var dataAttributes = $(this.element).data();
                Object.keys(dataAttributes).forEach(function(dataAttr) {
                    if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
                        delete dataAttributes[dataAttr];
                    }
                });
                config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

                if (typeof config.delay === 'number') {
                    config.delay = {
                        show: config.delay,
                        hide: config.delay
                    };
                }

                if (typeof config.title === 'number') {
                    config.title = config.title.toString();
                }

                if (typeof config.content === 'number') {
                    config.content = config.content.toString();
                }

                Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

                if (config.sanitize) {
                    config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
                }

                return config;
            };

            _proto._getDelegateConfig = function _getDelegateConfig() {
                var config = {};

                if (this.config) {
                    for (var key in this.config) {
                        if (this.constructor.Default[key] !== this.config[key]) {
                            config[key] = this.config[key];
                        }
                    }
                }

                return config;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
                var $tip = $(this.getTipElement());
                var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

                if (tabClass !== null && tabClass.length) {
                    $tip.removeClass(tabClass.join(''));
                }
            };

            _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
                var popperInstance = popperData.instance;
                this.tip = popperInstance.popper;

                this._cleanTipClass();

                this.addAttachmentClass(this._getAttachment(popperData.placement));
            };

            _proto._fixTransition = function _fixTransition() {
                var tip = this.getTipElement();
                var initConfigAnimation = this.config.animation;

                if (tip.getAttribute('x-placement') !== null) {
                    return;
                }

                $(tip).removeClass(ClassName$6.FADE);
                this.config.animation = false;
                this.hide();
                this.show();
                this.config.animation = initConfigAnimation;
            };

            Tooltip._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$6);

                    var _config = typeof config === 'object' && config;

                    if (!data && /dispose|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        data = new Tooltip(this, _config);
                        $(this).data(DATA_KEY$6, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Tooltip, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$6;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$4;
                }
            }, {
                key: "NAME",
                get: function get() {
                    return NAME$6;
                }
            }, {
                key: "DATA_KEY",
                get: function get() {
                    return DATA_KEY$6;
                }
            }, {
                key: "Event",
                get: function get() {
                    return Event$6;
                }
            }, {
                key: "EVENT_KEY",
                get: function get() {
                    return EVENT_KEY$6;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$4;
                }
            }]);

            return Tooltip;
        }();







    $.fn[NAME$6] = Tooltip._jQueryInterface;
    $.fn[NAME$6].Constructor = Tooltip;

    $.fn[NAME$6].noConflict = function() {
        $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
        return Tooltip._jQueryInterface;
    };







    var NAME$7 = 'popover';
    var VERSION$7 = '4.3.1';
    var DATA_KEY$7 = 'bs.popover';
    var EVENT_KEY$7 = "." + DATA_KEY$7;
    var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
    var CLASS_PREFIX$1 = 'bs-popover';
    var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

    var Default$5 = _objectSpread({}, Tooltip.Default, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
        content: '(string|element|function)'
    });

    var ClassName$7 = {
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$7 = {
        TITLE: '.popover-header',
        CONTENT: '.popover-body'
    };
    var Event$7 = {
        HIDE: "hide" + EVENT_KEY$7,
        HIDDEN: "hidden" + EVENT_KEY$7,
        SHOW: "show" + EVENT_KEY$7,
        SHOWN: "shown" + EVENT_KEY$7,
        INSERTED: "inserted" + EVENT_KEY$7,
        CLICK: "click" + EVENT_KEY$7,
        FOCUSIN: "focusin" + EVENT_KEY$7,
        FOCUSOUT: "focusout" + EVENT_KEY$7,
        MOUSEENTER: "mouseenter" + EVENT_KEY$7,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$7






    };

    var Popover =

        function(_Tooltip) {
            _inheritsLoose(Popover, _Tooltip);

            function Popover() {
                return _Tooltip.apply(this, arguments) || this;
            }

            var _proto = Popover.prototype;


            _proto.isWithContent = function isWithContent() {
                return this.getTitle() || this._getContent();
            };

            _proto.addAttachmentClass = function addAttachmentClass(attachment) {
                $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
            };

            _proto.getTipElement = function getTipElement() {
                this.tip = this.tip || $(this.config.template)[0];
                return this.tip;
            };

            _proto.setContent = function setContent() {
                var $tip = $(this.getTipElement());

                this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

                var content = this._getContent();

                if (typeof content === 'function') {
                    content = content.call(this.element);
                }

                this.setElementContent($tip.find(Selector$7.CONTENT), content);
                $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
            };

            _proto._getContent = function _getContent() {
                return this.element.getAttribute('data-content') || this.config.content;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
                var $tip = $(this.getTipElement());
                var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

                if (tabClass !== null && tabClass.length > 0) {
                    $tip.removeClass(tabClass.join(''));
                }
            };

            Popover._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$7);

                    var _config = typeof config === 'object' ? config : null;

                    if (!data && /dispose|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        data = new Popover(this, _config);
                        $(this).data(DATA_KEY$7, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Popover, null, [{
                key: "VERSION",

                get: function get() {
                    return VERSION$7;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$5;
                }
            }, {
                key: "NAME",
                get: function get() {
                    return NAME$7;
                }
            }, {
                key: "DATA_KEY",
                get: function get() {
                    return DATA_KEY$7;
                }
            }, {
                key: "Event",
                get: function get() {
                    return Event$7;
                }
            }, {
                key: "EVENT_KEY",
                get: function get() {
                    return EVENT_KEY$7;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$5;
                }
            }]);

            return Popover;
        }(Tooltip);







    $.fn[NAME$7] = Popover._jQueryInterface;
    $.fn[NAME$7].Constructor = Popover;

    $.fn[NAME$7].noConflict = function() {
        $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
        return Popover._jQueryInterface;
    };







    var NAME$8 = 'scrollspy';
    var VERSION$8 = '4.3.1';
    var DATA_KEY$8 = 'bs.scrollspy';
    var EVENT_KEY$8 = "." + DATA_KEY$8;
    var DATA_API_KEY$6 = '.data-api';
    var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
    var Default$6 = {
        offset: 10,
        method: 'auto',
        target: ''
    };
    var DefaultType$6 = {
        offset: 'number',
        method: 'string',
        target: '(string|element)'
    };
    var Event$8 = {
        ACTIVATE: "activate" + EVENT_KEY$8,
        SCROLL: "scroll" + EVENT_KEY$8,
        LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
    };
    var ClassName$8 = {
        DROPDOWN_ITEM: 'dropdown-item',
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active'
    };
    var Selector$8 = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: '.active',
        NAV_LIST_GROUP: '.nav, .list-group',
        NAV_LINKS: '.nav-link',
        NAV_ITEMS: '.nav-item',
        LIST_ITEMS: '.list-group-item',
        DROPDOWN: '.dropdown',
        DROPDOWN_ITEMS: '.dropdown-item',
        DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
        OFFSET: 'offset',
        POSITION: 'position'






    };

    var ScrollSpy =

        function() {
            function ScrollSpy(element, config) {
                var _this = this;

                this._element = element;
                this._scrollElement = element.tagName === 'BODY' ? window : element;
                this._config = this._getConfig(config);
                this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
                this._offsets = [];
                this._targets = [];
                this._activeTarget = null;
                this._scrollHeight = 0;
                $(this._scrollElement).on(Event$8.SCROLL, function(event) {
                    return _this._process(event);
                });
                this.refresh();

                this._process();
            }


            var _proto = ScrollSpy.prototype;


            _proto.refresh = function refresh() {
                var _this2 = this;

                var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
                var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
                var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
                this._offsets = [];
                this._targets = [];
                this._scrollHeight = this._getScrollHeight();
                var targets = [].slice.call(document.querySelectorAll(this._selector));
                targets.map(function(element) {
                    var target;
                    var targetSelector = Util.getSelectorFromElement(element);

                    if (targetSelector) {
                        target = document.querySelector(targetSelector);
                    }

                    if (target) {
                        var targetBCR = target.getBoundingClientRect();

                        if (targetBCR.width || targetBCR.height) {

                            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                        }
                    }

                    return null;
                }).filter(function(item) {
                    return item;
                }).sort(function(a, b) {
                    return a[0] - b[0];
                }).forEach(function(item) {
                    _this2._offsets.push(item[0]);

                    _this2._targets.push(item[1]);
                });
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY$8);
                $(this._scrollElement).off(EVENT_KEY$8);
                this._element = null;
                this._scrollElement = null;
                this._config = null;
                this._selector = null;
                this._offsets = null;
                this._targets = null;
                this._activeTarget = null;
                this._scrollHeight = null;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

                if (typeof config.target !== 'string') {
                    var id = $(config.target).attr('id');

                    if (!id) {
                        id = Util.getUID(NAME$8);
                        $(config.target).attr('id', id);
                    }

                    config.target = "#" + id;
                }

                Util.typeCheckConfig(NAME$8, config, DefaultType$6);
                return config;
            };

            _proto._getScrollTop = function _getScrollTop() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
            };

            _proto._getScrollHeight = function _getScrollHeight() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            };

            _proto._getOffsetHeight = function _getOffsetHeight() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
            };

            _proto._process = function _process() {
                var scrollTop = this._getScrollTop() + this._config.offset;

                var scrollHeight = this._getScrollHeight();

                var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

                if (this._scrollHeight !== scrollHeight) {
                    this.refresh();
                }

                if (scrollTop >= maxScroll) {
                    var target = this._targets[this._targets.length - 1];

                    if (this._activeTarget !== target) {
                        this._activate(target);
                    }

                    return;
                }

                if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                    this._activeTarget = null;

                    this._clear();

                    return;
                }

                var offsetLength = this._offsets.length;

                for (var i = offsetLength; i--;) {
                    var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

                    if (isActiveTarget) {
                        this._activate(this._targets[i]);
                    }
                }
            };

            _proto._activate = function _activate(target) {
                this._activeTarget = target;

                this._clear();

                var queries = this._selector.split(',').map(function(selector) {
                    return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
                });

                var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

                if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
                    $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
                    $link.addClass(ClassName$8.ACTIVE);
                } else {

                    $link.addClass(ClassName$8.ACTIVE);


                    $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE);

                    $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
                }

                $(this._scrollElement).trigger(Event$8.ACTIVATE, {
                    relatedTarget: target
                });
            };

            _proto._clear = function _clear() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(node) {
                    return node.classList.contains(ClassName$8.ACTIVE);
                }).forEach(function(node) {
                    return node.classList.remove(ClassName$8.ACTIVE);
                });
            };

            ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$8);

                    var _config = typeof config === 'object' && config;

                    if (!data) {
                        data = new ScrollSpy(this, _config);
                        $(this).data(DATA_KEY$8, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(ScrollSpy, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$8;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$6;
                }
            }]);

            return ScrollSpy;
        }();







    $(window).on(Event$8.LOAD_DATA_API, function() {
        var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
        var scrollSpysLength = scrollSpys.length;

        for (var i = scrollSpysLength; i--;) {
            var $spy = $(scrollSpys[i]);

            ScrollSpy._jQueryInterface.call($spy, $spy.data());
        }
    });






    $.fn[NAME$8] = ScrollSpy._jQueryInterface;
    $.fn[NAME$8].Constructor = ScrollSpy;

    $.fn[NAME$8].noConflict = function() {
        $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
        return ScrollSpy._jQueryInterface;
    };







    var NAME$9 = 'tab';
    var VERSION$9 = '4.3.1';
    var DATA_KEY$9 = 'bs.tab';
    var EVENT_KEY$9 = "." + DATA_KEY$9;
    var DATA_API_KEY$7 = '.data-api';
    var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
    var Event$9 = {
        HIDE: "hide" + EVENT_KEY$9,
        HIDDEN: "hidden" + EVENT_KEY$9,
        SHOW: "show" + EVENT_KEY$9,
        SHOWN: "shown" + EVENT_KEY$9,
        CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
    };
    var ClassName$9 = {
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active',
        DISABLED: 'disabled',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$9 = {
        DROPDOWN: '.dropdown',
        NAV_LIST_GROUP: '.nav, .list-group',
        ACTIVE: '.active',
        ACTIVE_UL: '> li > .active',
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle',
        DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'






    };

    var Tab =

        function() {
            function Tab(element) {
                this._element = element;
            }


            var _proto = Tab.prototype;


            _proto.show = function show() {
                var _this = this;

                if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
                    return;
                }

                var target;
                var previous;
                var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
                var selector = Util.getSelectorFromElement(this._element);

                if (listElement) {
                    var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
                    previous = $.makeArray($(listElement).find(itemSelector));
                    previous = previous[previous.length - 1];
                }

                var hideEvent = $.Event(Event$9.HIDE, {
                    relatedTarget: this._element
                });
                var showEvent = $.Event(Event$9.SHOW, {
                    relatedTarget: previous
                });

                if (previous) {
                    $(previous).trigger(hideEvent);
                }

                $(this._element).trigger(showEvent);

                if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                    return;
                }

                if (selector) {
                    target = document.querySelector(selector);
                }

                this._activate(this._element, listElement);

                var complete = function complete() {
                    var hiddenEvent = $.Event(Event$9.HIDDEN, {
                        relatedTarget: _this._element
                    });
                    var shownEvent = $.Event(Event$9.SHOWN, {
                        relatedTarget: previous
                    });
                    $(previous).trigger(hiddenEvent);
                    $(_this._element).trigger(shownEvent);
                };

                if (target) {
                    this._activate(target, target.parentNode, complete);
                } else {
                    complete();
                }
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY$9);
                this._element = null;
            };

            _proto._activate = function _activate(element, container, callback) {
                var _this2 = this;

                var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
                var active = activeElements[0];
                var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

                var complete = function complete() {
                    return _this2._transitionComplete(element, active, callback);
                };

                if (active && isTransitioning) {
                    var transitionDuration = Util.getTransitionDurationFromElement(active);
                    $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }
            };

            _proto._transitionComplete = function _transitionComplete(element, active, callback) {
                if (active) {
                    $(active).removeClass(ClassName$9.ACTIVE);
                    var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

                    if (dropdownChild) {
                        $(dropdownChild).removeClass(ClassName$9.ACTIVE);
                    }

                    if (active.getAttribute('role') === 'tab') {
                        active.setAttribute('aria-selected', false);
                    }
                }

                $(element).addClass(ClassName$9.ACTIVE);

                if (element.getAttribute('role') === 'tab') {
                    element.setAttribute('aria-selected', true);
                }

                Util.reflow(element);

                if (element.classList.contains(ClassName$9.FADE)) {
                    element.classList.add(ClassName$9.SHOW);
                }

                if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
                    var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

                    if (dropdownElement) {
                        var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
                        $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
                    }

                    element.setAttribute('aria-expanded', true);
                }

                if (callback) {
                    callback();
                }
            };

            Tab._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY$9);

                    if (!data) {
                        data = new Tab(this);
                        $this.data(DATA_KEY$9, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Tab, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$9;
                }
            }]);

            return Tab;
        }();







    $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function(event) {
        event.preventDefault();

        Tab._jQueryInterface.call($(this), 'show');
    });






    $.fn[NAME$9] = Tab._jQueryInterface;
    $.fn[NAME$9].Constructor = Tab;

    $.fn[NAME$9].noConflict = function() {
        $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
        return Tab._jQueryInterface;
    };







    var NAME$a = 'toast';
    var VERSION$a = '4.3.1';
    var DATA_KEY$a = 'bs.toast';
    var EVENT_KEY$a = "." + DATA_KEY$a;
    var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
    var Event$a = {
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
        HIDE: "hide" + EVENT_KEY$a,
        HIDDEN: "hidden" + EVENT_KEY$a,
        SHOW: "show" + EVENT_KEY$a,
        SHOWN: "shown" + EVENT_KEY$a
    };
    var ClassName$a = {
        FADE: 'fade',
        HIDE: 'hide',
        SHOW: 'show',
        SHOWING: 'showing'
    };
    var DefaultType$7 = {
        animation: 'boolean',
        autohide: 'boolean',
        delay: 'number'
    };
    var Default$7 = {
        animation: true,
        autohide: true,
        delay: 500
    };
    var Selector$a = {
        DATA_DISMISS: '[data-dismiss="toast"]'






    };

    var Toast =

        function() {
            function Toast(element, config) {
                this._element = element;
                this._config = this._getConfig(config);
                this._timeout = null;

                this._setListeners();
            }


            var _proto = Toast.prototype;


            _proto.show = function show() {
                var _this = this;

                $(this._element).trigger(Event$a.SHOW);

                if (this._config.animation) {
                    this._element.classList.add(ClassName$a.FADE);
                }

                var complete = function complete() {
                    _this._element.classList.remove(ClassName$a.SHOWING);

                    _this._element.classList.add(ClassName$a.SHOW);

                    $(_this._element).trigger(Event$a.SHOWN);

                    if (_this._config.autohide) {
                        _this.hide();
                    }
                };

                this._element.classList.remove(ClassName$a.HIDE);

                this._element.classList.add(ClassName$a.SHOWING);

                if (this._config.animation) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }
            };

            _proto.hide = function hide(withoutTimeout) {
                var _this2 = this;

                if (!this._element.classList.contains(ClassName$a.SHOW)) {
                    return;
                }

                $(this._element).trigger(Event$a.HIDE);

                if (withoutTimeout) {
                    this._close();
                } else {
                    this._timeout = setTimeout(function() {
                        _this2._close();
                    }, this._config.delay);
                }
            };

            _proto.dispose = function dispose() {
                clearTimeout(this._timeout);
                this._timeout = null;

                if (this._element.classList.contains(ClassName$a.SHOW)) {
                    this._element.classList.remove(ClassName$a.SHOW);
                }

                $(this._element).off(Event$a.CLICK_DISMISS);
                $.removeData(this._element, DATA_KEY$a);
                this._element = null;
                this._config = null;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
                Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
                return config;
            };

            _proto._setListeners = function _setListeners() {
                var _this3 = this;

                $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function() {
                    return _this3.hide(true);
                });
            };

            _proto._close = function _close() {
                var _this4 = this;

                var complete = function complete() {
                    _this4._element.classList.add(ClassName$a.HIDE);

                    $(_this4._element).trigger(Event$a.HIDDEN);
                };

                this._element.classList.remove(ClassName$a.SHOW);

                if (this._config.animation) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                    $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                } else {
                    complete();
                }
            };

            Toast._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY$a);

                    var _config = typeof config === 'object' && config;

                    if (!data) {
                        data = new Toast(this, _config);
                        $element.data(DATA_KEY$a, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config](this);
                    }
                });
            };

            _createClass(Toast, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$a;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$7;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$7;
                }
            }]);

            return Toast;
        }();







    $.fn[NAME$a] = Toast._jQueryInterface;
    $.fn[NAME$a].Constructor = Toast;

    $.fn[NAME$a].noConflict = function() {
        $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
        return Toast._jQueryInterface;
    };








    (function() {
        if (typeof $ === 'undefined') {
            throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
        }

        var version = $.fn.jquery.split(' ')[0].split('.');
        var minMajor = 1;
        var ltMajor = 2;
        var minMinor = 9;
        var minPatch = 1;
        var maxMajor = 4;

        if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
            throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
        }
    })();

    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

}));









;
(function(factory) {
    if (typeof define === 'function' && define.amd) {

        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {

        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {




                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {

        factory(jQuery);
    }
}(function(jQuery) {



    var S2 = (function() {


        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
            var S2 = jQuery.fn.select2.amd;
        }
        var S2;
        (function() {
            if (!S2 || !S2.requirejs) {
                if (!S2) {
                    S2 = {};
                } else {
                    require = S2;
                }








                var requirejs, require, define;
                (function(undef) {
                    var main, req, makeMap, handlers,
                        defined = {},
                        waiting = {},
                        config = {},
                        defining = {},
                        hasOwn = Object.prototype.hasOwnProperty,
                        aps = [].slice,
                        jsSuffixRegExp = /\.js$/;

                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }









                    function normalize(name, baseName) {
                        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
                            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
                            baseParts = baseName && baseName.split("/"),
                            map = config.map,
                            starMap = (map && map['*']) || {};


                        if (name) {
                            name = name.split('/');
                            lastIndex = name.length - 1;





                            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                            }


                            if (name[0].charAt(0) === '.' && baseParts) {





                                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                name = normalizedBaseParts.concat(name);
                            }


                            for (i = 0; i < name.length; i++) {
                                part = name[i];
                                if (part === '.') {
                                    name.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {





                                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                                        continue;
                                    } else if (i > 0) {
                                        name.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }


                            name = name.join('/');
                        }


                        if ((baseParts || starMap) && map) {
                            nameParts = name.split('/');

                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");

                                if (baseParts) {


                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join('/')];



                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];
                                            if (mapValue) {

                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (foundMap) {
                                    break;
                                }




                                if (!foundStarMap && starMap && starMap[nameSegment]) {
                                    foundStarMap = starMap[nameSegment];
                                    starI = i;
                                }
                            }

                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI;
                            }

                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join('/');
                            }
                        }

                        return name;
                    }

                    function makeRequire(relName, forceSync) {
                        return function() {



                            var args = aps.call(arguments, 0);




                            if (typeof args[0] !== 'string' && args.length === 1) {
                                args.push(null);
                            }
                            return req.apply(undef, args.concat([relName, forceSync]));
                        };
                    }

                    function makeNormalize(relName) {
                        return function(name) {
                            return normalize(name, relName);
                        };
                    }

                    function makeLoad(depName) {
                        return function(value) {
                            defined[depName] = value;
                        };
                    }

                    function callDep(name) {
                        if (hasProp(waiting, name)) {
                            var args = waiting[name];
                            delete waiting[name];
                            defining[name] = true;
                            main.apply(undef, args);
                        }

                        if (!hasProp(defined, name) && !hasProp(defining, name)) {
                            throw new Error('No ' + name);
                        }
                        return defined[name];
                    }




                    function splitPrefix(name) {
                        var prefix,
                            index = name ? name.indexOf('!') : -1;
                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }
                        return [prefix, name];
                    }



                    function makeRelParts(relName) {
                        return relName ? splitPrefix(relName) : [];
                    }






                    makeMap = function(name, relParts) {
                        var plugin,
                            parts = splitPrefix(name),
                            prefix = parts[0],
                            relResourceName = relParts[1];

                        name = parts[1];

                        if (prefix) {
                            prefix = normalize(prefix, relResourceName);
                            plugin = callDep(prefix);
                        }


                        if (prefix) {
                            if (plugin && plugin.normalize) {
                                name = plugin.normalize(name, makeNormalize(relResourceName));
                            } else {
                                name = normalize(name, relResourceName);
                            }
                        } else {
                            name = normalize(name, relResourceName);
                            parts = splitPrefix(name);
                            prefix = parts[0];
                            name = parts[1];
                            if (prefix) {
                                plugin = callDep(prefix);
                            }
                        }


                        return {
                            f: prefix ? prefix + '!' + name : name,
                            n: name,
                            pr: prefix,
                            p: plugin
                        };
                    };

                    function makeConfig(name) {
                        return function() {
                            return (config && config.config && config.config[name]) || {};
                        };
                    }

                    handlers = {
                        require: function(name) {
                            return makeRequire(name);
                        },
                        exports: function(name) {
                            var e = defined[name];
                            if (typeof e !== 'undefined') {
                                return e;
                            } else {
                                return (defined[name] = {});
                            }
                        },
                        module: function(name) {
                            return {
                                id: name,
                                uri: '',
                                exports: defined[name],
                                config: makeConfig(name)
                            };
                        }
                    };

                    main = function(name, deps, callback, relName) {
                        var cjsModule, depName, ret, map, i, relParts,
                            args = [],
                            callbackType = typeof callback,
                            usingExports;


                        relName = relName || name;
                        relParts = makeRelParts(relName);


                        if (callbackType === 'undefined' || callbackType === 'function') {



                            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relParts);
                                depName = map.f;


                                if (depName === "require") {
                                    args[i] = handlers.require(name);
                                } else if (depName === "exports") {

                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === "module") {

                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) ||
                                    hasProp(waiting, depName) ||
                                    hasProp(defining, depName)) {
                                    args[i] = callDep(depName);
                                } else if (map.p) {
                                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                                    args[i] = defined[depName];
                                } else {
                                    throw new Error(name + ' missing ' + depName);
                                }
                            }

                            ret = callback ? callback.apply(defined[name], args) : undefined;

                            if (name) {



                                if (cjsModule && cjsModule.exports !== undef &&
                                    cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {

                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {


                            defined[name] = callback;
                        }
                    };

                    requirejs = require = req = function(deps, callback, relName, forceSync, alt) {
                        if (typeof deps === "string") {
                            if (handlers[deps]) {

                                return handlers[deps](callback);
                            }




                            return callDep(makeMap(deps, makeRelParts(callback)).f);
                        } else if (!deps.splice) {

                            config = deps;
                            if (config.deps) {
                                req(config.deps, config.callback);
                            }
                            if (!callback) {
                                return;
                            }

                            if (callback.splice) {


                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        }


                        callback = callback || function() {};



                        if (typeof relName === 'function') {
                            relName = forceSync;
                            forceSync = alt;
                        }


                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {






                            setTimeout(function() {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }

                        return req;
                    };





                    req.config = function(cfg) {
                        return req(cfg);
                    };




                    requirejs._defined = defined;

                    define = function(name, deps, callback) {
                        if (typeof name !== 'string') {
                            throw new Error('See almond README: incorrect module build, no module name');
                        }


                        if (!deps.splice) {



                            callback = deps;
                            deps = [];
                        }

                        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                            waiting[name] = [name, deps, callback];
                        }
                    };

                    define.amd = {
                        jQuery: true
                    };
                }());

                S2.requirejs = requirejs;
                S2.require = require;
                S2.define = define;
            }
        }());
        S2.define("almond", function() {});


        S2.define('jquery', [], function() {
            var _$ = jQuery || $;

            if (_$ == null && console && console.error) {
                console.error(
                    'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
                    'found. Make sure that you are including jQuery before Select2 on your ' +
                    'web page.'
                );
            }

            return _$;
        });

        S2.define('select2/utils', [
            'jquery'
        ], function($) {
            var Utils = {};

            Utils.Extend = function(ChildClass, SuperClass) {
                var __hasProp = {}.hasOwnProperty;

                function BaseConstructor() {
                    this.constructor = ChildClass;
                }

                for (var key in SuperClass) {
                    if (__hasProp.call(SuperClass, key)) {
                        ChildClass[key] = SuperClass[key];
                    }
                }

                BaseConstructor.prototype = SuperClass.prototype;
                ChildClass.prototype = new BaseConstructor();
                ChildClass.__super__ = SuperClass.prototype;

                return ChildClass;
            };

            function getMethods(theClass) {
                var proto = theClass.prototype;

                var methods = [];

                for (var methodName in proto) {
                    var m = proto[methodName];

                    if (typeof m !== 'function') {
                        continue;
                    }

                    if (methodName === 'constructor') {
                        continue;
                    }

                    methods.push(methodName);
                }

                return methods;
            }

            Utils.Decorate = function(SuperClass, DecoratorClass) {
                var decoratedMethods = getMethods(DecoratorClass);
                var superMethods = getMethods(SuperClass);

                function DecoratedClass() {
                    var unshift = Array.prototype.unshift;

                    var argCount = DecoratorClass.prototype.constructor.length;

                    var calledConstructor = SuperClass.prototype.constructor;

                    if (argCount > 0) {
                        unshift.call(arguments, SuperClass.prototype.constructor);

                        calledConstructor = DecoratorClass.prototype.constructor;
                    }

                    calledConstructor.apply(this, arguments);
                }

                DecoratorClass.displayName = SuperClass.displayName;

                function ctr() {
                    this.constructor = DecoratedClass;
                }

                DecoratedClass.prototype = new ctr();

                for (var m = 0; m < superMethods.length; m++) {
                    var superMethod = superMethods[m];

                    DecoratedClass.prototype[superMethod] =
                        SuperClass.prototype[superMethod];
                }

                var calledMethod = function(methodName) {

                    var originalMethod = function() {};

                    if (methodName in DecoratedClass.prototype) {
                        originalMethod = DecoratedClass.prototype[methodName];
                    }

                    var decoratedMethod = DecoratorClass.prototype[methodName];

                    return function() {
                        var unshift = Array.prototype.unshift;

                        unshift.call(arguments, originalMethod);

                        return decoratedMethod.apply(this, arguments);
                    };
                };

                for (var d = 0; d < decoratedMethods.length; d++) {
                    var decoratedMethod = decoratedMethods[d];

                    DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
                }

                return DecoratedClass;
            };

            var Observable = function() {
                this.listeners = {};
            };

            Observable.prototype.on = function(event, callback) {
                this.listeners = this.listeners || {};

                if (event in this.listeners) {
                    this.listeners[event].push(callback);
                } else {
                    this.listeners[event] = [callback];
                }
            };

            Observable.prototype.trigger = function(event) {
                var slice = Array.prototype.slice;
                var params = slice.call(arguments, 1);

                this.listeners = this.listeners || {};


                if (params == null) {
                    params = [];
                }


                if (params.length === 0) {
                    params.push({});
                }


                params[0]._type = event;

                if (event in this.listeners) {
                    this.invoke(this.listeners[event], slice.call(arguments, 1));
                }

                if ('*' in this.listeners) {
                    this.invoke(this.listeners['*'], arguments);
                }
            };

            Observable.prototype.invoke = function(listeners, params) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].apply(this, params);
                }
            };

            Utils.Observable = Observable;

            Utils.generateChars = function(length) {
                var chars = '';

                for (var i = 0; i < length; i++) {
                    var randomChar = Math.floor(Math.random() * 36);
                    chars += randomChar.toString(36);
                }

                return chars;
            };

            Utils.bind = function(func, context) {
                return function() {
                    func.apply(context, arguments);
                };
            };

            Utils._convertData = function(data) {
                for (var originalKey in data) {
                    var keys = originalKey.split('-');

                    var dataLevel = data;

                    if (keys.length === 1) {
                        continue;
                    }

                    for (var k = 0; k < keys.length; k++) {
                        var key = keys[k];



                        key = key.substring(0, 1).toLowerCase() + key.substring(1);

                        if (!(key in dataLevel)) {
                            dataLevel[key] = {};
                        }

                        if (k == keys.length - 1) {
                            dataLevel[key] = data[originalKey];
                        }

                        dataLevel = dataLevel[key];
                    }

                    delete data[originalKey];
                }

                return data;
            };

            Utils.hasScroll = function(index, el) {






                var $el = $(el);
                var overflowX = el.style.overflowX;
                var overflowY = el.style.overflowY;


                if (overflowX === overflowY &&
                    (overflowY === 'hidden' || overflowY === 'visible')) {
                    return false;
                }

                if (overflowX === 'scroll' || overflowY === 'scroll') {
                    return true;
                }

                return ($el.innerHeight() < el.scrollHeight ||
                    $el.innerWidth() < el.scrollWidth);
            };

            Utils.escapeMarkup = function(markup) {
                var replaceMap = {
                    '\\': '&#92;',
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '\'': '&#39;',
                    '/': '&#47;'
                };


                if (typeof markup !== 'string') {
                    return markup;
                }

                return String(markup).replace(/[&<>"'\/\\]/g, function(match) {
                    return replaceMap[match];
                });
            };


            Utils.appendMany = function($element, $nodes) {


                if ($.fn.jquery.substr(0, 3) === '1.7') {
                    var $jqNodes = $();

                    $.map($nodes, function(node) {
                        $jqNodes = $jqNodes.add(node);
                    });

                    $nodes = $jqNodes;
                }

                $element.append($nodes);
            };


            Utils.__cache = {};

            var id = 0;
            Utils.GetUniqueElementId = function(element) {





                var select2Id = element.getAttribute('data-select2-id');
                if (select2Id == null) {

                    if (element.id) {
                        select2Id = element.id;
                        element.setAttribute('data-select2-id', select2Id);
                    } else {
                        element.setAttribute('data-select2-id', ++id);
                        select2Id = id.toString();
                    }
                }
                return select2Id;
            };

            Utils.StoreData = function(element, name, value) {


                var id = Utils.GetUniqueElementId(element);
                if (!Utils.__cache[id]) {
                    Utils.__cache[id] = {};
                }

                Utils.__cache[id][name] = value;
            };

            Utils.GetData = function(element, name) {




                var id = Utils.GetUniqueElementId(element);
                if (name) {
                    if (Utils.__cache[id]) {
                        return Utils.__cache[id][name] != null ?
                            Utils.__cache[id][name] :
                            $(element).data(name);
                    }
                    return $(element).data(name);
                } else {
                    return Utils.__cache[id];
                }
            };

            Utils.RemoveData = function(element) {

                var id = Utils.GetUniqueElementId(element);
                if (Utils.__cache[id] != null) {
                    delete Utils.__cache[id];
                }
            };

            return Utils;
        });

        S2.define('select2/results', [
            'jquery',
            './utils'
        ], function($, Utils) {
            function Results($element, options, dataAdapter) {
                this.$element = $element;
                this.data = dataAdapter;
                this.options = options;

                Results.__super__.constructor.call(this);
            }

            Utils.Extend(Results, Utils.Observable);

            Results.prototype.render = function() {
                var $results = $(
                    '<ul class="select2-results__options" role="tree"></ul>'
                );

                if (this.options.get('multiple')) {
                    $results.attr('aria-multiselectable', 'true');
                }

                this.$results = $results;

                return $results;
            };

            Results.prototype.clear = function() {
                this.$results.empty();
            };

            Results.prototype.displayMessage = function(params) {
                var escapeMarkup = this.options.get('escapeMarkup');

                this.clear();
                this.hideLoading();

                var $message = $(
                    '<li role="treeitem" aria-live="assertive"' +
                    ' class="select2-results__option"></li>'
                );

                var message = this.options.get('translations').get(params.message);

                $message.append(
                    escapeMarkup(
                        message(params.args)
                    )
                );

                $message[0].className += ' select2-results__message';

                this.$results.append($message);
            };

            Results.prototype.hideMessages = function() {
                this.$results.find('.select2-results__message').remove();
            };

            Results.prototype.append = function(data) {
                this.hideLoading();

                var $options = [];

                if (data.results == null || data.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger('results:message', {
                            message: 'noResults'
                        });
                    }

                    return;
                }

                data.results = this.sort(data.results);

                for (var d = 0; d < data.results.length; d++) {
                    var item = data.results[d];

                    var $option = this.option(item);

                    $options.push($option);
                }

                this.$results.append($options);
            };

            Results.prototype.position = function($results, $dropdown) {
                var $resultsContainer = $dropdown.find('.select2-results');
                $resultsContainer.append($results);
            };

            Results.prototype.sort = function(data) {
                var sorter = this.options.get('sorter');

                return sorter(data);
            };

            Results.prototype.highlightFirstItem = function() {
                var $options = this.$results
                    .find('.select2-results__option[aria-selected]');

                var $selected = $options.filter('[aria-selected=true]');


                if ($selected.length > 0) {

                    $selected.first().trigger('mouseenter');
                } else {


                    $options.first().trigger('mouseenter');
                }

                this.ensureHighlightVisible();
            };

            Results.prototype.setClasses = function() {
                var self = this;

                this.data.current(function(selected) {
                    var selectedIds = $.map(selected, function(s) {
                        return s.id.toString();
                    });

                    var $options = self.$results
                        .find('.select2-results__option[aria-selected]');

                    $options.each(function() {
                        var $option = $(this);

                        var item = Utils.GetData(this, 'data');


                        var id = '' + item.id;

                        if ((item.element != null && item.element.selected) ||
                            (item.element == null && $.inArray(id, selectedIds) > -1)) {
                            $option.attr('aria-selected', 'true');
                        } else {
                            $option.attr('aria-selected', 'false');
                        }
                    });

                });
            };

            Results.prototype.showLoading = function(params) {
                this.hideLoading();

                var loadingMore = this.options.get('translations').get('searching');

                var loading = {
                    disabled: true,
                    loading: true,
                    text: loadingMore(params)
                };
                var $loading = this.option(loading);
                $loading.className += ' loading-results';

                this.$results.prepend($loading);
            };

            Results.prototype.hideLoading = function() {
                this.$results.find('.loading-results').remove();
            };

            Results.prototype.option = function(data) {
                var option = document.createElement('li');
                option.className = 'select2-results__option';

                var attrs = {
                    'role': 'treeitem',
                    'aria-selected': 'false'
                };

                if (data.disabled) {
                    delete attrs['aria-selected'];
                    attrs['aria-disabled'] = 'true';
                }

                if (data.id == null) {
                    delete attrs['aria-selected'];
                }

                if (data._resultId != null) {
                    option.id = data._resultId;
                }

                if (data.title) {
                    option.title = data.title;
                }

                if (data.children) {
                    attrs.role = 'group';
                    attrs['aria-label'] = data.text;
                    delete attrs['aria-selected'];
                }

                for (var attr in attrs) {
                    var val = attrs[attr];

                    option.setAttribute(attr, val);
                }

                if (data.children) {
                    var $option = $(option);

                    var label = document.createElement('strong');
                    label.className = 'select2-results__group';

                    var $label = $(label);
                    this.template(data, label);

                    var $children = [];

                    for (var c = 0; c < data.children.length; c++) {
                        var child = data.children[c];

                        var $child = this.option(child);

                        $children.push($child);
                    }

                    var $childrenContainer = $('<ul></ul>', {
                        'class': 'select2-results__options select2-results__options--nested'
                    });

                    $childrenContainer.append($children);

                    $option.append(label);
                    $option.append($childrenContainer);
                } else {
                    this.template(data, option);
                }

                Utils.StoreData(option, 'data', data);

                return option;
            };

            Results.prototype.bind = function(container, $container) {
                var self = this;

                var id = container.id + '-results';

                this.$results.attr('id', id);

                container.on('results:all', function(params) {
                    self.clear();
                    self.append(params.data);

                    if (container.isOpen()) {
                        self.setClasses();
                        self.highlightFirstItem();
                    }
                });

                container.on('results:append', function(params) {
                    self.append(params.data);

                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });

                container.on('query', function(params) {
                    self.hideMessages();
                    self.showLoading(params);
                });

                container.on('select', function() {
                    if (!container.isOpen()) {
                        return;
                    }

                    self.setClasses();
                    self.highlightFirstItem();
                });

                container.on('unselect', function() {
                    if (!container.isOpen()) {
                        return;
                    }

                    self.setClasses();
                    self.highlightFirstItem();
                });

                container.on('open', function() {

                    self.$results.attr('aria-expanded', 'true');
                    self.$results.attr('aria-hidden', 'false');

                    self.setClasses();
                    self.ensureHighlightVisible();
                });

                container.on('close', function() {

                    self.$results.attr('aria-expanded', 'false');
                    self.$results.attr('aria-hidden', 'true');
                    self.$results.removeAttr('aria-activedescendant');
                });

                container.on('results:toggle', function() {
                    var $highlighted = self.getHighlightedResults();

                    if ($highlighted.length === 0) {
                        return;
                    }

                    $highlighted.trigger('mouseup');
                });

                container.on('results:select', function() {
                    var $highlighted = self.getHighlightedResults();

                    if ($highlighted.length === 0) {
                        return;
                    }

                    var data = Utils.GetData($highlighted[0], 'data');

                    if ($highlighted.attr('aria-selected') == 'true') {
                        self.trigger('close', {});
                    } else {
                        self.trigger('select', {
                            data: data
                        });
                    }
                });

                container.on('results:previous', function() {
                    var $highlighted = self.getHighlightedResults();

                    var $options = self.$results.find('[aria-selected]');

                    var currentIndex = $options.index($highlighted);



                    if (currentIndex <= 0) {
                        return;
                    }

                    var nextIndex = currentIndex - 1;


                    if ($highlighted.length === 0) {
                        nextIndex = 0;
                    }

                    var $next = $options.eq(nextIndex);

                    $next.trigger('mouseenter');

                    var currentOffset = self.$results.offset().top;
                    var nextTop = $next.offset().top;
                    var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextTop - currentOffset < 0) {
                        self.$results.scrollTop(nextOffset);
                    }
                });

                container.on('results:next', function() {
                    var $highlighted = self.getHighlightedResults();

                    var $options = self.$results.find('[aria-selected]');

                    var currentIndex = $options.index($highlighted);

                    var nextIndex = currentIndex + 1;


                    if (nextIndex >= $options.length) {
                        return;
                    }

                    var $next = $options.eq(nextIndex);

                    $next.trigger('mouseenter');

                    var currentOffset = self.$results.offset().top +
                        self.$results.outerHeight(false);
                    var nextBottom = $next.offset().top + $next.outerHeight(false);
                    var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextBottom > currentOffset) {
                        self.$results.scrollTop(nextOffset);
                    }
                });

                container.on('results:focus', function(params) {
                    params.element.addClass('select2-results__option--highlighted');
                });

                container.on('results:message', function(params) {
                    self.displayMessage(params);
                });

                if ($.fn.mousewheel) {
                    this.$results.on('mousewheel', function(e) {
                        var top = self.$results.scrollTop();

                        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

                        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

                        if (isAtTop) {
                            self.$results.scrollTop(0);

                            e.preventDefault();
                            e.stopPropagation();
                        } else if (isAtBottom) {
                            self.$results.scrollTop(
                                self.$results.get(0).scrollHeight - self.$results.height()
                            );

                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }

                this.$results.on('mouseup', '.select2-results__option[aria-selected]',
                    function(evt) {
                        var $this = $(this);

                        var data = Utils.GetData(this, 'data');

                        if ($this.attr('aria-selected') === 'true') {
                            if (self.options.get('multiple')) {
                                self.trigger('unselect', {
                                    originalEvent: evt,
                                    data: data
                                });
                            } else {
                                self.trigger('close', {});
                            }

                            return;
                        }

                        self.trigger('select', {
                            originalEvent: evt,
                            data: data
                        });
                    });

                this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
                    function(evt) {
                        var data = Utils.GetData(this, 'data');

                        self.getHighlightedResults()
                            .removeClass('select2-results__option--highlighted');

                        self.trigger('results:focus', {
                            data: data,
                            element: $(this)
                        });
                    });
            };

            Results.prototype.getHighlightedResults = function() {
                var $highlighted = this.$results
                    .find('.select2-results__option--highlighted');

                return $highlighted;
            };

            Results.prototype.destroy = function() {
                this.$results.remove();
            };

            Results.prototype.ensureHighlightVisible = function() {
                var $highlighted = this.getHighlightedResults();

                if ($highlighted.length === 0) {
                    return;
                }

                var $options = this.$results.find('[aria-selected]');

                var currentIndex = $options.index($highlighted);

                var currentOffset = this.$results.offset().top;
                var nextTop = $highlighted.offset().top;
                var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

                var offsetDelta = nextTop - currentOffset;
                nextOffset -= $highlighted.outerHeight(false) * 2;

                if (currentIndex <= 2) {
                    this.$results.scrollTop(0);
                } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
                    this.$results.scrollTop(nextOffset);
                }
            };

            Results.prototype.template = function(result, container) {
                var template = this.options.get('templateResult');
                var escapeMarkup = this.options.get('escapeMarkup');

                var content = template(result, container);

                if (content == null) {
                    container.style.display = 'none';
                } else if (typeof content === 'string') {
                    container.innerHTML = escapeMarkup(content);
                } else {
                    $(container).append(content);
                }
            };

            return Results;
        });

        S2.define('select2/keys', [

        ], function() {
            var KEYS = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };

            return KEYS;
        });

        S2.define('select2/selection/base', [
            'jquery',
            '../utils',
            '../keys'
        ], function($, Utils, KEYS) {
            function BaseSelection($element, options) {
                this.$element = $element;
                this.options = options;

                BaseSelection.__super__.constructor.call(this);
            }

            Utils.Extend(BaseSelection, Utils.Observable);

            BaseSelection.prototype.render = function() {
                var $selection = $(
                    '<span class="select2-selection" role="combobox" ' +
                    ' aria-haspopup="true" aria-expanded="false">' +
                    '</span>'
                );

                this._tabindex = 0;

                if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
                    this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
                } else if (this.$element.attr('tabindex') != null) {
                    this._tabindex = this.$element.attr('tabindex');
                }

                $selection.attr('title', this.$element.attr('title'));
                $selection.attr('tabindex', this._tabindex);

                this.$selection = $selection;

                return $selection;
            };

            BaseSelection.prototype.bind = function(container, $container) {
                var self = this;

                var id = container.id + '-container';
                var resultsId = container.id + '-results';

                this.container = container;

                this.$selection.on('focus', function(evt) {
                    self.trigger('focus', evt);
                });

                this.$selection.on('blur', function(evt) {
                    self._handleBlur(evt);
                });

                this.$selection.on('keydown', function(evt) {
                    self.trigger('keypress', evt);

                    if (evt.which === KEYS.SPACE) {
                        evt.preventDefault();
                    }
                });

                container.on('results:focus', function(params) {
                    self.$selection.attr('aria-activedescendant', params.data._resultId);
                });

                container.on('selection:update', function(params) {
                    self.update(params.data);
                });

                container.on('open', function() {

                    self.$selection.attr('aria-expanded', 'true');
                    self.$selection.attr('aria-owns', resultsId);

                    self._attachCloseHandler(container);
                });

                container.on('close', function() {

                    self.$selection.attr('aria-expanded', 'false');
                    self.$selection.removeAttr('aria-activedescendant');
                    self.$selection.removeAttr('aria-owns');

                    self.$selection.focus();
                    window.setTimeout(function() {
                        self.$selection.focus();
                    }, 0);

                    self._detachCloseHandler(container);
                });

                container.on('enable', function() {
                    self.$selection.attr('tabindex', self._tabindex);
                });

                container.on('disable', function() {
                    self.$selection.attr('tabindex', '-1');
                });
            };

            BaseSelection.prototype._handleBlur = function(evt) {
                var self = this;



                window.setTimeout(function() {

                    if (
                        (document.activeElement == self.$selection[0]) ||
                        ($.contains(self.$selection[0], document.activeElement))
                    ) {
                        return;
                    }

                    self.trigger('blur', evt);
                }, 1);
            };

            BaseSelection.prototype._attachCloseHandler = function(container) {
                var self = this;

                $(document.body).on('mousedown.select2.' + container.id, function(e) {
                    var $target = $(e.target);

                    var $select = $target.closest('.select2');

                    var $all = $('.select2.select2-container--open');

                    $all.each(function() {
                        var $this = $(this);

                        if (this == $select[0]) {
                            return;
                        }

                        var $element = Utils.GetData(this, 'element');

                        $element.select2('close');
                    });
                });
            };

            BaseSelection.prototype._detachCloseHandler = function(container) {
                $(document.body).off('mousedown.select2.' + container.id);
            };

            BaseSelection.prototype.position = function($selection, $container) {
                var $selectionContainer = $container.find('.selection');
                $selectionContainer.append($selection);
            };

            BaseSelection.prototype.destroy = function() {
                this._detachCloseHandler(this.container);
            };

            BaseSelection.prototype.update = function(data) {
                throw new Error('The `update` method must be defined in child classes.');
            };

            return BaseSelection;
        });

        S2.define('select2/selection/single', [
            'jquery',
            './base',
            '../utils',
            '../keys'
        ], function($, BaseSelection, Utils, KEYS) {
            function SingleSelection() {
                SingleSelection.__super__.constructor.apply(this, arguments);
            }

            Utils.Extend(SingleSelection, BaseSelection);

            SingleSelection.prototype.render = function() {
                var $selection = SingleSelection.__super__.render.call(this);

                $selection.addClass('select2-selection--single');

                $selection.html(
                    '<span class="select2-selection__rendered"></span>' +
                    '<span class="select2-selection__arrow" role="presentation">' +
                    '<b role="presentation"></b>' +
                    '</span>'
                );

                return $selection;
            };

            SingleSelection.prototype.bind = function(container, $container) {
                var self = this;

                SingleSelection.__super__.bind.apply(this, arguments);

                var id = container.id + '-container';

                this.$selection.find('.select2-selection__rendered')
                    .attr('id', id)
                    .attr('role', 'textbox')
                    .attr('aria-readonly', 'true');
                this.$selection.attr('aria-labelledby', id);

                this.$selection.on('mousedown', function(evt) {

                    if (evt.which !== 1) {
                        return;
                    }

                    self.trigger('toggle', {
                        originalEvent: evt
                    });
                });

                this.$selection.on('focus', function(evt) {

                });

                this.$selection.on('blur', function(evt) {

                });

                container.on('focus', function(evt) {
                    if (!container.isOpen()) {
                        self.$selection.focus();
                    }
                });
            };

            SingleSelection.prototype.clear = function() {
                var $rendered = this.$selection.find('.select2-selection__rendered');
                $rendered.empty();
                $rendered.removeAttr('title');
            };

            SingleSelection.prototype.display = function(data, container) {
                var template = this.options.get('templateSelection');
                var escapeMarkup = this.options.get('escapeMarkup');

                return escapeMarkup(template(data, container));
            };

            SingleSelection.prototype.selectionContainer = function() {
                return $('<span></span>');
            };

            SingleSelection.prototype.update = function(data) {
                if (data.length === 0) {
                    this.clear();
                    return;
                }

                var selection = data[0];

                var $rendered = this.$selection.find('.select2-selection__rendered');
                var formatted = this.display(selection, $rendered);

                $rendered.empty().append(formatted);
                $rendered.attr('title', selection.title || selection.text);
            };

            return SingleSelection;
        });

        S2.define('select2/selection/multiple', [
            'jquery',
            './base',
            '../utils'
        ], function($, BaseSelection, Utils) {
            function MultipleSelection($element, options) {
                MultipleSelection.__super__.constructor.apply(this, arguments);
            }

            Utils.Extend(MultipleSelection, BaseSelection);

            MultipleSelection.prototype.render = function() {
                var $selection = MultipleSelection.__super__.render.call(this);

                $selection.addClass('select2-selection--multiple');

                $selection.html(
                    '<ul class="select2-selection__rendered"></ul>'
                );

                return $selection;
            };

            MultipleSelection.prototype.bind = function(container, $container) {
                var self = this;

                MultipleSelection.__super__.bind.apply(this, arguments);

                this.$selection.on('click', function(evt) {
                    self.trigger('toggle', {
                        originalEvent: evt
                    });
                });

                this.$selection.on(
                    'click',
                    '.select2-selection__choice__remove',
                    function(evt) {

                        if (self.options.get('disabled')) {
                            return;
                        }

                        var $remove = $(this);
                        var $selection = $remove.parent();

                        var data = Utils.GetData($selection[0], 'data');

                        self.trigger('unselect', {
                            originalEvent: evt,
                            data: data
                        });
                    }
                );
            };

            MultipleSelection.prototype.clear = function() {
                var $rendered = this.$selection.find('.select2-selection__rendered');
                $rendered.empty();
                $rendered.removeAttr('title');
            };

            MultipleSelection.prototype.display = function(data, container) {
                var template = this.options.get('templateSelection');
                var escapeMarkup = this.options.get('escapeMarkup');

                return escapeMarkup(template(data, container));
            };

            MultipleSelection.prototype.selectionContainer = function() {
                var $container = $(
                    '<li class="select2-selection__choice">' +
                    '<span class="select2-selection__choice__remove" role="presentation">' +
                    '&times;' +
                    '</span>' +
                    '</li>'
                );

                return $container;
            };

            MultipleSelection.prototype.update = function(data) {
                this.clear();

                if (data.length === 0) {
                    return;
                }

                var $selections = [];

                for (var d = 0; d < data.length; d++) {
                    var selection = data[d];

                    var $selection = this.selectionContainer();
                    var formatted = this.display(selection, $selection);

                    $selection.append(formatted);
                    $selection.attr('title', selection.title || selection.text);

                    Utils.StoreData($selection[0], 'data', selection);

                    $selections.push($selection);
                }

                var $rendered = this.$selection.find('.select2-selection__rendered');

                Utils.appendMany($rendered, $selections);
            };

            return MultipleSelection;
        });

        S2.define('select2/selection/placeholder', [
            '../utils'
        ], function(Utils) {
            function Placeholder(decorated, $element, options) {
                this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

                decorated.call(this, $element, options);
            }

            Placeholder.prototype.normalizePlaceholder = function(_, placeholder) {
                if (typeof placeholder === 'string') {
                    placeholder = {
                        id: '',
                        text: placeholder
                    };
                }

                return placeholder;
            };

            Placeholder.prototype.createPlaceholder = function(decorated, placeholder) {
                var $placeholder = this.selectionContainer();

                $placeholder.html(this.display(placeholder));
                $placeholder.addClass('select2-selection__placeholder')
                    .removeClass('select2-selection__choice');

                return $placeholder;
            };

            Placeholder.prototype.update = function(decorated, data) {
                var singlePlaceholder = (
                    data.length == 1 && data[0].id != this.placeholder.id
                );
                var multipleSelections = data.length > 1;

                if (multipleSelections || singlePlaceholder) {
                    return decorated.call(this, data);
                }

                this.clear();

                var $placeholder = this.createPlaceholder(this.placeholder);

                this.$selection.find('.select2-selection__rendered').append($placeholder);
            };

            return Placeholder;
        });

        S2.define('select2/selection/allowClear', [
            'jquery',
            '../keys',
            '../utils'
        ], function($, KEYS, Utils) {
            function AllowClear() {}

            AllowClear.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                if (this.placeholder == null) {
                    if (this.options.get('debug') && window.console && console.error) {
                        console.error(
                            'Select2: The `allowClear` option should be used in combination ' +
                            'with the `placeholder` option.'
                        );
                    }
                }

                this.$selection.on('mousedown', '.select2-selection__clear',
                    function(evt) {
                        self._handleClear(evt);
                    });

                container.on('keypress', function(evt) {
                    self._handleKeyboardClear(evt, container);
                });
            };

            AllowClear.prototype._handleClear = function(_, evt) {

                if (this.options.get('disabled')) {
                    return;
                }

                var $clear = this.$selection.find('.select2-selection__clear');


                if ($clear.length === 0) {
                    return;
                }

                evt.stopPropagation();

                var data = Utils.GetData($clear[0], 'data');

                var previousVal = this.$element.val();
                this.$element.val(this.placeholder.id);

                var unselectData = {
                    data: data
                };
                this.trigger('clear', unselectData);
                if (unselectData.prevented) {
                    this.$element.val(previousVal);
                    return;
                }

                for (var d = 0; d < data.length; d++) {
                    unselectData = {
                        data: data[d]
                    };



                    this.trigger('unselect', unselectData);


                    if (unselectData.prevented) {
                        this.$element.val(previousVal);
                        return;
                    }
                }

                this.$element.trigger('change');

                this.trigger('toggle', {});
            };

            AllowClear.prototype._handleKeyboardClear = function(_, evt, container) {
                if (container.isOpen()) {
                    return;
                }

                if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
                    this._handleClear(evt);
                }
            };

            AllowClear.prototype.update = function(decorated, data) {
                decorated.call(this, data);

                if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
                    data.length === 0) {
                    return;
                }

                var $remove = $(
                    '<span class="select2-selection__clear">' +
                    '&times;' +
                    '</span>'
                );
                Utils.StoreData($remove[0], 'data', data);

                this.$selection.find('.select2-selection__rendered').prepend($remove);
            };

            return AllowClear;
        });

        S2.define('select2/selection/search', [
            'jquery',
            '../utils',
            '../keys'
        ], function($, Utils, KEYS) {
            function Search(decorated, $element, options) {
                decorated.call(this, $element, options);
            }

            Search.prototype.render = function(decorated) {
                var $search = $(
                    '<li class="select2-search select2-search--inline">' +
                    '<input class="select2-search__field" type="search" tabindex="-1"' +
                    ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                    ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
                    '</li>'
                );

                this.$searchContainer = $search;
                this.$search = $search.find('input');

                var $rendered = decorated.call(this);

                this._transferTabIndex();

                return $rendered;
            };

            Search.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                container.on('open', function() {
                    self.$search.trigger('focus');
                });

                container.on('close', function() {
                    self.$search.val('');
                    self.$search.removeAttr('aria-activedescendant');
                    self.$search.trigger('focus');
                });

                container.on('enable', function() {
                    self.$search.prop('disabled', false);

                    self._transferTabIndex();
                });

                container.on('disable', function() {
                    self.$search.prop('disabled', true);
                });

                container.on('focus', function(evt) {
                    self.$search.trigger('focus');
                });

                container.on('results:focus', function(params) {
                    self.$search.attr('aria-activedescendant', params.id);
                });

                this.$selection.on('focusin', '.select2-search--inline', function(evt) {
                    self.trigger('focus', evt);
                });

                this.$selection.on('focusout', '.select2-search--inline', function(evt) {
                    self._handleBlur(evt);
                });

                this.$selection.on('keydown', '.select2-search--inline', function(evt) {
                    evt.stopPropagation();

                    self.trigger('keypress', evt);

                    self._keyUpPrevented = evt.isDefaultPrevented();

                    var key = evt.which;

                    if (key === KEYS.BACKSPACE && self.$search.val() === '') {
                        var $previousChoice = self.$searchContainer
                            .prev('.select2-selection__choice');

                        if ($previousChoice.length > 0) {
                            var item = Utils.GetData($previousChoice[0], 'data');

                            self.searchRemoveChoice(item);

                            evt.preventDefault();
                        }
                    }
                });






                var msie = document.documentMode;
                var disableInputEvents = msie && msie <= 11;




                this.$selection.on(
                    'input.searchcheck',
                    '.select2-search--inline',
                    function(evt) {



                        if (disableInputEvents) {
                            self.$selection.off('input.search input.searchcheck');
                            return;
                        }


                        self.$selection.off('keyup.search');
                    }
                );

                this.$selection.on(
                    'keyup.search input.search',
                    '.select2-search--inline',
                    function(evt) {



                        if (disableInputEvents && evt.type === 'input') {
                            self.$selection.off('input.search input.searchcheck');
                            return;
                        }

                        var key = evt.which;


                        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                            return;
                        }


                        if (key == KEYS.TAB) {
                            return;
                        }

                        self.handleSearch(evt);
                    }
                );
            };








            Search.prototype._transferTabIndex = function(decorated) {
                this.$search.attr('tabindex', this.$selection.attr('tabindex'));
                this.$selection.attr('tabindex', '-1');
            };

            Search.prototype.createPlaceholder = function(decorated, placeholder) {
                this.$search.attr('placeholder', placeholder.text);
            };

            Search.prototype.update = function(decorated, data) {
                var searchHadFocus = this.$search[0] == document.activeElement;

                this.$search.attr('placeholder', '');

                decorated.call(this, data);

                this.$selection.find('.select2-selection__rendered')
                    .append(this.$searchContainer);

                this.resizeSearch();
                if (searchHadFocus) {
                    var isTagInput = this.$element.find('[data-select2-tag]').length;
                    if (isTagInput) {

                        this.$element.focus();
                    } else {
                        this.$search.focus();
                    }
                }
            };

            Search.prototype.handleSearch = function() {
                this.resizeSearch();

                if (!this._keyUpPrevented) {
                    var input = this.$search.val();

                    this.trigger('query', {
                        term: input
                    });
                }

                this._keyUpPrevented = false;
            };

            Search.prototype.searchRemoveChoice = function(decorated, item) {
                this.trigger('unselect', {
                    data: item
                });

                this.$search.val(item.text);
                this.handleSearch();
            };

            Search.prototype.resizeSearch = function() {
                this.$search.css('width', '25px');

                var width = '';

                if (this.$search.attr('placeholder') !== '') {
                    width = this.$selection.find('.select2-selection__rendered').innerWidth();
                } else {
                    var minimumWidth = this.$search.val().length + 1;

                    width = (minimumWidth * 0.75) + 'em';
                }

                this.$search.css('width', width);
            };

            return Search;
        });

        S2.define('select2/selection/eventRelay', [
            'jquery'
        ], function($) {
            function EventRelay() {}

            EventRelay.prototype.bind = function(decorated, container, $container) {
                var self = this;
                var relayEvents = [
                    'open', 'opening',
                    'close', 'closing',
                    'select', 'selecting',
                    'unselect', 'unselecting',
                    'clear', 'clearing'
                ];

                var preventableEvents = [
                    'opening', 'closing', 'selecting', 'unselecting', 'clearing'
                ];

                decorated.call(this, container, $container);

                container.on('*', function(name, params) {

                    if ($.inArray(name, relayEvents) === -1) {
                        return;
                    }


                    params = params || {};


                    var evt = $.Event('select2:' + name, {
                        params: params
                    });

                    self.$element.trigger(evt);


                    if ($.inArray(name, preventableEvents) === -1) {
                        return;
                    }

                    params.prevented = evt.isDefaultPrevented();
                });
            };

            return EventRelay;
        });

        S2.define('select2/translation', [
            'jquery',
            'require'
        ], function($, require) {
            function Translation(dict) {
                this.dict = dict || {};
            }

            Translation.prototype.all = function() {
                return this.dict;
            };

            Translation.prototype.get = function(key) {
                return this.dict[key];
            };

            Translation.prototype.extend = function(translation) {
                this.dict = $.extend({}, translation.all(), this.dict);
            };



            Translation._cache = {};

            Translation.loadPath = function(path) {
                if (!(path in Translation._cache)) {
                    var translations = require(path);

                    Translation._cache[path] = translations;
                }

                return new Translation(Translation._cache[path]);
            };

            return Translation;
        });

        S2.define('select2/diacritics', [

        ], function() {
            var diacritics = {
                '\u24B6': 'A',
                '\uFF21': 'A',
                '\u00C0': 'A',
                '\u00C1': 'A',
                '\u00C2': 'A',
                '\u1EA6': 'A',
                '\u1EA4': 'A',
                '\u1EAA': 'A',
                '\u1EA8': 'A',
                '\u00C3': 'A',
                '\u0100': 'A',
                '\u0102': 'A',
                '\u1EB0': 'A',
                '\u1EAE': 'A',
                '\u1EB4': 'A',
                '\u1EB2': 'A',
                '\u0226': 'A',
                '\u01E0': 'A',
                '\u00C4': 'A',
                '\u01DE': 'A',
                '\u1EA2': 'A',
                '\u00C5': 'A',
                '\u01FA': 'A',
                '\u01CD': 'A',
                '\u0200': 'A',
                '\u0202': 'A',
                '\u1EA0': 'A',
                '\u1EAC': 'A',
                '\u1EB6': 'A',
                '\u1E00': 'A',
                '\u0104': 'A',
                '\u023A': 'A',
                '\u2C6F': 'A',
                '\uA732': 'AA',
                '\u00C6': 'AE',
                '\u01FC': 'AE',
                '\u01E2': 'AE',
                '\uA734': 'AO',
                '\uA736': 'AU',
                '\uA738': 'AV',
                '\uA73A': 'AV',
                '\uA73C': 'AY',
                '\u24B7': 'B',
                '\uFF22': 'B',
                '\u1E02': 'B',
                '\u1E04': 'B',
                '\u1E06': 'B',
                '\u0243': 'B',
                '\u0182': 'B',
                '\u0181': 'B',
                '\u24B8': 'C',
                '\uFF23': 'C',
                '\u0106': 'C',
                '\u0108': 'C',
                '\u010A': 'C',
                '\u010C': 'C',
                '\u00C7': 'C',
                '\u1E08': 'C',
                '\u0187': 'C',
                '\u023B': 'C',
                '\uA73E': 'C',
                '\u24B9': 'D',
                '\uFF24': 'D',
                '\u1E0A': 'D',
                '\u010E': 'D',
                '\u1E0C': 'D',
                '\u1E10': 'D',
                '\u1E12': 'D',
                '\u1E0E': 'D',
                '\u0110': 'D',
                '\u018B': 'D',
                '\u018A': 'D',
                '\u0189': 'D',
                '\uA779': 'D',
                '\u01F1': 'DZ',
                '\u01C4': 'DZ',
                '\u01F2': 'Dz',
                '\u01C5': 'Dz',
                '\u24BA': 'E',
                '\uFF25': 'E',
                '\u00C8': 'E',
                '\u00C9': 'E',
                '\u00CA': 'E',
                '\u1EC0': 'E',
                '\u1EBE': 'E',
                '\u1EC4': 'E',
                '\u1EC2': 'E',
                '\u1EBC': 'E',
                '\u0112': 'E',
                '\u1E14': 'E',
                '\u1E16': 'E',
                '\u0114': 'E',
                '\u0116': 'E',
                '\u00CB': 'E',
                '\u1EBA': 'E',
                '\u011A': 'E',
                '\u0204': 'E',
                '\u0206': 'E',
                '\u1EB8': 'E',
                '\u1EC6': 'E',
                '\u0228': 'E',
                '\u1E1C': 'E',
                '\u0118': 'E',
                '\u1E18': 'E',
                '\u1E1A': 'E',
                '\u0190': 'E',
                '\u018E': 'E',
                '\u24BB': 'F',
                '\uFF26': 'F',
                '\u1E1E': 'F',
                '\u0191': 'F',
                '\uA77B': 'F',
                '\u24BC': 'G',
                '\uFF27': 'G',
                '\u01F4': 'G',
                '\u011C': 'G',
                '\u1E20': 'G',
                '\u011E': 'G',
                '\u0120': 'G',
                '\u01E6': 'G',
                '\u0122': 'G',
                '\u01E4': 'G',
                '\u0193': 'G',
                '\uA7A0': 'G',
                '\uA77D': 'G',
                '\uA77E': 'G',
                '\u24BD': 'H',
                '\uFF28': 'H',
                '\u0124': 'H',
                '\u1E22': 'H',
                '\u1E26': 'H',
                '\u021E': 'H',
                '\u1E24': 'H',
                '\u1E28': 'H',
                '\u1E2A': 'H',
                '\u0126': 'H',
                '\u2C67': 'H',
                '\u2C75': 'H',
                '\uA78D': 'H',
                '\u24BE': 'I',
                '\uFF29': 'I',
                '\u00CC': 'I',
                '\u00CD': 'I',
                '\u00CE': 'I',
                '\u0128': 'I',
                '\u012A': 'I',
                '\u012C': 'I',
                '\u0130': 'I',
                '\u00CF': 'I',
                '\u1E2E': 'I',
                '\u1EC8': 'I',
                '\u01CF': 'I',
                '\u0208': 'I',
                '\u020A': 'I',
                '\u1ECA': 'I',
                '\u012E': 'I',
                '\u1E2C': 'I',
                '\u0197': 'I',
                '\u24BF': 'J',
                '\uFF2A': 'J',
                '\u0134': 'J',
                '\u0248': 'J',
                '\u24C0': 'K',
                '\uFF2B': 'K',
                '\u1E30': 'K',
                '\u01E8': 'K',
                '\u1E32': 'K',
                '\u0136': 'K',
                '\u1E34': 'K',
                '\u0198': 'K',
                '\u2C69': 'K',
                '\uA740': 'K',
                '\uA742': 'K',
                '\uA744': 'K',
                '\uA7A2': 'K',
                '\u24C1': 'L',
                '\uFF2C': 'L',
                '\u013F': 'L',
                '\u0139': 'L',
                '\u013D': 'L',
                '\u1E36': 'L',
                '\u1E38': 'L',
                '\u013B': 'L',
                '\u1E3C': 'L',
                '\u1E3A': 'L',
                '\u0141': 'L',
                '\u023D': 'L',
                '\u2C62': 'L',
                '\u2C60': 'L',
                '\uA748': 'L',
                '\uA746': 'L',
                '\uA780': 'L',
                '\u01C7': 'LJ',
                '\u01C8': 'Lj',
                '\u24C2': 'M',
                '\uFF2D': 'M',
                '\u1E3E': 'M',
                '\u1E40': 'M',
                '\u1E42': 'M',
                '\u2C6E': 'M',
                '\u019C': 'M',
                '\u24C3': 'N',
                '\uFF2E': 'N',
                '\u01F8': 'N',
                '\u0143': 'N',
                '\u00D1': 'N',
                '\u1E44': 'N',
                '\u0147': 'N',
                '\u1E46': 'N',
                '\u0145': 'N',
                '\u1E4A': 'N',
                '\u1E48': 'N',
                '\u0220': 'N',
                '\u019D': 'N',
                '\uA790': 'N',
                '\uA7A4': 'N',
                '\u01CA': 'NJ',
                '\u01CB': 'Nj',
                '\u24C4': 'O',
                '\uFF2F': 'O',
                '\u00D2': 'O',
                '\u00D3': 'O',
                '\u00D4': 'O',
                '\u1ED2': 'O',
                '\u1ED0': 'O',
                '\u1ED6': 'O',
                '\u1ED4': 'O',
                '\u00D5': 'O',
                '\u1E4C': 'O',
                '\u022C': 'O',
                '\u1E4E': 'O',
                '\u014C': 'O',
                '\u1E50': 'O',
                '\u1E52': 'O',
                '\u014E': 'O',
                '\u022E': 'O',
                '\u0230': 'O',
                '\u00D6': 'O',
                '\u022A': 'O',
                '\u1ECE': 'O',
                '\u0150': 'O',
                '\u01D1': 'O',
                '\u020C': 'O',
                '\u020E': 'O',
                '\u01A0': 'O',
                '\u1EDC': 'O',
                '\u1EDA': 'O',
                '\u1EE0': 'O',
                '\u1EDE': 'O',
                '\u1EE2': 'O',
                '\u1ECC': 'O',
                '\u1ED8': 'O',
                '\u01EA': 'O',
                '\u01EC': 'O',
                '\u00D8': 'O',
                '\u01FE': 'O',
                '\u0186': 'O',
                '\u019F': 'O',
                '\uA74A': 'O',
                '\uA74C': 'O',
                '\u01A2': 'OI',
                '\uA74E': 'OO',
                '\u0222': 'OU',
                '\u24C5': 'P',
                '\uFF30': 'P',
                '\u1E54': 'P',
                '\u1E56': 'P',
                '\u01A4': 'P',
                '\u2C63': 'P',
                '\uA750': 'P',
                '\uA752': 'P',
                '\uA754': 'P',
                '\u24C6': 'Q',
                '\uFF31': 'Q',
                '\uA756': 'Q',
                '\uA758': 'Q',
                '\u024A': 'Q',
                '\u24C7': 'R',
                '\uFF32': 'R',
                '\u0154': 'R',
                '\u1E58': 'R',
                '\u0158': 'R',
                '\u0210': 'R',
                '\u0212': 'R',
                '\u1E5A': 'R',
                '\u1E5C': 'R',
                '\u0156': 'R',
                '\u1E5E': 'R',
                '\u024C': 'R',
                '\u2C64': 'R',
                '\uA75A': 'R',
                '\uA7A6': 'R',
                '\uA782': 'R',
                '\u24C8': 'S',
                '\uFF33': 'S',
                '\u1E9E': 'S',
                '\u015A': 'S',
                '\u1E64': 'S',
                '\u015C': 'S',
                '\u1E60': 'S',
                '\u0160': 'S',
                '\u1E66': 'S',
                '\u1E62': 'S',
                '\u1E68': 'S',
                '\u0218': 'S',
                '\u015E': 'S',
                '\u2C7E': 'S',
                '\uA7A8': 'S',
                '\uA784': 'S',
                '\u24C9': 'T',
                '\uFF34': 'T',
                '\u1E6A': 'T',
                '\u0164': 'T',
                '\u1E6C': 'T',
                '\u021A': 'T',
                '\u0162': 'T',
                '\u1E70': 'T',
                '\u1E6E': 'T',
                '\u0166': 'T',
                '\u01AC': 'T',
                '\u01AE': 'T',
                '\u023E': 'T',
                '\uA786': 'T',
                '\uA728': 'TZ',
                '\u24CA': 'U',
                '\uFF35': 'U',
                '\u00D9': 'U',
                '\u00DA': 'U',
                '\u00DB': 'U',
                '\u0168': 'U',
                '\u1E78': 'U',
                '\u016A': 'U',
                '\u1E7A': 'U',
                '\u016C': 'U',
                '\u00DC': 'U',
                '\u01DB': 'U',
                '\u01D7': 'U',
                '\u01D5': 'U',
                '\u01D9': 'U',
                '\u1EE6': 'U',
                '\u016E': 'U',
                '\u0170': 'U',
                '\u01D3': 'U',
                '\u0214': 'U',
                '\u0216': 'U',
                '\u01AF': 'U',
                '\u1EEA': 'U',
                '\u1EE8': 'U',
                '\u1EEE': 'U',
                '\u1EEC': 'U',
                '\u1EF0': 'U',
                '\u1EE4': 'U',
                '\u1E72': 'U',
                '\u0172': 'U',
                '\u1E76': 'U',
                '\u1E74': 'U',
                '\u0244': 'U',
                '\u24CB': 'V',
                '\uFF36': 'V',
                '\u1E7C': 'V',
                '\u1E7E': 'V',
                '\u01B2': 'V',
                '\uA75E': 'V',
                '\u0245': 'V',
                '\uA760': 'VY',
                '\u24CC': 'W',
                '\uFF37': 'W',
                '\u1E80': 'W',
                '\u1E82': 'W',
                '\u0174': 'W',
                '\u1E86': 'W',
                '\u1E84': 'W',
                '\u1E88': 'W',
                '\u2C72': 'W',
                '\u24CD': 'X',
                '\uFF38': 'X',
                '\u1E8A': 'X',
                '\u1E8C': 'X',
                '\u24CE': 'Y',
                '\uFF39': 'Y',
                '\u1EF2': 'Y',
                '\u00DD': 'Y',
                '\u0176': 'Y',
                '\u1EF8': 'Y',
                '\u0232': 'Y',
                '\u1E8E': 'Y',
                '\u0178': 'Y',
                '\u1EF6': 'Y',
                '\u1EF4': 'Y',
                '\u01B3': 'Y',
                '\u024E': 'Y',
                '\u1EFE': 'Y',
                '\u24CF': 'Z',
                '\uFF3A': 'Z',
                '\u0179': 'Z',
                '\u1E90': 'Z',
                '\u017B': 'Z',
                '\u017D': 'Z',
                '\u1E92': 'Z',
                '\u1E94': 'Z',
                '\u01B5': 'Z',
                '\u0224': 'Z',
                '\u2C7F': 'Z',
                '\u2C6B': 'Z',
                '\uA762': 'Z',
                '\u24D0': 'a',
                '\uFF41': 'a',
                '\u1E9A': 'a',
                '\u00E0': 'a',
                '\u00E1': 'a',
                '\u00E2': 'a',
                '\u1EA7': 'a',
                '\u1EA5': 'a',
                '\u1EAB': 'a',
                '\u1EA9': 'a',
                '\u00E3': 'a',
                '\u0101': 'a',
                '\u0103': 'a',
                '\u1EB1': 'a',
                '\u1EAF': 'a',
                '\u1EB5': 'a',
                '\u1EB3': 'a',
                '\u0227': 'a',
                '\u01E1': 'a',
                '\u00E4': 'a',
                '\u01DF': 'a',
                '\u1EA3': 'a',
                '\u00E5': 'a',
                '\u01FB': 'a',
                '\u01CE': 'a',
                '\u0201': 'a',
                '\u0203': 'a',
                '\u1EA1': 'a',
                '\u1EAD': 'a',
                '\u1EB7': 'a',
                '\u1E01': 'a',
                '\u0105': 'a',
                '\u2C65': 'a',
                '\u0250': 'a',
                '\uA733': 'aa',
                '\u00E6': 'ae',
                '\u01FD': 'ae',
                '\u01E3': 'ae',
                '\uA735': 'ao',
                '\uA737': 'au',
                '\uA739': 'av',
                '\uA73B': 'av',
                '\uA73D': 'ay',
                '\u24D1': 'b',
                '\uFF42': 'b',
                '\u1E03': 'b',
                '\u1E05': 'b',
                '\u1E07': 'b',
                '\u0180': 'b',
                '\u0183': 'b',
                '\u0253': 'b',
                '\u24D2': 'c',
                '\uFF43': 'c',
                '\u0107': 'c',
                '\u0109': 'c',
                '\u010B': 'c',
                '\u010D': 'c',
                '\u00E7': 'c',
                '\u1E09': 'c',
                '\u0188': 'c',
                '\u023C': 'c',
                '\uA73F': 'c',
                '\u2184': 'c',
                '\u24D3': 'd',
                '\uFF44': 'd',
                '\u1E0B': 'd',
                '\u010F': 'd',
                '\u1E0D': 'd',
                '\u1E11': 'd',
                '\u1E13': 'd',
                '\u1E0F': 'd',
                '\u0111': 'd',
                '\u018C': 'd',
                '\u0256': 'd',
                '\u0257': 'd',
                '\uA77A': 'd',
                '\u01F3': 'dz',
                '\u01C6': 'dz',
                '\u24D4': 'e',
                '\uFF45': 'e',
                '\u00E8': 'e',
                '\u00E9': 'e',
                '\u00EA': 'e',
                '\u1EC1': 'e',
                '\u1EBF': 'e',
                '\u1EC5': 'e',
                '\u1EC3': 'e',
                '\u1EBD': 'e',
                '\u0113': 'e',
                '\u1E15': 'e',
                '\u1E17': 'e',
                '\u0115': 'e',
                '\u0117': 'e',
                '\u00EB': 'e',
                '\u1EBB': 'e',
                '\u011B': 'e',
                '\u0205': 'e',
                '\u0207': 'e',
                '\u1EB9': 'e',
                '\u1EC7': 'e',
                '\u0229': 'e',
                '\u1E1D': 'e',
                '\u0119': 'e',
                '\u1E19': 'e',
                '\u1E1B': 'e',
                '\u0247': 'e',
                '\u025B': 'e',
                '\u01DD': 'e',
                '\u24D5': 'f',
                '\uFF46': 'f',
                '\u1E1F': 'f',
                '\u0192': 'f',
                '\uA77C': 'f',
                '\u24D6': 'g',
                '\uFF47': 'g',
                '\u01F5': 'g',
                '\u011D': 'g',
                '\u1E21': 'g',
                '\u011F': 'g',
                '\u0121': 'g',
                '\u01E7': 'g',
                '\u0123': 'g',
                '\u01E5': 'g',
                '\u0260': 'g',
                '\uA7A1': 'g',
                '\u1D79': 'g',
                '\uA77F': 'g',
                '\u24D7': 'h',
                '\uFF48': 'h',
                '\u0125': 'h',
                '\u1E23': 'h',
                '\u1E27': 'h',
                '\u021F': 'h',
                '\u1E25': 'h',
                '\u1E29': 'h',
                '\u1E2B': 'h',
                '\u1E96': 'h',
                '\u0127': 'h',
                '\u2C68': 'h',
                '\u2C76': 'h',
                '\u0265': 'h',
                '\u0195': 'hv',
                '\u24D8': 'i',
                '\uFF49': 'i',
                '\u00EC': 'i',
                '\u00ED': 'i',
                '\u00EE': 'i',
                '\u0129': 'i',
                '\u012B': 'i',
                '\u012D': 'i',
                '\u00EF': 'i',
                '\u1E2F': 'i',
                '\u1EC9': 'i',
                '\u01D0': 'i',
                '\u0209': 'i',
                '\u020B': 'i',
                '\u1ECB': 'i',
                '\u012F': 'i',
                '\u1E2D': 'i',
                '\u0268': 'i',
                '\u0131': 'i',
                '\u24D9': 'j',
                '\uFF4A': 'j',
                '\u0135': 'j',
                '\u01F0': 'j',
                '\u0249': 'j',
                '\u24DA': 'k',
                '\uFF4B': 'k',
                '\u1E31': 'k',
                '\u01E9': 'k',
                '\u1E33': 'k',
                '\u0137': 'k',
                '\u1E35': 'k',
                '\u0199': 'k',
                '\u2C6A': 'k',
                '\uA741': 'k',
                '\uA743': 'k',
                '\uA745': 'k',
                '\uA7A3': 'k',
                '\u24DB': 'l',
                '\uFF4C': 'l',
                '\u0140': 'l',
                '\u013A': 'l',
                '\u013E': 'l',
                '\u1E37': 'l',
                '\u1E39': 'l',
                '\u013C': 'l',
                '\u1E3D': 'l',
                '\u1E3B': 'l',
                '\u017F': 'l',
                '\u0142': 'l',
                '\u019A': 'l',
                '\u026B': 'l',
                '\u2C61': 'l',
                '\uA749': 'l',
                '\uA781': 'l',
                '\uA747': 'l',
                '\u01C9': 'lj',
                '\u24DC': 'm',
                '\uFF4D': 'm',
                '\u1E3F': 'm',
                '\u1E41': 'm',
                '\u1E43': 'm',
                '\u0271': 'm',
                '\u026F': 'm',
                '\u24DD': 'n',
                '\uFF4E': 'n',
                '\u01F9': 'n',
                '\u0144': 'n',
                '\u00F1': 'n',
                '\u1E45': 'n',
                '\u0148': 'n',
                '\u1E47': 'n',
                '\u0146': 'n',
                '\u1E4B': 'n',
                '\u1E49': 'n',
                '\u019E': 'n',
                '\u0272': 'n',
                '\u0149': 'n',
                '\uA791': 'n',
                '\uA7A5': 'n',
                '\u01CC': 'nj',
                '\u24DE': 'o',
                '\uFF4F': 'o',
                '\u00F2': 'o',
                '\u00F3': 'o',
                '\u00F4': 'o',
                '\u1ED3': 'o',
                '\u1ED1': 'o',
                '\u1ED7': 'o',
                '\u1ED5': 'o',
                '\u00F5': 'o',
                '\u1E4D': 'o',
                '\u022D': 'o',
                '\u1E4F': 'o',
                '\u014D': 'o',
                '\u1E51': 'o',
                '\u1E53': 'o',
                '\u014F': 'o',
                '\u022F': 'o',
                '\u0231': 'o',
                '\u00F6': 'o',
                '\u022B': 'o',
                '\u1ECF': 'o',
                '\u0151': 'o',
                '\u01D2': 'o',
                '\u020D': 'o',
                '\u020F': 'o',
                '\u01A1': 'o',
                '\u1EDD': 'o',
                '\u1EDB': 'o',
                '\u1EE1': 'o',
                '\u1EDF': 'o',
                '\u1EE3': 'o',
                '\u1ECD': 'o',
                '\u1ED9': 'o',
                '\u01EB': 'o',
                '\u01ED': 'o',
                '\u00F8': 'o',
                '\u01FF': 'o',
                '\u0254': 'o',
                '\uA74B': 'o',
                '\uA74D': 'o',
                '\u0275': 'o',
                '\u01A3': 'oi',
                '\u0223': 'ou',
                '\uA74F': 'oo',
                '\u24DF': 'p',
                '\uFF50': 'p',
                '\u1E55': 'p',
                '\u1E57': 'p',
                '\u01A5': 'p',
                '\u1D7D': 'p',
                '\uA751': 'p',
                '\uA753': 'p',
                '\uA755': 'p',
                '\u24E0': 'q',
                '\uFF51': 'q',
                '\u024B': 'q',
                '\uA757': 'q',
                '\uA759': 'q',
                '\u24E1': 'r',
                '\uFF52': 'r',
                '\u0155': 'r',
                '\u1E59': 'r',
                '\u0159': 'r',
                '\u0211': 'r',
                '\u0213': 'r',
                '\u1E5B': 'r',
                '\u1E5D': 'r',
                '\u0157': 'r',
                '\u1E5F': 'r',
                '\u024D': 'r',
                '\u027D': 'r',
                '\uA75B': 'r',
                '\uA7A7': 'r',
                '\uA783': 'r',
                '\u24E2': 's',
                '\uFF53': 's',
                '\u00DF': 's',
                '\u015B': 's',
                '\u1E65': 's',
                '\u015D': 's',
                '\u1E61': 's',
                '\u0161': 's',
                '\u1E67': 's',
                '\u1E63': 's',
                '\u1E69': 's',
                '\u0219': 's',
                '\u015F': 's',
                '\u023F': 's',
                '\uA7A9': 's',
                '\uA785': 's',
                '\u1E9B': 's',
                '\u24E3': 't',
                '\uFF54': 't',
                '\u1E6B': 't',
                '\u1E97': 't',
                '\u0165': 't',
                '\u1E6D': 't',
                '\u021B': 't',
                '\u0163': 't',
                '\u1E71': 't',
                '\u1E6F': 't',
                '\u0167': 't',
                '\u01AD': 't',
                '\u0288': 't',
                '\u2C66': 't',
                '\uA787': 't',
                '\uA729': 'tz',
                '\u24E4': 'u',
                '\uFF55': 'u',
                '\u00F9': 'u',
                '\u00FA': 'u',
                '\u00FB': 'u',
                '\u0169': 'u',
                '\u1E79': 'u',
                '\u016B': 'u',
                '\u1E7B': 'u',
                '\u016D': 'u',
                '\u00FC': 'u',
                '\u01DC': 'u',
                '\u01D8': 'u',
                '\u01D6': 'u',
                '\u01DA': 'u',
                '\u1EE7': 'u',
                '\u016F': 'u',
                '\u0171': 'u',
                '\u01D4': 'u',
                '\u0215': 'u',
                '\u0217': 'u',
                '\u01B0': 'u',
                '\u1EEB': 'u',
                '\u1EE9': 'u',
                '\u1EEF': 'u',
                '\u1EED': 'u',
                '\u1EF1': 'u',
                '\u1EE5': 'u',
                '\u1E73': 'u',
                '\u0173': 'u',
                '\u1E77': 'u',
                '\u1E75': 'u',
                '\u0289': 'u',
                '\u24E5': 'v',
                '\uFF56': 'v',
                '\u1E7D': 'v',
                '\u1E7F': 'v',
                '\u028B': 'v',
                '\uA75F': 'v',
                '\u028C': 'v',
                '\uA761': 'vy',
                '\u24E6': 'w',
                '\uFF57': 'w',
                '\u1E81': 'w',
                '\u1E83': 'w',
                '\u0175': 'w',
                '\u1E87': 'w',
                '\u1E85': 'w',
                '\u1E98': 'w',
                '\u1E89': 'w',
                '\u2C73': 'w',
                '\u24E7': 'x',
                '\uFF58': 'x',
                '\u1E8B': 'x',
                '\u1E8D': 'x',
                '\u24E8': 'y',
                '\uFF59': 'y',
                '\u1EF3': 'y',
                '\u00FD': 'y',
                '\u0177': 'y',
                '\u1EF9': 'y',
                '\u0233': 'y',
                '\u1E8F': 'y',
                '\u00FF': 'y',
                '\u1EF7': 'y',
                '\u1E99': 'y',
                '\u1EF5': 'y',
                '\u01B4': 'y',
                '\u024F': 'y',
                '\u1EFF': 'y',
                '\u24E9': 'z',
                '\uFF5A': 'z',
                '\u017A': 'z',
                '\u1E91': 'z',
                '\u017C': 'z',
                '\u017E': 'z',
                '\u1E93': 'z',
                '\u1E95': 'z',
                '\u01B6': 'z',
                '\u0225': 'z',
                '\u0240': 'z',
                '\u2C6C': 'z',
                '\uA763': 'z',
                '\u0386': '\u0391',
                '\u0388': '\u0395',
                '\u0389': '\u0397',
                '\u038A': '\u0399',
                '\u03AA': '\u0399',
                '\u038C': '\u039F',
                '\u038E': '\u03A5',
                '\u03AB': '\u03A5',
                '\u038F': '\u03A9',
                '\u03AC': '\u03B1',
                '\u03AD': '\u03B5',
                '\u03AE': '\u03B7',
                '\u03AF': '\u03B9',
                '\u03CA': '\u03B9',
                '\u0390': '\u03B9',
                '\u03CC': '\u03BF',
                '\u03CD': '\u03C5',
                '\u03CB': '\u03C5',
                '\u03B0': '\u03C5',
                '\u03C9': '\u03C9',
                '\u03C2': '\u03C3'
            };

            return diacritics;
        });

        S2.define('select2/data/base', [
            '../utils'
        ], function(Utils) {
            function BaseAdapter($element, options) {
                BaseAdapter.__super__.constructor.call(this);
            }

            Utils.Extend(BaseAdapter, Utils.Observable);

            BaseAdapter.prototype.current = function(callback) {
                throw new Error('The `current` method must be defined in child classes.');
            };

            BaseAdapter.prototype.query = function(params, callback) {
                throw new Error('The `query` method must be defined in child classes.');
            };

            BaseAdapter.prototype.bind = function(container, $container) {

            };

            BaseAdapter.prototype.destroy = function() {

            };

            BaseAdapter.prototype.generateResultId = function(container, data) {
                var id = container.id + '-result-';

                id += Utils.generateChars(4);

                if (data.id != null) {
                    id += '-' + data.id.toString();
                } else {
                    id += '-' + Utils.generateChars(4);
                }
                return id;
            };

            return BaseAdapter;
        });

        S2.define('select2/data/select', [
            './base',
            '../utils',
            'jquery'
        ], function(BaseAdapter, Utils, $) {
            function SelectAdapter($element, options) {
                this.$element = $element;
                this.options = options;

                SelectAdapter.__super__.constructor.call(this);
            }

            Utils.Extend(SelectAdapter, BaseAdapter);

            SelectAdapter.prototype.current = function(callback) {
                var data = [];
                var self = this;

                this.$element.find(':selected').each(function() {
                    var $option = $(this);

                    var option = self.item($option);

                    data.push(option);
                });

                callback(data);
            };

            SelectAdapter.prototype.select = function(data) {
                var self = this;

                data.selected = true;


                if ($(data.element).is('option')) {
                    data.element.selected = true;

                    this.$element.trigger('change');

                    return;
                }

                if (this.$element.prop('multiple')) {
                    this.current(function(currentData) {
                        var val = [];

                        data = [data];
                        data.push.apply(data, currentData);

                        for (var d = 0; d < data.length; d++) {
                            var id = data[d].id;

                            if ($.inArray(id, val) === -1) {
                                val.push(id);
                            }
                        }

                        self.$element.val(val);
                        self.$element.trigger('change');
                    });
                } else {
                    var val = data.id;

                    this.$element.val(val);
                    this.$element.trigger('change');
                }
            };

            SelectAdapter.prototype.unselect = function(data) {
                var self = this;

                if (!this.$element.prop('multiple')) {
                    return;
                }

                data.selected = false;

                if ($(data.element).is('option')) {
                    data.element.selected = false;

                    this.$element.trigger('change');

                    return;
                }

                this.current(function(currentData) {
                    var val = [];

                    for (var d = 0; d < currentData.length; d++) {
                        var id = currentData[d].id;

                        if (id !== data.id && $.inArray(id, val) === -1) {
                            val.push(id);
                        }
                    }

                    self.$element.val(val);

                    self.$element.trigger('change');
                });
            };

            SelectAdapter.prototype.bind = function(container, $container) {
                var self = this;

                this.container = container;

                container.on('select', function(params) {
                    self.select(params.data);
                });

                container.on('unselect', function(params) {
                    self.unselect(params.data);
                });
            };

            SelectAdapter.prototype.destroy = function() {

                this.$element.find('*').each(function() {

                    Utils.RemoveData(this);
                });
            };

            SelectAdapter.prototype.query = function(params, callback) {
                var data = [];
                var self = this;

                var $options = this.$element.children();

                $options.each(function() {
                    var $option = $(this);

                    if (!$option.is('option') && !$option.is('optgroup')) {
                        return;
                    }

                    var option = self.item($option);

                    var matches = self.matches(params, option);

                    if (matches !== null) {
                        data.push(matches);
                    }
                });

                callback({
                    results: data
                });
            };

            SelectAdapter.prototype.addOptions = function($options) {
                Utils.appendMany(this.$element, $options);
            };

            SelectAdapter.prototype.option = function(data) {
                var option;

                if (data.children) {
                    option = document.createElement('optgroup');
                    option.label = data.text;
                } else {
                    option = document.createElement('option');

                    if (option.textContent !== undefined) {
                        option.textContent = data.text;
                    } else {
                        option.innerText = data.text;
                    }
                }

                if (data.id !== undefined) {
                    option.value = data.id;
                }

                if (data.disabled) {
                    option.disabled = true;
                }

                if (data.selected) {
                    option.selected = true;
                }

                if (data.title) {
                    option.title = data.title;
                }

                var $option = $(option);

                var normalizedData = this._normalizeItem(data);
                normalizedData.element = option;


                Utils.StoreData(option, 'data', normalizedData);

                return $option;
            };

            SelectAdapter.prototype.item = function($option) {
                var data = {};

                data = Utils.GetData($option[0], 'data');

                if (data != null) {
                    return data;
                }

                if ($option.is('option')) {
                    data = {
                        id: $option.val(),
                        text: $option.text(),
                        disabled: $option.prop('disabled'),
                        selected: $option.prop('selected'),
                        title: $option.prop('title')
                    };
                } else if ($option.is('optgroup')) {
                    data = {
                        text: $option.prop('label'),
                        children: [],
                        title: $option.prop('title')
                    };

                    var $children = $option.children('option');
                    var children = [];

                    for (var c = 0; c < $children.length; c++) {
                        var $child = $($children[c]);

                        var child = this.item($child);

                        children.push(child);
                    }

                    data.children = children;
                }

                data = this._normalizeItem(data);
                data.element = $option[0];

                Utils.StoreData($option[0], 'data', data);

                return data;
            };

            SelectAdapter.prototype._normalizeItem = function(item) {
                if (item !== Object(item)) {
                    item = {
                        id: item,
                        text: item
                    };
                }

                item = $.extend({}, {
                    text: ''
                }, item);

                var defaults = {
                    selected: false,
                    disabled: false
                };

                if (item.id != null) {
                    item.id = item.id.toString();
                }

                if (item.text != null) {
                    item.text = item.text.toString();
                }

                if (item._resultId == null && item.id && this.container != null) {
                    item._resultId = this.generateResultId(this.container, item);
                }

                return $.extend({}, defaults, item);
            };

            SelectAdapter.prototype.matches = function(params, data) {
                var matcher = this.options.get('matcher');

                return matcher(params, data);
            };

            return SelectAdapter;
        });

        S2.define('select2/data/array', [
            './select',
            '../utils',
            'jquery'
        ], function(SelectAdapter, Utils, $) {
            function ArrayAdapter($element, options) {
                var data = options.get('data') || [];

                ArrayAdapter.__super__.constructor.call(this, $element, options);

                this.addOptions(this.convertToOptions(data));
            }

            Utils.Extend(ArrayAdapter, SelectAdapter);

            ArrayAdapter.prototype.select = function(data) {
                var $option = this.$element.find('option').filter(function(i, elm) {
                    return elm.value == data.id.toString();
                });

                if ($option.length === 0) {
                    $option = this.option(data);

                    this.addOptions($option);
                }

                ArrayAdapter.__super__.select.call(this, data);
            };

            ArrayAdapter.prototype.convertToOptions = function(data) {
                var self = this;

                var $existing = this.$element.find('option');
                var existingIds = $existing.map(function() {
                    return self.item($(this)).id;
                }).get();

                var $options = [];


                function onlyItem(item) {
                    return function() {
                        return $(this).val() == item.id;
                    };
                }

                for (var d = 0; d < data.length; d++) {
                    var item = this._normalizeItem(data[d]);


                    if ($.inArray(item.id, existingIds) >= 0) {
                        var $existingOption = $existing.filter(onlyItem(item));

                        var existingData = this.item($existingOption);
                        var newData = $.extend(true, {}, item, existingData);

                        var $newOption = this.option(newData);

                        $existingOption.replaceWith($newOption);

                        continue;
                    }

                    var $option = this.option(item);

                    if (item.children) {
                        var $children = this.convertToOptions(item.children);

                        Utils.appendMany($option, $children);
                    }

                    $options.push($option);
                }

                return $options;
            };

            return ArrayAdapter;
        });

        S2.define('select2/data/ajax', [
            './array',
            '../utils',
            'jquery'
        ], function(ArrayAdapter, Utils, $) {
            function AjaxAdapter($element, options) {
                this.ajaxOptions = this._applyDefaults(options.get('ajax'));

                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults;
                }

                AjaxAdapter.__super__.constructor.call(this, $element, options);
            }

            Utils.Extend(AjaxAdapter, ArrayAdapter);

            AjaxAdapter.prototype._applyDefaults = function(options) {
                var defaults = {
                    data: function(params) {
                        return $.extend({}, params, {
                            q: params.term
                        });
                    },
                    transport: function(params, success, failure) {
                        var $request = $.ajax(params);

                        $request.then(success);
                        $request.fail(failure);

                        return $request;
                    }
                };

                return $.extend({}, defaults, options, true);
            };

            AjaxAdapter.prototype.processResults = function(results) {
                return results;
            };

            AjaxAdapter.prototype.query = function(params, callback) {
                var matches = [];
                var self = this;

                if (this._request != null) {

                    if ($.isFunction(this._request.abort)) {
                        this._request.abort();
                    }

                    this._request = null;
                }

                var options = $.extend({
                    type: 'GET'
                }, this.ajaxOptions);

                if (typeof options.url === 'function') {
                    options.url = options.url.call(this.$element, params);
                }

                if (typeof options.data === 'function') {
                    options.data = options.data.call(this.$element, params);
                }

                function request() {
                    var $request = options.transport(options, function(data) {
                        var results = self.processResults(data, params);

                        if (self.options.get('debug') && window.console && console.error) {

                            if (!results || !results.results || !$.isArray(results.results)) {
                                console.error(
                                    'Select2: The AJAX results did not return an array in the ' +
                                    '`results` key of the response.'
                                );
                            }
                        }

                        callback(results);
                    }, function() {


                        if ('status' in $request &&
                            ($request.status === 0 || $request.status === '0')) {
                            return;
                        }

                        self.trigger('results:message', {
                            message: 'errorLoading'
                        });
                    });

                    self._request = $request;
                }

                if (this.ajaxOptions.delay && params.term != null) {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout);
                    }

                    this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
                } else {
                    request();
                }
            };

            return AjaxAdapter;
        });

        S2.define('select2/data/tags', [
            'jquery'
        ], function($) {
            function Tags(decorated, $element, options) {
                var tags = options.get('tags');

                var createTag = options.get('createTag');

                if (createTag !== undefined) {
                    this.createTag = createTag;
                }

                var insertTag = options.get('insertTag');

                if (insertTag !== undefined) {
                    this.insertTag = insertTag;
                }

                decorated.call(this, $element, options);

                if ($.isArray(tags)) {
                    for (var t = 0; t < tags.length; t++) {
                        var tag = tags[t];
                        var item = this._normalizeItem(tag);

                        var $option = this.option(item);

                        this.$element.append($option);
                    }
                }
            }

            Tags.prototype.query = function(decorated, params, callback) {
                var self = this;

                this._removeOldTags();

                if (params.term == null || params.page != null) {
                    decorated.call(this, params, callback);
                    return;
                }

                function wrapper(obj, child) {
                    var data = obj.results;

                    for (var i = 0; i < data.length; i++) {
                        var option = data[i];

                        var checkChildren = (
                            option.children != null &&
                            !wrapper({
                                results: option.children
                            }, true)
                        );

                        var optionText = (option.text || '').toUpperCase();
                        var paramsTerm = (params.term || '').toUpperCase();

                        var checkText = optionText === paramsTerm;

                        if (checkText || checkChildren) {
                            if (child) {
                                return false;
                            }

                            obj.data = data;
                            callback(obj);

                            return;
                        }
                    }

                    if (child) {
                        return true;
                    }

                    var tag = self.createTag(params);

                    if (tag != null) {
                        var $option = self.option(tag);
                        $option.attr('data-select2-tag', true);

                        self.addOptions([$option]);

                        self.insertTag(data, tag);
                    }

                    obj.results = data;

                    callback(obj);
                }

                decorated.call(this, params, wrapper);
            };

            Tags.prototype.createTag = function(decorated, params) {
                var term = $.trim(params.term);

                if (term === '') {
                    return null;
                }

                return {
                    id: term,
                    text: term
                };
            };

            Tags.prototype.insertTag = function(_, data, tag) {
                data.unshift(tag);
            };

            Tags.prototype._removeOldTags = function(_) {
                var tag = this._lastTag;

                var $options = this.$element.find('option[data-select2-tag]');

                $options.each(function() {
                    if (this.selected) {
                        return;
                    }

                    $(this).remove();
                });
            };

            return Tags;
        });

        S2.define('select2/data/tokenizer', [
            'jquery'
        ], function($) {
            function Tokenizer(decorated, $element, options) {
                var tokenizer = options.get('tokenizer');

                if (tokenizer !== undefined) {
                    this.tokenizer = tokenizer;
                }

                decorated.call(this, $element, options);
            }

            Tokenizer.prototype.bind = function(decorated, container, $container) {
                decorated.call(this, container, $container);

                this.$search = container.dropdown.$search || container.selection.$search ||
                    $container.find('.select2-search__field');
            };

            Tokenizer.prototype.query = function(decorated, params, callback) {
                var self = this;

                function createAndSelect(data) {

                    var item = self._normalizeItem(data);



                    var $existingOptions = self.$element.find('option').filter(function() {
                        return $(this).val() === item.id;
                    });


                    if (!$existingOptions.length) {
                        var $option = self.option(item);
                        $option.attr('data-select2-tag', true);

                        self._removeOldTags();
                        self.addOptions([$option]);
                    }


                    select(item);
                }

                function select(data) {
                    self.trigger('select', {
                        data: data
                    });
                }

                params.term = params.term || '';

                var tokenData = this.tokenizer(params, this.options, createAndSelect);

                if (tokenData.term !== params.term) {

                    if (this.$search.length) {
                        this.$search.val(tokenData.term);
                        this.$search.focus();
                    }

                    params.term = tokenData.term;
                }

                decorated.call(this, params, callback);
            };

            Tokenizer.prototype.tokenizer = function(_, params, options, callback) {
                var separators = options.get('tokenSeparators') || [];
                var term = params.term;
                var i = 0;

                var createTag = this.createTag || function(params) {
                    return {
                        id: params.term,
                        text: params.term
                    };
                };

                while (i < term.length) {
                    var termChar = term[i];

                    if ($.inArray(termChar, separators) === -1) {
                        i++;

                        continue;
                    }

                    var part = term.substr(0, i);
                    var partParams = $.extend({}, params, {
                        term: part
                    });

                    var data = createTag(partParams);

                    if (data == null) {
                        i++;
                        continue;
                    }

                    callback(data);


                    term = term.substr(i + 1) || '';
                    i = 0;
                }

                return {
                    term: term
                };
            };

            return Tokenizer;
        });

        S2.define('select2/data/minimumInputLength', [

        ], function() {
            function MinimumInputLength(decorated, $e, options) {
                this.minimumInputLength = options.get('minimumInputLength');

                decorated.call(this, $e, options);
            }

            MinimumInputLength.prototype.query = function(decorated, params, callback) {
                params.term = params.term || '';

                if (params.term.length < this.minimumInputLength) {
                    this.trigger('results:message', {
                        message: 'inputTooShort',
                        args: {
                            minimum: this.minimumInputLength,
                            input: params.term,
                            params: params
                        }
                    });

                    return;
                }

                decorated.call(this, params, callback);
            };

            return MinimumInputLength;
        });

        S2.define('select2/data/maximumInputLength', [

        ], function() {
            function MaximumInputLength(decorated, $e, options) {
                this.maximumInputLength = options.get('maximumInputLength');

                decorated.call(this, $e, options);
            }

            MaximumInputLength.prototype.query = function(decorated, params, callback) {
                params.term = params.term || '';

                if (this.maximumInputLength > 0 &&
                    params.term.length > this.maximumInputLength) {
                    this.trigger('results:message', {
                        message: 'inputTooLong',
                        args: {
                            maximum: this.maximumInputLength,
                            input: params.term,
                            params: params
                        }
                    });

                    return;
                }

                decorated.call(this, params, callback);
            };

            return MaximumInputLength;
        });

        S2.define('select2/data/maximumSelectionLength', [

        ], function() {
            function MaximumSelectionLength(decorated, $e, options) {
                this.maximumSelectionLength = options.get('maximumSelectionLength');

                decorated.call(this, $e, options);
            }

            MaximumSelectionLength.prototype.query =
                function(decorated, params, callback) {
                    var self = this;

                    this.current(function(currentData) {
                        var count = currentData != null ? currentData.length : 0;
                        if (self.maximumSelectionLength > 0 &&
                            count >= self.maximumSelectionLength) {
                            self.trigger('results:message', {
                                message: 'maximumSelected',
                                args: {
                                    maximum: self.maximumSelectionLength
                                }
                            });
                            return;
                        }
                        decorated.call(self, params, callback);
                    });
                };

            return MaximumSelectionLength;
        });

        S2.define('select2/dropdown', [
            'jquery',
            './utils'
        ], function($, Utils) {
            function Dropdown($element, options) {
                this.$element = $element;
                this.options = options;

                Dropdown.__super__.constructor.call(this);
            }

            Utils.Extend(Dropdown, Utils.Observable);

            Dropdown.prototype.render = function() {
                var $dropdown = $(
                    '<span class="select2-dropdown">' +
                    '<span class="select2-results"></span>' +
                    '</span>'
                );

                $dropdown.attr('dir', this.options.get('dir'));

                this.$dropdown = $dropdown;

                return $dropdown;
            };

            Dropdown.prototype.bind = function() {

            };

            Dropdown.prototype.position = function($dropdown, $container) {

            };

            Dropdown.prototype.destroy = function() {

                this.$dropdown.remove();
            };

            return Dropdown;
        });

        S2.define('select2/dropdown/search', [
            'jquery',
            '../utils'
        ], function($, Utils) {
            function Search() {}

            Search.prototype.render = function(decorated) {
                var $rendered = decorated.call(this);

                var $search = $(
                    '<span class="select2-search select2-search--dropdown">' +
                    '<input class="select2-search__field" type="search" tabindex="-1"' +
                    ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                    ' spellcheck="false" role="textbox" />' +
                    '</span>'
                );

                this.$searchContainer = $search;
                this.$search = $search.find('input');

                $rendered.prepend($search);

                return $rendered;
            };

            Search.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                this.$search.on('keydown', function(evt) {
                    self.trigger('keypress', evt);

                    self._keyUpPrevented = evt.isDefaultPrevented();
                });




                this.$search.on('input', function(evt) {

                    $(this).off('keyup');
                });

                this.$search.on('keyup input', function(evt) {
                    self.handleSearch(evt);
                });

                container.on('open', function() {
                    self.$search.attr('tabindex', 0);

                    self.$search.focus();

                    window.setTimeout(function() {
                        self.$search.focus();
                    }, 0);
                });

                container.on('close', function() {
                    self.$search.attr('tabindex', -1);

                    self.$search.val('');
                    self.$search.blur();
                });

                container.on('focus', function() {
                    if (!container.isOpen()) {
                        self.$search.focus();
                    }
                });

                container.on('results:all', function(params) {
                    if (params.query.term == null || params.query.term === '') {
                        var showSearch = self.showSearch(params);

                        if (showSearch) {
                            self.$searchContainer.removeClass('select2-search--hide');
                        } else {
                            self.$searchContainer.addClass('select2-search--hide');
                        }
                    }
                });
            };

            Search.prototype.handleSearch = function(evt) {
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();

                    this.trigger('query', {
                        term: input
                    });
                }

                this._keyUpPrevented = false;
            };

            Search.prototype.showSearch = function(_, params) {
                return true;
            };

            return Search;
        });

        S2.define('select2/dropdown/hidePlaceholder', [

        ], function() {
            function HidePlaceholder(decorated, $element, options, dataAdapter) {
                this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

                decorated.call(this, $element, options, dataAdapter);
            }

            HidePlaceholder.prototype.append = function(decorated, data) {
                data.results = this.removePlaceholder(data.results);

                decorated.call(this, data);
            };

            HidePlaceholder.prototype.normalizePlaceholder = function(_, placeholder) {
                if (typeof placeholder === 'string') {
                    placeholder = {
                        id: '',
                        text: placeholder
                    };
                }

                return placeholder;
            };

            HidePlaceholder.prototype.removePlaceholder = function(_, data) {
                var modifiedData = data.slice(0);

                for (var d = data.length - 1; d >= 0; d--) {
                    var item = data[d];

                    if (this.placeholder.id === item.id) {
                        modifiedData.splice(d, 1);
                    }
                }

                return modifiedData;
            };

            return HidePlaceholder;
        });

        S2.define('select2/dropdown/infiniteScroll', [
            'jquery'
        ], function($) {
            function InfiniteScroll(decorated, $element, options, dataAdapter) {
                this.lastParams = {};

                decorated.call(this, $element, options, dataAdapter);

                this.$loadingMore = this.createLoadingMore();
                this.loading = false;
            }

            InfiniteScroll.prototype.append = function(decorated, data) {
                this.$loadingMore.remove();
                this.loading = false;

                decorated.call(this, data);

                if (this.showLoadingMore(data)) {
                    this.$results.append(this.$loadingMore);
                }
            };

            InfiniteScroll.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                container.on('query', function(params) {
                    self.lastParams = params;
                    self.loading = true;
                });

                container.on('query:append', function(params) {
                    self.lastParams = params;
                    self.loading = true;
                });

                this.$results.on('scroll', function() {
                    var isLoadMoreVisible = $.contains(
                        document.documentElement,
                        self.$loadingMore[0]
                    );

                    if (self.loading || !isLoadMoreVisible) {
                        return;
                    }

                    var currentOffset = self.$results.offset().top +
                        self.$results.outerHeight(false);
                    var loadingMoreOffset = self.$loadingMore.offset().top +
                        self.$loadingMore.outerHeight(false);

                    if (currentOffset + 50 >= loadingMoreOffset) {
                        self.loadMore();
                    }
                });
            };

            InfiniteScroll.prototype.loadMore = function() {
                this.loading = true;

                var params = $.extend({}, {
                    page: 1
                }, this.lastParams);

                params.page++;

                this.trigger('query:append', params);
            };

            InfiniteScroll.prototype.showLoadingMore = function(_, data) {
                return data.pagination && data.pagination.more;
            };

            InfiniteScroll.prototype.createLoadingMore = function() {
                var $option = $(
                    '<li ' +
                    'class="select2-results__option select2-results__option--load-more"' +
                    'role="treeitem" aria-disabled="true"></li>'
                );

                var message = this.options.get('translations').get('loadingMore');

                $option.html(message(this.lastParams));

                return $option;
            };

            return InfiniteScroll;
        });

        S2.define('select2/dropdown/attachBody', [
            'jquery',
            '../utils'
        ], function($, Utils) {
            function AttachBody(decorated, $element, options) {
                this.$dropdownParent = options.get('dropdownParent') || $(document.body);

                decorated.call(this, $element, options);
            }

            AttachBody.prototype.bind = function(decorated, container, $container) {
                var self = this;

                var setupResultsEvents = false;

                decorated.call(this, container, $container);

                container.on('open', function() {
                    self._showDropdown();
                    self._attachPositioningHandler(container);

                    if (!setupResultsEvents) {
                        setupResultsEvents = true;

                        container.on('results:all', function() {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        container.on('results:append', function() {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                    }
                });

                container.on('close', function() {
                    self._hideDropdown();
                    self._detachPositioningHandler(container);
                });

                this.$dropdownContainer.on('mousedown', function(evt) {
                    evt.stopPropagation();
                });
            };

            AttachBody.prototype.destroy = function(decorated) {
                decorated.call(this);

                this.$dropdownContainer.remove();
            };

            AttachBody.prototype.position = function(decorated, $dropdown, $container) {

                $dropdown.attr('class', $container.attr('class'));

                $dropdown.removeClass('select2');
                $dropdown.addClass('select2-container--open');

                $dropdown.css({
                    position: 'absolute',
                    top: -999999
                });

                this.$container = $container;
            };

            AttachBody.prototype.render = function(decorated) {
                var $container = $('<span></span>');

                var $dropdown = decorated.call(this);
                $container.append($dropdown);

                this.$dropdownContainer = $container;

                return $container;
            };

            AttachBody.prototype._hideDropdown = function(decorated) {
                this.$dropdownContainer.detach();
            };

            AttachBody.prototype._attachPositioningHandler =
                function(decorated, container) {
                    var self = this;

                    var scrollEvent = 'scroll.select2.' + container.id;
                    var resizeEvent = 'resize.select2.' + container.id;
                    var orientationEvent = 'orientationchange.select2.' + container.id;

                    var $watchers = this.$container.parents().filter(Utils.hasScroll);
                    $watchers.each(function() {
                        Utils.StoreData(this, 'select2-scroll-position', {
                            x: $(this).scrollLeft(),
                            y: $(this).scrollTop()
                        });
                    });

                    $watchers.on(scrollEvent, function(ev) {
                        var position = Utils.GetData(this, 'select2-scroll-position');
                        $(this).scrollTop(position.y);
                    });

                    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
                        function(e) {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                };

            AttachBody.prototype._detachPositioningHandler =
                function(decorated, container) {
                    var scrollEvent = 'scroll.select2.' + container.id;
                    var resizeEvent = 'resize.select2.' + container.id;
                    var orientationEvent = 'orientationchange.select2.' + container.id;

                    var $watchers = this.$container.parents().filter(Utils.hasScroll);
                    $watchers.off(scrollEvent);

                    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
                };

            AttachBody.prototype._positionDropdown = function() {
                var $window = $(window);

                var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
                var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

                var newDirection = null;

                var offset = this.$container.offset();

                offset.bottom = offset.top + this.$container.outerHeight(false);

                var container = {
                    height: this.$container.outerHeight(false)
                };

                container.top = offset.top;
                container.bottom = offset.top + container.height;

                var dropdown = {
                    height: this.$dropdown.outerHeight(false)
                };

                var viewport = {
                    top: $window.scrollTop(),
                    bottom: $window.scrollTop() + $window.height()
                };

                var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
                var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

                var css = {
                    left: offset.left,
                    top: container.bottom
                };


                var $offsetParent = this.$dropdownParent;



                if ($offsetParent.css('position') === 'static') {
                    $offsetParent = $offsetParent.offsetParent();
                }

                var parentOffset = $offsetParent.offset();

                css.top -= parentOffset.top;
                css.left -= parentOffset.left;

                if (!isCurrentlyAbove && !isCurrentlyBelow) {
                    newDirection = 'below';
                }

                if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
                    newDirection = 'above';
                } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
                    newDirection = 'below';
                }

                if (newDirection == 'above' ||
                    (isCurrentlyAbove && newDirection !== 'below')) {
                    css.top = container.top - parentOffset.top - dropdown.height;
                }

                if (newDirection != null) {
                    this.$dropdown
                        .removeClass('select2-dropdown--below select2-dropdown--above')
                        .addClass('select2-dropdown--' + newDirection);
                    this.$container
                        .removeClass('select2-container--below select2-container--above')
                        .addClass('select2-container--' + newDirection);
                }

                this.$dropdownContainer.css(css);
            };

            AttachBody.prototype._resizeDropdown = function() {
                var css = {
                    width: this.$container.outerWidth(false) + 'px'
                };

                if (this.options.get('dropdownAutoWidth')) {
                    css.minWidth = css.width;
                    css.position = 'relative';
                    css.width = 'auto';
                }

                this.$dropdown.css(css);
            };

            AttachBody.prototype._showDropdown = function(decorated) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);

                this._positionDropdown();
                this._resizeDropdown();
            };

            return AttachBody;
        });

        S2.define('select2/dropdown/minimumResultsForSearch', [

        ], function() {
            function countResults(data) {
                var count = 0;

                for (var d = 0; d < data.length; d++) {
                    var item = data[d];

                    if (item.children) {
                        count += countResults(item.children);
                    } else {
                        count++;
                    }
                }

                return count;
            }

            function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
                this.minimumResultsForSearch = options.get('minimumResultsForSearch');

                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity;
                }

                decorated.call(this, $element, options, dataAdapter);
            }

            MinimumResultsForSearch.prototype.showSearch = function(decorated, params) {
                if (countResults(params.data.results) < this.minimumResultsForSearch) {
                    return false;
                }

                return decorated.call(this, params);
            };

            return MinimumResultsForSearch;
        });

        S2.define('select2/dropdown/selectOnClose', [
            '../utils'
        ], function(Utils) {
            function SelectOnClose() {}

            SelectOnClose.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                container.on('close', function(params) {
                    self._handleSelectOnClose(params);
                });
            };

            SelectOnClose.prototype._handleSelectOnClose = function(_, params) {
                if (params && params.originalSelect2Event != null) {
                    var event = params.originalSelect2Event;



                    if (event._type === 'select' || event._type === 'unselect') {
                        return;
                    }
                }

                var $highlightedResults = this.getHighlightedResults();


                if ($highlightedResults.length < 1) {
                    return;
                }

                var data = Utils.GetData($highlightedResults[0], 'data');


                if (
                    (data.element != null && data.element.selected) ||
                    (data.element == null && data.selected)
                ) {
                    return;
                }

                this.trigger('select', {
                    data: data
                });
            };

            return SelectOnClose;
        });

        S2.define('select2/dropdown/closeOnSelect', [

        ], function() {
            function CloseOnSelect() {}

            CloseOnSelect.prototype.bind = function(decorated, container, $container) {
                var self = this;

                decorated.call(this, container, $container);

                container.on('select', function(evt) {
                    self._selectTriggered(evt);
                });

                container.on('unselect', function(evt) {
                    self._selectTriggered(evt);
                });
            };

            CloseOnSelect.prototype._selectTriggered = function(_, evt) {
                var originalEvent = evt.originalEvent;


                if (originalEvent && originalEvent.ctrlKey) {
                    return;
                }

                this.trigger('close', {
                    originalEvent: originalEvent,
                    originalSelect2Event: evt
                });
            };

            return CloseOnSelect;
        });

        S2.define('select2/i18n/en', [], function() {

            return {
                errorLoading: function() {
                    return 'The results could not be loaded.';
                },
                inputTooLong: function(args) {
                    var overChars = args.input.length - args.maximum;

                    var message = 'Please delete ' + overChars + ' character';

                    if (overChars != 1) {
                        message += 's';
                    }

                    return message;
                },
                inputTooShort: function(args) {
                    var remainingChars = args.minimum - args.input.length;

                    var message = 'Please enter ' + remainingChars + ' or more characters';

                    return message;
                },
                loadingMore: function() {
                    return 'Loading more results…';
                },
                maximumSelected: function(args) {
                    var message = 'You can only select ' + args.maximum + ' item';

                    if (args.maximum != 1) {
                        message += 's';
                    }

                    return message;
                },
                noResults: function() {
                    return 'No results found';
                },
                searching: function() {
                    return 'Searching…';
                }
            };
        });

        S2.define('select2/defaults', [
            'jquery',
            'require',

            './results',

            './selection/single',
            './selection/multiple',
            './selection/placeholder',
            './selection/allowClear',
            './selection/search',
            './selection/eventRelay',

            './utils',
            './translation',
            './diacritics',

            './data/select',
            './data/array',
            './data/ajax',
            './data/tags',
            './data/tokenizer',
            './data/minimumInputLength',
            './data/maximumInputLength',
            './data/maximumSelectionLength',

            './dropdown',
            './dropdown/search',
            './dropdown/hidePlaceholder',
            './dropdown/infiniteScroll',
            './dropdown/attachBody',
            './dropdown/minimumResultsForSearch',
            './dropdown/selectOnClose',
            './dropdown/closeOnSelect',

            './i18n/en'
        ], function($, require,

            ResultsList,

            SingleSelection, MultipleSelection, Placeholder, AllowClear,
            SelectionSearch, EventRelay,

            Utils, Translation, DIACRITICS,

            SelectData, ArrayData, AjaxData, Tags, Tokenizer,
            MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

            Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
            AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

            EnglishTranslation) {
            function Defaults() {
                this.reset();
            }

            Defaults.prototype.apply = function(options) {
                options = $.extend(true, {}, this.defaults, options);

                if (options.dataAdapter == null) {
                    if (options.ajax != null) {
                        options.dataAdapter = AjaxData;
                    } else if (options.data != null) {
                        options.dataAdapter = ArrayData;
                    } else {
                        options.dataAdapter = SelectData;
                    }

                    if (options.minimumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            MinimumInputLength
                        );
                    }

                    if (options.maximumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            MaximumInputLength
                        );
                    }

                    if (options.maximumSelectionLength > 0) {
                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            MaximumSelectionLength
                        );
                    }

                    if (options.tags) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                    }

                    if (options.tokenSeparators != null || options.tokenizer != null) {
                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            Tokenizer
                        );
                    }

                    if (options.query != null) {
                        var Query = require(options.amdBase + 'compat/query');

                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            Query
                        );
                    }

                    if (options.initSelection != null) {
                        var InitSelection = require(options.amdBase + 'compat/initSelection');

                        options.dataAdapter = Utils.Decorate(
                            options.dataAdapter,
                            InitSelection
                        );
                    }
                }

                if (options.resultsAdapter == null) {
                    options.resultsAdapter = ResultsList;

                    if (options.ajax != null) {
                        options.resultsAdapter = Utils.Decorate(
                            options.resultsAdapter,
                            InfiniteScroll
                        );
                    }

                    if (options.placeholder != null) {
                        options.resultsAdapter = Utils.Decorate(
                            options.resultsAdapter,
                            HidePlaceholder
                        );
                    }

                    if (options.selectOnClose) {
                        options.resultsAdapter = Utils.Decorate(
                            options.resultsAdapter,
                            SelectOnClose
                        );
                    }
                }

                if (options.dropdownAdapter == null) {
                    if (options.multiple) {
                        options.dropdownAdapter = Dropdown;
                    } else {
                        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

                        options.dropdownAdapter = SearchableDropdown;
                    }

                    if (options.minimumResultsForSearch !== 0) {
                        options.dropdownAdapter = Utils.Decorate(
                            options.dropdownAdapter,
                            MinimumResultsForSearch
                        );
                    }

                    if (options.closeOnSelect) {
                        options.dropdownAdapter = Utils.Decorate(
                            options.dropdownAdapter,
                            CloseOnSelect
                        );
                    }

                    if (
                        options.dropdownCssClass != null ||
                        options.dropdownCss != null ||
                        options.adaptDropdownCssClass != null
                    ) {
                        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

                        options.dropdownAdapter = Utils.Decorate(
                            options.dropdownAdapter,
                            DropdownCSS
                        );
                    }

                    options.dropdownAdapter = Utils.Decorate(
                        options.dropdownAdapter,
                        AttachBody
                    );
                }

                if (options.selectionAdapter == null) {
                    if (options.multiple) {
                        options.selectionAdapter = MultipleSelection;
                    } else {
                        options.selectionAdapter = SingleSelection;
                    }


                    if (options.placeholder != null) {
                        options.selectionAdapter = Utils.Decorate(
                            options.selectionAdapter,
                            Placeholder
                        );
                    }

                    if (options.allowClear) {
                        options.selectionAdapter = Utils.Decorate(
                            options.selectionAdapter,
                            AllowClear
                        );
                    }

                    if (options.multiple) {
                        options.selectionAdapter = Utils.Decorate(
                            options.selectionAdapter,
                            SelectionSearch
                        );
                    }

                    if (
                        options.containerCssClass != null ||
                        options.containerCss != null ||
                        options.adaptContainerCssClass != null
                    ) {
                        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

                        options.selectionAdapter = Utils.Decorate(
                            options.selectionAdapter,
                            ContainerCSS
                        );
                    }

                    options.selectionAdapter = Utils.Decorate(
                        options.selectionAdapter,
                        EventRelay
                    );
                }

                if (typeof options.language === 'string') {

                    if (options.language.indexOf('-') > 0) {

                        var languageParts = options.language.split('-');
                        var baseLanguage = languageParts[0];

                        options.language = [options.language, baseLanguage];
                    } else {
                        options.language = [options.language];
                    }
                }

                if ($.isArray(options.language)) {
                    var languages = new Translation();
                    options.language.push('en');

                    var languageNames = options.language;

                    for (var l = 0; l < languageNames.length; l++) {
                        var name = languageNames[l];
                        var language = {};

                        try {

                            language = Translation.loadPath(name);
                        } catch (e) {
                            try {

                                name = this.defaults.amdLanguageBase + name;
                                language = Translation.loadPath(name);
                            } catch (ex) {



                                if (options.debug && window.console && console.warn) {
                                    console.warn(
                                        'Select2: The language file for "' + name + '" could not be ' +
                                        'automatically loaded. A fallback will be used instead.'
                                    );
                                }

                                continue;
                            }
                        }

                        languages.extend(language);
                    }

                    options.translations = languages;
                } else {
                    var baseTranslation = Translation.loadPath(
                        this.defaults.amdLanguageBase + 'en'
                    );
                    var customTranslation = new Translation(options.language);

                    customTranslation.extend(baseTranslation);

                    options.translations = customTranslation;
                }

                return options;
            };

            Defaults.prototype.reset = function() {
                function stripDiacritics(text) {

                    function match(a) {
                        return DIACRITICS[a] || a;
                    }

                    return text.replace(/[^\u0000-\u007E]/g, match);
                }

                function matcher(params, data) {

                    if ($.trim(params.term) === '') {
                        return data;
                    }


                    if (data.children && data.children.length > 0) {


                        var match = $.extend(true, {}, data);


                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];

                            var matches = matcher(params, child);


                            if (matches == null) {
                                match.children.splice(c, 1);
                            }
                        }


                        if (match.children.length > 0) {
                            return match;
                        }


                        return matcher(params, match);
                    }

                    var original = stripDiacritics(data.text).toUpperCase();
                    var term = stripDiacritics(params.term).toUpperCase();


                    if (original.indexOf(term) > -1) {
                        return data;
                    }


                    return null;
                }

                this.defaults = {
                    amdBase: './',
                    amdLanguageBase: './i18n/',
                    closeOnSelect: true,
                    debug: false,
                    dropdownAutoWidth: false,
                    escapeMarkup: Utils.escapeMarkup,
                    language: EnglishTranslation,
                    matcher: matcher,
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: false,
                    sorter: function(data) {
                        return data;
                    },
                    templateResult: function(result) {
                        return result.text;
                    },
                    templateSelection: function(selection) {
                        return selection.text;
                    },
                    theme: 'default',
                    width: 'resolve'
                };
            };

            Defaults.prototype.set = function(key, value) {
                var camelKey = $.camelCase(key);

                var data = {};
                data[camelKey] = value;

                var convertedData = Utils._convertData(data);

                $.extend(true, this.defaults, convertedData);
            };

            var defaults = new Defaults();

            return defaults;
        });

        S2.define('select2/options', [
            'require',
            'jquery',
            './defaults',
            './utils'
        ], function(require, $, Defaults, Utils) {
            function Options(options, $element) {
                this.options = options;

                if ($element != null) {
                    this.fromElement($element);
                }

                this.options = Defaults.apply(this.options);

                if ($element && $element.is('input')) {
                    var InputCompat = require(this.get('amdBase') + 'compat/inputData');

                    this.options.dataAdapter = Utils.Decorate(
                        this.options.dataAdapter,
                        InputCompat
                    );
                }
            }

            Options.prototype.fromElement = function($e) {
                var excludedData = ['select2'];

                if (this.options.multiple == null) {
                    this.options.multiple = $e.prop('multiple');
                }

                if (this.options.disabled == null) {
                    this.options.disabled = $e.prop('disabled');
                }

                if (this.options.language == null) {
                    if ($e.prop('lang')) {
                        this.options.language = $e.prop('lang').toLowerCase();
                    } else if ($e.closest('[lang]').prop('lang')) {
                        this.options.language = $e.closest('[lang]').prop('lang');
                    }
                }

                if (this.options.dir == null) {
                    if ($e.prop('dir')) {
                        this.options.dir = $e.prop('dir');
                    } else if ($e.closest('[dir]').prop('dir')) {
                        this.options.dir = $e.closest('[dir]').prop('dir');
                    } else {
                        this.options.dir = 'ltr';
                    }
                }

                $e.prop('disabled', this.options.disabled);
                $e.prop('multiple', this.options.multiple);

                if (Utils.GetData($e[0], 'select2Tags')) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn(
                            'Select2: The `data-select2-tags` attribute has been changed to ' +
                            'use the `data-data` and `data-tags="true"` attributes and will be ' +
                            'removed in future versions of Select2.'
                        );
                    }

                    Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
                    Utils.StoreData($e[0], 'tags', true);
                }

                if (Utils.GetData($e[0], 'ajaxUrl')) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn(
                            'Select2: The `data-ajax-url` attribute has been changed to ' +
                            '`data-ajax--url` and support for the old attribute will be removed' +
                            ' in future versions of Select2.'
                        );
                    }

                    $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
                    Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));

                }

                var dataset = {};



                if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
                    dataset = $.extend(true, {}, $e[0].dataset, Utils.GetData($e[0]));
                } else {
                    dataset = Utils.GetData($e[0]);
                }

                var data = $.extend(true, {}, dataset);

                data = Utils._convertData(data);

                for (var key in data) {
                    if ($.inArray(key, excludedData) > -1) {
                        continue;
                    }

                    if ($.isPlainObject(this.options[key])) {
                        $.extend(this.options[key], data[key]);
                    } else {
                        this.options[key] = data[key];
                    }
                }

                return this;
            };

            Options.prototype.get = function(key) {
                return this.options[key];
            };

            Options.prototype.set = function(key, val) {
                this.options[key] = val;
            };

            return Options;
        });

        S2.define('select2/core', [
            'jquery',
            './options',
            './utils',
            './keys'
        ], function($, Options, Utils, KEYS) {
            var Select2 = function($element, options) {
                if (Utils.GetData($element[0], 'select2') != null) {
                    Utils.GetData($element[0], 'select2').destroy();
                }

                this.$element = $element;

                this.id = this._generateId($element);

                options = options || {};

                this.options = new Options(options, $element);

                Select2.__super__.constructor.call(this);



                var tabindex = $element.attr('tabindex') || 0;
                Utils.StoreData($element[0], 'old-tabindex', tabindex);
                $element.attr('tabindex', '-1');



                var DataAdapter = this.options.get('dataAdapter');
                this.dataAdapter = new DataAdapter($element, this.options);

                var $container = this.render();

                this._placeContainer($container);

                var SelectionAdapter = this.options.get('selectionAdapter');
                this.selection = new SelectionAdapter($element, this.options);
                this.$selection = this.selection.render();

                this.selection.position(this.$selection, $container);

                var DropdownAdapter = this.options.get('dropdownAdapter');
                this.dropdown = new DropdownAdapter($element, this.options);
                this.$dropdown = this.dropdown.render();

                this.dropdown.position(this.$dropdown, $container);

                var ResultsAdapter = this.options.get('resultsAdapter');
                this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
                this.$results = this.results.render();

                this.results.position(this.$results, this.$dropdown);



                var self = this;


                this._bindAdapters();


                this._registerDomEvents();


                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();


                this.dataAdapter.current(function(initialData) {
                    self.trigger('selection:update', {
                        data: initialData
                    });
                });


                $element.addClass('select2-hidden-accessible');
                $element.attr('aria-hidden', 'true');


                this._syncAttributes();

                Utils.StoreData($element[0], 'select2', this);


                $element.data('select2', this);
            };

            Utils.Extend(Select2, Utils.Observable);

            Select2.prototype._generateId = function($element) {
                var id = '';

                if ($element.attr('id') != null) {
                    id = $element.attr('id');
                } else if ($element.attr('name') != null) {
                    id = $element.attr('name') + '-' + Utils.generateChars(2);
                } else {
                    id = Utils.generateChars(4);
                }

                id = id.replace(/(:|\.|\[|\]|,)/g, '');
                id = 'select2-' + id;

                return id;
            };

            Select2.prototype._placeContainer = function($container) {
                $container.insertAfter(this.$element);

                var width = this._resolveWidth(this.$element, this.options.get('width'));

                if (width != null) {
                    $container.css('width', width);
                }
            };

            Select2.prototype._resolveWidth = function($element, method) {
                var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

                if (method == 'resolve') {
                    var styleWidth = this._resolveWidth($element, 'style');

                    if (styleWidth != null) {
                        return styleWidth;
                    }

                    return this._resolveWidth($element, 'element');
                }

                if (method == 'element') {
                    var elementWidth = $element.outerWidth(false);

                    if (elementWidth <= 0) {
                        return 'auto';
                    }

                    return elementWidth + 'px';
                }

                if (method == 'style') {
                    var style = $element.attr('style');

                    if (typeof(style) !== 'string') {
                        return null;
                    }

                    var attrs = style.split(';');

                    for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                        var attr = attrs[i].replace(/\s/g, '');
                        var matches = attr.match(WIDTH);

                        if (matches !== null && matches.length >= 1) {
                            return matches[1];
                        }
                    }

                    return null;
                }

                return method;
            };

            Select2.prototype._bindAdapters = function() {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);

                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container);
            };

            Select2.prototype._registerDomEvents = function() {
                var self = this;

                this.$element.on('change.select2', function() {
                    self.dataAdapter.current(function(data) {
                        self.trigger('selection:update', {
                            data: data
                        });
                    });
                });

                this.$element.on('focus.select2', function(evt) {
                    self.trigger('focus', evt);
                });

                this._syncA = Utils.bind(this._syncAttributes, this);
                this._syncS = Utils.bind(this._syncSubtree, this);

                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent('onpropertychange', this._syncA);
                }

                var observer = window.MutationObserver ||
                    window.WebKitMutationObserver ||
                    window.MozMutationObserver;

                if (observer != null) {
                    this._observer = new observer(function(mutations) {
                        $.each(mutations, self._syncA);
                        $.each(mutations, self._syncS);
                    });
                    this._observer.observe(this.$element[0], {
                        attributes: true,
                        childList: true,
                        subtree: false
                    });
                } else if (this.$element[0].addEventListener) {
                    this.$element[0].addEventListener(
                        'DOMAttrModified',
                        self._syncA,
                        false
                    );
                    this.$element[0].addEventListener(
                        'DOMNodeInserted',
                        self._syncS,
                        false
                    );
                    this.$element[0].addEventListener(
                        'DOMNodeRemoved',
                        self._syncS,
                        false
                    );
                }
            };

            Select2.prototype._registerDataEvents = function() {
                var self = this;

                this.dataAdapter.on('*', function(name, params) {
                    self.trigger(name, params);
                });
            };

            Select2.prototype._registerSelectionEvents = function() {
                var self = this;
                var nonRelayEvents = ['toggle', 'focus'];

                this.selection.on('toggle', function() {
                    self.toggleDropdown();
                });

                this.selection.on('focus', function(params) {
                    self.focus(params);
                });

                this.selection.on('*', function(name, params) {
                    if ($.inArray(name, nonRelayEvents) !== -1) {
                        return;
                    }

                    self.trigger(name, params);
                });
            };

            Select2.prototype._registerDropdownEvents = function() {
                var self = this;

                this.dropdown.on('*', function(name, params) {
                    self.trigger(name, params);
                });
            };

            Select2.prototype._registerResultsEvents = function() {
                var self = this;

                this.results.on('*', function(name, params) {
                    self.trigger(name, params);
                });
            };

            Select2.prototype._registerEvents = function() {
                var self = this;

                this.on('open', function() {
                    self.$container.addClass('select2-container--open');
                });

                this.on('close', function() {
                    self.$container.removeClass('select2-container--open');
                });

                this.on('enable', function() {
                    self.$container.removeClass('select2-container--disabled');
                });

                this.on('disable', function() {
                    self.$container.addClass('select2-container--disabled');
                });

                this.on('blur', function() {
                    self.$container.removeClass('select2-container--focus');
                });

                this.on('query', function(params) {
                    if (!self.isOpen()) {
                        self.trigger('open', {});
                    }

                    this.dataAdapter.query(params, function(data) {
                        self.trigger('results:all', {
                            data: data,
                            query: params
                        });
                    });
                });

                this.on('query:append', function(params) {
                    this.dataAdapter.query(params, function(data) {
                        self.trigger('results:append', {
                            data: data,
                            query: params
                        });
                    });
                });

                this.on('keypress', function(evt) {
                    var key = evt.which;

                    if (self.isOpen()) {
                        if (key === KEYS.ESC || key === KEYS.TAB ||
                            (key === KEYS.UP && evt.altKey)) {
                            self.close();

                            evt.preventDefault();
                        } else if (key === KEYS.ENTER) {
                            self.trigger('results:select', {});

                            evt.preventDefault();
                        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
                            self.trigger('results:toggle', {});

                            evt.preventDefault();
                        } else if (key === KEYS.UP) {
                            self.trigger('results:previous', {});

                            evt.preventDefault();
                        } else if (key === KEYS.DOWN) {
                            self.trigger('results:next', {});

                            evt.preventDefault();
                        }
                    } else {
                        if (key === KEYS.ENTER || key === KEYS.SPACE ||
                            (key === KEYS.DOWN && evt.altKey)) {
                            self.open();

                            evt.preventDefault();
                        }
                    }
                });
            };

            Select2.prototype._syncAttributes = function() {
                this.options.set('disabled', this.$element.prop('disabled'));

                if (this.options.get('disabled')) {
                    if (this.isOpen()) {
                        this.close();
                    }

                    this.trigger('disable', {});
                } else {
                    this.trigger('enable', {});
                }
            };

            Select2.prototype._syncSubtree = function(evt, mutations) {
                var changed = false;
                var self = this;



                if (
                    evt && evt.target && (
                        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
                    )
                ) {
                    return;
                }

                if (!mutations) {


                    changed = true;
                } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
                    for (var n = 0; n < mutations.addedNodes.length; n++) {
                        var node = mutations.addedNodes[n];

                        if (node.selected) {
                            changed = true;
                        }
                    }
                } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
                    changed = true;
                }


                if (changed) {
                    this.dataAdapter.current(function(currentData) {
                        self.trigger('selection:update', {
                            data: currentData
                        });
                    });
                }
            };





            Select2.prototype.trigger = function(name, args) {
                var actualTrigger = Select2.__super__.trigger;
                var preTriggerMap = {
                    'open': 'opening',
                    'close': 'closing',
                    'select': 'selecting',
                    'unselect': 'unselecting',
                    'clear': 'clearing'
                };

                if (args === undefined) {
                    args = {};
                }

                if (name in preTriggerMap) {
                    var preTriggerName = preTriggerMap[name];
                    var preTriggerArgs = {
                        prevented: false,
                        name: name,
                        args: args
                    };

                    actualTrigger.call(this, preTriggerName, preTriggerArgs);

                    if (preTriggerArgs.prevented) {
                        args.prevented = true;

                        return;
                    }
                }

                actualTrigger.call(this, name, args);
            };

            Select2.prototype.toggleDropdown = function() {
                if (this.options.get('disabled')) {
                    return;
                }

                if (this.isOpen()) {
                    this.close();
                } else {
                    this.open();
                }
            };

            Select2.prototype.open = function() {
                if (this.isOpen()) {
                    return;
                }

                this.trigger('query', {});
            };

            Select2.prototype.close = function() {
                if (!this.isOpen()) {
                    return;
                }

                this.trigger('close', {});
            };

            Select2.prototype.isOpen = function() {
                return this.$container.hasClass('select2-container--open');
            };

            Select2.prototype.hasFocus = function() {
                return this.$container.hasClass('select2-container--focus');
            };

            Select2.prototype.focus = function(data) {

                if (this.hasFocus()) {
                    return;
                }

                this.$container.addClass('select2-container--focus');
                this.trigger('focus', {});
            };

            Select2.prototype.enable = function(args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn(
                        'Select2: The `select2("enable")` method has been deprecated and will' +
                        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
                        ' instead.'
                    );
                }

                if (args == null || args.length === 0) {
                    args = [true];
                }

                var disabled = !args[0];

                this.$element.prop('disabled', disabled);
            };

            Select2.prototype.data = function() {
                if (this.options.get('debug') &&
                    arguments.length > 0 && window.console && console.warn) {
                    console.warn(
                        'Select2: Data can no longer be set using `select2("data")`. You ' +
                        'should consider setting the value instead using `$element.val()`.'
                    );
                }

                var data = [];

                this.dataAdapter.current(function(currentData) {
                    data = currentData;
                });

                return data;
            };

            Select2.prototype.val = function(args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn(
                        'Select2: The `select2("val")` method has been deprecated and will be' +
                        ' removed in later Select2 versions. Use $element.val() instead.'
                    );
                }

                if (args == null || args.length === 0) {
                    return this.$element.val();
                }

                var newVal = args[0];

                if ($.isArray(newVal)) {
                    newVal = $.map(newVal, function(obj) {
                        return obj.toString();
                    });
                }

                this.$element.val(newVal).trigger('change');
            };

            Select2.prototype.destroy = function() {
                this.$container.remove();

                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent('onpropertychange', this._syncA);
                }

                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null;
                } else if (this.$element[0].removeEventListener) {
                    this.$element[0]
                        .removeEventListener('DOMAttrModified', this._syncA, false);
                    this.$element[0]
                        .removeEventListener('DOMNodeInserted', this._syncS, false);
                    this.$element[0]
                        .removeEventListener('DOMNodeRemoved', this._syncS, false);
                }

                this._syncA = null;
                this._syncS = null;

                this.$element.off('.select2');
                this.$element.attr('tabindex',
                    Utils.GetData(this.$element[0], 'old-tabindex'));

                this.$element.removeClass('select2-hidden-accessible');
                this.$element.attr('aria-hidden', 'false');
                Utils.RemoveData(this.$element[0]);
                this.$element.removeData('select2');

                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();

                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null;
            };

            Select2.prototype.render = function() {
                var $container = $(
                    '<span class="select2 select2-container">' +
                    '<span class="selection"></span>' +
                    '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
                    '</span>'
                );

                $container.attr('dir', this.options.get('dir'));

                this.$container = $container;

                this.$container.addClass('select2-container--' + this.options.get('theme'));

                Utils.StoreData($container[0], 'element', this.$element);

                return $container;
            };

            return Select2;
        });

        S2.define('jquery-mousewheel', [
            'jquery'
        ], function($) {

            return $;
        });

        S2.define('jquery.select2', [
            'jquery',
            'jquery-mousewheel',

            './select2/core',
            './select2/defaults',
            './select2/utils'
        ], function($, _, Select2, Defaults, Utils) {
            if ($.fn.select2 == null) {

                var thisMethods = ['open', 'close', 'destroy'];

                $.fn.select2 = function(options) {
                    options = options || {};

                    if (typeof options === 'object') {
                        this.each(function() {
                            var instanceOptions = $.extend(true, {}, options);

                            var instance = new Select2($(this), instanceOptions);
                        });

                        return this;
                    } else if (typeof options === 'string') {
                        var ret;
                        var args = Array.prototype.slice.call(arguments, 1);

                        this.each(function() {
                            var instance = Utils.GetData(this, 'select2');

                            if (instance == null && window.console && console.error) {
                                console.error(
                                    'The select2(\'' + options + '\') method was called on an ' +
                                    'element that is not using Select2.'
                                );
                            }

                            ret = instance[options].apply(instance, args);
                        });


                        if ($.inArray(options, thisMethods) > -1) {
                            return this;
                        }

                        return ret;
                    } else {
                        throw new Error('Invalid arguments for Select2: ' + options);
                    }
                };
            }

            if ($.fn.select2.defaults == null) {
                $.fn.select2.defaults = Defaults;
            }

            return Select2;
        });


        return {
            define: S2.define,
            require: S2.require
        };
    }());



    var select2 = S2.require('jquery.select2');




    jQuery.fn.select2.amd = S2;


    return select2;
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

            autosizesClass: 'lazyautosizes',
            srcAttr: 'data-src',
            srcsetAttr: 'data-srcset',
            sizesAttr: 'data-sizes',

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






(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.bsCustomFileInput = factory());
}(this, function() {
    'use strict';

    var Selector = {
        CUSTOMFILE: '.custom-file input[type="file"]',
        CUSTOMFILELABEL: '.custom-file-label',
        FORM: 'form',
        INPUT: 'input'
    };

    var textNodeType = 3;

    var getDefaultText = function getDefaultText(input) {
        var defaultText = '';
        var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

        if (label) {
            defaultText = label.innerHTML;
        }

        return defaultText;
    };

    var findFirstChildNode = function findFirstChildNode(element) {
        if (element.childNodes.length > 0) {
            var childNodes = [].slice.call(element.childNodes);

            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];

                if (node.nodeType !== textNodeType) {
                    return node;
                }
            }
        }

        return element;
    };

    var restoreDefaultText = function restoreDefaultText(input) {
        var defaultText = input.bsCustomFileInput.defaultText;
        var label = input.parentNode.querySelector(Selector.CUSTOMFILELABEL);

        if (label) {
            var element = findFirstChildNode(label);
            element.innerHTML = defaultText;
        }
    };

    var fileApi = !!window.File;
    var FAKE_PATH = 'fakepath';
    var FAKE_PATH_SEPARATOR = '\\';

    var getSelectedFiles = function getSelectedFiles(input) {
        if (input.hasAttribute('multiple') && fileApi) {
            return [].slice.call(input.files).map(function(file) {
                return file.name;
            }).join(', ');
        }

        if (input.value.indexOf(FAKE_PATH) !== -1) {
            var splittedValue = input.value.split(FAKE_PATH_SEPARATOR);
            return splittedValue[splittedValue.length - 1];
        }

        return input.value;
    };

    function handleInputChange() {
        var label = this.parentNode.querySelector(Selector.CUSTOMFILELABEL);

        if (label) {
            var element = findFirstChildNode(label);
            var inputValue = getSelectedFiles(this);

            if (inputValue.length) {
                element.innerHTML = inputValue;
            } else {
                restoreDefaultText(this);
            }
        }
    }

    function handleFormReset() {
        var customFileList = [].slice.call(this.querySelectorAll(Selector.INPUT)).filter(function(input) {
            return !!input.bsCustomFileInput;
        });

        for (var i = 0, len = customFileList.length; i < len; i++) {
            restoreDefaultText(customFileList[i]);
        }
    }

    var customProperty = 'bsCustomFileInput';
    var Event = {
        FORMRESET: 'reset',
        INPUTCHANGE: 'change'
    };
    var bsCustomFileInput = {
        init: function init(inputSelector, formSelector) {
            if (inputSelector === void 0) {
                inputSelector = Selector.CUSTOMFILE;
            }

            if (formSelector === void 0) {
                formSelector = Selector.FORM;
            }

            var customFileInputList = [].slice.call(document.querySelectorAll(inputSelector));
            var formList = [].slice.call(document.querySelectorAll(formSelector));

            for (var i = 0, len = customFileInputList.length; i < len; i++) {
                var input = customFileInputList[i];
                Object.defineProperty(input, customProperty, {
                    value: {
                        defaultText: getDefaultText(input)
                    },
                    writable: true
                });
                handleInputChange.call(input);
                input.addEventListener(Event.INPUTCHANGE, handleInputChange);
            }

            for (var _i = 0, _len = formList.length; _i < _len; _i++) {
                formList[_i].addEventListener(Event.FORMRESET, handleFormReset);

                Object.defineProperty(formList[_i], customProperty, {
                    value: true,
                    writable: true
                });
            }
        },
        destroy: function destroy() {
            var formList = [].slice.call(document.querySelectorAll(Selector.FORM)).filter(function(form) {
                return !!form.bsCustomFileInput;
            });
            var customFileInputList = [].slice.call(document.querySelectorAll(Selector.INPUT)).filter(function(input) {
                return !!input.bsCustomFileInput;
            });

            for (var i = 0, len = customFileInputList.length; i < len; i++) {
                var input = customFileInputList[i];
                restoreDefaultText(input);
                input[customProperty] = undefined;
                input.removeEventListener(Event.INPUTCHANGE, handleInputChange);
            }

            for (var _i2 = 0, _len2 = formList.length; _i2 < _len2; _i2++) {
                formList[_i2].removeEventListener(Event.FORMRESET, handleFormReset);

                formList[_i2][customProperty] = undefined;
            }
        }
    };

    return bsCustomFileInput;

}));








! function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'verge', function() {

    var xports = {},
        win = typeof window != 'undefined' && window,
        doc = typeof document != 'undefined' && document,
        docElem = doc && doc.documentElement,
        matchMedia = win['matchMedia'] || win['msMatchMedia'],
        mq = matchMedia ? function(q) {
            return !!matchMedia.call(win, q).matches;
        } : function() {
            return false;
        },
        viewportW = xports['viewportW'] = function() {
            var a = docElem['clientWidth'],
                b = win['innerWidth'];
            return a < b ? b : a;
        },
        viewportH = xports['viewportH'] = function() {
            var a = docElem['clientHeight'],
                b = win['innerHeight'];
            return a < b ? b : a;
        };





    xports['mq'] = mq;





    xports['matchMedia'] = matchMedia ? function() {

        return matchMedia.apply(win, arguments);
    } : function() {

        return {};
    };





    function viewport() {
        return {
            'width': viewportW(),
            'height': viewportH()
        };
    }
    xports['viewport'] = viewport;





    xports['scrollX'] = function() {
        return win.pageXOffset || docElem.scrollLeft;
    };





    xports['scrollY'] = function() {
        return win.pageYOffset || docElem.scrollTop;
    };






    function calibrate(coords, cushion) {
        var o = {};
        cushion = +cushion || 0;
        o['width'] = (o['right'] = coords['right'] + cushion) - (o['left'] = coords['left'] - cushion);
        o['height'] = (o['bottom'] = coords['bottom'] + cushion) - (o['top'] = coords['top'] - cushion);
        return o;
    }









    function rectangle(el, cushion) {
        el = el && !el.nodeType ? el[0] : el;
        if (!el || 1 !== el.nodeType) return false;
        return calibrate(el.getBoundingClientRect(), cushion);
    }
    xports['rectangle'] = rectangle;








    function aspect(o) {
        o = null == o ? viewport() : 1 === o.nodeType ? rectangle(o) : o;
        var h = o['height'],
            w = o['width'];
        h = typeof h == 'function' ? h.call(o) : h;
        w = typeof w == 'function' ? w.call(o) : w;
        return w / h;
    }
    xports['aspect'] = aspect;








    xports['inX'] = function(el, cushion) {
        var r = rectangle(el, cushion);
        return !!r && r.right >= 0 && r.left <= viewportW();
    };








    xports['inY'] = function(el, cushion) {
        var r = rectangle(el, cushion);
        return !!r && r.bottom >= 0 && r.top <= viewportH();
    };








    xports['inViewport'] = function(el, cushion) {

        var r = rectangle(el, cushion);
        return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();
    };

    return xports;
});


(function(s, H, f, w) {
    var K = f("html"),
        q = f(s),
        p = f(H),
        b = f.fancybox = function() {
            b.open.apply(this, arguments)
        },
        J = navigator.userAgent.match(/msie/i),
        C = null,
        t = H.createTouch !== w,
        u = function(a) {
            return a && a.hasOwnProperty && a instanceof f
        },
        r = function(a) {
            return a && "string" === f.type(a)
        },
        F = function(a) {
            return r(a) && 0 < a.indexOf("%")
        },
        m = function(a, d) {
            var e = parseInt(a, 10) || 0;
            d && F(a) && (e *= b.getViewport()[d] / 100);
            return Math.ceil(e)
        },
        x = function(a, b) {
            return m(a, b) + "px"
        };
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !t,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                    (J ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = u(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                var l = {},
                    g, h, k, n, m;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), u(c) ? (l = {
                        href: c.data("fancybox-href") || c.attr("href"),
                        title: f("<div/>").text(c.data("fancybox-title") || c.attr("title")).html(),
                        isDom: !0,
                        element: c
                    },
                    f.metadata && f.extend(!0, l, c.metadata())) : l = c);
                g = d.href || l.href || (r(c) ? c : null);
                h = d.title !== w ? d.title : l.title || "";
                n = (k = d.content || l.content) ? "html" : d.type || l.type;
                !n && l.isDom && (n = c.data("fancybox-type"), n || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ? n[1] : null));
                r(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : r(c) && (n = "html", k = c)), "ajax" === n && (m = g.split(/\s+/, 2), g = m.shift(), m = m.shift()));
                k || ("inline" === n ? g ? k = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (k = c) :
                    "html" === n ? k = g : n || g || !l.isDom || (n = "inline", k = c));
                f.extend(l, {
                    href: g,
                    type: n,
                    content: k,
                    title: h,
                    selector: m
                });
                a[e] = l
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== w && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function() {
            var a = b.coming;
            a && !1 === b.trigger("onCancel") || (b.hideLoading(), a && (b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(),
                b.coming = null, b.current || b._afterZoomOut(a)))
        },
        close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (b.isOpen && !0 !== a ? (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]()) : (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut())))
        },
        play: function(a) {
            var d = function() {
                    clearTimeout(b.player.timer)
                },
                e = function() {
                    d();
                    b.current && b.player.isActive &&
                        (b.player.timer = setTimeout(b.next, b.current.playSpeed))
                },
                c = function() {
                    d();
                    p.unbind(".player");
                    b.player.isActive = !1;
                    b.trigger("onPlayEnd")
                };
            !0 === a || !b.player.isActive && !1 !== a ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && (b.player.isActive = !0, p.bind({
                "onCancel.player beforeClose.player": c,
                "onUpdate.player": e,
                "beforeLoad.player": d
            }), e(), b.trigger("onPlayStart")) : c()
        },
        next: function(a) {
            var d = b.current;
            d && (r(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function(a) {
            var d =
                b.current;
            d && (r(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = m(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== w && (b.cancel(), b._start(a)))
        },
        reposition: function(a, d) {
            var e = b.current,
                c = e ? e.wrap : null,
                l;
            c && (l = b._getPosition(d), a && "scroll" === a.type ? (delete l.position, c.stop(!0, !0).animate(l, 200)) : (c.css(l), e.pos = f.extend({}, e.dim, l)))
        },
        update: function(a) {
            var d = a && a.originalEvent && a.originalEvent.type,
                e = !d || "orientationchange" === d;
            e && (clearTimeout(C), C = null);
            b.isOpen && !C && (C = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), C = null)
            }, e && !t ? 0 : 300))
        },
        toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
                b.trigger("onUpdate")), b.update())
        },
        hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(), b.cancel())
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }));
            b.trigger("onLoading")
        },
        getViewport: function() {
            var a = b.current &&
                b.current.locked || !1,
                d = {
                    x: q.scrollLeft(),
                    y: q.scrollTop()
                };
            a && a.length ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = t && s.innerWidth ? s.innerWidth : q.width(), d.h = t && s.innerHeight ? s.innerHeight : q.height());
            return d
        },
        unbindEvents: function() {
            b.wrap && u(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            q.unbind(".fb")
        },
        bindEvents: function() {
            var a = b.current,
                d;
            a && (q.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c =
                    e.which || e.keyCode,
                    l = e.target || e.srcElement;
                if (27 === c && b.coming) return !1;
                e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || l && (l.type || f(l).is("[contenteditable]")) || f.each(d, function(d, l) {
                    if (1 < a.group.length && l[c] !== w) return b[d](l[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, l)) return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, l, g) {
                for (var h = f(d.target || null), k = !1; h.length && !(k || h.is(".fancybox-skin") || h.is(".fancybox-wrap"));) k = h[0] && !(h[0].style.overflow &&
                    "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                0 !== c && !k && 1 < b.group.length && !a.canShrink && (0 < g || 0 < l ? b.prev(0 < g ? "down" : "left") : (0 > g || 0 > l) && b.next(0 > g ? "up" : "right"), d.preventDefault())
            }))
        },
        trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e) return !1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e &&
                        b.helpers[d] && f.isFunction(b.helpers[d][a])) b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                })
            }
            p.trigger(a)
        },
        isImage: function(a) {
            return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return r(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var d = {},
                e, c;
            a = m(a);
            e = b.group[a] || null;
            if (!e) return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c,
                c, c
            ]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad")) b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" ===
                    c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && t && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, x(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length) return b._error("content")
                } else if (!e) return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function(a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width =
                    this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href,
                error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                },
                success: function(d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var a = b.coming,
                d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function() {
                f(this).data("ready", 1);
                t || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload ||
                b._afterLoad()
        },
        _preloadImages: function() {
            var a = b.group,
                d = b.current,
                e = a.length,
                c = d.preload ? Math.min(d.preload, e - 1) : 0,
                f, g;
            for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function() {
            var a = b.coming,
                d = b.current,
                e, c, l, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    l = a.scrolling;
                    f.extend(b, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: d
                    });
                    g = a.href;
                    switch (c) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ? e = f("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
                                    !1)
                            }));
                            break;
                        case "image":
                            e = a.tpl.image.replace(/\{href\}/g, g);
                            break;
                        case "swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                                e += '<param name="' + a + '" value="' + b + '"></param>';
                                h += " " + a + '="' + b + '"'
                            }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                    }
                    u(e) && e.parent().is(a.inner) || a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (!b.isOpened) f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    else if (d.prevMethod) b.transitions[d.prevMethod]();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        },
        _setDimension: function() {
            var a = b.getViewport(),
                d = 0,
                e = !1,
                c = !1,
                e = b.wrap,
                l = b.skin,
                g = b.inner,
                h = b.current,
                c = h.width,
                k = h.height,
                n = h.minWidth,
                v = h.minHeight,
                p = h.maxWidth,
                q = h.maxHeight,
                t = h.scrolling,
                r = h.scrollOutside ? h.scrollbarWidth : 0,
                y = h.margin,
                z = m(y[1] + y[3]),
                s = m(y[0] + y[2]),
                w, A, u, D, B, G, C, E, I;
            e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            y = m(l.outerWidth(!0) - l.width());
            w = m(l.outerHeight(!0) - l.height());
            A = z + y;
            u = s + w;
            D = F(c) ? (a.w - A) * m(c) / 100 : c;
            B = F(k) ? (a.h - u) * m(k) / 100 : k;
            if ("iframe" === h.type) {
                if (I = h.content, h.autoHeight && 1 === I.data("ready")) try {
                    I[0].contentWindow.document.location && (g.width(D).height(9999), G = I.contents().find("body"), r && G.css("overflow-x",
                        "hidden"), B = G.outerHeight(!0))
                } catch (H) {}
            } else if (h.autoWidth || h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp");
            c = m(D);
            k = m(B);
            E = D / B;
            n = m(F(n) ? m(n, "w") - A : n);
            p = m(F(p) ? m(p, "w") - A : p);
            v = m(F(v) ? m(v, "h") - u : v);
            q = m(F(q) ? m(q, "h") - u : q);
            G = p;
            C = q;
            h.fitToView && (p = Math.min(a.w - A, p), q = Math.min(a.h - u, q));
            A = a.w - z;
            s = a.h - s;
            h.aspectRatio ? (c > p && (c = p, k = m(c / E)), k > q && (k = q, c = m(k * E)), c < n && (c = n, k = m(c /
                E)), k < v && (k = v, c = m(k * E))) : (c = Math.max(n, Math.min(c, p)), h.autoHeight && "iframe" !== h.type && (g.width(c), k = g.height()), k = Math.max(v, Math.min(k, q)));
            if (h.fitToView)
                if (g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(), h.aspectRatio)
                    for (;
                        (a > A || z > s) && c > n && k > v && !(19 < d++);) k = Math.max(v, Math.min(q, k - 10)), c = m(k * E), c < n && (c = n, k = m(c / E)), c > p && (c = p, k = m(c / E)), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height();
                else c = Math.max(n, Math.min(c, c - (a - A))), k = Math.max(v, Math.min(k, k - (z - s)));
            r && "auto" === t && k < B &&
                c + y + r < A && (c += r);
            g.width(c).height(k);
            e.width(c + y);
            a = e.width();
            z = e.height();
            e = (a > A || z > s) && c > n && k > v;
            c = h.aspectRatio ? c < G && k < C && c < D && k < B : (c < G || k < C) && (c < D || k < B);
            f.extend(h, {
                dim: {
                    width: x(a),
                    height: x(z)
                },
                origWidth: D,
                origHeight: B,
                canShrink: e,
                canExpand: c,
                wPadding: y,
                hPadding: w,
                wrapSpace: z - l.outerHeight(!0),
                skinSpace: l.height() - k
            });
            !I && h.autoHeight && k > v && k < q && !c && g.height("auto")
        },
        _getPosition: function(a) {
            var d = b.current,
                e = b.getViewport(),
                c = d.margin,
                f = b.wrap.width() + c[1] + c[3],
                g = b.wrap.height() + c[0] + c[2],
                c = {
                    position: "absolute",
                    top: c[0],
                    left: c[3]
                };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function() {
            var a = b.current;
            a && ((b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                f(d.target).is("a") || f(d.target).parent().is("a") ||
                    (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), a.loop || a.index !== a.group.length - 1) ? b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play(!0)) : b.play(!1))
        },
        _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function() {
            var a = b.current,
                d = a.element,
                e = a.orig,
                c = {},
                f = 50,
                g = 50,
                h = a.hPadding,
                k = a.wPadding,
                n = b.getViewport();
            !e && a.isDom && d.is(":visible") && (e = d.find("img:first"), e.length || (e = d));
            u(e) ? (c = e.offset(), e.is("img") &&
                (f = e.outerWidth(), g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio, c.left = n.x + (n.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked) c.top -= n.y, c.left -= n.x;
            return c = {
                top: x(c.top - h * a.topRatio),
                left: x(c.left - k * a.leftRatio),
                width: x(f + k),
                height: x(g + h)
            }
        },
        step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace,
                h = c.skinSpace;
            if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](m("width" ===
                f ? c : c - g * e)), b.inner[f](m("width" === f ? c : c - g * e - h * e))
        },
        zoomIn: function() {
            var a = b.current,
                d = a.pos,
                e = a.openEffect,
                c = "elastic" === e,
                l = f.extend({
                    opacity: 1
                }, d);
            delete l.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(l, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = b.current,
                d = a.closeEffect,
                e = "elastic" === d,
                c = {
                    opacity: 0.1
                };
            e && (c = this.getOrigPosition(), a.closeOpacity &&
                (c.opacity = 0.1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null,
                complete: b._afterZoomOut
            })
        },
        changeIn: function() {
            var a = b.current,
                d = a.nextEffect,
                e = a.pos,
                c = {
                    opacity: 1
                },
                f = b.direction,
                g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(m(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(m(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        },
        changeOut: function() {
            var a = b.previous,
                d = a.prevEffect,
                e = {
                    opacity: 0.1
                },
                c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !t,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function(a) {
            var d;
            a = f.extend({}, this.defaults, a);
            this.overlay &&
                this.close();
            d = b.coming ? b.coming.parent : a.parent;
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(d && d.lenth ? d : "body");
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay",
                function(a) {
                    if (f(a.target).hasClass("fancybox-overlay")) return b.isActive ? b.close() : d.close(), !1
                });
            this.overlay.css(a.css).show()
        },
        close: function() {
            q.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var a = "100%",
                b;
            this.overlay.width(a).height("100%");
            J ? (b = Math.max(H.documentElement.offsetWidth, H.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > q.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        },
        onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && this.fixed && b.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            b.locked && !this.el.hasClass("fancybox-lock") && (!1 !== this.fixPosition && f("*").filter(function() {
                return "fixed" ===
                    f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = q.scrollTop(), this.scrollH = q.scrollLeft(), this.el.addClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var d = b.current,
                e = d.title,
                c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (r(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), J && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" :
                    "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function(a) {
        var d, e = f(this),
            c = this.selector || "",
            l = function(g) {
                var h = f(this).blur(),
                    k = d,
                    l, m;
                g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || h.is(".fancybox-wrap") || (l = a.groupAttr || "data-fancybox-group", m = h.attr(l), m || (l = "rel", m = h.get(0)[l]), m && "" !== m && "nofollow" !== m && (h = c.length ? f(c) : e, h = h.filter("[" + l + '="' + m + '"]'), k = h.index(this)), a.index = k, !1 !== b.open(h, a) && g.preventDefault())
            };
        a = a || {};
        d = a.index || 0;
        c && !1 !== a.live ? p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')",
            "click.fb-start", l) : e.unbind("click.fb-start").bind("click.fb-start", l);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function() {
        var a, d;
        f.scrollbarWidth === w && (f.scrollbarWidth = function() {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        f.support.fixedPosition === w && (f.support.fixedPosition = function() {
            var a = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            a.remove();
            return b
        }());
        f.extend(b.defaults, {
            scrollbarWidth: f.scrollbarWidth(),
            fixed: f.support.fixedPosition,
            parent: f("body")
        });
        a = f(s).width();
        K.addClass("fancybox-lock-test");
        d = f(s).width();
        K.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);




! function(e, t) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], t);
    else if ("undefined" != typeof exports) t(module, exports);
    else {
        var n = {
            exports: {}
        };
        t(n, n.exports), e.fitty = n.exports
    }
}(this, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var D = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
    };
    t.default = function(n) {
        if (n) {
            var i = function(e) {
                    return [].slice.call(e)
                },
                r = {
                    IDLE: 0,
                    DIRTY_CONTENT: 1,
                    DIRTY_LAYOUT: 2,
                    DIRTY: 3
                },
                o = [],
                e = null,
                u = "requestAnimationFrame" in n ? function() {
                    n.cancelAnimationFrame(e), e = n.requestAnimationFrame(function() {
                        a(o.filter(function(e) {
                            return e.dirty
                        }))
                    })
                } : function() {},
                t = function(t) {
                    return function() {
                        o.forEach(function(e) {
                            e.dirty = t
                        }), u()
                    }
                },
                a = function(e) {
                    e.filter(function(e) {
                        return !e.styleComputed
                    }).forEach(function(e) {
                        e.styleComputed = f(e)
                    }), e.filter(d).forEach(p);
                    var t = e.filter(s);
                    t.forEach(c), t.forEach(function(e) {
                        p(e), l(e)
                    }), t.forEach(m)
                },
                l = function(e) {
                    return e.dirty = r.IDLE
                },
                c = function(e) {
                    e.availableWidth = e.element.parentNode.clientWidth, e.currentWidth = e.element.scrollWidth, e.previousFontSize = e.currentFontSize, e.currentFontSize = Math.min(Math.max(e.minSize, e.availableWidth / e.currentWidth * e.previousFontSize), e.maxSize), e.whiteSpace = e.multiLine && e.currentFontSize === e.minSize ? "normal" : "nowrap"
                },
                s = function(e) {
                    return e.dirty !== r.DIRTY_LAYOUT || e.dirty === r.DIRTY_LAYOUT && e.element.parentNode.clientWidth !== e.availableWidth
                },
                f = function(e) {
                    var t = n.getComputedStyle(e.element, null);
                    e.currentFontSize = parseInt(t.getPropertyValue("font-size"), 10), e.display = t.getPropertyValue("display"), e.whiteSpace = t.getPropertyValue("white-space")
                },
                d = function(e) {
                    var t = !1;
                    return !e.preStyleTestCompleted && (/inline-/.test(e.display) || (t = !0, e.display = "inline-block"), "nowrap" !== e.whiteSpace && (t = !0, e.whiteSpace = "nowrap"), e.preStyleTestCompleted = !0, t)
                },
                p = function(e) {
                    e.originalStyle || (e.originalStyle = e.element.getAttribute("style") || ""), e.element.style.cssText = e.originalStyle + ";white-space:" + e.whiteSpace + ";display:" + e.display + ";font-size:" + e.currentFontSize + "px"
                },
                m = function(e) {
                    e.element.dispatchEvent(new CustomEvent("fit", {
                        detail: {
                            oldValue: e.previousFontSize,
                            newValue: e.currentFontSize,
                            scaleFactor: e.currentFontSize / e.previousFontSize
                        }
                    }))
                },
                v = function(e, t) {
                    return function() {
                        e.dirty = t, u()
                    }
                },
                y = function(e) {
                    e.newbie = !0, e.dirty = !0, o.push(e)
                },
                h = function(t) {
                    return function() {
                        o = o.filter(function(e) {
                            return e.element !== t.element
                        }), t.observeMutations && t.observer.disconnect(), t.element.style.cssText = t.originalStyle
                    }
                },
                S = function(e) {
                    e.observeMutations && (e.observer = new MutationObserver(v(e, r.DIRTY_CONTENT)), e.observer.observe(e.element, e.observeMutations))
                },
                b = {
                    minSize: 16,
                    maxSize: 512,
                    multiLine: !0,
                    observeMutations: "MutationObserver" in n && {
                        subtree: !0,
                        childList: !0,
                        characterData: !0
                    }
                },
                w = null,
                T = function() {
                    n.clearTimeout(w), w = n.setTimeout(t(r.DIRTY_LAYOUT), g.observeWindowDelay)
                },
                z = ["resize", "orientationchange"];
            return Object.defineProperty(g, "observeWindow", {
                set: function(e) {
                    var t = (e ? "add" : "remove") + "EventListener";
                    z.forEach(function(e) {
                        n[t](e, T)
                    })
                }
            }), g.observeWindow = !0, g.observeWindowDelay = 100, g.fitAll = t(r.DIRTY), g
        }

        function F(e, t) {
            var n = D({}, b, t),
                i = e.map(function(e) {
                    var t = D({}, n, {
                        element: e
                    });
                    return y(t), S(t), {
                        element: e,
                        fit: v(t, r.DIRTY),
                        unsubscribe: h(t)
                    }
                });
            return u(), i
        }

        function g(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            return "string" == typeof e ? F(i(document.querySelectorAll(e)), t) : F([e], t)[0]
        }
    }("undefined" == typeof window ? null : window), e.exports = t.default
});
//# sourceMappingURL=maat-vendor.js.map
