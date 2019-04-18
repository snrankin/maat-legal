var exports = {};
"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

/*!
 * modernizr v3.7.1
 * Build https://modernizr.com/download?-addtest-atrule-domprefixes-hasevent-load-mq-prefixed-prefixedcss-prefixes-printshiv-setclasses-setclasses-testallprops-testprop-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera
 *  Veeck

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
 */
;

(function(window, document, undefined) {
    var tests = [];
    /**
     * ModernizrProto is the constructor for Modernizr
     *
     * @class
     * @access public
     */

    var ModernizrProto = {
        // The current version, dummy
        _version: '3.7.1',
        // Any settings that don't work as separate modules
        // can go in here as configuration.
        _config: {
            'classPrefix': '',
            'enableClasses': true,
            'enableJSClass': true,
            'usePrefixes': true
        },
        // Queue of tests
        _q: [],
        // Stub these for people who are listening
        on: function on(test, cb) {
            // I don't really think people should do this, but we can
            // safe guard it a bit.
            // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
            // This is in case people listen to synchronous tests. I would leave it out,
            // but the code to *disallow* sync tests in the real version of this
            // function is actually larger than this.
            var self = this;
            setTimeout(function() {
                cb(self[test]);
            }, 0);
        },
        addTest: function addTest(name, fn, options) {
            tests.push({
                name: name,
                fn: fn,
                options: options
            });
        },
        addAsyncTest: function addAsyncTest(fn) {
            tests.push({
                name: null,
                fn: fn
            });
        }
    }; // Fake some of Object.create so we can force non test results to be non "own" properties.

    var Modernizr = function Modernizr() {};

    Modernizr.prototype = ModernizrProto; // Leak modernizr globally when you `require` it rather than force it here.
    // Overwrite name so constructor name is nicer :D

    Modernizr = new Modernizr();
    var classes = [];
    /**
     * is returns a boolean if the typeof an obj is exactly type.
     *
     * @access private
     * @function is
     * @param {*} obj - A thing we want to check the type of
     * @param {string} type - A string to compare the typeof against
     * @returns {boolean} true if the typeof the first parameter is exactly the specified type, false otherwise
     */

    function is(obj, type) {
        return _typeof(obj) === type;
    }

    ;
    /**
     * Run through all tests and detect their support in the current UA.
     *
     * @access private
     * @returns {void}
     */

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
                feature = tests[featureIdx]; // run the test, throw the return value into the Modernizr,
                // then based on that boolean, define an appropriate className
                // and push it into an array of classes we'll join later.
                //
                // If there is no name, it's an 'async' test that is run,
                // but not directly added to the object. That should
                // be done with a post-run addTest call.

                if (feature.name) {
                    featureNames.push(feature.name.toLowerCase());

                    if (feature.options && feature.options.aliases && feature.options.aliases.length) {
                        // Add all the aliases into the names list
                        for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
                            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
                        }
                    }
                } // Run the test, or use the raw value if it's not a function


                result = is(feature.fn, 'function') ? feature.fn() : feature.fn; // Set each of the names on the Modernizr object

                for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
                    featureName = featureNames[nameIdx]; // Support dot properties as sub tests. We don't do checking to make sure
                    // that the implied parent tests have been added. You must call them in
                    // order (either in the test, or make the parent test a dependency).
                    //
                    // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
                    // hashtag famous last words

                    featureNameSplit = featureName.split('.');

                    if (featureNameSplit.length === 1) {
                        Modernizr[featureNameSplit[0]] = result;
                    } else {
                        // cast to a Boolean, if not one already
                        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                            Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                        }

                        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
                    }

                    classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
                }
            }
        }
    }

    ;
    /**
     * docElement is a convenience wrapper to grab the root element of the document
     *
     * @access private
     * @returns {HTMLElement|SVGElement} The root element of the document
     */

    var docElement = document.documentElement;
    /**
     * A convenience helper to check if the document we are running in is an SVG document
     *
     * @access private
     * @returns {boolean}
     */

    var isSVG = docElement.nodeName.toLowerCase() === 'svg';
    /**
     * setClasses takes an array of class names and adds them to the root element
     *
     * @access private
     * @function setClasses
     * @param {string[]} classes - Array of class names
     */
    // Pass in an and array of class names, e.g.:
    //  ['no-webp', 'borderradius', ...]

    function setClasses(classes) {
        var className = docElement.className;
        var classPrefix = Modernizr._config.classPrefix || '';

        if (isSVG) {
            className = className.baseVal;
        } // Change `no-js` to `js` (independently of the `enableClasses` option)
        // Handle classPrefix on this too


        if (Modernizr._config.enableJSClass) {
            var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
            className = className.replace(reJS, '$1' + classPrefix + 'js$2');
        }

        if (Modernizr._config.enableClasses) {
            // Add the new classes
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
    /**
     * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
     *
     * @author kangax
     * @access private
     * @function hasOwnProp
     * @param {object} object - The object to check for a property
     * @param {string} property - The property to check for
     * @returns {boolean}
     */
    // hasOwnProperty shim by kangax needed for Safari 2.0 support

    var hasOwnProp;

    (function() {
        var _hasOwnProperty = {}.hasOwnProperty;
        /* istanbul ignore else */

        /* we have no way of testing IE 5.5 or safari 2,
         * so just assume the else gets hit */

        if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
            hasOwnProp = function hasOwnProp(object, property) {
                return _hasOwnProperty.call(object, property);
            };
        } else {
            hasOwnProp = function hasOwnProp(object, property) {
                /* yes, this can give false positives/negatives, but most of the time we don't care about those */
                return property in object && is(object.constructor.prototype[property], 'undefined');
            };
        }
    })(); // _l tracks listeners for async tests, as well as tests that execute after the initial run


    ModernizrProto._l = {};
    /**
     * Modernizr.on is a way to listen for the completion of async tests. Being
     * asynchronous, they may not finish before your scripts run. As a result you
     * will get a possibly false negative `undefined` value.
     *
     * @memberOf Modernizr
     * @name Modernizr.on
     * @access public
     * @function on
     * @param {string} feature - String name of the feature detect
     * @param {Function} cb - Callback function returning a Boolean - true if feature is supported, false if not
     * @returns {void}
     * @example
     *
     * ```js
     * Modernizr.on('flash', function( result ) {
     *   if (result) {
     *    // the browser has flash
     *   } else {
     *     // the browser does not have flash
     *   }
     * });
     * ```
     */

    ModernizrProto.on = function(feature, cb) {
        // Create the list of listeners if it doesn't exist
        if (!this._l[feature]) {
            this._l[feature] = [];
        } // Push this test on to the listener list


        this._l[feature].push(cb); // If it's already been resolved, trigger it on next tick


        if (Modernizr.hasOwnProperty(feature)) {
            // Next Tick
            setTimeout(function() {
                Modernizr._trigger(feature, Modernizr[feature]);
            }, 0);
        }
    };
    /**
     * _trigger is the private function used to signal test completion and run any
     * callbacks registered through [Modernizr.on](#modernizr-on)
     *
     * @memberOf Modernizr
     * @name Modernizr._trigger
     * @access private
     * @function _trigger
     * @param {string} feature - string name of the feature detect
     * @param {Function|boolean} [res] - A feature detection function, or the boolean =
     * result of a feature detection function
     * @returns {void}
     */


    ModernizrProto._trigger = function(feature, res) {
        if (!this._l[feature]) {
            return;
        }

        var cbs = this._l[feature]; // Force async

        setTimeout(function() {
            var i, cb;

            for (i = 0; i < cbs.length; i++) {
                cb = cbs[i];
                cb(res);
            }
        }, 0); // Don't trigger these again

        delete this._l[feature];
    };
    /**
     * addTest allows you to define your own feature detects that are not currently
     * included in Modernizr (under the covers it's the exact same code Modernizr
     * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)).
     * Just like the official detects, the result
     * will be added onto the Modernizr object, as well as an appropriate className set on
     * the html element when configured to do so
     *
     * @memberOf Modernizr
     * @name Modernizr.addTest
     * @optionName Modernizr.addTest()
     * @optionProp addTest
     * @access public
     * @function addTest
     * @param {string|Object} feature - The string name of the feature detect, or an
     * object of feature detect names and test
     * @param {Function|boolean} test - Function returning true if feature is supported,
     * false if not. Otherwise a boolean representing the results of a feature detection
     * @returns {Object} the Modernizr object to allow chaining
     * @example
     *
     * The most common way of creating your own feature detects is by calling
     * `Modernizr.addTest` with a string (preferably just lowercase, without any
     * punctuation), and a function you want executed that will return a boolean result
     *
     * ```js
     * Modernizr.addTest('itsTuesday', function() {
     *  var d = new Date();
     *  return d.getDay() === 2;
     * });
     * ```
     *
     * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
     * and to `false` every other day of the week. One thing to notice is that the names of
     * feature detect functions are always lowercased when added to the Modernizr object. That
     * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
     *
     *
     *  Since we only look at the returned value from any feature detection function,
     *  you do not need to actually use a function. For simple detections, just passing
     *  in a statement that will return a boolean value works just fine.
     *
     * ```js
     * Modernizr.addTest('hasjquery', 'jQuery' in window);
     * ```
     *
     * Just like before, when the above runs `Modernizr.hasjquery` will be true if
     * jQuery has been included on the page. Not using a function saves a small amount
     * of overhead for the browser, as well as making your code much more readable.
     *
     * Finally, you also have the ability to pass in an object of feature names and
     * their tests. This is handy if you want to add multiple detections in one go.
     * The keys should always be a string, and the value can be either a boolean or
     * function that returns a boolean.
     *
     * ```js
     * var detects = {
     *  'hasjquery': 'jQuery' in window,
     *  'itstuesday': function() {
     *    var d = new Date();
     *    return d.getDay() === 2;
     *  }
     * }
     *
     * Modernizr.addTest(detects);
     * ```
     *
     * There is really no difference between the first methods and this one, it is
     * just a convenience to let you write more readable code.
     */


    function addTest(feature, test) {
        if (_typeof(feature) === 'object') {
            for (var key in feature) {
                if (hasOwnProp(feature, key)) {
                    addTest(key, feature[key]);
                }
            }
        } else {
            feature = feature.toLowerCase();
            var featureNameSplit = feature.split('.');
            var last = Modernizr[featureNameSplit[0]]; // Again, we don't check for parent test existence. Get that right, though.

            if (featureNameSplit.length === 2) {
                last = last[featureNameSplit[1]];
            }

            if (typeof last !== 'undefined') {
                // we're going to quit if you're trying to overwrite an existing test
                // if we were to allow it, we'd do this:
                //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
                //   docElement.className = docElement.className.replace( re, '' );
                // but, no rly, stuff 'em.
                return Modernizr;
            }

            test = typeof test === 'function' ? test() : test; // Set the value (this is the magic, right here).

            if (featureNameSplit.length === 1) {
                Modernizr[featureNameSplit[0]] = test;
            } else {
                // cast to a Boolean, if not one already
                if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
                    Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
                }

                Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
            } // Set a single class (either `feature` or `no-feature`)


            setClasses([(!!test && test !== false ? '' : 'no-') + featureNameSplit.join('-')]); // Trigger the event

            Modernizr._trigger(feature, test);
        }

        return Modernizr; // allow chaining.
    } // After all the tests are run, add self to the Modernizr prototype


    Modernizr._q.push(function() {
        ModernizrProto.addTest = addTest;
    });
    /**
     * If the browsers follow the spec, then they would expose vendor-specific styles as:
     *   elem.style.WebkitBorderRadius
     * instead of something like the following (which is technically incorrect):
     *   elem.style.webkitBorderRadius
     * WebKit ghosts their properties in lowercase but Opera & Moz do not.
     * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
     *   erik.eae.net/archives/2008/03/10/21.48.10/
     * More here: github.com/Modernizr/Modernizr/issues/issue/21
     *
     * @access private
     * @returns {string} The string representing the vendor-specific style properties
     */


    var omPrefixes = 'Moz O ms Webkit';
    var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
    ModernizrProto._cssomPrefixes = cssomPrefixes;
    /**
     * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
     * some prefixed form, or false, in the case of an unsupported rule
     *
     * @memberOf Modernizr
     * @name Modernizr.atRule
     * @optionName Modernizr.atRule()
     * @optionProp atRule
     * @access public
     * @function atRule
     * @param {string} prop - String name of the @-rule to test for
     * @returns {string|boolean} The string representing the (possibly prefixed)
     * valid version of the @-rule, or `false` when it is unsupported.
     * @example
     * ```js
     *  var keyframes = Modernizr.atRule('@keyframes');
     *
     *  if (keyframes) {
     *    // keyframes are supported
     *    // could be `@-webkit-keyframes` or `@keyframes`
     *  } else {
     *    // keyframes === `false`
     *  }
     * ```
     */

    var atRule = function atRule(prop) {
        var length = prefixes.length;
        var cssrule = window.CSSRule;
        var rule;

        if (typeof cssrule === 'undefined') {
            return undefined;
        }

        if (!prop) {
            return false;
        } // remove literal @ from beginning of provided property


        prop = prop.replace(/^@/, ''); // CSSRules use underscores instead of dashes

        rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

        if (rule in cssrule) {
            return '@' + prop;
        }

        for (var i = 0; i < length; i++) {
            // prefixes gives us something like -o-, and we want O_
            var prefix = prefixes[i];
            var thisRule = prefix.toUpperCase() + '_' + rule;

            if (thisRule in cssrule) {
                return '@-' + prefix.toLowerCase() + '-' + prop;
            }
        }

        return false;
    };

    ModernizrProto.atRule = atRule;
    /**
     * List of JavaScript DOM values used for tests
     *
     * @memberOf Modernizr
     * @name Modernizr._domPrefixes
     * @optionName Modernizr._domPrefixes
     * @optionProp domPrefixes
     * @access public
     * @example
     *
     * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
     * than kebab-case properties, all properties are their Capitalized variant
     *
     * ```js
     * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
     * ```
     */

    var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
    ModernizrProto._domPrefixes = domPrefixes;
    /**
     * createElement is a convenience wrapper around document.createElement. Since we
     * use createElement all over the place, this allows for (slightly) smaller code
     * as well as abstracting away issues with creating elements in contexts other than
     * HTML documents (e.g. SVG documents).
     *
     * @access private
     * @function createElement
     * @returns {HTMLElement|SVGElement} An HTML or SVG element
     */

    function createElement() {
        if (typeof document.createElement !== 'function') {
            // This is the case in IE7, where the type of createElement is "object".
            // For this reason, we cannot call apply() as Object is not a Function.
            return document.createElement(arguments[0]);
        } else if (isSVG) {
            return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
        } else {
            return document.createElement.apply(document, arguments);
        }
    }

    ;
    /**
     * Modernizr.hasEvent() detects support for a given event
     *
     * @memberOf Modernizr
     * @name Modernizr.hasEvent
     * @optionName Modernizr.hasEvent()
     * @optionProp hasEvent
     * @access public
     * @function hasEvent
     * @param {string|*} eventName - the name of an event to test for (e.g. "resize")
     * @param {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
     * @returns {boolean}
     * @example
     *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
     *  By default, it does this detection on a div element
     *
     * ```js
     *  hasEvent('blur') // true;
     * ```
     *
     * However, you are able to give an object as a second argument to hasEvent to
     * detect an event on something other than a div.
     *
     * ```js
     *  hasEvent('devicelight', window) // true;
     * ```
     */

    var hasEvent = function() {
        // Detect whether event support can be detected via `in`. Test on a DOM element
        // using the "blur" event b/c it should always exist. bit.ly/event-detection
        var needsFallback = !('onblur' in docElement);

        function inner(eventName, element) {
            var isSupported;

            if (!eventName) {
                return false;
            }

            if (!element || typeof element === 'string') {
                element = createElement(element || 'div');
            } // Testing via the `in` operator is sufficient for modern browsers and IE.
            // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
            // "resize", whereas `in` "catches" those.


            eventName = 'on' + eventName;
            isSupported = eventName in element; // Fallback technique for old Firefox - bit.ly/event-detection

            if (!isSupported && needsFallback) {
                if (!element.setAttribute) {
                    // Switch to generic element if it lacks `setAttribute`.
                    // It could be the `document`, `window`, or something else.
                    element = createElement('div');
                }

                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                if (element[eventName] !== undefined) {
                    // If property was created, "remove it" by setting value to `undefined`.
                    element[eventName] = undefined;
                }

                element.removeAttribute(eventName);
            }

            return isSupported;
        }

        return inner;
    }();

    ModernizrProto.hasEvent = hasEvent;
    /**
     * @optionName html5printshiv
     * @optionProp html5printshiv
     */
    // Take the html5 variable out of the html5shiv scope so we can return it.

    var html5;

    if (!isSVG) {
        /**
         * @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
         */
        ;

        (function(window, document) {
            /*jshint evil:true */

            /** version */
            var version = '3.7.3';
            /** Preset options */

            var options = window.html5 || {};
            /** Used to skip problem elements */

            var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
            /** Not all elements can be cloned in IE **/

            var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
            /** Detect whether the browser supports default html5 styles */

            var supportsHtml5Styles;
            /** Name of the expando, to work with multiple documents or to re-shiv one document */

            var expando = '_html5shiv';
            /** The id for the the documents expando */

            var expanID = 0;
            /** Cached data for each document */

            var expandoData = {};
            /** Detect whether the browser supports unknown elements */

            var supportsUnknownElements;

            (function() {
                try {
                    var a = document.createElement('a');
                    a.innerHTML = '<xyz></xyz>'; //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles

                    supportsHtml5Styles = 'hidden' in a;

                    supportsUnknownElements = a.childNodes.length == 1 || function() {
                        // assign a false positive if unable to shiv
                        document.createElement('a');
                        var frag = document.createDocumentFragment();
                        return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
                    }();
                } catch (e) {
                    // assign a false positive if detection fails => unable to shiv
                    supportsHtml5Styles = true;
                    supportsUnknownElements = true;
                }
            })();
            /*--------------------------------------------------------------------------*/

            /**
             * Creates a style sheet with the given CSS text and adds it to the document.
             * @private
             * @param {Document} ownerDocument The document.
             * @param {String} cssText The CSS text.
             * @returns {StyleSheet} The style element.
             */


            function addStyleSheet(ownerDocument, cssText) {
                var p = ownerDocument.createElement('p'),
                    parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
                p.innerHTML = 'x<style>' + cssText + '</style>';
                return parent.insertBefore(p.lastChild, parent.firstChild);
            }
            /**
             * Returns the value of `html5.elements` as an array.
             * @private
             * @returns {Array} An array of shived element node names.
             */


            function getElements() {
                var elements = html5.elements;
                return typeof elements == 'string' ? elements.split(' ') : elements;
            }
            /**
             * Extends the built-in list of html5 elements
             * @memberOf html5
             * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
             * @param {Document} ownerDocument The context document.
             */


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
            /**
             * Returns the data associated to the given document
             * @private
             * @param {Document} ownerDocument The document.
             * @returns {Object} An object of data.
             */


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
            /**
             * returns a shived element for the given nodeName and document
             * @memberOf html5
             * @param {String} nodeName name of the element
             * @param {Document} ownerDocument The context document.
             * @returns {Object} The shived element.
             */


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
                } // Avoid adding some elements to fragments in IE < 9 because
                // * Attributes like `name` or `type` cannot be set/changed once an element
                //   is inserted into a document/fragment
                // * Link elements with `src` attributes that are inaccessible, as with
                //   a 403 response, will cause the tab/window to crash
                // * Script elements appended to fragments will execute when their `src`
                //   or `text` property is set


                return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
            }
            /**
             * returns a shived DocumentFragment for the given document
             * @memberOf html5
             * @param {Document} ownerDocument The context document.
             * @returns {Object} The shived DocumentFragment.
             */


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
            /**
             * Shivs the `createElement` and `createDocumentFragment` methods of the document.
             * @private
             * @param {Document|DocumentFragment} ownerDocument The document.
             * @param {Object} data of the document.
             */


            function shivMethods(ownerDocument, data) {
                if (!data.cache) {
                    data.cache = {};
                    data.createElem = ownerDocument.createElement;
                    data.createFrag = ownerDocument.createDocumentFragment;
                    data.frag = data.createFrag();
                }

                ownerDocument.createElement = function(nodeName) {
                    //abort shiv
                    if (!html5.shivMethods) {
                        return data.createElem(nodeName);
                    }

                    return createElement(nodeName, ownerDocument, data);
                };

                ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' + // unroll the `createElement` calls
                    getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                        data.createElem(nodeName);
                        data.frag.createElement(nodeName);
                        return 'c("' + nodeName + '")';
                    }) + ');return n}')(html5, data.frag);
            }
            /*--------------------------------------------------------------------------*/

            /**
             * Shivs the given document.
             * @memberOf html5
             * @param {Document} ownerDocument The document to shiv.
             * @returns {Document} The shived document.
             */


            function shivDocument(ownerDocument) {
                if (!ownerDocument) {
                    ownerDocument = document;
                }

                var data = getExpandoData(ownerDocument);

                if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
                    data.hasCSS = !!addStyleSheet(ownerDocument, // corrects block display not defined in IE6/7/8/9
                        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' + // adds styling not present in IE6/7/8/9
                        'mark{background:#FF0;color:#000}' + // hides non-rendered elements
                        'template{display:none}');
                }

                if (!supportsUnknownElements) {
                    shivMethods(ownerDocument, data);
                }

                return ownerDocument;
            }
            /*--------------------------------------------------------------------------*/

            /**
             * The `html5` object is exposed so that more elements can be shived and
             * existing shiving can be detected on iframes.
             * @type Object
             * @example
             *
             * // options can be changed before the script is included
             * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
             */


            var html5 = {
                /**
                 * An array or space separated string of node names of the elements to shiv.
                 * @memberOf html5
                 * @type Array|String
                 */
                'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',

                /**
                 * current version of html5shiv
                 */
                'version': version,

                /**
                 * A flag to indicate that the HTML5 style sheet should be inserted.
                 * @memberOf html5
                 * @type Boolean
                 */
                'shivCSS': options.shivCSS !== false,

                /**
                 * Is equal to true if a browser supports creating unknown/HTML5 elements
                 * @memberOf html5
                 * @type boolean
                 */
                'supportsUnknownElements': supportsUnknownElements,

                /**
                 * A flag to indicate that the document's `createElement` and `createDocumentFragment`
                 * methods should be overwritten.
                 * @memberOf html5
                 * @type Boolean
                 */
                'shivMethods': options.shivMethods !== false,

                /**
                 * A string to describe the type of `html5` object ("default" or "default print").
                 * @memberOf html5
                 * @type String
                 */
                'type': 'default',
                // shivs the document according to the specified `html5` object options
                'shivDocument': shivDocument,
                //creates a shived element
                createElement: createElement,
                //creates a shived documentFragment
                createDocumentFragment: createDocumentFragment,
                //extends list of elements
                addElements: addElements
            };
            /*--------------------------------------------------------------------------*/
            // expose html5

            window.html5 = html5; // shiv the document

            shivDocument(document);
            /*------------------------------- Print Shiv -------------------------------*/

            /** Used to filter media types */

            var reMedia = /^$|\b(?:all|print)\b/;
            /** Used to namespace printable elements */

            var shivNamespace = 'html5shiv';
            /** Detect whether the browser supports shivable style sheets */

            var supportsShivableSheets = !supportsUnknownElements && function() {
                // assign a false negative if unable to shiv
                var docEl = document.documentElement;
                return !(typeof document.namespaces == 'undefined' || typeof document.parentWindow == 'undefined' || typeof docEl.applyElement == 'undefined' || typeof docEl.removeNode == 'undefined' || typeof window.attachEvent == 'undefined');
            }();
            /*--------------------------------------------------------------------------*/

            /**
             * Wraps all HTML5 elements in the given document with printable elements.
             * (eg. the "header" element is wrapped with the "html5shiv:header" element)
             * @private
             * @param {Document} ownerDocument The document.
             * @returns {Array} An array wrappers added.
             */


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
            /**
             * Creates a printable wrapper for the given element.
             * @private
             * @param {Element} element The element.
             * @returns {Element} The wrapper.
             */


            function createWrapper(element) {
                var node,
                    nodes = element.attributes,
                    index = nodes.length,
                    wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName); // copy element attributes to the wrapper

                while (index--) {
                    node = nodes[index];
                    node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
                } // copy element styles to the wrapper


                wrapper.style.cssText = element.style.cssText;
                return wrapper;
            }
            /**
             * Shivs the given CSS text.
             * (eg. header{} becomes html5shiv\:header{})
             * @private
             * @param {String} cssText The CSS text to shiv.
             * @returns {String} The shived CSS text.
             */


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
            /**
             * Removes the given wrappers, leaving the original elements.
             * @private
             * @params {Array} wrappers An array of printable wrappers.
             */


            function removeWrappers(wrappers) {
                var index = wrappers.length;

                while (index--) {
                    wrappers[index].removeNode();
                }
            }
            /*--------------------------------------------------------------------------*/

            /**
             * Shivs the given document for print.
             * @memberOf html5
             * @param {Document} ownerDocument The document to shiv.
             * @returns {Document} The shived document.
             */


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
                        sheets = Array(index); // convert styleSheets collection to an array

                    while (index--) {
                        sheets[index] = collection[index];
                    } // concat all style sheet CSS text


                    while (sheet = sheets.pop()) {
                        // IE does not enforce a same origin policy for external style sheets...
                        // but has trouble with some dynamically created stylesheets
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
                    } // wrap all HTML5 elements with printable elements and add the shived style sheet


                    cssText = shivCssText(cssText.reverse().join(''));
                    wrappers = addWrappers(ownerDocument);
                    shivedSheet = addStyleSheet(ownerDocument, cssText);
                });
                ownerWindow.attachEvent('onafterprint', function() {
                    // remove wrappers, leaving the original elements, and remove the shived style sheet
                    removeWrappers(wrappers);
                    clearTimeout(data._removeSheetTimer);
                    data._removeSheetTimer = setTimeout(removeSheet, 500);
                });
                ownerDocument.printShived = true;
                return ownerDocument;
            }
            /*--------------------------------------------------------------------------*/
            // expose API


            html5.type += ' print';
            html5.shivPrint = shivPrint; // shiv for print

            shivPrint(document);

            if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
                module.exports = html5;
            }
        })(typeof window !== "undefined" ? window : this, document);
    }

    ;

    var err = function err() {};

    var warn = function warn() {};

    if (window.console) {
        err = function err() {
            var method = console.error ? 'error' : 'log';
            window.console[method].apply(window.console, Array.prototype.slice.call(arguments));
        };

        warn = function warn() {
            var method = console.warn ? 'warn' : 'log';
            window.console[method].apply(window.console, Array.prototype.slice.call(arguments));
        };
    }
    /**
     * Previously, Modernizr.load was an alias for yepnope. Since yepnope was
     * deprecated, we removed it as well. It is not available on the website builder,
     * this is only included as an improved warning to those who build a custom
     * version locally.
     *
     * @memberOf Modernizr
     * @name Modernizr.load
     * @function load
     * @returns {void}
     */


    ModernizrProto.load = function() {
        if ('yepnope' in window) {
            warn('yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. yepnope appears to be available on the page, so we’ll use it to handle this call to Modernizr.load, but please update your code to use yepnope directly.\n See http://github.com/Modernizr/Modernizr/issues/1182 for more information.');
            window.yepnope.apply(window, [].slice.call(arguments, 0));
        } else {
            err('yepnope.js (aka Modernizr.load) is no longer included as part of Modernizr. Get it from http://yepnopejs.com. See http://github.com/Modernizr/Modernizr/issues/1182 for more information.');
        }
    };
    /**
     * getBody returns the body of a document, or an element that can stand in for
     * the body if a real body does not exist
     *
     * @access private
     * @function getBody
     * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
     * artificially created element that stands in for the body
     */


    function getBody() {
        // After page load injecting a fake body doesn't work so check if body exists
        var body = document.body;

        if (!body) {
            // Can't use the real body create a fake one.
            body = createElement(isSVG ? 'svg' : 'body');
            body.fake = true;
        }

        return body;
    }

    ;
    /**
     * injectElementWithStyles injects an element with style element and some CSS rules
     *
     * @access private
     * @function injectElementWithStyles
     * @param {string} rule - String representing a css rule
     * @param {Function} callback - A function that is used to test the injected element
     * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
     * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
     * @returns {boolean} the result of the specified callback test
     */

    function injectElementWithStyles(rule, callback, nodes, testnames) {
        var mod = 'modernizr';
        var style;
        var ret;
        var node;
        var docOverflow;
        var div = createElement('div');
        var body = getBody();

        if (parseInt(nodes, 10)) {
            // In order not to give false positives we create a node for each test
            // This also allows the method to scale for unspecified uses
            while (nodes--) {
                node = createElement('div');
                node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                div.appendChild(node);
            }
        }

        style = createElement('style');
        style.type = 'text/css';
        style.id = 's' + mod; // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
        // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270

        (!body.fake ? div : body).appendChild(style);
        body.appendChild(div);

        if (style.styleSheet) {
            style.styleSheet.cssText = rule;
        } else {
            style.appendChild(document.createTextNode(rule));
        }

        div.id = mod;

        if (body.fake) {
            //avoid crashing IE8, if background image is used
            body.style.background = ''; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

            body.style.overflow = 'hidden';
            docOverflow = docElement.style.overflow;
            docElement.style.overflow = 'hidden';
            docElement.appendChild(body);
        }

        ret = callback(div, rule); // If this is done after page load we don't want to remove the body so check if body exists

        if (body.fake) {
            body.parentNode.removeChild(body);
            docElement.style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
            // eslint-disable-next-line

            docElement.offsetHeight;
        } else {
            div.parentNode.removeChild(div);
        }

        return !!ret;
    }

    ;
    /**
     * Modernizr.mq tests a given media query, live against the current state of the window
     * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
     * gist.github.com/786768
     *
     * @memberOf Modernizr
     * @name Modernizr.mq
     * @optionName Modernizr.mq()
     * @optionProp mq
     * @access public
     * @function mq
     * @param {string} mq - String of the media query we want to test
     * @returns {boolean}
     * @example
     * Modernizr.mq allows for you to programmatically check if the current browser
     * window state matches a media query.
     *
     * ```js
     *  var query = Modernizr.mq('(min-width: 900px)');
     *
     *  if (query) {
     *    // the browser window is larger than 900px
     *  }
     * ```
     *
     * Only valid media queries are supported, therefore you must always include values
     * with your media query
     *
     * ```js
     * // good
     *  Modernizr.mq('(min-width: 900px)');
     *
     * // bad
     *  Modernizr.mq('min-width');
     * ```
     *
     * If you would just like to test that media queries are supported in general, use
     *
     * ```js
     *  Modernizr.mq('only all'); // true if MQ are supported, false if not
     * ```
     *
     * Note that if the browser does not support media queries (e.g. old IE) mq will
     * always return false.
     */

    var mq = function() {
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
                bool = (window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle).position === 'absolute';
            });
            return bool;
        };
    }();

    ModernizrProto.mq = mq;
    /**
     * contains checks to see if a string contains another string
     *
     * @access private
     * @function contains
     * @param {string} str - The string we want to check for substrings
     * @param {string} substr - The substring we want to search the first string for
     * @returns {boolean} true if and only if the first string 'str' contains the second string 'substr'
     */

    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    ;
    /**
     * Create our "modernizr" element that we do most feature tests on.
     *
     * @access private
     */

    var modElem = {
        elem: createElement('modernizr')
    }; // Clean up this element

    Modernizr._q.push(function() {
        delete modElem.elem;
    });

    var mStyle = {
        style: modElem.elem.style
    }; // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
    // the front of the queue.

    Modernizr._q.unshift(function() {
        delete mStyle.style;
    });
    /**
     * domToCSS takes a camelCase string and converts it to kebab-case
     * e.g. boxSizing -> box-sizing
     *
     * @access private
     * @function domToCSS
     * @param {string} name - String name of camelCase prop we want to convert
     * @returns {string} The kebab-case version of the supplied name
     */


    function domToCSS(name) {
        return name.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
    }

    ;
    /**
     * wrapper around getComputedStyle, to fix issues with Firefox returning null when
     * called inside of a hidden iframe
     *
     * @access private
     * @function computedStyle
     * @param {HTMLElement|SVGElement} elem - The element we want to find the computed styles of
     * @param {string|null} [pseudo] - An optional pseudo element selector (e.g. :before), of null if none
     * @param {string} prop - A CSS property
     * @returns {CSSStyleDeclaration} the value of the specified CSS property
     */

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
    /**
     * nativeTestProps allows for us to use native feature detection functionality if available.
     * some prefixed form, or false, in the case of an unsupported rule
     *
     * @access private
     * @function nativeTestProps
     * @param {array} props - An array of property names
     * @param {string} value - A string representing the value we want to check via @supports
     * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
     */
    // Accepts a list of property names and a single value
    // Returns `undefined` if native detection not available

    function nativeTestProps(props, value) {
        var i = props.length; // Start with the JS API: https://www.w3.org/TR/css3-conditional/#the-css-interface

        if ('CSS' in window && 'supports' in window.CSS) {
            // Try every prefixed variant of the property
            while (i--) {
                if (window.CSS.supports(domToCSS(props[i]), value)) {
                    return true;
                }
            }

            return false;
        } // Otherwise fall back to at-rule (for Opera 12.x)
        else if ('CSSSupportsRule' in window) {
            // Build a condition string for every prefixed variant
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
    }

    ;
    /**
     * cssToDOM takes a kebab-case string and converts it to camelCase
     * e.g. box-sizing -> boxSizing
     *
     * @access private
     * @function cssToDOM
     * @param {string} name - String name of kebab-case prop we want to convert
     * @returns {string} The camelCase version of the supplied name
     */

    function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
            return m1 + m2.toUpperCase();
        }).replace(/^-/, '');
    }

    ; // testProps is a generic CSS / DOM property test.
    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.
    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.
    // Property names can be provided in either camelCase or kebab-case.

    function testProps(props, prefixed, value, skipValueTest) {
        skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest; // Try native detect first

        if (!is(value, 'undefined')) {
            var result = nativeTestProps(props, value);

            if (!is(result, 'undefined')) {
                return result;
            }
        } // Otherwise do it properly


        var afterInit, i, propsLength, prop, before; // If we don't have a style element, that means we're running async or after
        // the core tests, so we'll need to create our own elements to use
        // inside of an SVG element, in certain browsers, the `style` element is only
        // defined for valid tags. Therefore, if `modernizr` does not have one, we
        // fall back to a less used element and hope for the best.
        // for strict XHTML browsers the hardly used samp element is used

        var elems = ['modernizr', 'tspan', 'samp'];

        while (!mStyle.style && elems.length) {
            afterInit = true;
            mStyle.modElem = createElement(elems.shift());
            mStyle.style = mStyle.modElem.style;
        } // Delete the objects if we created them.


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
                // If value to test has been passed in, do a set-and-check test.
                // 0 (integer) is a valid property value, so check that `value` isn't
                // undefined, rather than just checking it's truthy.
                if (!skipValueTest && !is(value, 'undefined')) {
                    // Needs a try catch block because of old IE. This is slow, but will
                    // be avoided in most cases because `skipValueTest` will be used.
                    try {
                        mStyle.style[prop] = value;
                    } catch (e) {} // If the property value has changed, we assume the value used is
                    // supported. If `value` is empty string, it'll fail here (because
                    // it hasn't changed), which matches how browsers have implemented
                    // CSS.supports()


                    if (mStyle.style[prop] !== before) {
                        cleanElems();
                        return prefixed === 'pfx' ? prop : true;
                    }
                } // Otherwise just return true, or the property name if this is a
                // `prefixed()` call
                else {
                    cleanElems();
                    return prefixed === 'pfx' ? prop : true;
                }
            }
        }

        cleanElems();
        return false;
    }

    ;
    /**
     * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
     *
     * @access private
     * @function fnBind
     * @param {Function} fn - a function you want to change `this` reference to
     * @param {Object} that - the `this` you want to call the function with
     * @returns {Function} The wrapped version of the supplied function
     */

    function fnBind(fn, that) {
        return function() {
            return fn.apply(that, arguments);
        };
    }

    ;
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     *
     * @access private
     * @function testDOMProps
     * @param {Array<string>} props - An array of properties to test for
     * @param {Object} obj - An object or Element you want to use to test the parameters again
     * @param {boolean|Object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
     * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
     */

    function testDOMProps(props, obj, elem) {
        var item;

        for (var i in props) {
            if (props[i] in obj) {
                // return the property name as a string
                if (elem === false) {
                    return props[i];
                }

                item = obj[props[i]]; // let's bind a function

                if (is(item, 'function')) {
                    // bind to obj unless overridden
                    return fnBind(item, elem || obj);
                } // return the unbound function or obj or value


                return item;
            }
        }

        return false;
    }

    ;
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     * We specify literally ALL possible (known and/or likely) properties on
     * the element including the non-vendor prefixed one, for forward-
     * compatibility.
     *
     * @access private
     * @function testPropsAll
     * @param {string} prop - A string of the property to test for
     * @param {string|Object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
     * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
     * @param {string} [value] - A string of a css value
     * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
     * @returns {false|string} returns the string version of the property, or false if it is unsupported
     */

    function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' '); // did they call .prefixed('boxSizing') or are we just testing a prop?

        if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
            return testProps(props, prefixed, value, skipValueTest); // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
            props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    } // Modernizr.testAllProps() investigates whether a given style property,
    // or any of its vendor-prefixed variants, is recognized
    //
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')


    ModernizrProto.testAllProps = testPropsAll;
    /**
     * prefixed returns the prefixed or nonprefixed property name variant of your input
     *
     * @memberOf Modernizr
     * @name Modernizr.prefixed
     * @optionName Modernizr.prefixed()
     * @optionProp prefixed
     * @access public
     * @function prefixed
     * @param {string} prop - String name of the property to test for
     * @param {Object} [obj] - An object to test for the prefixed properties on
     * @param {HTMLElement} [elem] - An element used to test specific properties against
     * @returns {string|false} The string representing the (possibly prefixed) valid
     * version of the property, or `false` when it is unsupported.
     * @example
     *
     * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
     * opposed to the css style kebab-case) form and returns the (possibly prefixed)
     * version of that property that the browser actually supports.
     *
     * For example, in older Firefox...
     * ```js
     * prefixed('boxSizing')
     * ```
     * returns 'MozBoxSizing'
     *
     * In newer Firefox, as well as any other browser that support the unprefixed
     * version would simply return `boxSizing`. Any browser that does not support
     * the property at all, it will return `false`.
     *
     * By default, prefixed is checked against a DOM element. If you want to check
     * for a property on another object, just pass it as a second argument
     *
     * ```js
     * var rAF = prefixed('requestAnimationFrame', window);
     *
     * raf(function() {
     *  renderFunction();
     * })
     * ```
     *
     * Note that this will return _the actual function_ - not the name of the function.
     * If you need the actual name of the property, pass in `false` as a third argument
     *
     * ```js
     * var rAFProp = prefixed('requestAnimationFrame', window, false);
     *
     * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
     * ```
     *
     * One common use case for prefixed is if you're trying to determine which transition
     * end event to bind to, you might do something like...
     * ```js
     * var transEndEventNames = {
     *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
     *     'MozTransition'    : 'transitionend',       * only for FF < 15
     *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
     * };
     *
     * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
     * ```
     *
     * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
     */

    var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
        if (prop.indexOf('@') === 0) {
            return atRule(prop);
        }

        if (prop.indexOf('-') !== -1) {
            // Convert kebab-case to camelCase
            prop = cssToDOM(prop);
        }

        if (!obj) {
            return testPropsAll(prop, 'pfx');
        } else {
            // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
            return testPropsAll(prop, obj, elem);
        }
    };
    /**
     * List of property values to set for css tests. See ticket #21
     * https://github.com/modernizr/modernizr/issues/21
     *
     * @memberOf Modernizr
     * @name Modernizr._prefixes
     * @optionName Modernizr._prefixes
     * @optionProp prefixes
     * @access public
     * @example
     *
     * Modernizr._prefixes is the internal list of prefixes that we test against
     * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
     * an array of kebab-case vendor prefixes you can use within your code.
     *
     * Some common use cases include
     *
     * Generating all possible prefixed version of a CSS property
     * ```js
     * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
     *
     * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
     * ```
     *
     * Generating all possible prefixed version of a CSS value
     * ```js
     * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
     *
     * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
     * ```
     */
    // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
    // values in feature detects to continue to work


    var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', '']; // expose these for the plugin API. Look in the source for how to join() them against your input

    ModernizrProto._prefixes = prefixes;
    /**
     * prefixedCSS is just like [prefixed](#modernizr-prefixed), but the returned values are in
     * kebab-case (e.g. `box-sizing`) rather than camelCase (boxSizing).
     *
     * @memberOf Modernizr
     * @name Modernizr.prefixedCSS
     * @optionName Modernizr.prefixedCSS()
     * @optionProp prefixedCSS
     * @access public
     * @function prefixedCSS
     * @param {string} prop - String name of the property to test for
     * @returns {string|false} The string representing the (possibly prefixed)
     * valid version of the property, or `false` when it is unsupported.
     * @example
     *
     * `Modernizr.prefixedCSS` is like `Modernizr.prefixed`, but returns the result
     * in hyphenated form
     *
     * ```js
     * Modernizr.prefixedCSS('transition') // '-moz-transition' in old Firefox
     * ```
     *
     * Since it is only useful for CSS style properties, it can only be tested against
     * an HTMLElement.
     *
     * Properties can be passed as both the DOM style camelCase or CSS style kebab-case.
     */

    var prefixedCSS = ModernizrProto.prefixedCSS = function(prop) {
        var prefixedProp = prefixed(prop);
        return prefixedProp && domToCSS(prefixedProp);
    };
    /**
     * testAllProps determines whether a given CSS property is supported in the browser
     *
     * @memberOf Modernizr
     * @name Modernizr.testAllProps
     * @optionName Modernizr.testAllProps()
     * @optionProp testAllProps
     * @access public
     * @function testAllProps
     * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
     * @param {string} [value] - String of the value to test
     * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
     * @returns {false|string} returns the string version of the property, or false if it is unsupported
     * @example
     *
     * testAllProps determines whether a given CSS property, in some prefixed form,
     * is supported by the browser.
     *
     * ```js
     * testAllProps('boxSizing')  // true
     * ```
     *
     * It can optionally be given a CSS value in string form to test if a property
     * value is valid
     *
     * ```js
     * testAllProps('display', 'block') // true
     * testAllProps('display', 'penguin') // false
     * ```
     *
     * A boolean can be passed as a third parameter to skip the value check when
     * native detection (@supports) isn't available.
     *
     * ```js
     * testAllProps('shapeOutside', 'content-box', true);
     * ```
     */


    function testAllProps(prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest);
    }

    ModernizrProto.testAllProps = testAllProps;
    /**
     * testProp() investigates whether a given style property is recognized
     * Property names can be provided in either camelCase or kebab-case.
     *
     * @memberOf Modernizr
     * @name Modernizr.testProp
     * @access public
     * @optionName Modernizr.testProp()
     * @optionProp testProp
     * @function testProp
     * @param {string} prop - Name of the CSS property to check
     * @param {string} [value] - Name of the CSS value to check
     * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
     * @returns {boolean} an empty string if the property is supported, undefined if its unsupported
     * @example
     *
     * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
     * version of the string.
     *
     * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
     *
     * ```js
     * Modernizr.testProp('pointerEvents')  // true
     * ```
     *
     * You can also provide a value as an optional second argument to check if a
     * specific value is supported
     *
     * ```js
     * Modernizr.testProp('pointerEvents', 'none') // true
     * Modernizr.testProp('pointerEvents', 'penguin') // false
     * ```
     */

    var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
        return testProps([prop], undefined, value, useValue);
    };
    /**
     * testStyles injects an element with style element and some CSS rules
     *
     * @memberOf Modernizr
     * @name Modernizr.testStyles
     * @optionName Modernizr.testStyles()
     * @optionProp testStyles
     * @access public
     * @function testStyles
     * @param {string} rule - String representing a css rule
     * @param {function} callback - A function that is used to test the injected element
     * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
     * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
     * @returns {boolean}
     * @example
     *
     * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
     * along with (possibly multiple) DOM elements. This lets you check for features
     * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
     *
     * ```js
     * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
     *   // elem is the first DOM node in the page (by default #modernizr)
     *   // rule is the first argument you supplied - the CSS rule in string form
     *
     *   addTest('widthworks', elem.style.width === '9px')
     * });
     * ```
     *
     * If your test requires multiple nodes, you can include a third argument
     * indicating how many additional div elements to include on the page. The
     * additional nodes are injected as children of the `elem` that is returned as
     * the first argument to the callback.
     *
     * ```js
     * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
     *   document.getElementById('modernizr').style.width === '1px'; // true
     *   document.getElementById('modernizr2').style.width === '2px'; // true
     *   elem.firstChild === document.getElementById('modernizr2'); // true
     * }, 1);
     * ```
     *
     * By default, all of the additional elements have an ID of `modernizr[n]`, where
     * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
     * the second additional is `#modernizr3`, etc.).
     * If you want to have more meaningful IDs for your function, you can provide
     * them as the fourth argument, as an array of strings
     *
     * ```js
     * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
     *   elem.firstChild === document.getElementById('foo'); // true
     *   elem.lastChild === document.getElementById('bar'); // true
     * }, 2, ['foo', 'bar']);
     * ```
     */


    var testStyles = ModernizrProto.testStyles = injectElementWithStyles; // Run each test

    testRunner(); // Remove the "no-js" class if it exists

    setClasses(classes);
    delete ModernizrProto.addTest;
    delete ModernizrProto.addAsyncTest; // Run the things that are supposed to run after the tests

    for (var i = 0; i < Modernizr._q.length; i++) {
        Modernizr._q[i]();
    } // Leak Modernizr namespace


    window.Modernizr = Modernizr;;
})(window, document);
var exports = {};
"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

/*!
 * Bootstrap v4.3.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function(global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) : typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) : (global = global || self, factory(global.bootstrap = {}, global.jQuery));
})(void 0, function(exports, $) {
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
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */


    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
        return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                }

                return undefined; // eslint-disable-line no-undefined
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
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
            do {
                // eslint-disable-next-line no-bitwise
                prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
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
            } // Get transition-duration of the element


            var transitionDuration = $(element).css('transition-duration');
            var transitionDelay = $(element).css('transition-delay');
            var floatTransitionDuration = parseFloat(transitionDuration);
            var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

            if (!floatTransitionDuration && !floatTransitionDelay) {
                return 0;
            } // If multiple durations are defined, take the first


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
        // TODO: Remove in v5
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
            } // Can find the shadow root otherwise it'll return the document


            if (typeof element.getRootNode === 'function') {
                var root = element.getRootNode();
                return root instanceof ShadowRoot ? root : null;
            }

            if (element instanceof ShadowRoot) {
                return element;
            } // when we don't find a shadow root


            if (!element.parentNode) {
                return null;
            }

            return Util.findShadowRoot(element.parentNode);
        }
    };
    setTransitionEndSupport();
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Alert =
        /*#__PURE__*/
        function() {
            function Alert(element) {
                this._element = element;
            } // Getters


            var _proto = Alert.prototype; // Public

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
            } // Private
            ;

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
            } // Static
            ;

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Button =
        /*#__PURE__*/
        function() {
            function Button(element) {
                this._element = element;
            } // Getters


            var _proto = Button.prototype; // Public

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
            } // Static
            ;

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$1] = Button._jQueryInterface;
    $.fn[NAME$1].Constructor = Button;

    $.fn[NAME$1].noConflict = function() {
        $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
        return Button._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME$2 = 'carousel';
    var VERSION$2 = '4.3.1';
    var DATA_KEY$2 = 'bs.carousel';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$2 = '.data-api';
    var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Carousel =
        /*#__PURE__*/
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
            } // Getters


            var _proto = Carousel.prototype; // Public

            _proto.next = function next() {
                if (!this._isSliding) {
                    this._slide(Direction.NEXT);
                }
            };

            _proto.nextWhenVisible = function nextWhenVisible() {
                // Don't call next when the page isn't visible
                // or the carousel or its parent isn't visible
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
            } // Private
            ;

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

                var direction = absDeltax / this.touchDeltaX; // swipe left

                if (direction > 0) {
                    this.prev();
                } // swipe right


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
                    // ensure swiping with one touch and not pinching
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
                        // If it's a touch-enabled device, mouseenter/leave are fired as
                        // part of the mouse compatibility events on first tap - the carousel
                        // would stop cycling until user tapped out of it;
                        // here, we listen for touchend, explicitly pause the carousel
                        // (as if it's the second time we tap on it, mouseenter compat event
                        // is NOT fired) and after a timeout (to allow for mouse compatibility
                        // events to fire) we explicitly restart cycling
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
                    // Some weirdness is happening, so we bail
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
            } // Static
            ;

            Carousel._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$2);

                    var _config = _objectSpread({}, Default, $(this).data());

                    if (_typeof(config) === 'object') {
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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event$2.LOAD_DATA_API, function() {
        var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

        for (var i = 0, len = carousels.length; i < len; i++) {
            var $carousel = $(carousels[i]);

            Carousel._jQueryInterface.call($carousel, $carousel.data());
        }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$2] = Carousel._jQueryInterface;
    $.fn[NAME$2].Constructor = Carousel;

    $.fn[NAME$2].noConflict = function() {
        $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
        return Carousel._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Collapse =
        /*#__PURE__*/
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
            } // Getters


            var _proto = Collapse.prototype; // Public

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
            } // Private
            ;

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$1, config);
                config.toggle = Boolean(config.toggle); // Coerce string values

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
                    parent = this._config.parent; // It's a jQuery object

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
            } // Static
            ;

            Collapse._getTargetFromElement = function _getTargetFromElement(element) {
                var selector = Util.getSelectorFromElement(element);
                return selector ? document.querySelector(selector) : null;
            };

            Collapse._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY$3);

                    var _config = _objectSpread({}, Default$1, $this.data(), _typeof(config) === 'object' && config ? config : {});

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function(event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$3] = Collapse._jQueryInterface;
    $.fn[NAME$3].Constructor = Collapse;

    $.fn[NAME$3].noConflict = function() {
        $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
        return Collapse._jQueryInterface;
    };
    /**!
     * @fileOverview Kickass library to create and place poppers near their reference elements.
     * @version 1.14.7
     * @license
     * Copyright (c) 2016 Federico Zivolo and contributors
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */


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
    /**
     * Create a debounced version of a method, that's asynchronously deferred
     * but called in the minimum time possible.
     *
     * @method
     * @memberof Popper.Utils
     * @argument {Function} fn
     * @returns {Function}
     */

    var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
    /**
     * Check if the given variable is a function
     * @method
     * @memberof Popper.Utils
     * @argument {Any} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */

    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    /**
     * Get CSS computed property of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Eement} element
     * @argument {String} property
     */


    function getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
            return [];
        } // NOTE: 1 DOM access here


        var window = element.ownerDocument.defaultView;
        var css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }
    /**
     * Returns the parentNode or the host of the element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} parent
     */


    function getParentNode(element) {
        if (element.nodeName === 'HTML') {
            return element;
        }

        return element.parentNode || element.host;
    }
    /**
     * Returns the scrolling parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} scroll parent
     */


    function getScrollParent(element) {
        // Return body, `getScroll` will take care to get the correct `scrollTop` from it
        if (!element) {
            return document.body;
        }

        switch (element.nodeName) {
            case 'HTML':
            case 'BODY':
                return element.ownerDocument.body;

            case '#document':
                return element.body;
        } // Firefox want us to check `-x` and `-y` variations as well


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
    /**
     * Determines if the browser is Internet Explorer
     * @method
     * @memberof Popper.Utils
     * @param {Number} version to check
     * @returns {Boolean} isIE
     */

    function isIE(version) {
        if (version === 11) {
            return isIE11;
        }

        if (version === 10) {
            return isIE10;
        }

        return isIE11 || isIE10;
    }
    /**
     * Returns the offset parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} offset parent
     */


    function getOffsetParent(element) {
        if (!element) {
            return document.documentElement;
        }

        var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

        var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

        while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
        }

        var nodeName = offsetParent && offsetParent.nodeName;

        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
        } // .offsetParent will return the closest TH, TD or TABLE in case
        // no offsetParent is present, I hate this job...


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
    /**
     * Finds the root node (document, shadowDOM root) of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} node
     * @returns {Element} root node
     */


    function getRoot(node) {
        if (node.parentNode !== null) {
            return getRoot(node.parentNode);
        }

        return node;
    }
    /**
     * Finds the offset parent common to the two provided nodes
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element1
     * @argument {Element} element2
     * @returns {Element} common offset parent
     */


    function findCommonOffsetParent(element1, element2) {
        // This check is needed to avoid errors in case one of the elements isn't defined for any reason
        if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return document.documentElement;
        } // Here we make sure to give as "start" the element that comes first in the DOM


        var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
        var start = order ? element1 : element2;
        var end = order ? element2 : element1; // Get common ancestor container

        var range = document.createRange();
        range.setStart(start, 0);
        range.setEnd(end, 0);
        var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

        if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
            if (isOffsetContainer(commonAncestorContainer)) {
                return commonAncestorContainer;
            }

            return getOffsetParent(commonAncestorContainer);
        } // one of the nodes is inside shadowDOM, find which one


        var element1root = getRoot(element1);

        if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
        } else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
        }
    }
    /**
     * Gets the scroll value of the given element in the given side (top and left)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {String} side `top` or `left`
     * @returns {number} amount of scrolled pixels
     */


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
    /*
     * Sum or subtract the element scroll values (left and top) from a given rect object
     * @method
     * @memberof Popper.Utils
     * @param {Object} rect - Rect object you want to change
     * @param {HTMLElement} element - The element from the function reads the scroll values
     * @param {Boolean} subtract - set to true if you want to subtract the scroll values
     * @return {Object} rect - The modifier rect object
     */


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
    /*
     * Helper to detect borders of a given element
     * @method
     * @memberof Popper.Utils
     * @param {CSSStyleDeclaration} styles
     * Result of `getStyleComputedProperty` on the given element
     * @param {String} axis - `x` or `y`
     * @return {number} borders - The borders size of the given axis
     */


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

    var classCallCheck = function classCallCheck(instance, Constructor) {
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

    var defineProperty = function defineProperty(obj, key, value) {
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
    /**
     * Given element offsets, generate an output similar to getBoundingClientRect
     * @method
     * @memberof Popper.Utils
     * @argument {Object} offsets
     * @returns {Object} ClientRect like output
     */


    function getClientRect(offsets) {
        return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
        });
    }
    /**
     * Get bounding client rect of given element
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} element
     * @return {Object} client rect
     */


    function getBoundingClientRect(element) {
        var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
        // considered in DOM in some circumstances...
        // This isn't reproducible in IE10 compatibility mode of IE11

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
        }; // subtract scrollbar size from sizes

        var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
        var width = sizes.width || element.clientWidth || result.right - result.left;
        var height = sizes.height || element.clientHeight || result.bottom - result.top;
        var horizScrollbar = element.offsetWidth - width;
        var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
        // we make this check conditional for performance reasons

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
        var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

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
        offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
        // we do this only on HTML because it's the only element that behaves
        // differently when margins are applied to it. The margins are included in
        // the box of the documentElement, in the other cases not.

        if (!isIE10 && isHTML) {
            var marginTop = parseFloat(styles.marginTop, 10);
            var marginLeft = parseFloat(styles.marginLeft, 10);
            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

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
    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */


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
    /**
     * Finds the first parent of an element that has a transformed property defined
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} first transformed parent or documentElement
     */


    function getFixedPositionOffsetParent(element) {
        // This check is needed to avoid errors in case one of the elements isn't defined for any reason
        if (!element || !element.parentElement || isIE()) {
            return document.documentElement;
        }

        var el = element.parentElement;

        while (el && getStyleComputedProperty(el, 'transform') === 'none') {
            el = el.parentElement;
        }

        return el || document.documentElement;
    }
    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} popper
     * @param {HTMLElement} reference
     * @param {number} padding
     * @param {HTMLElement} boundariesElement - Element used to define the boundaries
     * @param {Boolean} fixedPosition - Is in fixed position mode
     * @returns {Object} Coordinates of the boundaries
     */


    function getBoundaries(popper, reference, padding, boundariesElement) {
        var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

        var boundaries = {
            top: 0,
            left: 0
        };
        var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

        if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
        } else {
            // Handle other cases based on DOM element used as boundaries
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

            var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
                var _getWindowSizes = getWindowSizes(popper.ownerDocument),
                    height = _getWindowSizes.height,
                    width = _getWindowSizes.width;

                boundaries.top += offsets.top - offsets.marginTop;
                boundaries.bottom = height + offsets.top;
                boundaries.left += offsets.left - offsets.marginLeft;
                boundaries.right = width + offsets.left;
            } else {
                // for all the other DOM elements, this one is good
                boundaries = offsets;
            }
        } // Add paddings


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
    /**
     * Utility used to transform the `auto` placement to the placement with more
     * available space.
     * @method
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


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
    /**
     * Get offsets to the reference element
     * @method
     * @memberof Popper.Utils
     * @param {Object} state
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @param {Element} fixedPosition - is in fixed position mode
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */


    function getReferenceOffsets(state, popper, reference) {
        var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
        return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }
    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */


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
    /**
     * Get the opposite placement of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement
     * @returns {String} flipped placement
     */


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
    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper.Utils
     * @param {Object} position - CSS position the Popper will get applied
     * @param {HTMLElement} popper - the popper element
     * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
     * @param {String} placement - one of the valid placement options
     * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
     */


    function getPopperOffsets(popper, referenceOffsets, placement) {
        placement = placement.split('-')[0]; // Get popper node sizes

        var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

        var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
        }; // depending by the popper placement we have to compute its offsets slightly differently

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
    /**
     * Mimics the `find` method of Array
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */


    function find(arr, check) {
        // use native find if supported
        if (Array.prototype.find) {
            return arr.find(check);
        } // use `filter` to obtain the same behavior of `find`


        return arr.filter(check)[0];
    }
    /**
     * Return the index of the matching object
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */


    function findIndex(arr, prop, value) {
        // use native findIndex if supported
        if (Array.prototype.findIndex) {
            return arr.findIndex(function(cur) {
                return cur[prop] === value;
            });
        } // use `find` + `indexOf` if `findIndex` isn't supported


        var match = find(arr, function(obj) {
            return obj[prop] === value;
        });
        return arr.indexOf(match);
    }
    /**
     * Loop trough the list of modifiers and run them in order,
     * each of them will then edit the data object.
     * @method
     * @memberof Popper.Utils
     * @param {dataObject} data
     * @param {Array} modifiers
     * @param {String} ends - Optional modifier name used as stopper
     * @returns {dataObject}
     */


    function runModifiers(modifiers, data, ends) {
        var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
        modifiersToRun.forEach(function(modifier) {
            if (modifier['function']) {
                // eslint-disable-line dot-notation
                console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }

            var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

            if (modifier.enabled && isFunction(fn)) {
                // Add properties to offsets to make them a complete clientRect object
                // we do this before each modifier to make sure the previous one doesn't
                // mess with these values
                data.offsets.popper = getClientRect(data.offsets.popper);
                data.offsets.reference = getClientRect(data.offsets.reference);
                data = fn(data, modifier);
            }
        });
        return data;
    }
    /**
     * Updates the position of the popper, computing the new offsets and applying
     * the new style.<br />
     * Prefer `scheduleUpdate` over `update` because of performance reasons.
     * @method
     * @memberof Popper
     */


    function update() {
        // if popper is destroyed, don't perform any further update
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
        }; // compute reference element offsets

        data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
        // modifiers will be able to edit `placement` if needed
        // and refer to originalPlacement to know the original value

        data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

        data.originalPlacement = data.placement;
        data.positionFixed = this.options.positionFixed; // compute the popper offsets

        data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
        data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

        data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
        // the other ones will call `onUpdate` callback

        if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
        } else {
            this.options.onUpdate(data);
        }
    }
    /**
     * Helper used to know if the given modifier is enabled.
     * @method
     * @memberof Popper.Utils
     * @returns {Boolean}
     */


    function isModifierEnabled(modifiers, modifierName) {
        return modifiers.some(function(_ref) {
            var name = _ref.name,
                enabled = _ref.enabled;
            return enabled && name === modifierName;
        });
    }
    /**
     * Get the prefixed supported property name
     * @method
     * @memberof Popper.Utils
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
     */


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
    /**
     * Destroys the popper.
     * @method
     * @memberof Popper
     */


    function destroy() {
        this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

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

        this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
        // do not use `remove` because IE11 doesn't support it

        if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
        }

        return this;
    }
    /**
     * Get the window associated with the element
     * @argument {Element} element
     * @returns {Window}
     */


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
    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */


    function setupEventListeners(reference, options, state, updateBound) {
        // Resize event listener on window
        state.updateBound = updateBound;
        getWindow(reference).addEventListener('resize', state.updateBound, {
            passive: true
        }); // Scroll event listener on scroll parents

        var scrollElement = getScrollParent(reference);
        attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
        state.scrollElement = scrollElement;
        state.eventsEnabled = true;
        return state;
    }
    /**
     * It will add resize/scroll events and start recalculating
     * position of the popper element when they are triggered.
     * @method
     * @memberof Popper
     */


    function enableEventListeners() {
        if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
        }
    }
    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */


    function removeEventListeners(reference, state) {
        // Remove resize event listener on window
        getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

        state.scrollParents.forEach(function(target) {
            target.removeEventListener('scroll', state.updateBound);
        }); // Reset state

        state.updateBound = null;
        state.scrollParents = [];
        state.scrollElement = null;
        state.eventsEnabled = false;
        return state;
    }
    /**
     * It will remove resize/scroll events and won't recalculate popper position
     * when they are triggered. It also won't trigger `onUpdate` callback anymore,
     * unless you call `update` method manually.
     * @method
     * @memberof Popper
     */


    function disableEventListeners() {
        if (this.state.eventsEnabled) {
            cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
        }
    }
    /**
     * Tells if a given input is a number
     * @method
     * @memberof Popper.Utils
     * @param {*} input to check
     * @return {Boolean}
     */


    function isNumeric(n) {
        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }
    /**
     * Set the style to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */


    function setStyles(element, styles) {
        Object.keys(styles).forEach(function(prop) {
            var unit = ''; // add unit if the value is numeric and is one of the following

            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
                unit = 'px';
            }

            element.style[prop] = styles[prop] + unit;
        });
    }
    /**
     * Set the attributes to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the attributes to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */


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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} data.styles - List of style properties - values to apply to popper element
     * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The same data object
     */


    function applyStyle(data) {
        // any property present in `data.styles` will be applied to the popper,
        // in this way we can make the 3rd party modifiers add custom styles to it
        // Be aware, modifiers could override the properties defined in the previous
        // lines of this modifier!
        setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
        // they will be set as HTML attributes of the element

        setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

        if (data.arrowElement && Object.keys(data.arrowStyles).length) {
            setStyles(data.arrowElement, data.arrowStyles);
        }

        return data;
    }
    /**
     * Set the x-placement attribute before everything else because it could be used
     * to add margins to the popper margins needs to be calculated to get the
     * correct popper offsets.
     * @method
     * @memberof Popper.modifiers
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper
     * @param {Object} options - Popper.js options
     */


    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
        // compute reference element offsets
        var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
        // modifiers will be able to edit `placement` if needed
        // and refer to originalPlacement to know the original value

        var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
        popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
        // without the position applied we can't guarantee correct computations

        setStyles(popper, {
            position: options.positionFixed ? 'fixed' : 'absolute'
        });
        return options;
    }
    /**
     * @function
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Boolean} shouldRound - If the offsets should be rounded at all
     * @returns {Object} The popper's position offsets rounded
     *
     * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
     * good as it can be within reason.
     * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
     *
     * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
     * as well on High DPI screens).
     *
     * Firefox prefers no rounding for positioning and does not have blurriness on
     * high DPI screens.
     *
     * Only horizontal placement and left/right values need to be considered.
     */


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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */

    function computeStyle(data, options) {
        var x = options.x,
            y = options.y;
        var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

        var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
            return modifier.name === 'applyStyle';
        }).gpuAcceleration;

        if (legacyGpuAccelerationOption !== undefined) {
            console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
        }

        var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
        var offsetParent = getOffsetParent(data.instance.popper);
        var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

        var styles = {
            position: popper.position
        };
        var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
        var sideA = x === 'bottom' ? 'top' : 'bottom';
        var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
        //  we use `translate3d` to apply the position to the popper we
        // automatically use the supported prefixed version if needed

        var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
        // If the content of the popper grows once it's been positioned, it
        // may happen that the popper gets misplaced because of the new content
        // overflowing its reference element
        // To avoid this problem, we provide two options (x and y), which allow
        // the consumer to define the offset origin.
        // If we position a popper on top of a reference element, we can set
        // `x` to `top` to make the popper grow towards its top instead of
        // its bottom.

        var left = void 0,
            top = void 0;

        if (sideA === 'bottom') {
            // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
            // and not the bottom of the html element
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
            // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
        } // Attributes


        var attributes = {
            'x-placement': data.placement
        }; // Update `data` attributes, styles and arrowStyles

        data.attributes = _extends({}, attributes, data.attributes);
        data.styles = _extends({}, styles, data.styles);
        data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
        return data;
    }
    /**
     * Helper used to know if the given modifier depends from another one.<br />
     * It checks if the needed modifier is listed and enabled.
     * @method
     * @memberof Popper.Utils
     * @param {Array} modifiers - list of modifiers
     * @param {String} requestingName - name of requesting modifier
     * @param {String} requestedName - name of requested modifier
     * @returns {Boolean}
     */


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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


    function arrow(data, options) {
        var _data$offsets$arrow; // arrow depends on keepTogether in order to work


        if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
        }

        var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

        if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

            if (!arrowElement) {
                return data;
            }
        } else {
            // if the arrowElement isn't a query selector we must check that the
            // provided DOM node is child of its popper node
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
        var arrowElementSize = getOuterSizes(arrowElement)[len]; //
        // extends keepTogether behavior making sure the popper and its
        // reference have enough pixels in conjunction
        //
        // top/left side

        if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
        } // bottom/right side


        if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
        }

        data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

        var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
        // take popper margin in account because we don't have this info available

        var css = getStyleComputedProperty(data.instance.popper);
        var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
        var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
        var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

        sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
        data.arrowElement = arrowElement;
        data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
        return data;
    }
    /**
     * Get the opposite placement variation of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement variation
     * @returns {String} flipped placement variation
     */


    function getOppositeVariation(variation) {
        if (variation === 'end') {
            return 'start';
        } else if (variation === 'start') {
            return 'end';
        }

        return variation;
    }
    /**
     * List of accepted placements to use as values of the `placement` option.<br />
     * Valid placements are:
     * - `auto`
     * - `top`
     * - `right`
     * - `bottom`
     * - `left`
     *
     * Each placement can have a variation from this list:
     * - `-start`
     * - `-end`
     *
     * Variations are interpreted easily if you think of them as the left to right
     * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
     * is right.<br />
     * Vertically (`left` and `right`), `start` is top and `end` is bottom.
     *
     * Some valid examples are:
     * - `top-end` (on top of reference, right aligned)
     * - `right-start` (on right of reference, top aligned)
     * - `bottom` (on bottom, centered)
     * - `auto-end` (on the side with more space available, alignment depends by placement)
     *
     * @static
     * @type {Array}
     * @enum {String}
     * @readonly
     * @method placements
     * @memberof Popper
     */


    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

    var validPlacements = placements.slice(3);
    /**
     * Given an initial placement, returns all the subsequent placements
     * clockwise (or counter-clockwise).
     *
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement - A valid placement (it accepts variations)
     * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
     * @returns {Array} placements including their variations
     */

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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */

    function flip(data, options) {
        // if `inner` modifier is enabled, we can't use the `flip` modifier
        if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
        }

        if (data.flipped && data.placement === data.originalPlacement) {
            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
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
            var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

            var floor = Math.floor;
            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

            if (overlapsRef || overflowsBoundaries || flippedVariation) {
                // this boolean to detect any flip loop
                data.flipped = true;

                if (overlapsRef || overflowsBoundaries) {
                    placement = flipOrder[index + 1];
                }

                if (flippedVariation) {
                    variation = getOppositeVariation(variation);
                }

                data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
                // any additional property we may add in the future

                data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
                data = runModifiers(data.instance.modifiers, data, 'flip');
            }
        });
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


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
    /**
     * Converts a string containing value + unit into a px value number
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} str - Value + unit string
     * @argument {String} measurement - `height` or `width`
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @returns {Number|String}
     * Value in pixels, or original string if no values were extracted
     */


    function toValue(str, measurement, popperOffsets, referenceOffsets) {
        // separate value from unit
        var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
        var value = +split[1];
        var unit = split[2]; // If it's not a number it's an operator, I guess

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
            // if is a vh or vw, we calculate the size based on the viewport
            var size = void 0;

            if (unit === 'vh') {
                size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            } else {
                size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }

            return size / 100 * value;
        } else {
            // if is an explicit pixel unit, we get rid of the unit and keep the value
            // if is an implicit unit, it's px, and we return just the value
            return value;
        }
    }
    /**
     * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} offset
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @argument {String} basePlacement
     * @returns {Array} a two cells array with x and y offsets in numbers
     */


    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
        var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
        // in this way the first offset will use an axis and the second one
        // will use the other one

        var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
        // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

        var fragments = offset.split(/(\+|\-)/).map(function(frag) {
            return frag.trim();
        }); // Detect if the offset string contains a pair of values or a single one
        // they could be separated by comma or space

        var divider = fragments.indexOf(find(fragments, function(frag) {
            return frag.search(/,|\s/) !== -1;
        }));

        if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        } // If divider is found, we divide the list of values and operands to divide
        // them by ofset X and Y.


        var splitRegex = /\s*,\s*|\s+/;
        var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

        ops = ops.map(function(op, index) {
            // Most of the units rely on the orientation of the popper
            var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
            var mergeWithPrevious = false;
            return op // This aggregates any `+` or `-` sign that aren't considered operators
                // e.g.: 10 + +5 => [10, +, +5]
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
                }, []) // Here we convert the string values into number values (in px)
                .map(function(str) {
                    return toValue(str, measurement, popperOffsets, referenceOffsets);
                });
        }); // Loop trough the offsets arrays and execute the operations

        ops.forEach(function(op, index) {
            op.forEach(function(frag, index2) {
                if (isNumeric(frag)) {
                    offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
                }
            });
        });
        return offsets;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @argument {Number|String} options.offset=0
     * The offset value as described in the modifier description
     * @returns {Object} The data object, properly modified
     */


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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


    function preventOverflow(data, options) {
        var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
        // go one step up and use the next offsetParent as reference to
        // avoid to make this modifier completely useless and look like broken

        if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
        } // NOTE: DOM access here
        // resets the popper's position so that the document size can be calculated excluding
        // the size of the popper element itself


        var transformProp = getSupportedPropertyName('transform');
        var popperStyles = data.instance.popper.style; // assignment to help minification

        var top = popperStyles.top,
            left = popperStyles.left,
            transform = popperStyles[transformProp];
        popperStyles.top = '';
        popperStyles.left = '';
        popperStyles[transformProp] = '';
        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
        // restores the original style properties after the offsets have been computed

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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


    function shift(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

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
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


    function hide(data) {
        if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
        }

        var refRect = data.offsets.reference;
        var bound = find(data.instance.modifiers, function(modifier) {
            return modifier.name === 'preventOverflow';
        }).boundaries;

        if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === true) {
                return data;
            }

            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
        } else {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === false) {
                return data;
            }

            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
        }

        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */


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
    /**
     * Modifier function, each modifier can have a function of this type assigned
     * to its `fn` property.<br />
     * These functions will be called on each update, this means that you must
     * make sure they are performant enough to avoid performance bottlenecks.
     *
     * @function ModifierFn
     * @argument {dataObject} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {dataObject} The data object, properly modified
     */

    /**
     * Modifiers are plugins used to alter the behavior of your poppers.<br />
     * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
     * needed by the library.
     *
     * Usually you don't want to override the `order`, `fn` and `onLoad` props.
     * All the other properties are configurations that could be tweaked.
     * @namespace modifiers
     */


    var modifiers = {
        /**
         * Modifier used to shift the popper on the start or end of its reference
         * element.<br />
         * It will read the variation of the `placement` property.<br />
         * It can be one either `-end` or `-start`.
         * @memberof modifiers
         * @inner
         */
        shift: {
            /** @prop {number} order=100 - Index used to define the order of execution */
            order: 100,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: shift
        },

        /**
         * The `offset` modifier can shift your popper on both its axis.
         *
         * It accepts the following units:
         * - `px` or unit-less, interpreted as pixels
         * - `%` or `%r`, percentage relative to the length of the reference element
         * - `%p`, percentage relative to the length of the popper element
         * - `vw`, CSS viewport width unit
         * - `vh`, CSS viewport height unit
         *
         * For length is intended the main axis relative to the placement of the popper.<br />
         * This means that if the placement is `top` or `bottom`, the length will be the
         * `width`. In case of `left` or `right`, it will be the `height`.
         *
         * You can provide a single value (as `Number` or `String`), or a pair of values
         * as `String` divided by a comma or one (or more) white spaces.<br />
         * The latter is a deprecated method because it leads to confusion and will be
         * removed in v2.<br />
         * Additionally, it accepts additions and subtractions between different units.
         * Note that multiplications and divisions aren't supported.
         *
         * Valid examples are:
         * ```
         * 10
         * '10%'
         * '10, 10'
         * '10%, 10'
         * '10 + 10%'
         * '10 - 5vh + 3%'
         * '-10px + 5vh, 5px - 6%'
         * ```
         * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
         * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
         * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
         *
         * @memberof modifiers
         * @inner
         */
        offset: {
            /** @prop {number} order=200 - Index used to define the order of execution */
            order: 200,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: offset,

            /** @prop {Number|String} offset=0
             * The offset value as described in the modifier description
             */
            offset: 0
        },

        /**
         * Modifier used to prevent the popper from being positioned outside the boundary.
         *
         * A scenario exists where the reference itself is not within the boundaries.<br />
         * We can say it has "escaped the boundaries" — or just "escaped".<br />
         * In this case we need to decide whether the popper should either:
         *
         * - detach from the reference and remain "trapped" in the boundaries, or
         * - if it should ignore the boundary and "escape with its reference"
         *
         * When `escapeWithReference` is set to`true` and reference is completely
         * outside its boundaries, the popper will overflow (or completely leave)
         * the boundaries in order to remain attached to the edge of the reference.
         *
         * @memberof modifiers
         * @inner
         */
        preventOverflow: {
            /** @prop {number} order=300 - Index used to define the order of execution */
            order: 300,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: preventOverflow,

            /**
             * @prop {Array} [priority=['left','right','top','bottom']]
             * Popper will try to prevent overflow following these priorities by default,
             * then, it could overflow on the left and on top of the `boundariesElement`
             */
            priority: ['left', 'right', 'top', 'bottom'],

            /**
             * @prop {number} padding=5
             * Amount of pixel used to define a minimum distance between the boundaries
             * and the popper. This makes sure the popper always has a little padding
             * between the edges of its container
             */
            padding: 5,

            /**
             * @prop {String|HTMLElement} boundariesElement='scrollParent'
             * Boundaries used by the modifier. Can be `scrollParent`, `window`,
             * `viewport` or any DOM element.
             */
            boundariesElement: 'scrollParent'
        },

        /**
         * Modifier used to make sure the reference and its popper stay near each other
         * without leaving any gap between the two. Especially useful when the arrow is
         * enabled and you want to ensure that it points to its reference element.
         * It cares only about the first axis. You can still have poppers with margin
         * between the popper and its reference element.
         * @memberof modifiers
         * @inner
         */
        keepTogether: {
            /** @prop {number} order=400 - Index used to define the order of execution */
            order: 400,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: keepTogether
        },

        /**
         * This modifier is used to move the `arrowElement` of the popper to make
         * sure it is positioned between the reference element and its popper element.
         * It will read the outer size of the `arrowElement` node to detect how many
         * pixels of conjunction are needed.
         *
         * It has no effect if no `arrowElement` is provided.
         * @memberof modifiers
         * @inner
         */
        arrow: {
            /** @prop {number} order=500 - Index used to define the order of execution */
            order: 500,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: arrow,

            /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
            element: '[x-arrow]'
        },

        /**
         * Modifier used to flip the popper's placement when it starts to overlap its
         * reference element.
         *
         * Requires the `preventOverflow` modifier before it in order to work.
         *
         * **NOTE:** this modifier will interrupt the current update cycle and will
         * restart it if it detects the need to flip the placement.
         * @memberof modifiers
         * @inner
         */
        flip: {
            /** @prop {number} order=600 - Index used to define the order of execution */
            order: 600,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: flip,

            /**
             * @prop {String|Array} behavior='flip'
             * The behavior used to change the popper's placement. It can be one of
             * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
             * placements (with optional variations)
             */
            behavior: 'flip',

            /**
             * @prop {number} padding=5
             * The popper will flip if it hits the edges of the `boundariesElement`
             */
            padding: 5,

            /**
             * @prop {String|HTMLElement} boundariesElement='viewport'
             * The element which will define the boundaries of the popper position.
             * The popper will never be placed outside of the defined boundaries
             * (except if `keepTogether` is enabled)
             */
            boundariesElement: 'viewport'
        },

        /**
         * Modifier used to make the popper flow toward the inner of the reference element.
         * By default, when this modifier is disabled, the popper will be placed outside
         * the reference element.
         * @memberof modifiers
         * @inner
         */
        inner: {
            /** @prop {number} order=700 - Index used to define the order of execution */
            order: 700,

            /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
            enabled: false,

            /** @prop {ModifierFn} */
            fn: inner
        },

        /**
         * Modifier used to hide the popper when its reference element is outside of the
         * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
         * be used to hide with a CSS selector the popper when its reference is
         * out of boundaries.
         *
         * Requires the `preventOverflow` modifier before it in order to work.
         * @memberof modifiers
         * @inner
         */
        hide: {
            /** @prop {number} order=800 - Index used to define the order of execution */
            order: 800,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: hide
        },

        /**
         * Computes the style that will be applied to the popper element to gets
         * properly positioned.
         *
         * Note that this modifier will not touch the DOM, it just prepares the styles
         * so that `applyStyle` modifier can apply it. This separation is useful
         * in case you need to replace `applyStyle` with a custom implementation.
         *
         * This modifier has `850` as `order` value to maintain backward compatibility
         * with previous versions of Popper.js. Expect the modifiers ordering method
         * to change in future major versions of the library.
         *
         * @memberof modifiers
         * @inner
         */
        computeStyle: {
            /** @prop {number} order=850 - Index used to define the order of execution */
            order: 850,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: computeStyle,

            /**
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3D transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties
             */
            gpuAcceleration: true,

            /**
             * @prop {string} [x='bottom']
             * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
             * Change this if your popper should grow in a direction different from `bottom`
             */
            x: 'bottom',

            /**
             * @prop {string} [x='left']
             * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
             * Change this if your popper should grow in a direction different from `right`
             */
            y: 'right'
        },

        /**
         * Applies the computed styles to the popper element.
         *
         * All the DOM manipulations are limited to this modifier. This is useful in case
         * you want to integrate Popper.js inside a framework or view library and you
         * want to delegate all the DOM manipulations to it.
         *
         * Note that if you disable this modifier, you must make sure the popper element
         * has its position set to `absolute` before Popper.js can do its work!
         *
         * Just disable this modifier and define your own to achieve the desired effect.
         *
         * @memberof modifiers
         * @inner
         */
        applyStyle: {
            /** @prop {number} order=900 - Index used to define the order of execution */
            order: 900,

            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,

            /** @prop {ModifierFn} */
            fn: applyStyle,

            /** @prop {Function} */
            onLoad: applyStyleOnLoad,

            /**
             * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3D transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties
             */
            gpuAcceleration: undefined
        }
    };
    /**
     * The `dataObject` is an object containing all the information used by Popper.js.
     * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
     * @name dataObject
     * @property {Object} data.instance The Popper.js instance
     * @property {String} data.placement Placement applied to popper
     * @property {String} data.originalPlacement Placement originally defined on init
     * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
     * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
     * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
     * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.boundaries Offsets of the popper boundaries
     * @property {Object} data.offsets The measurements of popper, reference and arrow elements
     * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
     */

    /**
     * Default options provided to Popper.js constructor.<br />
     * These can be overridden using the `options` argument of Popper.js.<br />
     * To override an option, simply pass an object with the same
     * structure of the `options` object, as the 3rd argument. For example:
     * ```
     * new Popper(ref, pop, {
     *   modifiers: {
     *     preventOverflow: { enabled: false }
     *   }
     * })
     * ```
     * @type {Object}
     * @static
     * @memberof Popper
     */

    var Defaults = {
        /**
         * Popper's placement.
         * @prop {Popper.placements} placement='bottom'
         */
        placement: 'bottom',

        /**
         * Set this to true if you want popper to position it self in 'fixed' mode
         * @prop {Boolean} positionFixed=false
         */
        positionFixed: false,

        /**
         * Whether events (resize, scroll) are initially enabled.
         * @prop {Boolean} eventsEnabled=true
         */
        eventsEnabled: true,

        /**
         * Set to true if you want to automatically remove the popper when
         * you call the `destroy` method.
         * @prop {Boolean} removeOnDestroy=false
         */
        removeOnDestroy: false,

        /**
         * Callback called when the popper is created.<br />
         * By default, it is set to no-op.<br />
         * Access Popper.js instance with `data.instance`.
         * @prop {onCreate}
         */
        onCreate: function onCreate() {},

        /**
         * Callback called when the popper is updated. This callback is not called
         * on the initialization/creation of the popper, but only on subsequent
         * updates.<br />
         * By default, it is set to no-op.<br />
         * Access Popper.js instance with `data.instance`.
         * @prop {onUpdate}
         */
        onUpdate: function onUpdate() {},

        /**
         * List of modifiers used to modify the offsets before they are applied to the popper.
         * They provide most of the functionalities of Popper.js.
         * @prop {modifiers}
         */
        modifiers: modifiers
    };
    /**
     * @callback onCreate
     * @param {dataObject} data
     */

    /**
     * @callback onUpdate
     * @param {dataObject} data
     */
    // Utils
    // Methods

    var Popper = function() {
        /**
         * Creates a new Popper.js instance.
         * @class Popper
         * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
         * @param {HTMLElement} popper - The HTML element used as the popper
         * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
         * @return {Object} instance - The generated Popper.js instance
         */
        function Popper(reference, popper) {
            var _this = this;

            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);

            this.scheduleUpdate = function() {
                return requestAnimationFrame(_this.update);
            }; // make update() debounced, so that it only runs at most once-per-tick


            this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

            this.options = _extends({}, Popper.Defaults, options); // init state

            this.state = {
                isDestroyed: false,
                isCreated: false,
                scrollParents: []
            }; // get reference and popper elements (allow jQuery wrappers)

            this.reference = reference && reference.jquery ? reference[0] : reference;
            this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

            this.options.modifiers = {};
            Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function(name) {
                _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
            }); // Refactoring modifiers' list (Object => Array)

            this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
                    return _extends({
                        name: name
                    }, _this.options.modifiers[name]);
                }) // sort the modifiers by order
                .sort(function(a, b) {
                    return a.order - b.order;
                }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
            // such code is executed in the same order of its modifier
            // they could add new properties to their options configuration
            // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

            this.modifiers.forEach(function(modifierOptions) {
                if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
                }
            }); // fire the first update to position the popper in the right place

            this.update();
            var eventsEnabled = this.options.eventsEnabled;

            if (eventsEnabled) {
                // setup event listeners, they will take care of update the position in specific situations
                this.enableEventListeners();
            }

            this.state.eventsEnabled = eventsEnabled;
        } // We can't use class properties because they don't get listed in the
        // class prototype and break stuff like Sinon stubs


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
            /**
             * Schedules an update. It will run on the next UI update available.
             * @method scheduleUpdate
             * @memberof Popper
             */

            /**
             * Collection of utilities useful when writing custom modifiers.
             * Starting from version 1.7, this method is available only if you
             * include `popper-utils.js` before `popper.js`.
             *
             * **DEPRECATION**: This way to access PopperUtils is deprecated
             * and will be removed in v2! Use the PopperUtils module directly instead.
             * Due to the high instability of the methods contained in Utils, we can't
             * guarantee them to follow semver. Use them at your own risk!
             * @static
             * @private
             * @type {Object}
             * @deprecated since version 1.8
             * @member Utils
             * @memberof Popper
             */

        }]);
        return Popper;
    }();
    /**
     * The `referenceObject` is an object that provides an interface compatible with Popper.js
     * and lets you use it as replacement of a real DOM node.<br />
     * You can use this method to position a popper relatively to a set of coordinates
     * in case you don't have a DOM node to use as reference.
     *
     * ```
     * new Popper(referenceObject, popperNode);
     * ```
     *
     * NB: This feature isn't supported in Internet Explorer 10.
     * @name referenceObject
     * @property {Function} data.getBoundingClientRect
     * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
     * @property {number} data.clientWidth
     * An ES6 getter that will return the width of the virtual reference element.
     * @property {number} data.clientHeight
     * An ES6 getter that will return the height of the virtual reference element.
     */


    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME$4 = 'dropdown';
    var VERSION$4 = '4.3.1';
    var DATA_KEY$4 = 'bs.dropdown';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var DATA_API_KEY$4 = '.data-api';
    var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Dropdown =
        /*#__PURE__*/
        function() {
            function Dropdown(element, config) {
                this._element = element;
                this._popper = null;
                this._config = this._getConfig(config);
                this._menu = this._getMenuElement();
                this._inNavbar = this._detectNavbar();

                this._addEventListeners();
            } // Getters


            var _proto = Dropdown.prototype; // Public

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
                } // Disable totally Popper.js for Dropdown in Navbar


                if (!this._inNavbar) {
                    /**
                     * Check for Popper dependency
                     * Popper - https://popper.js.org
                     */
                    if (typeof Popper === 'undefined') {
                        throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
                    }

                    var referenceElement = this._element;

                    if (this._config.reference === 'parent') {
                        referenceElement = parent;
                    } else if (Util.isElement(this._config.reference)) {
                        referenceElement = this._config.reference; // Check if it's jQuery element

                        if (typeof this._config.reference.jquery !== 'undefined') {
                            referenceElement = this._config.reference[0];
                        }
                    } // If boundary is not `scrollParent`, then set position to `static`
                    // to allow the menu to "escape" the scroll parent's boundaries
                    // https://github.com/twbs/bootstrap/issues/24251


                    if (this._config.boundary !== 'scrollParent') {
                        $(parent).addClass(ClassName$4.POSITION_STATIC);
                    }

                    this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
                } // If this is a touch-enabled device we add extra
                // empty mouseover listeners to the body's immediate children;
                // only needed because of broken event delegation on iOS
                // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


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
            } // Private
            ;

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
                var placement = AttachmentMap.BOTTOM; // Handle dropup

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
                        } // Disable Popper.js if we have a static display

                    }
                };

                if (this._config.display === 'static') {
                    popperConfig.modifiers.applyStyle = {
                        enabled: false
                    };
                }

                return popperConfig;
            } // Static
            ;

            Dropdown._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$4);

                    var _config = _typeof(config) === 'object' ? config : null;

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
                    } // If this is a touch-enabled device we remove the extra
                    // empty mouseover listeners we added for iOS support


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
            } // eslint-disable-next-line complexity
            ;

            Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
                // If not input/textarea:
                //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
                // If input/textarea:
                //  - If space key => not a dropdown command
                //  - If key is other than escape
                //    - If key is not up or down => not a dropdown command
                //    - If trigger inside the menu => not a dropdown command
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
                    // Up
                    index--;
                }

                if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                    // Down
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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function(event) {
        event.preventDefault();
        event.stopPropagation();

        Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function(e) {
        e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$4] = Dropdown._jQueryInterface;
    $.fn[NAME$4].Constructor = Dropdown;

    $.fn[NAME$4].noConflict = function() {
        $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
        return Dropdown._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME$5 = 'modal';
    var VERSION$5 = '4.3.1';
    var DATA_KEY$5 = 'bs.modal';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$5 = '.data-api';
    var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
    var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Modal =
        /*#__PURE__*/
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
            } // Getters


            var _proto = Modal.prototype; // Public

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
                /**
                 * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
                 * Do not move `document` in `htmlElements` array
                 * It will remove `Event.CLICK_DATA_API` event that should remain
                 */

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
            } // Private
            ;

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$3, config);
                Util.typeCheckConfig(NAME$5, config, DefaultType$3);
                return config;
            };

            _proto._showElement = function _showElement(relatedTarget) {
                var _this3 = this;

                var transition = $(this._element).hasClass(ClassName$5.FADE);

                if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                    // Don't move modal's DOM position
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

                $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
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
            } // ----------------------------------------------------------------------
            // the following methods are used to handle overflowing modals
            // todo (fat): these should probably be refactored out of modal.js
            // ----------------------------------------------------------------------
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
                    // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                    //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
                    var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                    var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

                    $(fixedContent).each(function(index, element) {
                        var actualPadding = element.style.paddingRight;
                        var calculatedPadding = $(element).css('padding-right');
                        $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                    }); // Adjust sticky content margin

                    $(stickyContent).each(function(index, element) {
                        var actualMargin = element.style.marginRight;
                        var calculatedMargin = $(element).css('margin-right');
                        $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                    }); // Adjust body padding

                    var actualPadding = document.body.style.paddingRight;
                    var calculatedPadding = $(document.body).css('padding-right');
                    $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
                }

                $(document.body).addClass(ClassName$5.OPEN);
            };

            _proto._resetScrollbar = function _resetScrollbar() {
                // Restore fixed content padding
                var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                $(fixedContent).each(function(index, element) {
                    var padding = $(element).data('padding-right');
                    $(element).removeData('padding-right');
                    element.style.paddingRight = padding ? padding : '';
                }); // Restore sticky content

                var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
                $(elements).each(function(index, element) {
                    var margin = $(element).data('margin-right');

                    if (typeof margin !== 'undefined') {
                        $(element).css('margin-right', margin).removeData('margin-right');
                    }
                }); // Restore body padding

                var padding = $(document.body).data('padding-right');
                $(document.body).removeData('padding-right');
                document.body.style.paddingRight = padding ? padding : '';
            };

            _proto._getScrollbarWidth = function _getScrollbarWidth() {
                // thx d.walsh
                var scrollDiv = document.createElement('div');
                scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            } // Static
            ;

            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$5);

                    var _config = _objectSpread({}, Default$3, $(this).data(), _typeof(config) === 'object' && config ? config : {});

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


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
                // Only register focus restorer if modal will actually get shown
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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$5] = Modal._jQueryInterface;
    $.fn[NAME$5].Constructor = Modal;

    $.fn[NAME$5].noConflict = function() {
        $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
        return Modal._jQueryInterface;
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): tools/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */


    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
        // Global attributes allowed on any supplied element below.
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
        /**
         * A pattern that recognizes a commonly useful subset of URLs that are safe.
         *
         * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
         */

    };
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

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
        }); // Check if a regular expression validates the attribute.

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
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Tooltip =
        /*#__PURE__*/
        function() {
            function Tooltip(element, config) {
                /**
                 * Check for Popper dependency
                 * Popper - https://popper.js.org
                 */
                if (typeof Popper === 'undefined') {
                    throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
                } // private


                this._isEnabled = true;
                this._timeout = 0;
                this._hoverState = '';
                this._activeTrigger = {};
                this._popper = null; // Protected

                this.element = element;
                this.config = this._getConfig(config);
                this.tip = null;

                this._setListeners();
            } // Getters


            var _proto = Tooltip.prototype; // Public

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
                    $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
                    // empty mouseover listeners to the body's immediate children;
                    // only needed because of broken event delegation on iOS
                    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

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

                $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
                // empty mouseover listeners we added for iOS support

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
            } // Protected
            ;

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
                if (_typeof(content) === 'object' && (content.nodeType || content.jquery)) {
                    // Content is a DOM node or a jQuery
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
            } // Private
            ;

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
                var titleType = _typeof(this.element.getAttribute('data-original-title'));

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
                config = _objectSpread({}, this.constructor.Default, dataAttributes, _typeof(config) === 'object' && config ? config : {});

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
            } // Static
            ;

            Tooltip._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$6);

                    var _config = _typeof(config) === 'object' && config;

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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$6] = Tooltip._jQueryInterface;
    $.fn[NAME$6].Constructor = Tooltip;

    $.fn[NAME$6].noConflict = function() {
        $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
        return Tooltip._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Popover =
        /*#__PURE__*/
        function(_Tooltip) {
            _inheritsLoose(Popover, _Tooltip);

            function Popover() {
                return _Tooltip.apply(this, arguments) || this;
            }

            var _proto = Popover.prototype; // Overrides

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
                var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

                this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

                var content = this._getContent();

                if (typeof content === 'function') {
                    content = content.call(this.element);
                }

                this.setElementContent($tip.find(Selector$7.CONTENT), content);
                $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
            } // Private
            ;

            _proto._getContent = function _getContent() {
                return this.element.getAttribute('data-content') || this.config.content;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
                var $tip = $(this.getTipElement());
                var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

                if (tabClass !== null && tabClass.length > 0) {
                    $tip.removeClass(tabClass.join(''));
                }
            } // Static
            ;

            Popover._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$7);

                    var _config = _typeof(config) === 'object' ? config : null;

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
                // Getters
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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$7] = Popover._jQueryInterface;
    $.fn[NAME$7].Constructor = Popover;

    $.fn[NAME$7].noConflict = function() {
        $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
        return Popover._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var ScrollSpy =
        /*#__PURE__*/
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
            } // Getters


            var _proto = ScrollSpy.prototype; // Public

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
                            // TODO (fat): remove sketch reliance on jQuery position/offset
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
            } // Private
            ;

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$6, _typeof(config) === 'object' && config ? config : {});

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
                    // Set triggered link as active
                    $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
                    // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

                    $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

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
            } // Static
            ;

            ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY$8);

                    var _config = _typeof(config) === 'object' && config;

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(window).on(Event$8.LOAD_DATA_API, function() {
        var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
        var scrollSpysLength = scrollSpys.length;

        for (var i = scrollSpysLength; i--;) {
            var $spy = $(scrollSpys[i]);

            ScrollSpy._jQueryInterface.call($spy, $spy.data());
        }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$8] = ScrollSpy._jQueryInterface;
    $.fn[NAME$8].Constructor = ScrollSpy;

    $.fn[NAME$8].noConflict = function() {
        $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
        return ScrollSpy._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Tab =
        /*#__PURE__*/
        function() {
            function Tab(element) {
                this._element = element;
            } // Getters


            var _proto = Tab.prototype; // Public

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
            } // Private
            ;

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
            } // Static
            ;

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
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function(event) {
        event.preventDefault();

        Tab._jQueryInterface.call($(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME$9] = Tab._jQueryInterface;
    $.fn[NAME$9].Constructor = Tab;

    $.fn[NAME$9].noConflict = function() {
        $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
        return Tab._jQueryInterface;
    };
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


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
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Toast =
        /*#__PURE__*/
        function() {
            function Toast(element, config) {
                this._element = element;
                this._config = this._getConfig(config);
                this._timeout = null;

                this._setListeners();
            } // Getters


            var _proto = Toast.prototype; // Public

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
            } // Private
            ;

            _proto._getConfig = function _getConfig(config) {
                config = _objectSpread({}, Default$7, $(this._element).data(), _typeof(config) === 'object' && config ? config : {});
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
            } // Static
            ;

            Toast._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY$a);

                    var _config = _typeof(config) === 'object' && config;

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
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME$a] = Toast._jQueryInterface;
    $.fn[NAME$a].Constructor = Toast;

    $.fn[NAME$a].noConflict = function() {
        $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
        return Toast._jQueryInterface;
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.3.1): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */


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
});
var exports = {};
"use strict";

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
;

(function(window, document, $, undefined) {
    "use strict";

    var H = $("html"),
        W = $(window),
        D = $(document),
        F = $.fancybox = function() {
            F.open.apply(this, arguments);
        },
        IE = navigator.userAgent.match(/msie/i),
        didUpdate = null,
        isTouch = document.createTouch !== undefined,
        isQuery = function isQuery(obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function isString(str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function isPercentage(str) {
            return isString(str) && str.indexOf('%') > 0;
        },
        isScrollable = function isScrollable(el) {
            return el && !(el.style.overflow && el.style.overflow === 'hidden') && (el.clientWidth && el.scrollWidth > el.clientWidth || el.clientHeight && el.scrollHeight > el.clientHeight);
        },
        getScalar = function getScalar(orig, dim) {
            var value = parseInt(orig, 10) || 0;

            if (dim && isPercentage(orig)) {
                value = F.getViewport()[dim] / 100 * value;
            }

            return Math.ceil(value);
        },
        getValue = function getValue(value, dim) {
            return getScalar(value, dim) + 'px';
        };

    $.extend(F, {
        // The current version of fancyBox
        version: '2.1.5',
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
            // Set to 2 for retina display support
            autoSize: true,
            autoHeight: false,
            autoWidth: false,
            autoResize: true,
            autoCenter: !isTouch,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: 'auto',
            // 'auto', 'yes' or 'no'
            wrapCSS: '',
            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,
            ajax: {
                dataType: 'html',
                headers: {
                    'X-fancyBox': true
                }
            },
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },
            keys: {
                next: {
                    13: 'left',
                    // enter
                    34: 'up',
                    // page down
                    39: 'left',
                    // right arrow
                    40: 'up' // down arrow

                },
                prev: {
                    8: 'right',
                    // backspace
                    33: 'down',
                    // page up
                    37: 'right',
                    // left arrow
                    38: 'down' // up arrow

                },
                close: [27],
                // escape key
                play: [32],
                // space - start/stop slideshow
                toggle: [70] // letter "f" - toggle fullscreen

            },
            direction: {
                next: 'left',
                prev: 'right'
            },
            scrollOutside: true,
            // Override some properties
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            // HTML templates
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
                loading: '<div id="fancybox-loading"><div></div></div>'
            },
            // Properties for each animation type
            // Opening fancyBox
            openEffect: 'fade',
            // 'elastic', 'fade' or 'none'
            openSpeed: 250,
            openEasing: 'swing',
            openOpacity: true,
            openMethod: 'zoomIn',
            // Closing fancyBox
            closeEffect: 'fade',
            // 'elastic', 'fade' or 'none'
            closeSpeed: 250,
            closeEasing: 'swing',
            closeOpacity: true,
            closeMethod: 'zoomOut',
            // Changing next gallery item
            nextEffect: 'elastic',
            // 'elastic', 'fade' or 'none'
            nextSpeed: 250,
            nextEasing: 'swing',
            nextMethod: 'changeIn',
            // Changing previous gallery item
            prevEffect: 'elastic',
            // 'elastic', 'fade' or 'none'
            prevSpeed: 250,
            prevEasing: 'swing',
            prevMethod: 'changeOut',
            // Enable default helpers
            helpers: {
                overlay: true,
                title: true
            },
            // Callbacks
            onCancel: $.noop,
            // If canceling
            beforeLoad: $.noop,
            // Before loading
            afterLoad: $.noop,
            // After loading
            beforeShow: $.noop,
            // Before changing in current item
            afterShow: $.noop,
            // After opening
            beforeChange: $.noop,
            // Before changing gallery item
            beforeClose: $.noop,
            // Before closing
            afterClose: $.noop // After closing

        },
        //Current state
        group: {},
        // Selected group
        opts: {},
        // Group options
        previous: null,
        // Previous element
        coming: null,
        // Element being loaded
        current: null,
        // Currently loaded element
        isActive: false,
        // Is activated
        isOpen: false,
        // Is currently open
        isOpened: false,
        // Have been fully opened at least once
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: false
        },
        // Loaders
        ajaxLoad: null,
        imgPreload: null,
        // Some collections
        transitions: {},
        helpers: {},

        /*
         *	Static methods
         */
        open: function open(group, opts) {
            if (!group) {
                return;
            }

            if (!$.isPlainObject(opts)) {
                opts = {};
            } // Close if already active


            if (false === F.close(true)) {
                return;
            } // Normalize group


            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            } // Recheck if the type of each element is `object` and set content type (image, ajax, etc)


            $.each(group, function(i, element) {
                var obj = {},
                    href,
                    title,
                    content,
                    type,
                    rez,
                    hrefParts,
                    selector;

                if ($.type(element) === "object") {
                    // Check if is DOM element
                    if (element.nodeType) {
                        element = $(element);
                    }

                    if (isQuery(element)) {
                        obj = {
                            href: element.data('fancybox-href') || element.attr('href'),
                            title: $('<div/>').text(element.data('fancybox-title') || element.attr('title') || '').html(),
                            isDom: true,
                            element: element
                        };

                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }
                    } else {
                        obj = element;
                    }
                }

                href = opts.href || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || '';
                content = opts.content || obj.content;
                type = content ? 'html' : opts.type || obj.type;

                if (!type && obj.isDom) {
                    type = element.data('fancybox-type');

                    if (!type) {
                        rez = element.prop('class').match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }

                if (isString(href)) {
                    // Try to guess the content type
                    if (!type) {
                        if (F.isImage(href)) {
                            type = 'image';
                        } else if (F.isSWF(href)) {
                            type = 'swf';
                        } else if (href.charAt(0) === '#') {
                            type = 'inline';
                        } else if (isString(element)) {
                            type = 'html';
                            content = element;
                        }
                    } // Split url into two pieces with source url and content selector, e.g,
                    // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"


                    if (type === 'ajax') {
                        hrefParts = href.split(/\s+/, 2);
                        href = hrefParts.shift();
                        selector = hrefParts.shift();
                    }
                }

                if (!content) {
                    if (type === 'inline') {
                        if (href) {
                            content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7
                        } else if (obj.isDom) {
                            content = element;
                        }
                    } else if (type === 'html') {
                        content = href;
                    } else if (!type && !href && obj.isDom) {
                        type = 'inline';
                        content = element;
                    }
                }

                $.extend(obj, {
                    href: href,
                    type: type,
                    content: content,
                    title: title,
                    selector: selector
                });
                group[i] = obj;
            }); // Extend the defaults

            F.opts = $.extend(true, {}, F.defaults, opts); // All options are merged recursive except keys

            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }

            F.group = group;
            return F._start(F.opts.index);
        },
        // Cancel image loading or abort ajax request
        cancel: function cancel() {
            var coming = F.coming;

            if (coming && false === F.trigger('onCancel')) {
                return;
            }

            F.hideLoading();

            if (!coming) {
                return;
            }

            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }

            F.ajaxLoad = null;

            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }

            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger('onReset').remove();
            }

            F.coming = null; // If the first item has been canceled, then clear everything

            if (!F.current) {
                F._afterZoomOut(coming);
            }
        },
        // Start closing animation if is open; remove immediately if opening/closing
        close: function close(event) {
            F.cancel();

            if (false === F.trigger('beforeClose')) {
                return;
            }

            F.unbindEvents();

            if (!F.isActive) {
                return;
            }

            if (!F.isOpen || event === true) {
                $('.fancybox-wrap').stop(true).trigger('onReset').remove();

                F._afterZoomOut();
            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;
                $('.fancybox-item, .fancybox-nav').remove();
                F.wrap.stop(true, true).removeClass('fancybox-opened');
                F.transitions[F.current.closeMethod]();
            }
        },
        // Manage slideshow:
        //   $.fancybox.play(); - toggle slideshow
        //   $.fancybox.play( true ); - start
        //   $.fancybox.play( false ); - stop
        play: function play(action) {
            var clear = function clear() {
                    clearTimeout(F.player.timer);
                },
                set = function set() {
                    clear();

                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function stop() {
                    clear();
                    D.unbind('.player');
                    F.player.isActive = false;
                    F.trigger('onPlayEnd');
                },
                start = function start() {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;
                        D.bind({
                            'onCancel.player beforeClose.player': stop,
                            'onUpdate.player': set,
                            'beforeLoad.player': clear
                        });
                        set();
                        F.trigger('onPlayStart');
                    }
                };

            if (action === true || !F.player.isActive && action !== false) {
                start();
            } else {
                stop();
            }
        },
        // Navigate to next gallery item
        next: function next(direction) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }

                F.jumpto(current.index + 1, direction, 'next');
            }
        },
        // Navigate to previous gallery item
        prev: function prev(direction) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }

                F.jumpto(current.index - 1, direction, 'prev');
            }
        },
        // Navigate to gallery item by index
        jumpto: function jumpto(index, direction, router) {
            var current = F.current;

            if (!current) {
                return;
            }

            index = getScalar(index);
            F.direction = direction || current.direction[index >= current.index ? 'next' : 'prev'];
            F.router = router || 'jumpto';

            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + index % current.group.length;
                }

                index = index % current.group.length;
            }

            if (current.group[index] !== undefined) {
                F.cancel();

                F._start(index);
            }
        },
        // Center inside viewport and toggle position type to fixed or absolute if needed
        reposition: function reposition(e, onlyAbsolute) {
            var current = F.current,
                wrap = current ? current.wrap : null,
                pos;

            if (wrap) {
                pos = F._getPosition(onlyAbsolute);

                if (e && e.type === 'scroll') {
                    delete pos.position;
                    wrap.stop(true, true).animate(pos, 200);
                } else {
                    wrap.css(pos);
                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },
        update: function update(e) {
            var type = e && e.originalEvent && e.originalEvent.type,
                anyway = !type || type === 'orientationchange';

            if (anyway) {
                clearTimeout(didUpdate);
                didUpdate = null;
            }

            if (!F.isOpen || didUpdate) {
                return;
            }

            didUpdate = setTimeout(function() {
                var current = F.current;

                if (!current || F.isClosing) {
                    return;
                }

                F.wrap.removeClass('fancybox-tmp');

                if (anyway || type === 'load' || type === 'resize' && current.autoResize) {
                    F._setDimension();
                }

                if (!(type === 'scroll' && current.canShrink)) {
                    F.reposition(e);
                }

                F.trigger('onUpdate');
                didUpdate = null;
            }, anyway && !isTouch ? 0 : 300);
        },
        // Shrink content to fit inside viewport or restore if resized
        toggle: function toggle(action) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView; // Help browser to restore document dimensions

                if (isTouch) {
                    F.wrap.removeAttr('style').addClass('fancybox-tmp');
                    F.trigger('onUpdate');
                }

                F.update();
            }
        },
        hideLoading: function hideLoading() {
            D.unbind('.loading');
            $('#fancybox-loading').remove();
        },
        showLoading: function showLoading() {
            var el, viewport;
            F.hideLoading();
            el = $(F.opts.tpl.loading).click(F.cancel).appendTo('body'); // If user will press the escape-button, the request will be canceled

            D.bind('keydown.loading', function(e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();
                    F.cancel();
                }
            });

            if (!F.defaults.fixed) {
                viewport = F.getViewport();
                el.css({
                    position: 'absolute',
                    top: viewport.h * 0.5 + viewport.y,
                    left: viewport.w * 0.5 + viewport.x
                });
            }

            F.trigger('onLoading');
        },
        getViewport: function getViewport() {
            var locked = F.current && F.current.locked || false,
                rez = {
                    x: W.scrollLeft(),
                    y: W.scrollTop()
                };

            if (locked && locked.length) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;
            } else {
                // See http://bugs.jquery.com/ticket/6724
                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }

            return rez;
        },
        // Unbind the keyboard / clicking actions
        unbindEvents: function unbindEvents() {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind('.fb');
            }

            D.unbind('.fb');
            W.unbind('.fb');
        },
        bindEvents: function bindEvents() {
            var current = F.current,
                keys;

            if (!current) {
                return;
            } // Changing document height on iOS devices triggers a 'resize' event,
            // that can change document height... repeating infinitely


            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
            keys = current.keys;

            if (keys) {
                D.bind('keydown.fb', function(e) {
                    var code = e.which || e.keyCode,
                        target = e.target || e.srcElement; // Skip esc key if loading, because showLoading will cancel preloading

                    if (code === 27 && F.coming) {
                        return false;
                    } // Ignore key combinations and key events within form elements


                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                        $.each(keys, function(i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);
                                e.preventDefault();
                                return false;
                            }

                            if ($.inArray(code, val) > -1) {
                                F[i]();
                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }

            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind('mousewheel.fb', function(e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;

                    while (parent.length) {
                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                            break;
                        }

                        canScroll = isScrollable(parent[0]);
                        parent = $(parent).parent();
                    }

                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev(deltaY > 0 ? 'down' : 'left');
                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next(deltaY < 0 ? 'up' : 'right');
                            }

                            e.preventDefault();
                        }
                    }
                });
            }
        },
        trigger: function trigger(event, o) {
            var ret,
                obj = o || F.coming || F.current;

            if (obj) {
                if ($.isFunction(obj[event])) {
                    ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
                }

                if (ret === false) {
                    return false;
                }

                if (obj.helpers) {
                    $.each(obj.helpers, function(helper, opts) {
                        if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                            F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                        }
                    });
                }
            }

            D.trigger(event);
        },
        isImage: function isImage(str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
        },
        isSWF: function isSWF(str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },
        _start: function _start(index) {
            var coming = {},
                obj,
                href,
                type,
                margin,
                padding;
            index = getScalar(index);
            obj = F.group[index] || null;

            if (!obj) {
                return false;
            }

            coming = $.extend(true, {}, F.opts, obj); // Convert margin and padding properties to array - top, right, bottom, left

            margin = coming.margin;
            padding = coming.padding;

            if ($.type(margin) === 'number') {
                coming.margin = [margin, margin, margin, margin];
            }

            if ($.type(padding) === 'number') {
                coming.padding = [padding, padding, padding, padding];
            } // 'modal' propery is just a shortcut


            if (coming.modal) {
                $.extend(true, coming, {
                    closeBtn: false,
                    closeClick: false,
                    nextClick: false,
                    arrows: false,
                    mouseWheel: false,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                });
            } // 'autoSize' property is a shortcut, too


            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }

            if (coming.width === 'auto') {
                coming.autoWidth = true;
            }

            if (coming.height === 'auto') {
                coming.autoHeight = true;
            }
            /*
             * Add reference to the group, so it`s possible to access from callbacks, example:
             * afterLoad : function() {
             *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
             * }
             */


            coming.group = F.group;
            coming.index = index; // Give a chance for callback or helpers to update coming item (type, title, etc)

            F.coming = coming;

            if (false === F.trigger('beforeLoad')) {
                F.coming = null;
                return;
            }

            type = coming.type;
            href = coming.href;

            if (!type) {
                F.coming = null; //If we can not determine content type then drop silently or display next/prev item if looping through gallery

                if (F.current && F.router && F.router !== 'jumpto') {
                    F.current.index = index;
                    return F[F.router](F.direction);
                }

                return false;
            }

            F.isActive = true;

            if (type === 'image' || type === 'swf') {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling = 'visible';
            }

            if (type === 'image') {
                coming.aspectRatio = true;
            }

            if (type === 'iframe' && isTouch) {
                coming.scrolling = 'scroll';
            } // Build the neccessary markup


            coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
            $.extend(coming, {
                skin: $('.fancybox-skin', coming.wrap),
                outer: $('.fancybox-outer', coming.wrap),
                inner: $('.fancybox-inner', coming.wrap)
            });
            $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
                coming.skin.css('padding' + v, getValue(coming.padding[i]));
            });
            F.trigger('onReady'); // Check before try to load; 'inline' and 'html' types need content, others - href

            if (type === 'inline' || type === 'html') {
                if (!coming.content || !coming.content.length) {
                    return F._error('content');
                }
            } else if (!href) {
                return F._error('href');
            }

            if (type === 'image') {
                F._loadImage();
            } else if (type === 'ajax') {
                F._loadAjax();
            } else if (type === 'iframe') {
                F._loadIframe();
            } else {
                F._afterLoad();
            }
        },
        _error: function _error(type) {
            $.extend(F.coming, {
                type: 'html',
                autoWidth: true,
                autoHeight: true,
                minWidth: 0,
                minHeight: 0,
                scrolling: 'no',
                hasError: type,
                content: F.coming.tpl.error
            });

            F._afterLoad();
        },
        _loadImage: function _loadImage() {
            // Reset preload image so it is later possible to check "complete" property
            var img = F.imgPreload = new Image();

            img.onload = function() {
                this.onload = this.onerror = null;
                F.coming.width = this.width / F.opts.pixelRatio;
                F.coming.height = this.height / F.opts.pixelRatio;

                F._afterLoad();
            };

            img.onerror = function() {
                this.onload = this.onerror = null;

                F._error('image');
            };

            img.src = F.coming.href;

            if (img.complete !== true) {
                F.showLoading();
            }
        },
        _loadAjax: function _loadAjax() {
            var coming = F.coming;
            F.showLoading();
            F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                url: coming.href,
                error: function error(jqXHR, textStatus) {
                    if (F.coming && textStatus !== 'abort') {
                        F._error('ajax', jqXHR);
                    } else {
                        F.hideLoading();
                    }
                },
                success: function success(data, textStatus) {
                    if (textStatus === 'success') {
                        coming.content = data;

                        F._afterLoad();
                    }
                }
            }));
        },
        _loadIframe: function _loadIframe() {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href); // This helps IE

            $(coming.wrap).bind('onReset', function() {
                try {
                    $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
                } catch (e) {}
            });

            if (coming.iframe.preload) {
                F.showLoading();
                iframe.one('load', function() {
                    $(this).data('ready', 1); // iOS will lose scrolling if we resize

                    if (!isTouch) {
                        $(this).bind('load.fb', F.update);
                    } // Without this trick:
                    //   - iframe won't scroll on iOS devices
                    //   - IE7 sometimes displays empty iframe


                    $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

                    F._afterLoad();
                });
            }

            coming.content = iframe.appendTo(coming.inner);

            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },
        _preloadImages: function _preloadImages() {
            var group = F.group,
                current = F.current,
                len = group.length,
                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
                item,
                i;

            for (i = 1; i <= cnt; i += 1) {
                item = group[(current.index + i) % len];

                if (item.type === 'image' && item.href) {
                    new Image().src = item.href;
                }
            }
        },
        _afterLoad: function _afterLoad() {
            var coming = F.coming,
                previous = F.current,
                placeholder = 'fancybox-placeholder',
                current,
                content,
                type,
                scrolling,
                href,
                embed;
            F.hideLoading();

            if (!coming || F.isActive === false) {
                return;
            }

            if (false === F.trigger('afterLoad', coming, previous)) {
                coming.wrap.stop(true).trigger('onReset').remove();
                F.coming = null;
                return;
            }

            if (previous) {
                F.trigger('beforeChange', previous);
                previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
            }

            F.unbindEvents();
            current = coming;
            content = coming.content;
            type = coming.type;
            scrolling = coming.scrolling;
            $.extend(F, {
                wrap: current.wrap,
                skin: current.skin,
                outer: current.outer,
                inner: current.inner,
                current: current,
                previous: previous
            });
            href = current.href;

            switch (type) {
                case 'inline':
                case 'ajax':
                case 'html':
                    if (current.selector) {
                        content = $('<div>').html(content).find(current.selector);
                    } else if (isQuery(content)) {
                        if (!content.data(placeholder)) {
                            content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                        }

                        content = content.show().detach();
                        current.wrap.bind('onReset', function() {
                            if ($(this).find(content).length) {
                                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                            }
                        });
                    }

                    break;

                case 'image':
                    content = current.tpl.image.replace(/\{href\}/g, href);
                    break;

                case 'swf':
                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                    embed = '';
                    $.each(current.swf, function(name, val) {
                        content += '<param name="' + name + '" value="' + val + '"></param>';
                        embed += ' ' + name + '="' + val + '"';
                    });
                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                    break;
            }

            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append(content);
            } // Give a chance for helpers or callbacks to update elements


            F.trigger('beforeShow'); // Set scrolling before calculating dimensions

            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : scrolling === 'no' ? 'hidden' : scrolling); // Set initial dimensions and start position

            F._setDimension();

            F.reposition();
            F.isOpen = false;
            F.coming = null;
            F.bindEvents();

            if (!F.isOpened) {
                $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
            } else if (previous.prevMethod) {
                F.transitions[previous.prevMethod]();
            }

            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();

            F._preloadImages();
        },
        _setDimension: function _setDimension() {
            var viewport = F.getViewport(),
                steps = 0,
                canShrink = false,
                canExpand = false,
                wrap = F.wrap,
                skin = F.skin,
                inner = F.inner,
                current = F.current,
                width = current.width,
                height = current.height,
                minWidth = current.minWidth,
                minHeight = current.minHeight,
                maxWidth = current.maxWidth,
                maxHeight = current.maxHeight,
                scrolling = current.scrolling,
                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
                margin = current.margin,
                wMargin = getScalar(margin[1] + margin[3]),
                hMargin = getScalar(margin[0] + margin[2]),
                wPadding,
                hPadding,
                wSpace,
                hSpace,
                origWidth,
                origHeight,
                origMaxWidth,
                origMaxHeight,
                ratio,
                width_,
                height_,
                maxWidth_,
                maxHeight_,
                iframe,
                body; // Reset dimensions so we could re-check actual size

            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
            wPadding = getScalar(skin.outerWidth(true) - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height()); // Any space between content and viewport (margin, padding, border, title)

            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;
            origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

            if (current.type === 'iframe') {
                iframe = current.content;

                if (current.autoHeight && iframe.data('ready') === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width(origWidth).height(9999);
                            body = iframe.contents().find('body');

                            if (scrollOut) {
                                body.css('overflow-x', 'hidden');
                            }

                            origHeight = body.outerHeight(true);
                        }
                    } catch (e) {}
                }
            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass('fancybox-tmp'); // Set width or height in case we need to calculate only one dimension

                if (!current.autoWidth) {
                    inner.width(origWidth);
                }

                if (!current.autoHeight) {
                    inner.height(origHeight);
                }

                if (current.autoWidth) {
                    origWidth = inner.width();
                }

                if (current.autoHeight) {
                    origHeight = inner.height();
                }

                inner.removeClass('fancybox-tmp');
            }

            width = getScalar(origWidth);
            height = getScalar(origHeight);
            ratio = origWidth / origHeight; // Calculations for the content

            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight); // These will be used to determine if wrap can fit in the viewport

            origMaxWidth = maxWidth;
            origMaxHeight = maxHeight;

            if (current.fitToView) {
                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }

            maxWidth_ = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;

            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width = maxWidth;
                    height = getScalar(width / ratio);
                }

                if (height > maxHeight) {
                    height = maxHeight;
                    width = getScalar(height * ratio);
                }

                if (width < minWidth) {
                    width = minWidth;
                    height = getScalar(width / ratio);
                }

                if (height < minHeight) {
                    height = minHeight;
                    width = getScalar(height * ratio);
                }
            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));

                if (current.autoHeight && current.type !== 'iframe') {
                    inner.width(width);
                    height = inner.height();
                }

                height = Math.max(minHeight, Math.min(height, maxHeight));
            } // Try to fit inside viewport (including the title)


            if (current.fitToView) {
                inner.width(width).height(height);
                wrap.width(width + wPadding); // Real wrap dimensions

                width_ = wrap.width();
                height_ = wrap.height();

                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }

                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width = getScalar(height * ratio);

                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }

                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }

                        inner.width(width).height(height);
                        wrap.width(width + wPadding);
                        width_ = wrap.width();
                        height_ = wrap.height();
                    }
                } else {
                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }

            if (scrollOut && scrolling === 'auto' && height < origHeight && width + wPadding + scrollOut < maxWidth_) {
                width += scrollOut;
            }

            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight : (width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight);
            $.extend(current, {
                dim: {
                    width: getValue(width_),
                    height: getValue(height_)
                },
                origWidth: origWidth,
                origHeight: origHeight,
                canShrink: canShrink,
                canExpand: canExpand,
                wPadding: wPadding,
                hPadding: hPadding,
                wrapSpace: height_ - skin.outerHeight(true),
                skinSpace: skin.height() - height
            });

            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height('auto');
            }
        },
        _getPosition: function _getPosition(onlyAbsolute) {
            var current = F.current,
                viewport = F.getViewport(),
                margin = current.margin,
                width = F.wrap.width() + margin[1] + margin[3],
                height = F.wrap.height() + margin[0] + margin[2],
                rez = {
                    position: 'absolute',
                    top: margin[0],
                    left: margin[3]
                };

            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = 'fixed';
            } else if (!current.locked) {
                rez.top += viewport.y;
                rez.left += viewport.x;
            }

            rez.top = getValue(Math.max(rez.top, rez.top + (viewport.h - height) * current.topRatio));
            rez.left = getValue(Math.max(rez.left, rez.left + (viewport.w - width) * current.leftRatio));
            return rez;
        },
        _afterZoomIn: function _afterZoomIn() {
            var current = F.current;

            if (!current) {
                return;
            }

            F.isOpen = F.isOpened = true;
            F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);
            F.update(); // Assign a click event

            if (current.closeClick || current.nextClick && F.group.length > 1) {
                F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
                    if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                        e.preventDefault();
                        F[current.closeClick ? 'close' : 'next']();
                    }
                });
            } // Create a close button


            if (current.closeBtn) {
                $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
                    e.preventDefault();
                    F.close();
                });
            } // Create navigation arrows


            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
                }

                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
                }
            }

            F.trigger('afterShow'); // Stop the slideshow if this is the last item

            if (!current.loop && current.index === current.group.length - 1) {
                F.play(false);
            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;
                F.play(true);
            }
        },
        _afterZoomOut: function _afterZoomOut(obj) {
            obj = obj || F.current;
            $('.fancybox-wrap').trigger('onReset').remove();
            $.extend(F, {
                group: {},
                opts: {},
                router: false,
                current: null,
                isActive: false,
                isOpened: false,
                isOpen: false,
                isClosing: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            F.trigger('afterClose', obj);
        }
    });
    /*
     *	Default transitions
     */

    F.transitions = {
        getOrigPosition: function getOrigPosition() {
            var current = F.current,
                element = current.element,
                orig = current.orig,
                pos = {},
                width = 50,
                height = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();

            if (!orig && current.isDom && element.is(':visible')) {
                orig = element.find('img:first');

                if (!orig.length) {
                    orig = element;
                }
            }

            if (isQuery(orig)) {
                pos = orig.offset();

                if (orig.is('img')) {
                    width = orig.outerWidth();
                    height = orig.outerHeight();
                }
            } else {
                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
            }

            if (F.wrap.css('position') === 'fixed' || current.locked) {
                pos.top -= viewport.y;
                pos.left -= viewport.x;
            }

            pos = {
                top: getValue(pos.top - hPadding * current.topRatio),
                left: getValue(pos.left - wPadding * current.leftRatio),
                width: getValue(width + wPadding),
                height: getValue(height + hPadding)
            };
            return pos;
        },
        step: function step(now, fx) {
            var ratio,
                padding,
                value,
                prop = fx.prop,
                current = F.current,
                wrapSpace = current.wrapSpace,
                skinSpace = current.skinSpace;

            if (prop === 'width' || prop === 'height') {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

                if (F.isClosing) {
                    ratio = 1 - ratio;
                }

                padding = prop === 'width' ? current.wPadding : current.hPadding;
                value = now - padding;
                F.skin[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio));
                F.inner[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio - skinSpace * ratio));
            }
        },
        zoomIn: function zoomIn() {
            var current = F.current,
                startPos = current.pos,
                effect = current.openEffect,
                elastic = effect === 'elastic',
                endPos = $.extend({
                    opacity: 1
                }, startPos); // Remove "position" property that breaks older IE

            delete endPos.position;

            if (elastic) {
                startPos = this.getOrigPosition();

                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }
            } else if (effect === 'fade') {
                startPos.opacity = 0.1;
            }

            F.wrap.css(startPos).animate(endPos, {
                duration: effect === 'none' ? 0 : current.openSpeed,
                easing: current.openEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomIn
            });
        },
        zoomOut: function zoomOut() {
            var current = F.current,
                effect = current.closeEffect,
                elastic = effect === 'elastic',
                endPos = {
                    opacity: 0.1
                };

            if (elastic) {
                endPos = this.getOrigPosition();

                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }

            F.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : current.closeSpeed,
                easing: current.closeEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomOut
            });
        },
        changeIn: function changeIn() {
            var current = F.current,
                effect = current.nextEffect,
                startPos = current.pos,
                endPos = {
                    opacity: 1
                },
                direction = F.direction,
                distance = 200,
                field;
            startPos.opacity = 0.1;

            if (effect === 'elastic') {
                field = direction === 'down' || direction === 'up' ? 'top' : 'left';

                if (direction === 'down' || direction === 'right') {
                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
                    endPos[field] = '+=' + distance + 'px';
                } else {
                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
                    endPos[field] = '-=' + distance + 'px';
                }
            } // Workaround for http://bugs.jquery.com/ticket/12273


            if (effect === 'none') {
                F._afterZoomIn();
            } else {
                F.wrap.css(startPos).animate(endPos, {
                    duration: current.nextSpeed,
                    easing: current.nextEasing,
                    complete: F._afterZoomIn
                });
            }
        },
        changeOut: function changeOut() {
            var previous = F.previous,
                effect = previous.prevEffect,
                endPos = {
                    opacity: 0.1
                },
                direction = F.direction,
                distance = 200;

            if (effect === 'elastic') {
                endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
            }

            previous.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : previous.prevSpeed,
                easing: previous.prevEasing,
                complete: function complete() {
                    $(this).trigger('onReset').remove();
                }
            });
        }
    };
    /*
     *	Overlay helper
     */

    F.helpers.overlay = {
        defaults: {
            closeClick: true,
            // if true, fancyBox will be closed when user clicks on the overlay
            speedOut: 200,
            // duration of fadeOut animation
            showEarly: true,
            // indicates if should be opened immediately or wait until the content is ready
            css: {},
            // custom CSS properties
            locked: !isTouch,
            // if true, the content will be locked into overlay
            fixed: true // if false, the overlay CSS position property will not be set to "fixed"

        },
        overlay: null,
        // current handle
        fixed: false,
        // indicates if the overlay has position "fixed"
        el: $('html'),
        // element that contains "the lock"
        // Public methods
        create: function create(opts) {
            var parent;
            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.close();
            }

            parent = F.coming ? F.coming.parent : opts.parent;
            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(parent && parent.length ? parent : 'body');
            this.fixed = false;

            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');
                this.fixed = true;
            }
        },
        open: function open(opts) {
            var that = this;
            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.overlay.unbind('.overlay').width('auto').height('auto');
            } else {
                this.create(opts);
            }

            if (!this.fixed) {
                W.bind('resize.overlay', $.proxy(this.update, this));
                this.update();
            }

            if (opts.closeClick) {
                this.overlay.bind('click.overlay', function(e) {
                    if ($(e.target).hasClass('fancybox-overlay')) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }

                        return false;
                    }
                });
            }

            this.overlay.css(opts.css).show();
        },
        close: function close() {
            W.unbind('resize.overlay');

            if (this.el.hasClass('fancybox-lock')) {
                $('.fancybox-margin').removeClass('fancybox-margin');
                this.el.removeClass('fancybox-lock');
                W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
            }

            $('.fancybox-overlay').remove().hide();
            $.extend(this, {
                overlay: null,
                fixed: false
            });
        },
        // Private, callbacks
        update: function update() {
            var width = '100%',
                offsetWidth; // Reset width/height so it will not mess

            this.overlay.width(width).height('100%'); // jQuery does not return reliable result for IE

            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

                if (D.width() > offsetWidth) {
                    width = D.width();
                }
            } else if (D.width() > W.width()) {
                width = D.width();
            }

            this.overlay.width(width).height(D.height());
        },
        // This is where we can manipulate DOM, because later it would cause iframes to reload
        onReady: function onReady(opts, obj) {
            var overlay = this.overlay;
            $('.fancybox-overlay').stop(true, true);

            if (!overlay) {
                this.create(opts);
            }

            if (opts.locked && this.fixed && obj.fixed) {
                obj.locked = this.overlay.append(obj.wrap);
                obj.fixed = false;
            }

            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },
        beforeShow: function beforeShow(opts, obj) {
            if (obj.locked && !this.el.hasClass('fancybox-lock')) {
                if (this.fixPosition !== false) {
                    $('*').filter(function() {
                        return $(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap");
                    }).addClass('fancybox-margin');
                }

                this.el.addClass('fancybox-margin');
                this.scrollV = W.scrollTop();
                this.scrollH = W.scrollLeft();
                this.el.addClass('fancybox-lock');
                W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
            }

            this.open(opts);
        },
        onUpdate: function onUpdate() {
            if (!this.fixed) {
                this.update();
            }
        },
        afterClose: function afterClose(opts) {
            // Remove overlay if exists and fancyBox is not opening
            // (e.g., it is not being open using afterClose callback)
            if (this.overlay && !F.coming) {
                this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
            }
        }
    };
    /*
     *	Title helper
     */

    F.helpers.title = {
        defaults: {
            type: 'float',
            // 'float', 'inside', 'outside' or 'over',
            position: 'bottom' // 'top' or 'bottom'

        },
        beforeShow: function beforeShow(opts) {
            var current = F.current,
                text = current.title,
                type = opts.type,
                title,
                target;

            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }

            if (!isString(text) || $.trim(text) === '') {
                return;
            }

            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

            switch (type) {
                case 'inside':
                    target = F.skin;
                    break;

                case 'outside':
                    target = F.wrap;
                    break;

                case 'over':
                    target = F.inner;
                    break;

                default:
                    // 'float'
                    target = F.skin;
                    title.appendTo('body');

                    if (IE) {
                        title.width(title.width());
                    }

                    title.wrapInner('<span class="child"></span>'); //Increase bottom margin so this title will also fit into viewport

                    F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
                    break;
            }

            title[opts.position === 'top' ? 'prependTo' : 'appendTo'](target);
        }
    }; // jQuery plugin initialization

    $.fn.fancybox = function(options) {
        var index,
            that = $(this),
            selector = this.selector || '',
            run = function run(e) {
                var what = $(this).blur(),
                    idx = index,
                    relType,
                    relVal;

                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                    relType = options.groupAttr || 'data-fancybox-group';
                    relVal = what.attr(relType);

                    if (!relVal) {
                        relType = 'rel';
                        relVal = what.get(0)[relType];
                    }

                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
                        what = selector.length ? $(selector) : that;
                        what = what.filter('[' + relType + '="' + relVal + '"]');
                        idx = what.index(this);
                    }

                    options.index = idx; // Stop an event from bubbling if everything is fine

                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };

        options = options || {};
        index = options.index || 0;

        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);
        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }

        this.filter('[data-fancybox-start=1]').trigger('click');
        return this;
    }; // Tests that need a body at doc ready


    D.ready(function() {
        var w1, w2;

        if ($.scrollbarWidth === undefined) {
            // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
            $.scrollbarWidth = function() {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
                    child = parent.children(),
                    width = child.innerWidth() - child.height(99).innerWidth();
                parent.remove();
                return width;
            };
        }

        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = function() {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
                    fixed = elem[0].offsetTop === 20 || elem[0].offsetTop === 15;
                elem.remove();
                return fixed;
            }();
        }

        $.extend(F.defaults, {
            scrollbarWidth: $.scrollbarWidth(),
            fixed: $.support.fixedPosition,
            parent: $('body')
        }); //Get real width of page scroll-bar

        w1 = $(window).width();
        H.addClass('fancybox-lock-test');
        w2 = $(window).width();
        H.removeClass('fancybox-lock-test');
        $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    });
})(window, document, jQuery);
var exports = {};
"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */

/**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;

(function($, window, document, undefined) {
    /**
     * Creates a carousel.
     * @class The Owl Carousel.
     * @public
     * @param {HTMLElement|jQuery} element - The element to create the carousel for.
     * @param {Object} [options] - The options
     */
    function Owl(element, options) {
        /**
         * Current settings for the carousel.
         * @public
         */
        this.settings = null;
        /**
         * Current options set by the caller including defaults.
         * @public
         */

        this.options = $.extend({}, Owl.Defaults, options);
        /**
         * Plugin element.
         * @public
         */

        this.$element = $(element);
        /**
         * Proxied event handlers.
         * @protected
         */

        this._handlers = {};
        /**
         * References to the running plugins of this carousel.
         * @protected
         */

        this._plugins = {};
        /**
         * Currently suppressed events to prevent them from being retriggered.
         * @protected
         */

        this._supress = {};
        /**
         * Absolute current position.
         * @protected
         */

        this._current = null;
        /**
         * Animation speed in milliseconds.
         * @protected
         */

        this._speed = null;
        /**
         * Coordinates of all items in pixel.
         * @todo The name of this member is missleading.
         * @protected
         */

        this._coordinates = [];
        /**
         * Current breakpoint.
         * @todo Real media queries would be nice.
         * @protected
         */

        this._breakpoint = null;
        /**
         * Current width of the plugin element.
         */

        this._width = null;
        /**
         * All real items.
         * @protected
         */

        this._items = [];
        /**
         * All cloned items.
         * @protected
         */

        this._clones = [];
        /**
         * Merge values of all items.
         * @todo Maybe this could be part of a plugin.
         * @protected
         */

        this._mergers = [];
        /**
         * Widths of all items.
         */

        this._widths = [];
        /**
         * Invalidated parts within the update process.
         * @protected
         */

        this._invalidated = {};
        /**
         * Ordered list of workers for the update process.
         * @protected
         */

        this._pipe = [];
        /**
         * Current state information for the drag operation.
         * @todo #261
         * @protected
         */

        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        };
        /**
         * Current state information and their tags.
         * @type {Object}
         * @protected
         */

        this._states = {
            current: {},
            tags: {
                'initializing': ['busy'],
                'animating': ['busy'],
                'dragging': ['interacting']
            }
        };
        $.each(['onResize', 'onThrottledResize'], $.proxy(function(i, handler) {
            this._handlers[handler] = $.proxy(this[handler], this);
        }, this));
        $.each(Owl.Plugins, $.proxy(function(key, plugin) {
            this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
        }, this));
        $.each(Owl.Workers, $.proxy(function(priority, worker) {
            this._pipe.push({
                'filter': worker.filter,
                'run': $.proxy(worker.run, this)
            });
        }, this));
        this.setup();
        this.initialize();
    }
    /**
     * Default options for the carousel.
     * @public
     */


    Owl.Defaults = {
        items: 3,
        loop: false,
        center: false,
        rewind: false,
        checkVisibility: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        rtl: false,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: window,
        fallbackEasing: 'swing',
        slideTransition: '',
        info: false,
        nestedItemSelector: false,
        itemElement: 'div',
        stageElement: 'div',
        refreshClass: 'owl-refresh',
        loadedClass: 'owl-loaded',
        loadingClass: 'owl-loading',
        rtlClass: 'owl-rtl',
        responsiveClass: 'owl-responsive',
        dragClass: 'owl-drag',
        itemClass: 'owl-item',
        stageClass: 'owl-stage',
        stageOuterClass: 'owl-stage-outer',
        grabClass: 'owl-grab'
    };
    /**
     * Enumeration for width.
     * @public
     * @readonly
     * @enum {String}
     */

    Owl.Width = {
        Default: 'default',
        Inner: 'inner',
        Outer: 'outer'
    };
    /**
     * Enumeration for types.
     * @public
     * @readonly
     * @enum {String}
     */

    Owl.Type = {
        Event: 'event',
        State: 'state'
    };
    /**
     * Contains all registered plugins.
     * @public
     */

    Owl.Plugins = {};
    /**
     * List of workers involved in the update process.
     */

    Owl.Workers = [{
        filter: ['width', 'settings'],
        run: function run() {
            this._width = this.$element.width();
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run(cache) {
            cache.current = this._items && this._items[this.relative(this._current)];
        }
    }, {
        filter: ['items', 'settings'],
        run: function run() {
            this.$stage.children('.cloned').remove();
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run(cache) {
            var margin = this.settings.margin || '',
                grid = !this.settings.autoWidth,
                rtl = this.settings.rtl,
                css = {
                    'width': 'auto',
                    'margin-left': rtl ? margin : '',
                    'margin-right': rtl ? '' : margin
                };
            !grid && this.$stage.children().css(css);
            cache.css = css;
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run(cache) {
            var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                merge = null,
                iterator = this._items.length,
                grid = !this.settings.autoWidth,
                widths = [];
            cache.items = {
                merge: false,
                width: width
            };

            while (iterator--) {
                merge = this._mergers[iterator];
                merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;
                cache.items.merge = merge > 1 || cache.items.merge;
                widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
            }

            this._widths = widths;
        }
    }, {
        filter: ['items', 'settings'],
        run: function run() {
            var clones = [],
                items = this._items,
                settings = this.settings,
                // TODO: Should be computed from number of min width items in stage
                view = Math.max(settings.items * 2, 4),
                size = Math.ceil(items.length / 2) * 2,
                repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
                append = '',
                prepend = '';
            repeat /= 2;

            while (repeat > 0) {
                // Switch to only using appended clones
                clones.push(this.normalize(clones.length / 2, true));
                append = append + items[clones[clones.length - 1]][0].outerHTML;
                clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
                repeat -= 1;
            }

            this._clones = clones;
            $(append).addClass('cloned').appendTo(this.$stage);
            $(prepend).addClass('cloned').prependTo(this.$stage);
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run() {
            var rtl = this.settings.rtl ? 1 : -1,
                size = this._clones.length + this._items.length,
                iterator = -1,
                previous = 0,
                current = 0,
                coordinates = [];

            while (++iterator < size) {
                previous = coordinates[iterator - 1] || 0;
                current = this._widths[this.relative(iterator)] + this.settings.margin;
                coordinates.push(previous + current * rtl);
            }

            this._coordinates = coordinates;
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run() {
            var padding = this.settings.stagePadding,
                coordinates = this._coordinates,
                css = {
                    'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
                    'padding-left': padding || '',
                    'padding-right': padding || ''
                };
            this.$stage.css(css);
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run(cache) {
            var iterator = this._coordinates.length,
                grid = !this.settings.autoWidth,
                items = this.$stage.children();

            if (grid && cache.items.merge) {
                while (iterator--) {
                    cache.css.width = this._widths[this.relative(iterator)];
                    items.eq(iterator).css(cache.css);
                }
            } else if (grid) {
                cache.css.width = cache.items.width;
                items.css(cache.css);
            }
        }
    }, {
        filter: ['items'],
        run: function run() {
            this._coordinates.length < 1 && this.$stage.removeAttr('style');
        }
    }, {
        filter: ['width', 'items', 'settings'],
        run: function run(cache) {
            cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
            cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
            this.reset(cache.current);
        }
    }, {
        filter: ['position'],
        run: function run() {
            this.animate(this.coordinates(this._current));
        }
    }, {
        filter: ['width', 'position', 'items', 'settings'],
        run: function run() {
            var rtl = this.settings.rtl ? 1 : -1,
                padding = this.settings.stagePadding * 2,
                begin = this.coordinates(this.current()) + padding,
                end = begin + this.width() * rtl,
                inner,
                outer,
                matches = [],
                i,
                n;

            for (i = 0, n = this._coordinates.length; i < n; i++) {
                inner = this._coordinates[i - 1] || 0;
                outer = Math.abs(this._coordinates[i]) + padding * rtl;

                if (this.op(inner, '<=', begin) && this.op(inner, '>', end) || this.op(outer, '<', begin) && this.op(outer, '>', end)) {
                    matches.push(i);
                }
            }

            this.$stage.children('.active').removeClass('active');
            this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');
            this.$stage.children('.center').removeClass('center');

            if (this.settings.center) {
                this.$stage.children().eq(this.current()).addClass('center');
            }
        }
    }];
    /**
     * Create the stage DOM element
     */

    Owl.prototype.initializeStage = function() {
        this.$stage = this.$element.find('.' + this.settings.stageClass); // if the stage is already in the DOM, grab it and skip stage initialization

        if (this.$stage.length) {
            return;
        }

        this.$element.addClass(this.options.loadingClass); // create stage

        this.$stage = $('<' + this.settings.stageElement + '>', {
            "class": this.settings.stageClass
        }).wrap($('<div/>', {
            "class": this.settings.stageOuterClass
        })); // append stage

        this.$element.append(this.$stage.parent());
    };
    /**
     * Create item DOM elements
     */


    Owl.prototype.initializeItems = function() {
        var $items = this.$element.find('.owl-item'); // if the items are already in the DOM, grab them and skip item initialization

        if ($items.length) {
            this._items = $items.get().map(function(item) {
                return $(item);
            });
            this._mergers = this._items.map(function() {
                return 1;
            });
            this.refresh();
            return;
        } // append content


        this.replace(this.$element.children().not(this.$stage.parent())); // check visibility

        if (this.isVisible()) {
            // update view
            this.refresh();
        } else {
            // invalidate width
            this.invalidate('width');
        }

        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
    };
    /**
     * Initializes the carousel.
     * @protected
     */


    Owl.prototype.initialize = function() {
        this.enter('initializing');
        this.trigger('initialize');
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

        if (this.settings.autoWidth && !this.is('pre-loading')) {
            var imgs, nestedSelector, width;
            imgs = this.$element.find('img');
            nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
            width = this.$element.children(nestedSelector).width();

            if (imgs.length && width <= 0) {
                this.preloadAutoWidthImages(imgs);
            }
        }

        this.initializeStage();
        this.initializeItems(); // register event handlers

        this.registerEventHandlers();
        this.leave('initializing');
        this.trigger('initialized');
    };
    /**
     * @returns {Boolean} visibility of $element
     *                    if you know the carousel will always be visible you can set `checkVisibility` to `false` to
     *                    prevent the expensive browser layout forced reflow the $element.is(':visible') does
     */


    Owl.prototype.isVisible = function() {
        return this.settings.checkVisibility ? this.$element.is(':visible') : true;
    };
    /**
     * Setups the current settings.
     * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
     * @todo Support for media queries by using `matchMedia` would be nice.
     * @public
     */


    Owl.prototype.setup = function() {
        var viewport = this.viewport(),
            overwrites = this.options.responsive,
            match = -1,
            settings = null;

        if (!overwrites) {
            settings = $.extend({}, this.options);
        } else {
            $.each(overwrites, function(breakpoint) {
                if (breakpoint <= viewport && breakpoint > match) {
                    match = Number(breakpoint);
                }
            });
            settings = $.extend({}, this.options, overwrites[match]);

            if (typeof settings.stagePadding === 'function') {
                settings.stagePadding = settings.stagePadding();
            }

            delete settings.responsive; // responsive class

            if (settings.responsiveClass) {
                this.$element.attr('class', this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match));
            }
        }

        this.trigger('change', {
            property: {
                name: 'settings',
                value: settings
            }
        });
        this._breakpoint = match;
        this.settings = settings;
        this.invalidate('settings');
        this.trigger('changed', {
            property: {
                name: 'settings',
                value: this.settings
            }
        });
    };
    /**
     * Updates option logic if necessery.
     * @protected
     */


    Owl.prototype.optionsLogic = function() {
        if (this.settings.autoWidth) {
            this.settings.stagePadding = false;
            this.settings.merge = false;
        }
    };
    /**
     * Prepares an item before add.
     * @todo Rename event parameter `content` to `item`.
     * @protected
     * @returns {jQuery|HTMLElement} - The item container.
     */


    Owl.prototype.prepare = function(item) {
        var event = this.trigger('prepare', {
            content: item
        });

        if (!event.data) {
            event.data = $('<' + this.settings.itemElement + '/>').addClass(this.options.itemClass).append(item);
        }

        this.trigger('prepared', {
            content: event.data
        });
        return event.data;
    };
    /**
     * Updates the view.
     * @public
     */


    Owl.prototype.update = function() {
        var i = 0,
            n = this._pipe.length,
            filter = $.proxy(function(p) {
                return this[p];
            }, this._invalidated),
            cache = {};

        while (i < n) {
            if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
                this._pipe[i].run(cache);
            }

            i++;
        }

        this._invalidated = {};
        !this.is('valid') && this.enter('valid');
    };
    /**
     * Gets the width of the view.
     * @public
     * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
     * @returns {Number} - The width of the view in pixel.
     */


    Owl.prototype.width = function(dimension) {
        dimension = dimension || Owl.Width.Default;

        switch (dimension) {
            case Owl.Width.Inner:
            case Owl.Width.Outer:
                return this._width;

            default:
                return this._width - this.settings.stagePadding * 2 + this.settings.margin;
        }
    };
    /**
     * Refreshes the carousel primarily for adaptive purposes.
     * @public
     */


    Owl.prototype.refresh = function() {
        this.enter('refreshing');
        this.trigger('refresh');
        this.setup();
        this.optionsLogic();
        this.$element.addClass(this.options.refreshClass);
        this.update();
        this.$element.removeClass(this.options.refreshClass);
        this.leave('refreshing');
        this.trigger('refreshed');
    };
    /**
     * Checks window `resize` event.
     * @protected
     */


    Owl.prototype.onThrottledResize = function() {
        window.clearTimeout(this.resizeTimer);
        this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
    };
    /**
     * Checks window `resize` event.
     * @protected
     */


    Owl.prototype.onResize = function() {
        if (!this._items.length) {
            return false;
        }

        if (this._width === this.$element.width()) {
            return false;
        }

        if (!this.isVisible()) {
            return false;
        }

        this.enter('resizing');

        if (this.trigger('resize').isDefaultPrevented()) {
            this.leave('resizing');
            return false;
        }

        this.invalidate('width');
        this.refresh();
        this.leave('resizing');
        this.trigger('resized');
    };
    /**
     * Registers event handlers.
     * @todo Check `msPointerEnabled`
     * @todo #261
     * @protected
     */


    Owl.prototype.registerEventHandlers = function() {
        if ($.support.transition) {
            this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
        }

        if (this.settings.responsive !== false) {
            this.on(window, 'resize', this._handlers.onThrottledResize);
        }

        if (this.settings.mouseDrag) {
            this.$element.addClass(this.options.dragClass);
            this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
            this.$stage.on('dragstart.owl.core selectstart.owl.core', function() {
                return false;
            });
        }

        if (this.settings.touchDrag) {
            this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
            this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
        }
    };
    /**
     * Handles `touchstart` and `mousedown` events.
     * @todo Horizontal swipe threshold as option
     * @todo #261
     * @protected
     * @param {Event} event - The event arguments.
     */


    Owl.prototype.onDragStart = function(event) {
        var stage = null;

        if (event.which === 3) {
            return;
        }

        if ($.support.transform) {
            stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
            stage = {
                x: stage[stage.length === 16 ? 12 : 4],
                y: stage[stage.length === 16 ? 13 : 5]
            };
        } else {
            stage = this.$stage.position();
            stage = {
                x: this.settings.rtl ? stage.left + this.$stage.width() - this.width() + this.settings.margin : stage.left,
                y: stage.top
            };
        }

        if (this.is('animating')) {
            $.support.transform ? this.animate(stage.x) : this.$stage.stop();
            this.invalidate('position');
        }

        this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');
        this.speed(0);
        this._drag.time = new Date().getTime();
        this._drag.target = $(event.target);
        this._drag.stage.start = stage;
        this._drag.stage.current = stage;
        this._drag.pointer = this.pointer(event);
        $(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));
        $(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
            var delta = this.difference(this._drag.pointer, this.pointer(event));
            $(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

            if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
                return;
            }

            event.preventDefault();
            this.enter('dragging');
            this.trigger('drag');
        }, this));
    };
    /**
     * Handles the `touchmove` and `mousemove` events.
     * @todo #261
     * @protected
     * @param {Event} event - The event arguments.
     */


    Owl.prototype.onDragMove = function(event) {
        var minimum = null,
            maximum = null,
            pull = null,
            delta = this.difference(this._drag.pointer, this.pointer(event)),
            stage = this.difference(this._drag.stage.start, delta);

        if (!this.is('dragging')) {
            return;
        }

        event.preventDefault();

        if (this.settings.loop) {
            minimum = this.coordinates(this.minimum());
            maximum = this.coordinates(this.maximum() + 1) - minimum;
            stage.x = ((stage.x - minimum) % maximum + maximum) % maximum + minimum;
        } else {
            minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
            maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
            pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
            stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
        }

        this._drag.stage.current = stage;
        this.animate(stage.x);
    };
    /**
     * Handles the `touchend` and `mouseup` events.
     * @todo #261
     * @todo Threshold for click event
     * @protected
     * @param {Event} event - The event arguments.
     */


    Owl.prototype.onDragEnd = function(event) {
        var delta = this.difference(this._drag.pointer, this.pointer(event)),
            stage = this._drag.stage.current,
            direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';
        $(document).off('.owl.core');
        this.$element.removeClass(this.options.grabClass);

        if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
            this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
            this.invalidate('position');
            this.update();
            this._drag.direction = direction;

            if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
                this._drag.target.one('click.owl.core', function() {
                    return false;
                });
            }
        }

        if (!this.is('dragging')) {
            return;
        }

        this.leave('dragging');
        this.trigger('dragged');
    };
    /**
     * Gets absolute position of the closest item for a coordinate.
     * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
     * @protected
     * @param {Number} coordinate - The coordinate in pixel.
     * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
     * @return {Number} - The absolute position of the closest item.
     */


    Owl.prototype.closest = function(coordinate, direction) {
        var position = -1,
            pull = 30,
            width = this.width(),
            coordinates = this.coordinates();

        if (!this.settings.freeDrag) {
            // check closest item
            $.each(coordinates, $.proxy(function(index, value) {
                // on a left pull, check on current index
                if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
                    position = index; // on a right pull, check on previous index
                    // to do so, subtract width from value and set position = index + 1
                } else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
                    position = index + 1;
                } else if (this.op(coordinate, '<', value) && this.op(coordinate, '>', coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) {
                    position = direction === 'left' ? index + 1 : index;
                }

                return position === -1;
            }, this));
        }

        if (!this.settings.loop) {
            // non loop boundries
            if (this.op(coordinate, '>', coordinates[this.minimum()])) {
                position = coordinate = this.minimum();
            } else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
                position = coordinate = this.maximum();
            }
        }

        return position;
    };
    /**
     * Animates the stage.
     * @todo #270
     * @public
     * @param {Number} coordinate - The coordinate in pixels.
     */


    Owl.prototype.animate = function(coordinate) {
        var animate = this.speed() > 0;
        this.is('animating') && this.onTransitionEnd();

        if (animate) {
            this.enter('animating');
            this.trigger('translate');
        }

        if ($.support.transform3d && $.support.transition) {
            this.$stage.css({
                transform: 'translate3d(' + coordinate + 'px,0px,0px)',
                transition: this.speed() / 1000 + 's' + (this.settings.slideTransition ? ' ' + this.settings.slideTransition : '')
            });
        } else if (animate) {
            this.$stage.animate({
                left: coordinate + 'px'
            }, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
        } else {
            this.$stage.css({
                left: coordinate + 'px'
            });
        }
    };
    /**
     * Checks whether the carousel is in a specific state or not.
     * @param {String} state - The state to check.
     * @returns {Boolean} - The flag which indicates if the carousel is busy.
     */


    Owl.prototype.is = function(state) {
        return this._states.current[state] && this._states.current[state] > 0;
    };
    /**
     * Sets the absolute position of the current item.
     * @public
     * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
     * @returns {Number} - The absolute position of the current item.
     */


    Owl.prototype.current = function(position) {
        if (position === undefined) {
            return this._current;
        }

        if (this._items.length === 0) {
            return undefined;
        }

        position = this.normalize(position);

        if (this._current !== position) {
            var event = this.trigger('change', {
                property: {
                    name: 'position',
                    value: position
                }
            });

            if (event.data !== undefined) {
                position = this.normalize(event.data);
            }

            this._current = position;
            this.invalidate('position');
            this.trigger('changed', {
                property: {
                    name: 'position',
                    value: this._current
                }
            });
        }

        return this._current;
    };
    /**
     * Invalidates the given part of the update routine.
     * @param {String} [part] - The part to invalidate.
     * @returns {Array.<String>} - The invalidated parts.
     */


    Owl.prototype.invalidate = function(part) {
        if ($.type(part) === 'string') {
            this._invalidated[part] = true;
            this.is('valid') && this.leave('valid');
        }

        return $.map(this._invalidated, function(v, i) {
            return i;
        });
    };
    /**
     * Resets the absolute position of the current item.
     * @public
     * @param {Number} position - The absolute position of the new item.
     */


    Owl.prototype.reset = function(position) {
        position = this.normalize(position);

        if (position === undefined) {
            return;
        }

        this._speed = 0;
        this._current = position;
        this.suppress(['translate', 'translated']);
        this.animate(this.coordinates(position));
        this.release(['translate', 'translated']);
    };
    /**
     * Normalizes an absolute or a relative position of an item.
     * @public
     * @param {Number} position - The absolute or relative position to normalize.
     * @param {Boolean} [relative=false] - Whether the given position is relative or not.
     * @returns {Number} - The normalized position.
     */


    Owl.prototype.normalize = function(position, relative) {
        var n = this._items.length,
            m = relative ? 0 : this._clones.length;

        if (!this.isNumeric(position) || n < 1) {
            position = undefined;
        } else if (position < 0 || position >= n + m) {
            position = ((position - m / 2) % n + n) % n + m / 2;
        }

        return position;
    };
    /**
     * Converts an absolute position of an item into a relative one.
     * @public
     * @param {Number} position - The absolute position to convert.
     * @returns {Number} - The converted position.
     */


    Owl.prototype.relative = function(position) {
        position -= this._clones.length / 2;
        return this.normalize(position, true);
    };
    /**
     * Gets the maximum position for the current item.
     * @public
     * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
     * @returns {Number}
     */


    Owl.prototype.maximum = function(relative) {
        var settings = this.settings,
            maximum = this._coordinates.length,
            iterator,
            reciprocalItemsWidth,
            elementWidth;

        if (settings.loop) {
            maximum = this._clones.length / 2 + this._items.length - 1;
        } else if (settings.autoWidth || settings.merge) {
            iterator = this._items.length;

            if (iterator) {
                reciprocalItemsWidth = this._items[--iterator].width();
                elementWidth = this.$element.width();

                while (iterator--) {
                    reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;

                    if (reciprocalItemsWidth > elementWidth) {
                        break;
                    }
                }
            }

            maximum = iterator + 1;
        } else if (settings.center) {
            maximum = this._items.length - 1;
        } else {
            maximum = this._items.length - settings.items;
        }

        if (relative) {
            maximum -= this._clones.length / 2;
        }

        return Math.max(maximum, 0);
    };
    /**
     * Gets the minimum position for the current item.
     * @public
     * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
     * @returns {Number}
     */


    Owl.prototype.minimum = function(relative) {
        return relative ? 0 : this._clones.length / 2;
    };
    /**
     * Gets an item at the specified relative position.
     * @public
     * @param {Number} [position] - The relative position of the item.
     * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
     */


    Owl.prototype.items = function(position) {
        if (position === undefined) {
            return this._items.slice();
        }

        position = this.normalize(position, true);
        return this._items[position];
    };
    /**
     * Gets an item at the specified relative position.
     * @public
     * @param {Number} [position] - The relative position of the item.
     * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
     */


    Owl.prototype.mergers = function(position) {
        if (position === undefined) {
            return this._mergers.slice();
        }

        position = this.normalize(position, true);
        return this._mergers[position];
    };
    /**
     * Gets the absolute positions of clones for an item.
     * @public
     * @param {Number} [position] - The relative position of the item.
     * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
     */


    Owl.prototype.clones = function(position) {
        var odd = this._clones.length / 2,
            even = odd + this._items.length,
            map = function map(index) {
                return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
            };

        if (position === undefined) {
            return $.map(this._clones, function(v, i) {
                return map(i);
            });
        }

        return $.map(this._clones, function(v, i) {
            return v === position ? map(i) : null;
        });
    };
    /**
     * Sets the current animation speed.
     * @public
     * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
     * @returns {Number} - The current animation speed in milliseconds.
     */


    Owl.prototype.speed = function(speed) {
        if (speed !== undefined) {
            this._speed = speed;
        }

        return this._speed;
    };
    /**
     * Gets the coordinate of an item.
     * @todo The name of this method is missleanding.
     * @public
     * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
     * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
     */


    Owl.prototype.coordinates = function(position) {
        var multiplier = 1,
            newPosition = position - 1,
            coordinate;

        if (position === undefined) {
            return $.map(this._coordinates, $.proxy(function(coordinate, index) {
                return this.coordinates(index);
            }, this));
        }

        if (this.settings.center) {
            if (this.settings.rtl) {
                multiplier = -1;
                newPosition = position + 1;
            }

            coordinate = this._coordinates[position];
            coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
        } else {
            coordinate = this._coordinates[newPosition] || 0;
        }

        coordinate = Math.ceil(coordinate);
        return coordinate;
    };
    /**
     * Calculates the speed for a translation.
     * @protected
     * @param {Number} from - The absolute position of the start item.
     * @param {Number} to - The absolute position of the target item.
     * @param {Number} [factor=undefined] - The time factor in milliseconds.
     * @returns {Number} - The time in milliseconds for the translation.
     */


    Owl.prototype.duration = function(from, to, factor) {
        if (factor === 0) {
            return 0;
        }

        return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs(factor || this.settings.smartSpeed);
    };
    /**
     * Slides to the specified item.
     * @public
     * @param {Number} position - The position of the item.
     * @param {Number} [speed] - The time in milliseconds for the transition.
     */


    Owl.prototype.to = function(position, speed) {
        var current = this.current(),
            revert = null,
            distance = position - this.relative(current),
            direction = (distance > 0) - (distance < 0),
            items = this._items.length,
            minimum = this.minimum(),
            maximum = this.maximum();

        if (this.settings.loop) {
            if (!this.settings.rewind && Math.abs(distance) > items / 2) {
                distance += direction * -1 * items;
            }

            position = current + distance;
            revert = ((position - minimum) % items + items) % items + minimum;

            if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
                current = revert - distance;
                position = revert;
                this.reset(current);
            }
        } else if (this.settings.rewind) {
            maximum += 1;
            position = (position % maximum + maximum) % maximum;
        } else {
            position = Math.max(minimum, Math.min(maximum, position));
        }

        this.speed(this.duration(current, position, speed));
        this.current(position);

        if (this.isVisible()) {
            this.update();
        }
    };
    /**
     * Slides to the next item.
     * @public
     * @param {Number} [speed] - The time in milliseconds for the transition.
     */


    Owl.prototype.next = function(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) + 1, speed);
    };
    /**
     * Slides to the previous item.
     * @public
     * @param {Number} [speed] - The time in milliseconds for the transition.
     */


    Owl.prototype.prev = function(speed) {
        speed = speed || false;
        this.to(this.relative(this.current()) - 1, speed);
    };
    /**
     * Handles the end of an animation.
     * @protected
     * @param {Event} event - The event arguments.
     */


    Owl.prototype.onTransitionEnd = function(event) {
        // if css2 animation then event object is undefined
        if (event !== undefined) {
            event.stopPropagation(); // Catch only owl-stage transitionEnd event

            if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
                return false;
            }
        }

        this.leave('animating');
        this.trigger('translated');
    };
    /**
     * Gets viewport width.
     * @protected
     * @return {Number} - The width in pixel.
     */


    Owl.prototype.viewport = function() {
        var width;

        if (this.options.responsiveBaseElement !== window) {
            width = $(this.options.responsiveBaseElement).width();
        } else if (window.innerWidth) {
            width = window.innerWidth;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            width = document.documentElement.clientWidth;
        } else {
            console.warn('Can not detect viewport width.');
        }

        return width;
    };
    /**
     * Replaces the current content.
     * @public
     * @param {HTMLElement|jQuery|String} content - The new content.
     */


    Owl.prototype.replace = function(content) {
        this.$stage.empty();
        this._items = [];

        if (content) {
            content = content instanceof jQuery ? content : $(content);
        }

        if (this.settings.nestedItemSelector) {
            content = content.find('.' + this.settings.nestedItemSelector);
        }

        content.filter(function() {
            return this.nodeType === 1;
        }).each($.proxy(function(index, item) {
            item = this.prepare(item);
            this.$stage.append(item);

            this._items.push(item);

            this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
        }, this));
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate('items');
    };
    /**
     * Adds an item.
     * @todo Use `item` instead of `content` for the event arguments.
     * @public
     * @param {HTMLElement|jQuery|String} content - The item content to add.
     * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
     */


    Owl.prototype.add = function(content, position) {
        var current = this.relative(this._current);
        position = position === undefined ? this._items.length : this.normalize(position, true);
        content = content instanceof jQuery ? content : $(content);
        this.trigger('add', {
            content: content,
            position: position
        });
        content = this.prepare(content);

        if (this._items.length === 0 || position === this._items.length) {
            this._items.length === 0 && this.$stage.append(content);
            this._items.length !== 0 && this._items[position - 1].after(content);

            this._items.push(content);

            this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
        } else {
            this._items[position].before(content);

            this._items.splice(position, 0, content);

            this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
        }

        this._items[current] && this.reset(this._items[current].index());
        this.invalidate('items');
        this.trigger('added', {
            content: content,
            position: position
        });
    };
    /**
     * Removes an item by its position.
     * @todo Use `item` instead of `content` for the event arguments.
     * @public
     * @param {Number} position - The relative position of the item to remove.
     */


    Owl.prototype.remove = function(position) {
        position = this.normalize(position, true);

        if (position === undefined) {
            return;
        }

        this.trigger('remove', {
            content: this._items[position],
            position: position
        });

        this._items[position].remove();

        this._items.splice(position, 1);

        this._mergers.splice(position, 1);

        this.invalidate('items');
        this.trigger('removed', {
            content: null,
            position: position
        });
    };
    /**
     * Preloads images with auto width.
     * @todo Replace by a more generic approach
     * @protected
     */


    Owl.prototype.preloadAutoWidthImages = function(images) {
        images.each($.proxy(function(i, element) {
            this.enter('pre-loading');
            element = $(element);
            $(new Image()).one('load', $.proxy(function(e) {
                element.attr('src', e.target.src);
                element.css('opacity', 1);
                this.leave('pre-loading');
                !this.is('pre-loading') && !this.is('initializing') && this.refresh();
            }, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
        }, this));
    };
    /**
     * Destroys the carousel.
     * @public
     */


    Owl.prototype.destroy = function() {
        this.$element.off('.owl.core');
        this.$stage.off('.owl.core');
        $(document).off('.owl.core');

        if (this.settings.responsive !== false) {
            window.clearTimeout(this.resizeTimer);
            this.off(window, 'resize', this._handlers.onThrottledResize);
        }

        for (var i in this._plugins) {
            this._plugins[i].destroy();
        }

        this.$stage.children('.cloned').remove();
        this.$stage.unwrap();
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$stage.remove();
        this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), '')).removeData('owl.carousel');
    };
    /**
     * Operators to calculate right-to-left and left-to-right.
     * @protected
     * @param {Number} [a] - The left side operand.
     * @param {String} [o] - The operator.
     * @param {Number} [b] - The right side operand.
     */


    Owl.prototype.op = function(a, o, b) {
        var rtl = this.settings.rtl;

        switch (o) {
            case '<':
                return rtl ? a > b : a < b;

            case '>':
                return rtl ? a < b : a > b;

            case '>=':
                return rtl ? a <= b : a >= b;

            case '<=':
                return rtl ? a >= b : a <= b;

            default:
                break;
        }
    };
    /**
     * Attaches to an internal event.
     * @protected
     * @param {HTMLElement} element - The event source.
     * @param {String} event - The event name.
     * @param {Function} listener - The event handler to attach.
     * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
     */


    Owl.prototype.on = function(element, event, listener, capture) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, capture);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, listener);
        }
    };
    /**
     * Detaches from an internal event.
     * @protected
     * @param {HTMLElement} element - The event source.
     * @param {String} event - The event name.
     * @param {Function} listener - The attached event handler to detach.
     * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
     */


    Owl.prototype.off = function(element, event, listener, capture) {
        if (element.removeEventListener) {
            element.removeEventListener(event, listener, capture);
        } else if (element.detachEvent) {
            element.detachEvent('on' + event, listener);
        }
    };
    /**
     * Triggers a public event.
     * @todo Remove `status`, `relatedTarget` should be used instead.
     * @protected
     * @param {String} name - The event name.
     * @param {*} [data=null] - The event data.
     * @param {String} [namespace=carousel] - The event namespace.
     * @param {String} [state] - The state which is associated with the event.
     * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
     * @returns {Event} - The event arguments.
     */


    Owl.prototype.trigger = function(name, data, namespace, state, enter) {
        var status = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            handler = $.camelCase($.grep(['on', name, namespace], function(v) {
                return v;
            }).join('-').toLowerCase()),
            event = $.Event([name, 'owl', namespace || 'carousel'].join('.').toLowerCase(), $.extend({
                relatedTarget: this
            }, status, data));

        if (!this._supress[name]) {
            $.each(this._plugins, function(name, plugin) {
                if (plugin.onTrigger) {
                    plugin.onTrigger(event);
                }
            });
            this.register({
                type: Owl.Type.Event,
                name: name
            });
            this.$element.trigger(event);

            if (this.settings && typeof this.settings[handler] === 'function') {
                this.settings[handler].call(this, event);
            }
        }

        return event;
    };
    /**
     * Enters a state.
     * @param name - The state name.
     */


    Owl.prototype.enter = function(name) {
        $.each([name].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
            if (this._states.current[name] === undefined) {
                this._states.current[name] = 0;
            }

            this._states.current[name]++;
        }, this));
    };
    /**
     * Leaves a state.
     * @param name - The state name.
     */


    Owl.prototype.leave = function(name) {
        $.each([name].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
            this._states.current[name]--;
        }, this));
    };
    /**
     * Registers an event or state.
     * @public
     * @param {Object} object - The event or state to register.
     */


    Owl.prototype.register = function(object) {
        if (object.type === Owl.Type.Event) {
            if (!$.event.special[object.name]) {
                $.event.special[object.name] = {};
            }

            if (!$.event.special[object.name].owl) {
                var _default = $.event.special[object.name]._default;

                $.event.special[object.name]._default = function(e) {
                    if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
                        return _default.apply(this, arguments);
                    }

                    return e.namespace && e.namespace.indexOf('owl') > -1;
                };

                $.event.special[object.name].owl = true;
            }
        } else if (object.type === Owl.Type.State) {
            if (!this._states.tags[object.name]) {
                this._states.tags[object.name] = object.tags;
            } else {
                this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
            }

            this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
                return $.inArray(tag, this._states.tags[object.name]) === i;
            }, this));
        }
    };
    /**
     * Suppresses events.
     * @protected
     * @param {Array.<String>} events - The events to suppress.
     */


    Owl.prototype.suppress = function(events) {
        $.each(events, $.proxy(function(index, event) {
            this._supress[event] = true;
        }, this));
    };
    /**
     * Releases suppressed events.
     * @protected
     * @param {Array.<String>} events - The events to release.
     */


    Owl.prototype.release = function(events) {
        $.each(events, $.proxy(function(index, event) {
            delete this._supress[event];
        }, this));
    };
    /**
     * Gets unified pointer coordinates from event.
     * @todo #261
     * @protected
     * @param {Event} - The `mousedown` or `touchstart` event.
     * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
     */


    Owl.prototype.pointer = function(event) {
        var result = {
            x: null,
            y: null
        };
        event = event.originalEvent || event || window.event;
        event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;

        if (event.pageX) {
            result.x = event.pageX;
            result.y = event.pageY;
        } else {
            result.x = event.clientX;
            result.y = event.clientY;
        }

        return result;
    };
    /**
     * Determines if the input is a Number or something that can be coerced to a Number
     * @protected
     * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
     * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
     */


    Owl.prototype.isNumeric = function(number) {
        return !isNaN(parseFloat(number));
    };
    /**
     * Gets the difference of two vectors.
     * @todo #261
     * @protected
     * @param {Object} - The first vector.
     * @param {Object} - The second vector.
     * @returns {Object} - The difference.
     */


    Owl.prototype.difference = function(first, second) {
        return {
            x: first.x - second.x,
            y: first.y - second.y
        };
    };
    /**
     * The jQuery Plugin for the Owl Carousel
     * @todo Navigation plugin `next` and `prev`
     * @public
     */


    $.fn.owlCarousel = function(option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var $this = $(this),
                data = $this.data('owl.carousel');

            if (!data) {
                data = new Owl(this, _typeof(option) == 'object' && option);
                $this.data('owl.carousel', data);
                $.each(['next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'], function(i, event) {
                    data.register({
                        type: Owl.Type.Event,
                        name: event
                    });
                    data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
                        if (e.namespace && e.relatedTarget !== this) {
                            this.suppress([event]);
                            data[event].apply(this, [].slice.call(arguments, 1));
                            this.release([event]);
                        }
                    }, data));
                });
            }

            if (typeof option == 'string' && option.charAt(0) !== '_') {
                data[option].apply(data, args);
            }
        });
    };
    /**
     * The constructor for the jQuery Plugin
     * @public
     */


    $.fn.owlCarousel.Constructor = Owl;
})(window.Zepto || window.jQuery, window, document);
/**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the auto refresh plugin.
     * @class The Auto Refresh Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var AutoRefresh = function AutoRefresh(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * Refresh interval.
         * @protected
         * @type {number}
         */

        this._interval = null;
        /**
         * Whether the element is currently visible or not.
         * @protected
         * @type {Boolean}
         */

        this._visible = null;
        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'initialized.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.autoRefresh) {
                    this.watch();
                }
            }, this)
        }; // set default options

        this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options); // register event handlers

        this._core.$element.on(this._handlers);
    };
    /**
     * Default options.
     * @public
     */


    AutoRefresh.Defaults = {
        autoRefresh: true,
        autoRefreshInterval: 500
    };
    /**
     * Watches the element.
     */

    AutoRefresh.prototype.watch = function() {
        if (this._interval) {
            return;
        }

        this._visible = this._core.isVisible();
        this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
    };
    /**
     * Refreshes the element.
     */


    AutoRefresh.prototype.refresh = function() {
        if (this._core.isVisible() === this._visible) {
            return;
        }

        this._visible = !this._visible;

        this._core.$element.toggleClass('owl-hidden', !this._visible);

        this._visible && this._core.invalidate('width') && this._core.refresh();
    };
    /**
     * Destroys the plugin.
     */


    AutoRefresh.prototype.destroy = function() {
        var handler, property;
        window.clearInterval(this._interval);

        for (handler in this._handlers) {
            this._core.$element.off(handler, this._handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;
})(window.Zepto || window.jQuery, window, document);
/**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the lazy plugin.
     * @class The Lazy Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var Lazy = function Lazy(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * Already loaded items.
         * @protected
         * @type {Array.<jQuery>}
         */

        this._loaded = [];
        /**
         * Event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
                if (!e.namespace) {
                    return;
                }

                if (!this._core.settings || !this._core.settings.lazyLoad) {
                    return;
                }

                if (e.property && e.property.name == 'position' || e.type == 'initialized') {
                    var settings = this._core.settings,
                        n = settings.center && Math.ceil(settings.items / 2) || settings.items,
                        i = settings.center && n * -1 || 0,
                        position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
                        clones = this._core.clones().length,
                        load = $.proxy(function(i, v) {
                            this.load(v);
                        }, this); //TODO: Need documentation for this new option


                    if (settings.lazyLoadEager > 0) {
                        n += settings.lazyLoadEager; // If the carousel is looping also preload images that are to the "left"

                        if (settings.loop) {
                            position -= settings.lazyLoadEager;
                            n++;
                        }
                    }

                    while (i++ < n) {
                        this.load(clones / 2 + this._core.relative(position));
                        clones && $.each(this._core.clones(this._core.relative(position)), load);
                        position++;
                    }
                }
            }, this)
        }; // set the default options

        this._core.options = $.extend({}, Lazy.Defaults, this._core.options); // register event handler

        this._core.$element.on(this._handlers);
    };
    /**
     * Default options.
     * @public
     */


    Lazy.Defaults = {
        lazyLoad: false,
        lazyLoadEager: 0
    };
    /**
     * Loads all resources of an item at the specified position.
     * @param {Number} position - The absolute position of the item.
     * @protected
     */

    Lazy.prototype.load = function(position) {
        var $item = this._core.$stage.children().eq(position),
            $elements = $item && $item.find('.owl-lazy');

        if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
            return;
        }

        $elements.each($.proxy(function(index, element) {
            var $element = $(element),
                image,
                url = window.devicePixelRatio > 1 && $element.attr('data-src-retina') || $element.attr('data-src') || $element.attr('data-srcset');

            this._core.trigger('load', {
                element: $element,
                url: url
            }, 'lazy');

            if ($element.is('img')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    $element.css('opacity', 1);

                    this._core.trigger('loaded', {
                        element: $element,
                        url: url
                    }, 'lazy');
                }, this)).attr('src', url);
            } else if ($element.is('source')) {
                $element.one('load.owl.lazy', $.proxy(function() {
                    this._core.trigger('loaded', {
                        element: $element,
                        url: url
                    }, 'lazy');
                }, this)).attr('srcset', url);
            } else {
                image = new Image();
                image.onload = $.proxy(function() {
                    $element.css({
                        'background-image': 'url("' + url + '")',
                        'opacity': '1'
                    });

                    this._core.trigger('loaded', {
                        element: $element,
                        url: url
                    }, 'lazy');
                }, this);
                image.src = url;
            }
        }, this));

        this._loaded.push($item.get(0));
    };
    /**
     * Destroys the plugin.
     * @public
     */


    Lazy.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this._core.$element.off(handler, this.handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;
})(window.Zepto || window.jQuery, window, document);
/**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the auto height plugin.
     * @class The Auto Height Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var AutoHeight = function AutoHeight(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        this._previousHeight = null;
        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight) {
                    this.update();
                }
            }, this),
            'changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight && e.property.name === 'position') {
                    this.update();
                }
            }, this),
            'loaded.owl.lazy': $.proxy(function(e) {
                if (e.namespace && this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
                    this.update();
                }
            }, this)
        }; // set default options

        this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options); // register event handlers

        this._core.$element.on(this._handlers);

        this._intervalId = null;
        var refThis = this; // These changes have been taken from a PR by gavrochelegnou proposed in #1575
        // and have been made compatible with the latest jQuery version

        $(window).on('load', function() {
            if (refThis._core.settings.autoHeight) {
                refThis.update();
            }
        }); // Autoresize the height of the carousel when window is resized
        // When carousel has images, the height is dependent on the width
        // and should also change on resize

        $(window).resize(function() {
            if (refThis._core.settings.autoHeight) {
                if (refThis._intervalId != null) {
                    clearTimeout(refThis._intervalId);
                }

                refThis._intervalId = setTimeout(function() {
                    refThis.update();
                }, 250);
            }
        });
    };
    /**
     * Default options.
     * @public
     */


    AutoHeight.Defaults = {
        autoHeight: false,
        autoHeightClass: 'owl-height'
    };
    /**
     * Updates the view.
     */

    AutoHeight.prototype.update = function() {
        var start = this._core._current,
            end = start + this._core.settings.items,
            lazyLoadEnabled = this._core.settings.lazyLoad,
            visible = this._core.$stage.children().toArray().slice(start, end),
            heights = [],
            maxheight = 0;

        $.each(visible, function(index, item) {
            heights.push($(item).height());
        });
        maxheight = Math.max.apply(null, heights);

        if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
            maxheight = this._previousHeight;
        }

        this._previousHeight = maxheight;

        this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass);
    };

    AutoHeight.prototype.destroy = function() {
        var handler, property;

        for (handler in this._handlers) {
            this._core.$element.off(handler, this._handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] !== 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
})(window.Zepto || window.jQuery, window, document);
/**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the video plugin.
     * @class The Video Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var Video = function Video(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * Cache all video URLs.
         * @protected
         * @type {Object}
         */

        this._videos = {};
        /**
         * Current playing item.
         * @protected
         * @type {jQuery}
         */

        this._playing = null;
        /**
         * All event handlers.
         * @todo The cloned content removale is too late
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'initialized.owl.carousel': $.proxy(function(e) {
                if (e.namespace) {
                    this._core.register({
                        type: 'state',
                        name: 'playing',
                        tags: ['interacting']
                    });
                }
            }, this),
            'resize.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
                    e.preventDefault();
                }
            }, this),
            'refreshed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.is('resizing')) {
                    this._core.$stage.find('.cloned .owl-video-frame').remove();
                }
            }, this),
            'changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name === 'position' && this._playing) {
                    this.stop();
                }
            }, this),
            'prepared.owl.carousel': $.proxy(function(e) {
                if (!e.namespace) {
                    return;
                }

                var $element = $(e.content).find('.owl-video');

                if ($element.length) {
                    $element.css('display', 'none');
                    this.fetch($element, $(e.content));
                }
            }, this)
        }; // set default options

        this._core.options = $.extend({}, Video.Defaults, this._core.options); // register event handlers

        this._core.$element.on(this._handlers);

        this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
            this.play(e);
        }, this));
    };
    /**
     * Default options.
     * @public
     */


    Video.Defaults = {
        video: false,
        videoHeight: false,
        videoWidth: false
    };
    /**
     * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
     * @protected
     * @param {jQuery} target - The target containing the video data.
     * @param {jQuery} item - The item containing the video.
     */

    Video.prototype.fetch = function(target, item) {
        var type = function() {
                if (target.attr('data-vimeo-id')) {
                    return 'vimeo';
                } else if (target.attr('data-vzaar-id')) {
                    return 'vzaar';
                } else {
                    return 'youtube';
                }
            }(),
            id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
            width = target.attr('data-width') || this._core.settings.videoWidth,
            height = target.attr('data-height') || this._core.settings.videoHeight,
            url = target.attr('href');

        if (url) {
            /*
            		Parses the id's out of the following urls (and probably more):
            		https://www.youtube.com/watch?v=:id
            		https://youtu.be/:id
            		https://vimeo.com/:id
            		https://vimeo.com/channels/:channel/:id
            		https://vimeo.com/groups/:group/videos/:id
            		https://app.vzaar.com/videos/:id
             		Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
            */
            id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

            if (id[3].indexOf('youtu') > -1) {
                type = 'youtube';
            } else if (id[3].indexOf('vimeo') > -1) {
                type = 'vimeo';
            } else if (id[3].indexOf('vzaar') > -1) {
                type = 'vzaar';
            } else {
                throw new Error('Video URL not supported.');
            }

            id = id[6];
        } else {
            throw new Error('Missing video URL.');
        }

        this._videos[url] = {
            type: type,
            id: id,
            width: width,
            height: height
        };
        item.attr('data-video', url);
        this.thumbnail(target, this._videos[url]);
    };
    /**
     * Creates video thumbnail.
     * @protected
     * @param {jQuery} target - The target containing the video data.
     * @param {Object} info - The video info object.
     * @see `fetch`
     */


    Video.prototype.thumbnail = function(target, video) {
        var tnLink,
            icon,
            path,
            dimensions = video.width && video.height ? 'width:' + video.width + 'px;height:' + video.height + 'px;' : '',
            customTn = target.find('img'),
            srcType = 'src',
            lazyClass = '',
            settings = this._core.settings,
            create = function create(path) {
                icon = '<div class="owl-video-play-icon"></div>';

                if (settings.lazyLoad) {
                    tnLink = $('<div/>', {
                        "class": 'owl-video-tn ' + lazyClass,
                        "srcType": path
                    });
                } else {
                    tnLink = $('<div/>', {
                        "class": "owl-video-tn",
                        "style": 'opacity:1;background-image:url(' + path + ')'
                    });
                }

                target.after(tnLink);
                target.after(icon);
            }; // wrap video content into owl-video-wrapper div


        target.wrap($('<div/>', {
            "class": "owl-video-wrapper",
            "style": dimensions
        }));

        if (this._core.settings.lazyLoad) {
            srcType = 'data-src';
            lazyClass = 'owl-lazy';
        } // custom thumbnail


        if (customTn.length) {
            create(customTn.attr(srcType));
            customTn.remove();
            return false;
        }

        if (video.type === 'youtube') {
            path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
            create(path);
        } else if (video.type === 'vimeo') {
            $.ajax({
                type: 'GET',
                url: '//vimeo.com/api/v2/video/' + video.id + '.json',
                jsonp: 'callback',
                dataType: 'jsonp',
                success: function success(data) {
                    path = data[0].thumbnail_large;
                    create(path);
                }
            });
        } else if (video.type === 'vzaar') {
            $.ajax({
                type: 'GET',
                url: '//vzaar.com/api/videos/' + video.id + '.json',
                jsonp: 'callback',
                dataType: 'jsonp',
                success: function success(data) {
                    path = data.framegrab_url;
                    create(path);
                }
            });
        }
    };
    /**
     * Stops the current video.
     * @public
     */


    Video.prototype.stop = function() {
        this._core.trigger('stop', null, 'video');

        this._playing.find('.owl-video-frame').remove();

        this._playing.removeClass('owl-video-playing');

        this._playing = null;

        this._core.leave('playing');

        this._core.trigger('stopped', null, 'video');
    };
    /**
     * Starts the current video.
     * @public
     * @param {Event} event - The event arguments.
     */


    Video.prototype.play = function(event) {
        var target = $(event.target),
            item = target.closest('.' + this._core.settings.itemClass),
            video = this._videos[item.attr('data-video')],
            width = video.width || '100%',
            height = video.height || this._core.$stage.height(),
            html,
            iframe;

        if (this._playing) {
            return;
        }

        this._core.enter('playing');

        this._core.trigger('play', null, 'video');

        item = this._core.items(this._core.relative(item.index()));

        this._core.reset(item.index());

        html = $('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>');
        html.attr('height', height);
        html.attr('width', width);

        if (video.type === 'youtube') {
            html.attr('src', '//www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0&v=' + video.id);
        } else if (video.type === 'vimeo') {
            html.attr('src', '//player.vimeo.com/video/' + video.id + '?autoplay=1');
        } else if (video.type === 'vzaar') {
            html.attr('src', '//view.vzaar.com/' + video.id + '/player?autoplay=true');
        }

        iframe = $(html).wrap('<div class="owl-video-frame" />').insertAfter(item.find('.owl-video'));
        this._playing = item.addClass('owl-video-playing');
    };
    /**
     * Checks whether an video is currently in full screen mode or not.
     * @todo Bad style because looks like a readonly method but changes members.
     * @protected
     * @returns {Boolean}
     */


    Video.prototype.isInFullScreen = function() {
        var element = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        return element && $(element).parent().hasClass('owl-video-frame');
    };
    /**
     * Destroys the plugin.
     */


    Video.prototype.destroy = function() {
        var handler, property;

        this._core.$element.off('click.owl.video');

        for (handler in this._handlers) {
            this._core.$element.off(handler, this._handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Video = Video;
})(window.Zepto || window.jQuery, window, document);
/**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the animate plugin.
     * @class The Navigation Plugin
     * @param {Owl} scope - The Owl Carousel
     */
    var Animate = function Animate(scope) {
        this.core = scope;
        this.core.options = $.extend({}, Animate.Defaults, this.core.options);
        this.swapping = true;
        this.previous = undefined;
        this.next = undefined;
        this.handlers = {
            'change.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name == 'position') {
                    this.previous = this.core.current();
                    this.next = e.property.value;
                }
            }, this),
            'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
                if (e.namespace) {
                    this.swapping = e.type == 'translated';
                }
            }, this),
            'translate.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
                    this.swap();
                }
            }, this)
        };
        this.core.$element.on(this.handlers);
    };
    /**
     * Default options.
     * @public
     */


    Animate.Defaults = {
        animateOut: false,
        animateIn: false
    };
    /**
     * Toggles the animation classes whenever an translations starts.
     * @protected
     * @returns {Boolean|undefined}
     */

    Animate.prototype.swap = function() {
        if (this.core.settings.items !== 1) {
            return;
        }

        if (!$.support.animation || !$.support.transition) {
            return;
        }

        this.core.speed(0);
        var left,
            clear = $.proxy(this.clear, this),
            previous = this.core.$stage.children().eq(this.previous),
            next = this.core.$stage.children().eq(this.next),
            incoming = this.core.settings.animateIn,
            outgoing = this.core.settings.animateOut;

        if (this.core.current() === this.previous) {
            return;
        }

        if (outgoing) {
            left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
            previous.one($.support.animation.end, clear).css({
                'left': left + 'px'
            }).addClass('animated owl-animated-out').addClass(outgoing);
        }

        if (incoming) {
            next.one($.support.animation.end, clear).addClass('animated owl-animated-in').addClass(incoming);
        }
    };

    Animate.prototype.clear = function(e) {
        $(e.target).css({
            'left': ''
        }).removeClass('animated owl-animated-out owl-animated-in').removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
        this.core.onTransitionEnd();
    };
    /**
     * Destroys the plugin.
     * @public
     */


    Animate.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this.core.$element.off(handler, this.handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;
})(window.Zepto || window.jQuery, window, document);
/**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    /**
     * Creates the autoplay plugin.
     * @class The Autoplay Plugin
     * @param {Owl} scope - The Owl Carousel
     */
    var Autoplay = function Autoplay(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * The autoplay timeout id.
         * @type {Number}
         */

        this._call = null;
        /**
         * Depending on the state of the plugin, this variable contains either
         * the start time of the timer or the current timer value if it's
         * paused. Since we start in a paused state we initialize the timer
         * value.
         * @type {Number}
         */

        this._time = 0;
        /**
         * Stores the timeout currently used.
         * @type {Number}
         */

        this._timeout = 0;
        /**
         * Indicates whenever the autoplay is paused.
         * @type {Boolean}
         */

        this._paused = true;
        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name === 'settings') {
                    if (this._core.settings.autoplay) {
                        this.play();
                    } else {
                        this.stop();
                    }
                } else if (e.namespace && e.property.name === 'position' && this._paused) {
                    // Reset the timer. This code is triggered when the position
                    // of the carousel was changed through user interaction.
                    this._time = 0;
                }
            }, this),
            'initialized.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.autoplay) {
                    this.play();
                }
            }, this),
            'play.owl.autoplay': $.proxy(function(e, t, s) {
                if (e.namespace) {
                    this.play(t, s);
                }
            }, this),
            'stop.owl.autoplay': $.proxy(function(e) {
                if (e.namespace) {
                    this.stop();
                }
            }, this),
            'mouseover.owl.autoplay': $.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
                    this.pause();
                }
            }, this),
            'mouseleave.owl.autoplay': $.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
                    this.play();
                }
            }, this),
            'touchstart.owl.core': $.proxy(function() {
                if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
                    this.pause();
                }
            }, this),
            'touchend.owl.core': $.proxy(function() {
                if (this._core.settings.autoplayHoverPause) {
                    this.play();
                }
            }, this)
        }; // register event handlers

        this._core.$element.on(this._handlers); // set default options


        this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
    };
    /**
     * Default options.
     * @public
     */


    Autoplay.Defaults = {
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        autoplaySpeed: false
    };
    /**
     * Transition to the next slide and set a timeout for the next transition.
     * @private
     * @param {Number} [speed] - The animation speed for the animations.
     */

    Autoplay.prototype._next = function(speed) {
        this._call = window.setTimeout($.proxy(this._next, this, speed), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read());

        if (this._core.is('interacting') || document.hidden) {
            return;
        }

        this._core.next(speed || this._core.settings.autoplaySpeed);
    };
    /**
     * Reads the current timer value when the timer is playing.
     * @public
     */


    Autoplay.prototype.read = function() {
        return new Date().getTime() - this._time;
    };
    /**
     * Starts the autoplay.
     * @public
     * @param {Number} [timeout] - The interval before the next animation starts.
     * @param {Number} [speed] - The animation speed for the animations.
     */


    Autoplay.prototype.play = function(timeout, speed) {
        var elapsed;

        if (!this._core.is('rotating')) {
            this._core.enter('rotating');
        }

        timeout = timeout || this._core.settings.autoplayTimeout; // Calculate the elapsed time since the last transition. If the carousel
        // wasn't playing this calculation will yield zero.

        elapsed = Math.min(this._time % (this._timeout || timeout), timeout);

        if (this._paused) {
            // Start the clock.
            this._time = this.read();
            this._paused = false;
        } else {
            // Clear the active timeout to allow replacement.
            window.clearTimeout(this._call);
        } // Adjust the origin of the timer to match the new timeout value.


        this._time += this.read() % timeout - elapsed;
        this._timeout = timeout;
        this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
    };
    /**
     * Stops the autoplay.
     * @public
     */


    Autoplay.prototype.stop = function() {
        if (this._core.is('rotating')) {
            // Reset the clock.
            this._time = 0;
            this._paused = true;
            window.clearTimeout(this._call);

            this._core.leave('rotating');
        }
    };
    /**
     * Pauses the autoplay.
     * @public
     */


    Autoplay.prototype.pause = function() {
        if (this._core.is('rotating') && !this._paused) {
            // Pause the clock.
            this._time = this.read();
            this._paused = true;
            window.clearTimeout(this._call);
        }
    };
    /**
     * Destroys the plugin.
     */


    Autoplay.prototype.destroy = function() {
        var handler, property;
        this.stop();

        for (handler in this._handlers) {
            this._core.$element.off(handler, this._handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;
})(window.Zepto || window.jQuery, window, document);
/**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    'use strict';
    /**
     * Creates the navigation plugin.
     * @class The Navigation Plugin
     * @param {Owl} carousel - The Owl Carousel.
     */

    var Navigation = function Navigation(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * Indicates whether the plugin is initialized or not.
         * @protected
         * @type {Boolean}
         */

        this._initialized = false;
        /**
         * The current paging indexes.
         * @protected
         * @type {Array}
         */

        this._pages = [];
        /**
         * All DOM elements of the user interface.
         * @protected
         * @type {Object}
         */

        this._controls = {};
        /**
         * Markup for an indicator.
         * @protected
         * @type {Array.<String>}
         */

        this._templates = [];
        /**
         * The carousel element.
         * @type {jQuery}
         */

        this.$element = this._core.$element;
        /**
         * Overridden methods of the carousel.
         * @protected
         * @type {Object}
         */

        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        };
        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'prepared.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.dotsData) {
                    this._templates.push('<div class="' + this._core.settings.dotClass + '">' + $(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
                }
            }, this),
            'added.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.dotsData) {
                    this._templates.splice(e.position, 0, this._templates.pop());
                }
            }, this),
            'remove.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.dotsData) {
                    this._templates.splice(e.position, 1);
                }
            }, this),
            'changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name == 'position') {
                    this.draw();
                }
            }, this),
            'initialized.owl.carousel': $.proxy(function(e) {
                if (e.namespace && !this._initialized) {
                    this._core.trigger('initialize', null, 'navigation');

                    this.initialize();
                    this.update();
                    this.draw();
                    this._initialized = true;

                    this._core.trigger('initialized', null, 'navigation');
                }
            }, this),
            'refreshed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._initialized) {
                    this._core.trigger('refresh', null, 'navigation');

                    this.update();
                    this.draw();

                    this._core.trigger('refreshed', null, 'navigation');
                }
            }, this)
        }; // set default options

        this._core.options = $.extend({}, Navigation.Defaults, this._core.options); // register event handlers

        this.$element.on(this._handlers);
    };
    /**
     * Default options.
     * @public
     * @todo Rename `slideBy` to `navBy`
     */


    Navigation.Defaults = {
        nav: false,
        navText: ['<span aria-label="' + 'Previous' + '">&#x2039;</span>', '<span aria-label="' + 'Next' + '">&#x203a;</span>'],
        navSpeed: false,
        navElement: 'button type="button" role="presentation"',
        navContainer: false,
        navContainerClass: 'owl-nav',
        navClass: ['owl-prev', 'owl-next'],
        slideBy: 1,
        dotClass: 'owl-dot',
        dotsClass: 'owl-dots',
        dots: true,
        dotsEach: false,
        dotsData: false,
        dotsSpeed: false,
        dotsContainer: false
    };
    /**
     * Initializes the layout of the plugin and extends the carousel.
     * @protected
     */

    Navigation.prototype.initialize = function() {
        var override,
            settings = this._core.settings; // create DOM structure for relative navigation

        this._controls.$relative = (settings.navContainer ? $(settings.navContainer) : $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');
        this._controls.$previous = $('<' + settings.navElement + '>').addClass(settings.navClass[0]).html(settings.navText[0]).prependTo(this._controls.$relative).on('click', $.proxy(function(e) {
            this.prev(settings.navSpeed);
        }, this));
        this._controls.$next = $('<' + settings.navElement + '>').addClass(settings.navClass[1]).html(settings.navText[1]).appendTo(this._controls.$relative).on('click', $.proxy(function(e) {
            this.next(settings.navSpeed);
        }, this)); // create DOM structure for absolute navigation

        if (!settings.dotsData) {
            this._templates = [$('<button role="button">').addClass(settings.dotClass).append($('<span>')).prop('outerHTML')];
        }

        this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer) : $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

        this._controls.$absolute.on('click', 'button', $.proxy(function(e) {
            var index = $(e.target).parent().is(this._controls.$absolute) ? $(e.target).index() : $(e.target).parent().index();
            e.preventDefault();
            this.to(index, settings.dotsSpeed);
        }, this));
        /*$el.on('focusin', function() {
        	$(document).off(".carousel");
         	$(document).on('keydown.carousel', function(e) {
        		if(e.keyCode == 37) {
        			$el.trigger('prev.owl')
        		}
        		if(e.keyCode == 39) {
        			$el.trigger('next.owl')
        		}
        	});
        });*/
        // override public methods of the carousel


        for (override in this._overrides) {
            this._core[override] = $.proxy(this[override], this);
        }
    };
    /**
     * Destroys the plugin.
     * @protected
     */


    Navigation.prototype.destroy = function() {
        var handler, control, property, override, settings;
        settings = this._core.settings;

        for (handler in this._handlers) {
            this.$element.off(handler, this._handlers[handler]);
        }

        for (control in this._controls) {
            if (control === '$relative' && settings.navContainer) {
                this._controls[control].html('');
            } else {
                this._controls[control].remove();
            }
        }

        for (override in this.overides) {
            this._core[override] = this._overrides[override];
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };
    /**
     * Updates the internal state.
     * @protected
     */


    Navigation.prototype.update = function() {
        var i,
            j,
            k,
            lower = this._core.clones().length / 2,
            upper = lower + this._core.items().length,
            maximum = this._core.maximum(true),
            settings = this._core.settings,
            size = settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items;

        if (settings.slideBy !== 'page') {
            settings.slideBy = Math.min(settings.slideBy, settings.items);
        }

        if (settings.dots || settings.slideBy == 'page') {
            this._pages = [];

            for (i = lower, j = 0, k = 0; i < upper; i++) {
                if (j >= size || j === 0) {
                    this._pages.push({
                        start: Math.min(maximum, i - lower),
                        end: i - lower + size - 1
                    });

                    if (Math.min(maximum, i - lower) === maximum) {
                        break;
                    }

                    j = 0, ++k;
                }

                j += this._core.mergers(this._core.relative(i));
            }
        }
    };
    /**
     * Draws the user interface.
     * @todo The option `dotsData` wont work.
     * @protected
     */


    Navigation.prototype.draw = function() {
        var difference,
            settings = this._core.settings,
            disabled = this._core.items().length <= settings.items,
            index = this._core.relative(this._core.current()),
            loop = settings.loop || settings.rewind;

        this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

        if (settings.nav) {
            this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));

            this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
        }

        this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

        if (settings.dots) {
            difference = this._pages.length - this._controls.$absolute.children().length;

            if (settings.dotsData && difference !== 0) {
                this._controls.$absolute.html(this._templates.join(''));
            } else if (difference > 0) {
                this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
            } else if (difference < 0) {
                this._controls.$absolute.children().slice(difference).remove();
            }

            this._controls.$absolute.find('.active').removeClass('active');

            this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
        }
    };
    /**
     * Extends event data.
     * @protected
     * @param {Event} event - The event object which gets thrown.
     */


    Navigation.prototype.onTrigger = function(event) {
        var settings = this._core.settings;
        event.page = {
            index: $.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: settings && (settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items)
        };
    };
    /**
     * Gets the current page position of the carousel.
     * @protected
     * @returns {Number}
     */


    Navigation.prototype.current = function() {
        var current = this._core.relative(this._core.current());

        return $.grep(this._pages, $.proxy(function(page, index) {
            return page.start <= current && page.end >= current;
        }, this)).pop();
    };
    /**
     * Gets the current succesor/predecessor position.
     * @protected
     * @returns {Number}
     */


    Navigation.prototype.getPosition = function(successor) {
        var position,
            length,
            settings = this._core.settings;

        if (settings.slideBy == 'page') {
            position = $.inArray(this.current(), this._pages);
            length = this._pages.length;
            successor ? ++position : --position;
            position = this._pages[(position % length + length) % length].start;
        } else {
            position = this._core.relative(this._core.current());
            length = this._core.items().length;
            successor ? position += settings.slideBy : position -= settings.slideBy;
        }

        return position;
    };
    /**
     * Slides to the next item or page.
     * @public
     * @param {Number} [speed=false] - The time in milliseconds for the transition.
     */


    Navigation.prototype.next = function(speed) {
        $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
    };
    /**
     * Slides to the previous item or page.
     * @public
     * @param {Number} [speed=false] - The time in milliseconds for the transition.
     */


    Navigation.prototype.prev = function(speed) {
        $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
    };
    /**
     * Slides to the specified item or page.
     * @public
     * @param {Number} position - The position of the item or page.
     * @param {Number} [speed] - The time in milliseconds for the transition.
     * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
     */


    Navigation.prototype.to = function(position, speed, standard) {
        var length;

        if (!standard && this._pages.length) {
            length = this._pages.length;
            $.proxy(this._overrides.to, this._core)(this._pages[(position % length + length) % length].start, speed);
        } else {
            $.proxy(this._overrides.to, this._core)(position, speed);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;
})(window.Zepto || window.jQuery, window, document);
/**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    'use strict';
    /**
     * Creates the hash plugin.
     * @class The Hash Plugin
     * @param {Owl} carousel - The Owl Carousel
     */

    var Hash = function Hash(carousel) {
        /**
         * Reference to the core.
         * @protected
         * @type {Owl}
         */
        this._core = carousel;
        /**
         * Hash index for the items.
         * @protected
         * @type {Object}
         */

        this._hashes = {};
        /**
         * The carousel element.
         * @type {jQuery}
         */

        this.$element = this._core.$element;
        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */

        this._handlers = {
            'initialized.owl.carousel': $.proxy(function(e) {
                if (e.namespace && this._core.settings.startPosition === 'URLHash') {
                    $(window).trigger('hashchange.owl.navigation');
                }
            }, this),
            'prepared.owl.carousel': $.proxy(function(e) {
                if (e.namespace) {
                    var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

                    if (!hash) {
                        return;
                    }

                    this._hashes[hash] = e.content;
                }
            }, this),
            'changed.owl.carousel': $.proxy(function(e) {
                if (e.namespace && e.property.name === 'position') {
                    var current = this._core.items(this._core.relative(this._core.current())),
                        hash = $.map(this._hashes, function(item, hash) {
                            return item === current ? hash : null;
                        }).join();

                    if (!hash || window.location.hash.slice(1) === hash) {
                        return;
                    }

                    window.location.hash = hash;
                }
            }, this)
        }; // set default options

        this._core.options = $.extend({}, Hash.Defaults, this._core.options); // register the event handlers

        this.$element.on(this._handlers); // register event listener for hash navigation

        $(window).on('hashchange.owl.navigation', $.proxy(function(e) {
            var hash = window.location.hash.substring(1),
                items = this._core.$stage.children(),
                position = this._hashes[hash] && items.index(this._hashes[hash]);

            if (position === undefined || position === this._core.current()) {
                return;
            }

            this._core.to(this._core.relative(position), false, true);
        }, this));
    };
    /**
     * Default options.
     * @public
     */


    Hash.Defaults = {
        URLhashListener: false
    };
    /**
     * Destroys the plugin.
     * @public
     */

    Hash.prototype.destroy = function() {
        var handler, property;
        $(window).off('hashchange.owl.navigation');

        for (handler in this._handlers) {
            this._core.$element.off(handler, this._handlers[handler]);
        }

        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] != 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;
})(window.Zepto || window.jQuery, window, document);
/**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */


;

(function($, window, document, undefined) {
    var style = $('<support>').get(0).style,
        prefixes = 'Webkit Moz O ms'.split(' '),
        events = {
            transition: {
                end: {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    transition: 'transitionend'
                }
            },
            animation: {
                end: {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    animation: 'animationend'
                }
            }
        },
        tests = {
            csstransforms: function csstransforms() {
                return !!test('transform');
            },
            csstransforms3d: function csstransforms3d() {
                return !!test('perspective');
            },
            csstransitions: function csstransitions() {
                return !!test('transition');
            },
            cssanimations: function cssanimations() {
                return !!test('animation');
            }
        };

    function test(property, prefixed) {
        var result = false,
            upper = property.charAt(0).toUpperCase() + property.slice(1);
        $.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
            if (style[property] !== undefined) {
                result = prefixed ? property : true;
                return false;
            }
        });
        return result;
    }

    function prefixed(property) {
        return test(property, true);
    }

    if (tests.csstransitions()) {
        /* jshint -W053 */
        $.support.transition = new String(prefixed('transition'));
        $.support.transition.end = events.transition.end[$.support.transition];
    }

    if (tests.cssanimations()) {
        /* jshint -W053 */
        $.support.animation = new String(prefixed('animation'));
        $.support.animation.end = events.animation.end[$.support.animation];
    }

    if (tests.csstransforms()) {
        /* jshint -W053 */
        $.support.transform = new String(prefixed('transform'));
        $.support.transform3d = tests.csstransforms3d();
    }
})(window.Zepto || window.jQuery, window, document);
var exports = {};
"use strict";

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
    'use strict';

    var keyCounter = 0;
    var allWaypoints = {};
    /* http://imakewebthings.com/waypoints/api/waypoint */

    function Waypoint(options) {
        if (!options) {
            throw new Error('No options passed to Waypoint constructor');
        }

        if (!options.element) {
            throw new Error('No element option passed to Waypoint constructor');
        }

        if (!options.handler) {
            throw new Error('No handler option passed to Waypoint constructor');
        }

        this.key = 'waypoint-' + keyCounter;
        this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
        this.element = this.options.element;
        this.adapter = new Waypoint.Adapter(this.element);
        this.callback = options.handler;
        this.axis = this.options.horizontal ? 'horizontal' : 'vertical';
        this.enabled = this.options.enabled;
        this.triggerPoint = null;
        this.group = Waypoint.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        });
        this.context = Waypoint.Context.findOrCreateByElement(this.options.context);

        if (Waypoint.offsetAliases[this.options.offset]) {
            this.options.offset = Waypoint.offsetAliases[this.options.offset];
        }

        this.group.add(this);
        this.context.add(this);
        allWaypoints[this.key] = this;
        keyCounter += 1;
    }
    /* Private */


    Waypoint.prototype.queueTrigger = function(direction) {
        this.group.queueTrigger(this, direction);
    };
    /* Private */


    Waypoint.prototype.trigger = function(args) {
        if (!this.enabled) {
            return;
        }

        if (this.callback) {
            this.callback.apply(this, args);
        }
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/destroy */


    Waypoint.prototype.destroy = function() {
        this.context.remove(this);
        this.group.remove(this);
        delete allWaypoints[this.key];
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/disable */


    Waypoint.prototype.disable = function() {
        this.enabled = false;
        return this;
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/enable */


    Waypoint.prototype.enable = function() {
        this.context.refresh();
        this.enabled = true;
        return this;
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/next */


    Waypoint.prototype.next = function() {
        return this.group.next(this);
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/previous */


    Waypoint.prototype.previous = function() {
        return this.group.previous(this);
    };
    /* Private */


    Waypoint.invokeAll = function(method) {
        var allWaypointsArray = [];

        for (var waypointKey in allWaypoints) {
            allWaypointsArray.push(allWaypoints[waypointKey]);
        }

        for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
            allWaypointsArray[i][method]();
        }
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/destroy-all */


    Waypoint.destroyAll = function() {
        Waypoint.invokeAll('destroy');
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/disable-all */


    Waypoint.disableAll = function() {
        Waypoint.invokeAll('disable');
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/enable-all */


    Waypoint.enableAll = function() {
        Waypoint.Context.refreshAll();

        for (var waypointKey in allWaypoints) {
            allWaypoints[waypointKey].enabled = true;
        }

        return this;
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/refresh-all */


    Waypoint.refreshAll = function() {
        Waypoint.Context.refreshAll();
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/viewport-height */


    Waypoint.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight;
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/viewport-width */


    Waypoint.viewportWidth = function() {
        return document.documentElement.clientWidth;
    };

    Waypoint.adapters = [];
    Waypoint.defaults = {
        context: window,
        continuous: true,
        enabled: true,
        group: 'default',
        horizontal: false,
        offset: 0
    };
    Waypoint.offsetAliases = {
        'bottom-in-view': function bottomInView() {
            return this.context.innerHeight() - this.adapter.outerHeight();
        },
        'right-in-view': function rightInView() {
            return this.context.innerWidth() - this.adapter.outerWidth();
        }
    };
    window.Waypoint = Waypoint;
})();

(function() {
    'use strict';

    function requestAnimationFrameShim(callback) {
        window.setTimeout(callback, 1000 / 60);
    }

    var keyCounter = 0;
    var contexts = {};
    var Waypoint = window.Waypoint;
    var oldWindowLoad = window.onload;
    /* http://imakewebthings.com/waypoints/api/context */

    function Context(element) {
        this.element = element;
        this.Adapter = Waypoint.Adapter;
        this.adapter = new this.Adapter(element);
        this.key = 'waypoint-context-' + keyCounter;
        this.didScroll = false;
        this.didResize = false;
        this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        };
        this.waypoints = {
            vertical: {},
            horizontal: {}
        };
        element.waypointContextKey = this.key;
        contexts[element.waypointContextKey] = this;
        keyCounter += 1;

        if (!Waypoint.windowContext) {
            Waypoint.windowContext = true;
            Waypoint.windowContext = new Context(window);
        }

        this.createThrottledScrollHandler();
        this.createThrottledResizeHandler();
    }
    /* Private */


    Context.prototype.add = function(waypoint) {
        var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical';
        this.waypoints[axis][waypoint.key] = waypoint;
        this.refresh();
    };
    /* Private */


    Context.prototype.checkEmpty = function() {
        var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
        var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
        var isWindow = this.element == this.element.window;

        if (horizontalEmpty && verticalEmpty && !isWindow) {
            this.adapter.off('.waypoints');
            delete contexts[this.key];
        }
    };
    /* Private */


    Context.prototype.createThrottledResizeHandler = function() {
        var self = this;

        function resizeHandler() {
            self.handleResize();
            self.didResize = false;
        }

        this.adapter.on('resize.waypoints', function() {
            if (!self.didResize) {
                self.didResize = true;
                Waypoint.requestAnimationFrame(resizeHandler);
            }
        });
    };
    /* Private */


    Context.prototype.createThrottledScrollHandler = function() {
        var self = this;

        function scrollHandler() {
            self.handleScroll();
            self.didScroll = false;
        }

        this.adapter.on('scroll.waypoints', function() {
            if (!self.didScroll || Waypoint.isTouch) {
                self.didScroll = true;
                Waypoint.requestAnimationFrame(scrollHandler);
            }
        });
    };
    /* Private */


    Context.prototype.handleResize = function() {
        Waypoint.Context.refreshAll();
    };
    /* Private */


    Context.prototype.handleScroll = function() {
        var triggeredGroups = {};
        var axes = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: 'right',
                backward: 'left'
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: 'down',
                backward: 'up'
            }
        };

        for (var axisKey in axes) {
            var axis = axes[axisKey];
            var isForward = axis.newScroll > axis.oldScroll;
            var direction = isForward ? axis.forward : axis.backward;

            for (var waypointKey in this.waypoints[axisKey]) {
                var waypoint = this.waypoints[axisKey][waypointKey];

                if (waypoint.triggerPoint === null) {
                    continue;
                }

                var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint;
                var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint;
                var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint;
                var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;

                if (crossedForward || crossedBackward) {
                    waypoint.queueTrigger(direction);
                    triggeredGroups[waypoint.group.id] = waypoint.group;
                }
            }
        }

        for (var groupKey in triggeredGroups) {
            triggeredGroups[groupKey].flushTriggers();
        }

        this.oldScroll = {
            x: axes.horizontal.newScroll,
            y: axes.vertical.newScroll
        };
    };
    /* Private */


    Context.prototype.innerHeight = function() {
        /*eslint-disable eqeqeq */
        if (this.element == this.element.window) {
            return Waypoint.viewportHeight();
        }
        /*eslint-enable eqeqeq */


        return this.adapter.innerHeight();
    };
    /* Private */


    Context.prototype.remove = function(waypoint) {
        delete this.waypoints[waypoint.axis][waypoint.key];
        this.checkEmpty();
    };
    /* Private */


    Context.prototype.innerWidth = function() {
        /*eslint-disable eqeqeq */
        if (this.element == this.element.window) {
            return Waypoint.viewportWidth();
        }
        /*eslint-enable eqeqeq */


        return this.adapter.innerWidth();
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/context-destroy */


    Context.prototype.destroy = function() {
        var allWaypoints = [];

        for (var axis in this.waypoints) {
            for (var waypointKey in this.waypoints[axis]) {
                allWaypoints.push(this.waypoints[axis][waypointKey]);
            }
        }

        for (var i = 0, end = allWaypoints.length; i < end; i++) {
            allWaypoints[i].destroy();
        }
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/context-refresh */


    Context.prototype.refresh = function() {
        /*eslint-disable eqeqeq */
        var isWindow = this.element == this.element.window;
        /*eslint-enable eqeqeq */

        var contextOffset = isWindow ? undefined : this.adapter.offset();
        var triggeredGroups = {};
        var axes;
        this.handleScroll();
        axes = {
            horizontal: {
                contextOffset: isWindow ? 0 : contextOffset.left,
                contextScroll: isWindow ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: 'right',
                backward: 'left',
                offsetProp: 'left'
            },
            vertical: {
                contextOffset: isWindow ? 0 : contextOffset.top,
                contextScroll: isWindow ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: 'down',
                backward: 'up',
                offsetProp: 'top'
            }
        };

        for (var axisKey in axes) {
            var axis = axes[axisKey];

            for (var waypointKey in this.waypoints[axisKey]) {
                var waypoint = this.waypoints[axisKey][waypointKey];
                var adjustment = waypoint.options.offset;
                var oldTriggerPoint = waypoint.triggerPoint;
                var elementOffset = 0;
                var freshWaypoint = oldTriggerPoint == null;
                var contextModifier, wasBeforeScroll, nowAfterScroll;
                var triggeredBackward, triggeredForward;

                if (waypoint.element !== waypoint.element.window) {
                    elementOffset = waypoint.adapter.offset()[axis.offsetProp];
                }

                if (typeof adjustment === 'function') {
                    adjustment = adjustment.apply(waypoint);
                } else if (typeof adjustment === 'string') {
                    adjustment = parseFloat(adjustment);

                    if (waypoint.options.offset.indexOf('%') > -1) {
                        adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
                    }
                }

                contextModifier = axis.contextScroll - axis.contextOffset;
                waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment);
                wasBeforeScroll = oldTriggerPoint < axis.oldScroll;
                nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll;
                triggeredBackward = wasBeforeScroll && nowAfterScroll;
                triggeredForward = !wasBeforeScroll && !nowAfterScroll;

                if (!freshWaypoint && triggeredBackward) {
                    waypoint.queueTrigger(axis.backward);
                    triggeredGroups[waypoint.group.id] = waypoint.group;
                } else if (!freshWaypoint && triggeredForward) {
                    waypoint.queueTrigger(axis.forward);
                    triggeredGroups[waypoint.group.id] = waypoint.group;
                } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
                    waypoint.queueTrigger(axis.forward);
                    triggeredGroups[waypoint.group.id] = waypoint.group;
                }
            }
        }

        Waypoint.requestAnimationFrame(function() {
            for (var groupKey in triggeredGroups) {
                triggeredGroups[groupKey].flushTriggers();
            }
        });
        return this;
    };
    /* Private */


    Context.findOrCreateByElement = function(element) {
        return Context.findByElement(element) || new Context(element);
    };
    /* Private */


    Context.refreshAll = function() {
        for (var contextId in contexts) {
            contexts[contextId].refresh();
        }
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/context-find-by-element */


    Context.findByElement = function(element) {
        return contexts[element.waypointContextKey];
    };

    window.onload = function() {
        if (oldWindowLoad) {
            oldWindowLoad();
        }

        Context.refreshAll();
    };

    Waypoint.requestAnimationFrame = function(callback) {
        var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
        requestFn.call(window, callback);
    };

    Waypoint.Context = Context;
})();

(function() {
    'use strict';

    function byTriggerPoint(a, b) {
        return a.triggerPoint - b.triggerPoint;
    }

    function byReverseTriggerPoint(a, b) {
        return b.triggerPoint - a.triggerPoint;
    }

    var groups = {
        vertical: {},
        horizontal: {}
    };
    var Waypoint = window.Waypoint;
    /* http://imakewebthings.com/waypoints/api/group */

    function Group(options) {
        this.name = options.name;
        this.axis = options.axis;
        this.id = this.name + '-' + this.axis;
        this.waypoints = [];
        this.clearTriggerQueues();
        groups[this.axis][this.name] = this;
    }
    /* Private */


    Group.prototype.add = function(waypoint) {
        this.waypoints.push(waypoint);
    };
    /* Private */


    Group.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        };
    };
    /* Private */


    Group.prototype.flushTriggers = function() {
        for (var direction in this.triggerQueues) {
            var waypoints = this.triggerQueues[direction];
            var reverse = direction === 'up' || direction === 'left';
            waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);

            for (var i = 0, end = waypoints.length; i < end; i += 1) {
                var waypoint = waypoints[i];

                if (waypoint.options.continuous || i === waypoints.length - 1) {
                    waypoint.trigger([direction]);
                }
            }
        }

        this.clearTriggerQueues();
    };
    /* Private */


    Group.prototype.next = function(waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        var isLast = index === this.waypoints.length - 1;
        return isLast ? null : this.waypoints[index + 1];
    };
    /* Private */


    Group.prototype.previous = function(waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        return index ? this.waypoints[index - 1] : null;
    };
    /* Private */


    Group.prototype.queueTrigger = function(waypoint, direction) {
        this.triggerQueues[direction].push(waypoint);
    };
    /* Private */


    Group.prototype.remove = function(waypoint) {
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);

        if (index > -1) {
            this.waypoints.splice(index, 1);
        }
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/first */


    Group.prototype.first = function() {
        return this.waypoints[0];
    };
    /* Public */

    /* http://imakewebthings.com/waypoints/api/last */


    Group.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1];
    };
    /* Private */


    Group.findOrCreate = function(options) {
        return groups[options.axis][options.name] || new Group(options);
    };

    Waypoint.Group = Group;
})();

(function() {
    'use strict';

    var $ = window.jQuery;
    var Waypoint = window.Waypoint;

    function JQueryAdapter(element) {
        this.$element = $(element);
    }

    $.each(['innerHeight', 'innerWidth', 'off', 'offset', 'on', 'outerHeight', 'outerWidth', 'scrollLeft', 'scrollTop'], function(i, method) {
        JQueryAdapter.prototype[method] = function() {
            var args = Array.prototype.slice.call(arguments);
            return this.$element[method].apply(this.$element, args);
        };
    });
    $.each(['extend', 'inArray', 'isEmptyObject'], function(i, method) {
        JQueryAdapter[method] = $[method];
    });
    Waypoint.adapters.push({
        name: 'jquery',
        Adapter: JQueryAdapter
    });
    Waypoint.Adapter = JQueryAdapter;
})();

(function() {
    'use strict';

    var Waypoint = window.Waypoint;

    function createExtension(framework) {
        return function() {
            var waypoints = [];
            var overrides = arguments[0];

            if (framework.isFunction(arguments[0])) {
                overrides = framework.extend({}, arguments[1]);
                overrides.handler = arguments[0];
            }

            this.each(function() {
                var options = framework.extend({}, overrides, {
                    element: this
                });

                if (typeof options.context === 'string') {
                    options.context = framework(this).closest(options.context)[0];
                }

                waypoints.push(new Waypoint(options));
            });
            return waypoints;
        };
    }

    if (window.jQuery) {
        window.jQuery.fn.waypoint = createExtension(window.jQuery);
    }

    if (window.Zepto) {
        window.Zepto.fn.waypoint = createExtension(window.Zepto);
    }
})();
var exports = {};
"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

/*!
 * Select2 4.0.6-rc.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
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
        // Browser globals
        factory(jQuery);
    }
})(function(jQuery) {
    // This is needed so we can catch the AMD loader configuration and use it
    // The inner file should be wrapped (by `banner.start.js`) in a function that
    // returns the AMD loader references.
    var S2 = function() {
        // Restore the Select2 AMD loader so it can be used
        // Needed mostly in the language files, where the loader is not inserted
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
                /**
                 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
                 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
                 */
                //Going sloppy to avoid 'use strict' string cost, but strict practices should
                //be followed.

                /*global setTimeout: false */


                var requirejs, require, define;

                (function(undef) {
                    var main,
                        _req,
                        makeMap,
                        handlers,
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
                    /**
                     * Given a relative module name, like ./something, normalize it to
                     * a real name that can be mapped to a path.
                     * @param {String} name the relative name
                     * @param {String} baseName a real name that the name arg is relative
                     * to.
                     * @returns {String} normalized name
                     */


                    function normalize(name, baseName) {
                        var nameParts,
                            nameSegment,
                            mapValue,
                            foundMap,
                            lastIndex,
                            foundI,
                            foundStarMap,
                            starI,
                            i,
                            j,
                            part,
                            normalizedBaseParts,
                            baseParts = baseName && baseName.split("/"),
                            map = config.map,
                            starMap = map && map['*'] || {}; //Adjust any relative paths.

                        if (name) {
                            name = name.split('/');
                            lastIndex = name.length - 1; // If wanting node ID compatibility, strip .js from end
                            // of IDs. Have to do this here, and not in nameToUrl
                            // because node allows either .js or non .js to map
                            // to same file.

                            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                            } // Starts with a '.' so need the baseName


                            if (name[0].charAt(0) === '.' && baseParts) {
                                //Convert baseName to array, and lop off the last part,
                                //so that . matches that 'directory' and not name of the baseName's
                                //module. For instance, baseName of 'one/two/three', maps to
                                //'one/two/three.js', but we want the directory, 'one/two' for
                                //this normalization.
                                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                name = normalizedBaseParts.concat(name);
                            } //start trimDots


                            for (i = 0; i < name.length; i++) {
                                part = name[i];

                                if (part === '.') {
                                    name.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {
                                    // If at the start, or previous value is still ..,
                                    // keep them so that when converted to a path it may
                                    // still work when converted to a path, even though
                                    // as an ID it is less than ideal. In larger point
                                    // releases, may be better to just kick out an error.
                                    if (i === 0 || i === 1 && name[2] === '..' || name[i - 1] === '..') {
                                        continue;
                                    } else if (i > 0) {
                                        name.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            } //end trimDots


                            name = name.join('/');
                        } //Apply map config if available.


                        if ((baseParts || starMap) && map) {
                            nameParts = name.split('/');

                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");

                                if (baseParts) {
                                    //Find the longest baseName segment match in the config.
                                    //So, do joins on the biggest to smallest lengths of baseParts.
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join('/')]; //baseName segment has  config, find if it has one for
                                        //this name.

                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];

                                            if (mapValue) {
                                                //Match, update name to the new value.
                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (foundMap) {
                                    break;
                                } //Check for a star map match, but just hold on to it,
                                //if there is a shorter segment match later in a matching
                                //config, then favor over this star map.


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
                            //A version of a require function that passes a moduleName
                            //value for items that may need to
                            //look up paths relative to the moduleName
                            var args = aps.call(arguments, 0); //If first arg is not require('string'), and there is only
                            //one arg, it is the array form without a callback. Insert
                            //a null so that the following concat is correct.

                            if (typeof args[0] !== 'string' && args.length === 1) {
                                args.push(null);
                            }

                            return _req.apply(undef, args.concat([relName, forceSync]));
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
                    } //Turns a plugin!resource to [plugin, resource]
                    //with the plugin being undefined if the name
                    //did not have a plugin prefix.


                    function splitPrefix(name) {
                        var prefix,
                            index = name ? name.indexOf('!') : -1;

                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }

                        return [prefix, name];
                    } //Creates a parts array for a relName where first part is plugin ID,
                    //second part is resource ID. Assumes relName has already been normalized.


                    function makeRelParts(relName) {
                        return relName ? splitPrefix(relName) : [];
                    }
                    /**
                     * Makes a name map, normalizing the name, and using a plugin
                     * for normalization if necessary. Grabs a ref to plugin
                     * too, as an optimization.
                     */


                    makeMap = function makeMap(name, relParts) {
                        var plugin,
                            parts = splitPrefix(name),
                            prefix = parts[0],
                            relResourceName = relParts[1];
                        name = parts[1];

                        if (prefix) {
                            prefix = normalize(prefix, relResourceName);
                            plugin = callDep(prefix);
                        } //Normalize according


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
                        } //Using ridiculous property names for space reasons


                        return {
                            f: prefix ? prefix + '!' + name : name,
                            //fullName
                            n: name,
                            pr: prefix,
                            p: plugin
                        };
                    };

                    function makeConfig(name) {
                        return function() {
                            return config && config.config && config.config[name] || {};
                        };
                    }

                    handlers = {
                        require: function require(name) {
                            return makeRequire(name);
                        },
                        exports: function exports(name) {
                            var e = defined[name];

                            if (typeof e !== 'undefined') {
                                return e;
                            } else {
                                return defined[name] = {};
                            }
                        },
                        module: function module(name) {
                            return {
                                id: name,
                                uri: '',
                                exports: defined[name],
                                config: makeConfig(name)
                            };
                        }
                    };

                    main = function main(name, deps, callback, relName) {
                        var cjsModule,
                            depName,
                            ret,
                            map,
                            i,
                            relParts,
                            args = [],
                            callbackType = _typeof(callback),
                            usingExports; //Use name if no relName


                        relName = relName || name;
                        relParts = makeRelParts(relName); //Call the callback to define the module, if necessary.

                        if (callbackType === 'undefined' || callbackType === 'function') {
                            //Pull out the defined dependencies and pass the ordered
                            //values to the callback.
                            //Default to [require, exports, module] if no deps
                            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;

                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relParts);
                                depName = map.f; //Fast path CommonJS standard dependencies.

                                if (depName === "require") {
                                    args[i] = handlers.require(name);
                                } else if (depName === "exports") {
                                    //CommonJS module spec 1.1
                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === "module") {
                                    //CommonJS module spec 1.1
                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
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
                                //If setting exports via "module" is in play,
                                //favor that over return value and exports. After that,
                                //favor a non-undefined return value over exports use.
                                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {
                                    //Use the return value from the function.
                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {
                            //May just be an object definition for the module. Only
                            //worry about defining if have a module name.
                            defined[name] = callback;
                        }
                    };

                    requirejs = require = _req = function req(deps, callback, relName, forceSync, alt) {
                        if (typeof deps === "string") {
                            if (handlers[deps]) {
                                //callback in this case is really relName
                                return handlers[deps](callback);
                            } //Just return the module wanted. In this scenario, the
                            //deps arg is the module name, and second arg (if passed)
                            //is just the relName.
                            //Normalize module name, if it contains . or ..


                            return callDep(makeMap(deps, makeRelParts(callback)).f);
                        } else if (!deps.splice) {
                            //deps is a config object, not an array.
                            config = deps;

                            if (config.deps) {
                                _req(config.deps, config.callback);
                            }

                            if (!callback) {
                                return;
                            }

                            if (callback.splice) {
                                //callback is an array, which means it is a dependency list.
                                //Adjust args if there are dependencies
                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        } //Support require(['a'])


                        callback = callback || function() {}; //If relName is a function, it is an errback handler,
                        //so remove it.


                        if (typeof relName === 'function') {
                            relName = forceSync;
                            forceSync = alt;
                        } //Simulate async callback;


                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {
                            //Using a non-zero value because of concern for what old browsers
                            //do, and latest browsers "upgrade" to 4 if lower value is used:
                            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
                            //If want a value immediately, use require('id') instead -- something
                            //that works in almond on the global level, but not guaranteed and
                            //unlikely to work in other AMD implementations.
                            setTimeout(function() {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }

                        return _req;
                    };
                    /**
                     * Just drops the config on the floor, but returns req in case
                     * the config return value is used.
                     */


                    _req.config = function(cfg) {
                        return _req(cfg);
                    };
                    /**
                     * Expose module registry for debugging and tooling
                     */


                    requirejs._defined = defined;

                    define = function define(name, deps, callback) {
                        if (typeof name !== 'string') {
                            throw new Error('See almond README: incorrect module build, no module name');
                        } //This module may not have dependencies


                        if (!deps.splice) {
                            //deps is not an array, so probably means
                            //an object literal or factory function for
                            //the value. Adjust args.
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
                })();

                S2.requirejs = requirejs;
                S2.require = require;
                S2.define = define;
            }
        })();

        S2.define("almond", function() {});
        /* global jQuery:false, $:false */

        S2.define('jquery', [], function() {
            var _$ = jQuery || $;

            if (_$ == null && console && console.error) {
                console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');
            }

            return _$;
        });
        S2.define('select2/utils', ['jquery'], function($) {
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
                    DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
                }

                var calledMethod = function calledMethod(methodName) {
                    // Stub out the original method if it's not decorating an actual method
                    var originalMethod = function originalMethod() {};

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

            var Observable = function Observable() {
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
                this.listeners = this.listeners || {}; // Params should always come in as an array

                if (params == null) {
                    params = [];
                } // If there are no arguments to the event, use a temporary object


                if (params.length === 0) {
                    params.push({});
                } // Set the `_type` of the first object to the event


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
                        var key = keys[k]; // Lowercase the first letter
                        // By default, dash-separated becomes camelCase

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
                // Adapted from the function created by @ShadowScripter
                // and adapted by @BillBarry on the Stack Exchange Code Review website.
                // The original code can be found at
                // http://codereview.stackexchange.com/q/13338
                // and was designed to be used with the Sizzle selector engine.
                var $el = $(el);
                var overflowX = el.style.overflowX;
                var overflowY = el.style.overflowY; //Check both x and y declarations

                if (overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')) {
                    return false;
                }

                if (overflowX === 'scroll' || overflowY === 'scroll') {
                    return true;
                }

                return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
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
                }; // Do not try to escape the markup if it's not a string

                if (typeof markup !== 'string') {
                    return markup;
                }

                return String(markup).replace(/[&<>"'\/\\]/g, function(match) {
                    return replaceMap[match];
                });
            }; // Append an array of jQuery nodes to a given element.


            Utils.appendMany = function($element, $nodes) {
                // jQuery 1.7.x does not support $.fn.append() with an array
                // Fall back to a jQuery object collection using $.fn.add()
                if ($.fn.jquery.substr(0, 3) === '1.7') {
                    var $jqNodes = $();
                    $.map($nodes, function(node) {
                        $jqNodes = $jqNodes.add(node);
                    });
                    $nodes = $jqNodes;
                }

                $element.append($nodes);
            }; // Cache objects in Utils.__cache instead of $.data (see #4346)


            Utils.__cache = {};
            var id = 0;

            Utils.GetUniqueElementId = function(element) {
                // Get a unique element Id. If element has no id, 
                // creates a new unique number, stores it in the id 
                // attribute and returns the new id. 
                // If an id already exists, it simply returns it.
                var select2Id = element.getAttribute('data-select2-id');

                if (select2Id == null) {
                    // If element has id, use it.
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
                // Stores an item in the cache for a specified element.
                // name is the cache key.    
                var id = Utils.GetUniqueElementId(element);

                if (!Utils.__cache[id]) {
                    Utils.__cache[id] = {};
                }

                Utils.__cache[id][name] = value;
            };

            Utils.GetData = function(element, name) {
                // Retrieves a value from the cache by its key (name)
                // name is optional. If no name specified, return 
                // all cache items for the specified element.
                // and for a specified element.
                var id = Utils.GetUniqueElementId(element);

                if (name) {
                    if (Utils.__cache[id]) {
                        return Utils.__cache[id][name] != null ? Utils.__cache[id][name] : $(element).data(name); // Fallback to HTML5 data attribs.
                    }

                    return $(element).data(name); // Fallback to HTML5 data attribs.
                } else {
                    return Utils.__cache[id];
                }
            };

            Utils.RemoveData = function(element) {
                // Removes all cached items for a specified element.
                var id = Utils.GetUniqueElementId(element);

                if (Utils.__cache[id] != null) {
                    delete Utils.__cache[id];
                }
            };

            return Utils;
        });
        S2.define('select2/results', ['jquery', './utils'], function($, Utils) {
            function Results($element, options, dataAdapter) {
                this.$element = $element;
                this.data = dataAdapter;
                this.options = options;

                Results.__super__.constructor.call(this);
            }

            Utils.Extend(Results, Utils.Observable);

            Results.prototype.render = function() {
                var $results = $('<ul class="select2-results__options" role="tree"></ul>');

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
                var $message = $('<li role="treeitem" aria-live="assertive"' + ' class="select2-results__option"></li>');
                var message = this.options.get('translations').get(params.message);
                $message.append(escapeMarkup(message(params.args)));
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
                var $options = this.$results.find('.select2-results__option[aria-selected]');
                var $selected = $options.filter('[aria-selected=true]'); // Check if there are any selected options

                if ($selected.length > 0) {
                    // If there are selected options, highlight the first
                    $selected.first().trigger('mouseenter');
                } else {
                    // If there are no selected options, highlight the first option
                    // in the dropdown
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
                    var $options = self.$results.find('.select2-results__option[aria-selected]');
                    $options.each(function() {
                        var $option = $(this);
                        var item = Utils.GetData(this, 'data'); // id needs to be converted to a string when comparing

                        var id = '' + item.id;

                        if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
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
                    // When the dropdown is open, aria-expended="true"
                    self.$results.attr('aria-expanded', 'true');
                    self.$results.attr('aria-hidden', 'false');
                    self.setClasses();
                    self.ensureHighlightVisible();
                });
                container.on('close', function() {
                    // When the dropdown is closed, aria-expended="false"
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
                    var currentIndex = $options.index($highlighted); // If we are already at te top, don't move further
                    // If no options, currentIndex will be -1

                    if (currentIndex <= 0) {
                        return;
                    }

                    var nextIndex = currentIndex - 1; // If none are highlighted, highlight the first

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
                    var nextIndex = currentIndex + 1; // If we are at the last option, stay there

                    if (nextIndex >= $options.length) {
                        return;
                    }

                    var $next = $options.eq(nextIndex);
                    $next.trigger('mouseenter');
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
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
                            self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }

                this.$results.on('mouseup', '.select2-results__option[aria-selected]', function(evt) {
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
                this.$results.on('mouseenter', '.select2-results__option[aria-selected]', function(evt) {
                    var data = Utils.GetData(this, 'data');
                    self.getHighlightedResults().removeClass('select2-results__option--highlighted');
                    self.trigger('results:focus', {
                        data: data,
                        element: $(this)
                    });
                });
            };

            Results.prototype.getHighlightedResults = function() {
                var $highlighted = this.$results.find('.select2-results__option--highlighted');
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
        S2.define('select2/keys', [], function() {
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
        S2.define('select2/selection/base', ['jquery', '../utils', '../keys'], function($, Utils, KEYS) {
            function BaseSelection($element, options) {
                this.$element = $element;
                this.options = options;

                BaseSelection.__super__.constructor.call(this);
            }

            Utils.Extend(BaseSelection, Utils.Observable);

            BaseSelection.prototype.render = function() {
                var $selection = $('<span class="select2-selection" role="combobox" ' + ' aria-haspopup="true" aria-expanded="false">' + '</span>');
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
                    // When the dropdown is open, aria-expanded="true"
                    self.$selection.attr('aria-expanded', 'true');
                    self.$selection.attr('aria-owns', resultsId);

                    self._attachCloseHandler(container);
                });
                container.on('close', function() {
                    // When the dropdown is closed, aria-expanded="false"
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
                var self = this; // This needs to be delayed as the active element is the body when the tab
                // key is pressed, possibly along with others.

                window.setTimeout(function() {
                    // Don't trigger `blur` if the focus is still in the selection
                    if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
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
        S2.define('select2/selection/single', ['jquery', './base', '../utils', '../keys'], function($, BaseSelection, Utils, KEYS) {
            function SingleSelection() {
                SingleSelection.__super__.constructor.apply(this, arguments);
            }

            Utils.Extend(SingleSelection, BaseSelection);

            SingleSelection.prototype.render = function() {
                var $selection = SingleSelection.__super__.render.call(this);

                $selection.addClass('select2-selection--single');
                $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');
                return $selection;
            };

            SingleSelection.prototype.bind = function(container, $container) {
                var self = this;

                SingleSelection.__super__.bind.apply(this, arguments);

                var id = container.id + '-container';
                this.$selection.find('.select2-selection__rendered').attr('id', id).attr('role', 'textbox').attr('aria-readonly', 'true');
                this.$selection.attr('aria-labelledby', id);
                this.$selection.on('mousedown', function(evt) {
                    // Only respond to left clicks
                    if (evt.which !== 1) {
                        return;
                    }

                    self.trigger('toggle', {
                        originalEvent: evt
                    });
                });
                this.$selection.on('focus', function(evt) { // User focuses on the container
                });
                this.$selection.on('blur', function(evt) { // User exits the container
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
                $rendered.removeAttr('title'); // clear tooltip on empty
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
        S2.define('select2/selection/multiple', ['jquery', './base', '../utils'], function($, BaseSelection, Utils) {
            function MultipleSelection($element, options) {
                MultipleSelection.__super__.constructor.apply(this, arguments);
            }

            Utils.Extend(MultipleSelection, BaseSelection);

            MultipleSelection.prototype.render = function() {
                var $selection = MultipleSelection.__super__.render.call(this);

                $selection.addClass('select2-selection--multiple');
                $selection.html('<ul class="select2-selection__rendered"></ul>');
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
                this.$selection.on('click', '.select2-selection__choice__remove', function(evt) {
                    // Ignore the event if it is disabled
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
                });
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
                var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');
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
        S2.define('select2/selection/placeholder', ['../utils'], function(Utils) {
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
                $placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');
                return $placeholder;
            };

            Placeholder.prototype.update = function(decorated, data) {
                var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
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
        S2.define('select2/selection/allowClear', ['jquery', '../keys', '../utils'], function($, KEYS, Utils) {
            function AllowClear() {}

            AllowClear.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);

                if (this.placeholder == null) {
                    if (this.options.get('debug') && window.console && console.error) {
                        console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');
                    }
                }

                this.$selection.on('mousedown', '.select2-selection__clear', function(evt) {
                    self._handleClear(evt);
                });
                container.on('keypress', function(evt) {
                    self._handleKeyboardClear(evt, container);
                });
            };

            AllowClear.prototype._handleClear = function(_, evt) {
                // Ignore the event if it is disabled
                if (this.options.get('disabled')) {
                    return;
                }

                var $clear = this.$selection.find('.select2-selection__clear'); // Ignore the event if nothing has been selected

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
                    }; // Trigger the `unselect` event, so people can prevent it from being
                    // cleared.

                    this.trigger('unselect', unselectData); // If the event was prevented, don't clear it out.

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

                if (this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0) {
                    return;
                }

                var $remove = $('<span class="select2-selection__clear">' + '&times;' + '</span>');
                Utils.StoreData($remove[0], 'data', data);
                this.$selection.find('.select2-selection__rendered').prepend($remove);
            };

            return AllowClear;
        });
        S2.define('select2/selection/search', ['jquery', '../utils', '../keys'], function($, Utils, KEYS) {
            function Search(decorated, $element, options) {
                decorated.call(this, $element, options);
            }

            Search.prototype.render = function(decorated) {
                var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" aria-autocomplete="list" />' + '</li>');
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
                        var $previousChoice = self.$searchContainer.prev('.select2-selection__choice');

                        if ($previousChoice.length > 0) {
                            var item = Utils.GetData($previousChoice[0], 'data');
                            self.searchRemoveChoice(item);
                            evt.preventDefault();
                        }
                    }
                }); // Try to detect the IE version should the `documentMode` property that
                // is stored on the document. This is only implemented in IE and is
                // slightly cleaner than doing a user agent check.
                // This property is not available in Edge, but Edge also doesn't have
                // this bug.

                var msie = document.documentMode;
                var disableInputEvents = msie && msie <= 11; // Workaround for browsers which do not support the `input` event
                // This will prevent double-triggering of events for browsers which support
                // both the `keyup` and `input` events.

                this.$selection.on('input.searchcheck', '.select2-search--inline', function(evt) {
                    // IE will trigger the `input` event when a placeholder is used on a
                    // search box. To get around this issue, we are forced to ignore all
                    // `input` events in IE and keep using `keyup`.
                    if (disableInputEvents) {
                        self.$selection.off('input.search input.searchcheck');
                        return;
                    } // Unbind the duplicated `keyup` event


                    self.$selection.off('keyup.search');
                });
                this.$selection.on('keyup.search input.search', '.select2-search--inline', function(evt) {
                    // IE will trigger the `input` event when a placeholder is used on a
                    // search box. To get around this issue, we are forced to ignore all
                    // `input` events in IE and keep using `keyup`.
                    if (disableInputEvents && evt.type === 'input') {
                        self.$selection.off('input.search input.searchcheck');
                        return;
                    }

                    var key = evt.which; // We can freely ignore events from modifier keys

                    if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                        return;
                    } // Tabbing will be handled during the `keydown` phase


                    if (key == KEYS.TAB) {
                        return;
                    }

                    self.handleSearch(evt);
                });
            };
            /**
             * This method will transfer the tabindex attribute from the rendered
             * selection to the search box. This allows for the search box to be used as
             * the primary focus instead of the selection container.
             *
             * @private
             */


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
                this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);
                this.resizeSearch();

                if (searchHadFocus) {
                    var isTagInput = this.$element.find('[data-select2-tag]').length;

                    if (isTagInput) {
                        // fix IE11 bug where tag input lost focus
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
                    width = minimumWidth * 0.75 + 'em';
                }

                this.$search.css('width', width);
            };

            return Search;
        });
        S2.define('select2/selection/eventRelay', ['jquery'], function($) {
            function EventRelay() {}

            EventRelay.prototype.bind = function(decorated, container, $container) {
                var self = this;
                var relayEvents = ['open', 'opening', 'close', 'closing', 'select', 'selecting', 'unselect', 'unselecting', 'clear', 'clearing'];
                var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting', 'clearing'];
                decorated.call(this, container, $container);
                container.on('*', function(name, params) {
                    // Ignore events that should not be relayed
                    if ($.inArray(name, relayEvents) === -1) {
                        return;
                    } // The parameters should always be an object


                    params = params || {}; // Generate the jQuery event for the Select2 event

                    var evt = $.Event('select2:' + name, {
                        params: params
                    });
                    self.$element.trigger(evt); // Only handle preventable events if it was one

                    if ($.inArray(name, preventableEvents) === -1) {
                        return;
                    }

                    params.prevented = evt.isDefaultPrevented();
                });
            };

            return EventRelay;
        });
        S2.define('select2/translation', ['jquery', 'require'], function($, require) {
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
            }; // Static functions


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
        S2.define('select2/diacritics', [], function() {
            var diacritics = {
                "\u24B6": 'A',
                "\uFF21": 'A',
                "\xC0": 'A',
                "\xC1": 'A',
                "\xC2": 'A',
                "\u1EA6": 'A',
                "\u1EA4": 'A',
                "\u1EAA": 'A',
                "\u1EA8": 'A',
                "\xC3": 'A',
                "\u0100": 'A',
                "\u0102": 'A',
                "\u1EB0": 'A',
                "\u1EAE": 'A',
                "\u1EB4": 'A',
                "\u1EB2": 'A',
                "\u0226": 'A',
                "\u01E0": 'A',
                "\xC4": 'A',
                "\u01DE": 'A',
                "\u1EA2": 'A',
                "\xC5": 'A',
                "\u01FA": 'A',
                "\u01CD": 'A',
                "\u0200": 'A',
                "\u0202": 'A',
                "\u1EA0": 'A',
                "\u1EAC": 'A',
                "\u1EB6": 'A',
                "\u1E00": 'A',
                "\u0104": 'A',
                "\u023A": 'A',
                "\u2C6F": 'A',
                "\uA732": 'AA',
                "\xC6": 'AE',
                "\u01FC": 'AE',
                "\u01E2": 'AE',
                "\uA734": 'AO',
                "\uA736": 'AU',
                "\uA738": 'AV',
                "\uA73A": 'AV',
                "\uA73C": 'AY',
                "\u24B7": 'B',
                "\uFF22": 'B',
                "\u1E02": 'B',
                "\u1E04": 'B',
                "\u1E06": 'B',
                "\u0243": 'B',
                "\u0182": 'B',
                "\u0181": 'B',
                "\u24B8": 'C',
                "\uFF23": 'C',
                "\u0106": 'C',
                "\u0108": 'C',
                "\u010A": 'C',
                "\u010C": 'C',
                "\xC7": 'C',
                "\u1E08": 'C',
                "\u0187": 'C',
                "\u023B": 'C',
                "\uA73E": 'C',
                "\u24B9": 'D',
                "\uFF24": 'D',
                "\u1E0A": 'D',
                "\u010E": 'D',
                "\u1E0C": 'D',
                "\u1E10": 'D',
                "\u1E12": 'D',
                "\u1E0E": 'D',
                "\u0110": 'D',
                "\u018B": 'D',
                "\u018A": 'D',
                "\u0189": 'D',
                "\uA779": 'D',
                "\u01F1": 'DZ',
                "\u01C4": 'DZ',
                "\u01F2": 'Dz',
                "\u01C5": 'Dz',
                "\u24BA": 'E',
                "\uFF25": 'E',
                "\xC8": 'E',
                "\xC9": 'E',
                "\xCA": 'E',
                "\u1EC0": 'E',
                "\u1EBE": 'E',
                "\u1EC4": 'E',
                "\u1EC2": 'E',
                "\u1EBC": 'E',
                "\u0112": 'E',
                "\u1E14": 'E',
                "\u1E16": 'E',
                "\u0114": 'E',
                "\u0116": 'E',
                "\xCB": 'E',
                "\u1EBA": 'E',
                "\u011A": 'E',
                "\u0204": 'E',
                "\u0206": 'E',
                "\u1EB8": 'E',
                "\u1EC6": 'E',
                "\u0228": 'E',
                "\u1E1C": 'E',
                "\u0118": 'E',
                "\u1E18": 'E',
                "\u1E1A": 'E',
                "\u0190": 'E',
                "\u018E": 'E',
                "\u24BB": 'F',
                "\uFF26": 'F',
                "\u1E1E": 'F',
                "\u0191": 'F',
                "\uA77B": 'F',
                "\u24BC": 'G',
                "\uFF27": 'G',
                "\u01F4": 'G',
                "\u011C": 'G',
                "\u1E20": 'G',
                "\u011E": 'G',
                "\u0120": 'G',
                "\u01E6": 'G',
                "\u0122": 'G',
                "\u01E4": 'G',
                "\u0193": 'G',
                "\uA7A0": 'G',
                "\uA77D": 'G',
                "\uA77E": 'G',
                "\u24BD": 'H',
                "\uFF28": 'H',
                "\u0124": 'H',
                "\u1E22": 'H',
                "\u1E26": 'H',
                "\u021E": 'H',
                "\u1E24": 'H',
                "\u1E28": 'H',
                "\u1E2A": 'H',
                "\u0126": 'H',
                "\u2C67": 'H',
                "\u2C75": 'H',
                "\uA78D": 'H',
                "\u24BE": 'I',
                "\uFF29": 'I',
                "\xCC": 'I',
                "\xCD": 'I',
                "\xCE": 'I',
                "\u0128": 'I',
                "\u012A": 'I',
                "\u012C": 'I',
                "\u0130": 'I',
                "\xCF": 'I',
                "\u1E2E": 'I',
                "\u1EC8": 'I',
                "\u01CF": 'I',
                "\u0208": 'I',
                "\u020A": 'I',
                "\u1ECA": 'I',
                "\u012E": 'I',
                "\u1E2C": 'I',
                "\u0197": 'I',
                "\u24BF": 'J',
                "\uFF2A": 'J',
                "\u0134": 'J',
                "\u0248": 'J',
                "\u24C0": 'K',
                "\uFF2B": 'K',
                "\u1E30": 'K',
                "\u01E8": 'K',
                "\u1E32": 'K',
                "\u0136": 'K',
                "\u1E34": 'K',
                "\u0198": 'K',
                "\u2C69": 'K',
                "\uA740": 'K',
                "\uA742": 'K',
                "\uA744": 'K',
                "\uA7A2": 'K',
                "\u24C1": 'L',
                "\uFF2C": 'L',
                "\u013F": 'L',
                "\u0139": 'L',
                "\u013D": 'L',
                "\u1E36": 'L',
                "\u1E38": 'L',
                "\u013B": 'L',
                "\u1E3C": 'L',
                "\u1E3A": 'L',
                "\u0141": 'L',
                "\u023D": 'L',
                "\u2C62": 'L',
                "\u2C60": 'L',
                "\uA748": 'L',
                "\uA746": 'L',
                "\uA780": 'L',
                "\u01C7": 'LJ',
                "\u01C8": 'Lj',
                "\u24C2": 'M',
                "\uFF2D": 'M',
                "\u1E3E": 'M',
                "\u1E40": 'M',
                "\u1E42": 'M',
                "\u2C6E": 'M',
                "\u019C": 'M',
                "\u24C3": 'N',
                "\uFF2E": 'N',
                "\u01F8": 'N',
                "\u0143": 'N',
                "\xD1": 'N',
                "\u1E44": 'N',
                "\u0147": 'N',
                "\u1E46": 'N',
                "\u0145": 'N',
                "\u1E4A": 'N',
                "\u1E48": 'N',
                "\u0220": 'N',
                "\u019D": 'N',
                "\uA790": 'N',
                "\uA7A4": 'N',
                "\u01CA": 'NJ',
                "\u01CB": 'Nj',
                "\u24C4": 'O',
                "\uFF2F": 'O',
                "\xD2": 'O',
                "\xD3": 'O',
                "\xD4": 'O',
                "\u1ED2": 'O',
                "\u1ED0": 'O',
                "\u1ED6": 'O',
                "\u1ED4": 'O',
                "\xD5": 'O',
                "\u1E4C": 'O',
                "\u022C": 'O',
                "\u1E4E": 'O',
                "\u014C": 'O',
                "\u1E50": 'O',
                "\u1E52": 'O',
                "\u014E": 'O',
                "\u022E": 'O',
                "\u0230": 'O',
                "\xD6": 'O',
                "\u022A": 'O',
                "\u1ECE": 'O',
                "\u0150": 'O',
                "\u01D1": 'O',
                "\u020C": 'O',
                "\u020E": 'O',
                "\u01A0": 'O',
                "\u1EDC": 'O',
                "\u1EDA": 'O',
                "\u1EE0": 'O',
                "\u1EDE": 'O',
                "\u1EE2": 'O',
                "\u1ECC": 'O',
                "\u1ED8": 'O',
                "\u01EA": 'O',
                "\u01EC": 'O',
                "\xD8": 'O',
                "\u01FE": 'O',
                "\u0186": 'O',
                "\u019F": 'O',
                "\uA74A": 'O',
                "\uA74C": 'O',
                "\u01A2": 'OI',
                "\uA74E": 'OO',
                "\u0222": 'OU',
                "\u24C5": 'P',
                "\uFF30": 'P',
                "\u1E54": 'P',
                "\u1E56": 'P',
                "\u01A4": 'P',
                "\u2C63": 'P',
                "\uA750": 'P',
                "\uA752": 'P',
                "\uA754": 'P',
                "\u24C6": 'Q',
                "\uFF31": 'Q',
                "\uA756": 'Q',
                "\uA758": 'Q',
                "\u024A": 'Q',
                "\u24C7": 'R',
                "\uFF32": 'R',
                "\u0154": 'R',
                "\u1E58": 'R',
                "\u0158": 'R',
                "\u0210": 'R',
                "\u0212": 'R',
                "\u1E5A": 'R',
                "\u1E5C": 'R',
                "\u0156": 'R',
                "\u1E5E": 'R',
                "\u024C": 'R',
                "\u2C64": 'R',
                "\uA75A": 'R',
                "\uA7A6": 'R',
                "\uA782": 'R',
                "\u24C8": 'S',
                "\uFF33": 'S',
                "\u1E9E": 'S',
                "\u015A": 'S',
                "\u1E64": 'S',
                "\u015C": 'S',
                "\u1E60": 'S',
                "\u0160": 'S',
                "\u1E66": 'S',
                "\u1E62": 'S',
                "\u1E68": 'S',
                "\u0218": 'S',
                "\u015E": 'S',
                "\u2C7E": 'S',
                "\uA7A8": 'S',
                "\uA784": 'S',
                "\u24C9": 'T',
                "\uFF34": 'T',
                "\u1E6A": 'T',
                "\u0164": 'T',
                "\u1E6C": 'T',
                "\u021A": 'T',
                "\u0162": 'T',
                "\u1E70": 'T',
                "\u1E6E": 'T',
                "\u0166": 'T',
                "\u01AC": 'T',
                "\u01AE": 'T',
                "\u023E": 'T',
                "\uA786": 'T',
                "\uA728": 'TZ',
                "\u24CA": 'U',
                "\uFF35": 'U',
                "\xD9": 'U',
                "\xDA": 'U',
                "\xDB": 'U',
                "\u0168": 'U',
                "\u1E78": 'U',
                "\u016A": 'U',
                "\u1E7A": 'U',
                "\u016C": 'U',
                "\xDC": 'U',
                "\u01DB": 'U',
                "\u01D7": 'U',
                "\u01D5": 'U',
                "\u01D9": 'U',
                "\u1EE6": 'U',
                "\u016E": 'U',
                "\u0170": 'U',
                "\u01D3": 'U',
                "\u0214": 'U',
                "\u0216": 'U',
                "\u01AF": 'U',
                "\u1EEA": 'U',
                "\u1EE8": 'U',
                "\u1EEE": 'U',
                "\u1EEC": 'U',
                "\u1EF0": 'U',
                "\u1EE4": 'U',
                "\u1E72": 'U',
                "\u0172": 'U',
                "\u1E76": 'U',
                "\u1E74": 'U',
                "\u0244": 'U',
                "\u24CB": 'V',
                "\uFF36": 'V',
                "\u1E7C": 'V',
                "\u1E7E": 'V',
                "\u01B2": 'V',
                "\uA75E": 'V',
                "\u0245": 'V',
                "\uA760": 'VY',
                "\u24CC": 'W',
                "\uFF37": 'W',
                "\u1E80": 'W',
                "\u1E82": 'W',
                "\u0174": 'W',
                "\u1E86": 'W',
                "\u1E84": 'W',
                "\u1E88": 'W',
                "\u2C72": 'W',
                "\u24CD": 'X',
                "\uFF38": 'X',
                "\u1E8A": 'X',
                "\u1E8C": 'X',
                "\u24CE": 'Y',
                "\uFF39": 'Y',
                "\u1EF2": 'Y',
                "\xDD": 'Y',
                "\u0176": 'Y',
                "\u1EF8": 'Y',
                "\u0232": 'Y',
                "\u1E8E": 'Y',
                "\u0178": 'Y',
                "\u1EF6": 'Y',
                "\u1EF4": 'Y',
                "\u01B3": 'Y',
                "\u024E": 'Y',
                "\u1EFE": 'Y',
                "\u24CF": 'Z',
                "\uFF3A": 'Z',
                "\u0179": 'Z',
                "\u1E90": 'Z',
                "\u017B": 'Z',
                "\u017D": 'Z',
                "\u1E92": 'Z',
                "\u1E94": 'Z',
                "\u01B5": 'Z',
                "\u0224": 'Z',
                "\u2C7F": 'Z',
                "\u2C6B": 'Z',
                "\uA762": 'Z',
                "\u24D0": 'a',
                "\uFF41": 'a',
                "\u1E9A": 'a',
                "\xE0": 'a',
                "\xE1": 'a',
                "\xE2": 'a',
                "\u1EA7": 'a',
                "\u1EA5": 'a',
                "\u1EAB": 'a',
                "\u1EA9": 'a',
                "\xE3": 'a',
                "\u0101": 'a',
                "\u0103": 'a',
                "\u1EB1": 'a',
                "\u1EAF": 'a',
                "\u1EB5": 'a',
                "\u1EB3": 'a',
                "\u0227": 'a',
                "\u01E1": 'a',
                "\xE4": 'a',
                "\u01DF": 'a',
                "\u1EA3": 'a',
                "\xE5": 'a',
                "\u01FB": 'a',
                "\u01CE": 'a',
                "\u0201": 'a',
                "\u0203": 'a',
                "\u1EA1": 'a',
                "\u1EAD": 'a',
                "\u1EB7": 'a',
                "\u1E01": 'a',
                "\u0105": 'a',
                "\u2C65": 'a',
                "\u0250": 'a',
                "\uA733": 'aa',
                "\xE6": 'ae',
                "\u01FD": 'ae',
                "\u01E3": 'ae',
                "\uA735": 'ao',
                "\uA737": 'au',
                "\uA739": 'av',
                "\uA73B": 'av',
                "\uA73D": 'ay',
                "\u24D1": 'b',
                "\uFF42": 'b',
                "\u1E03": 'b',
                "\u1E05": 'b',
                "\u1E07": 'b',
                "\u0180": 'b',
                "\u0183": 'b',
                "\u0253": 'b',
                "\u24D2": 'c',
                "\uFF43": 'c',
                "\u0107": 'c',
                "\u0109": 'c',
                "\u010B": 'c',
                "\u010D": 'c',
                "\xE7": 'c',
                "\u1E09": 'c',
                "\u0188": 'c',
                "\u023C": 'c',
                "\uA73F": 'c',
                "\u2184": 'c',
                "\u24D3": 'd',
                "\uFF44": 'd',
                "\u1E0B": 'd',
                "\u010F": 'd',
                "\u1E0D": 'd',
                "\u1E11": 'd',
                "\u1E13": 'd',
                "\u1E0F": 'd',
                "\u0111": 'd',
                "\u018C": 'd',
                "\u0256": 'd',
                "\u0257": 'd',
                "\uA77A": 'd',
                "\u01F3": 'dz',
                "\u01C6": 'dz',
                "\u24D4": 'e',
                "\uFF45": 'e',
                "\xE8": 'e',
                "\xE9": 'e',
                "\xEA": 'e',
                "\u1EC1": 'e',
                "\u1EBF": 'e',
                "\u1EC5": 'e',
                "\u1EC3": 'e',
                "\u1EBD": 'e',
                "\u0113": 'e',
                "\u1E15": 'e',
                "\u1E17": 'e',
                "\u0115": 'e',
                "\u0117": 'e',
                "\xEB": 'e',
                "\u1EBB": 'e',
                "\u011B": 'e',
                "\u0205": 'e',
                "\u0207": 'e',
                "\u1EB9": 'e',
                "\u1EC7": 'e',
                "\u0229": 'e',
                "\u1E1D": 'e',
                "\u0119": 'e',
                "\u1E19": 'e',
                "\u1E1B": 'e',
                "\u0247": 'e',
                "\u025B": 'e',
                "\u01DD": 'e',
                "\u24D5": 'f',
                "\uFF46": 'f',
                "\u1E1F": 'f',
                "\u0192": 'f',
                "\uA77C": 'f',
                "\u24D6": 'g',
                "\uFF47": 'g',
                "\u01F5": 'g',
                "\u011D": 'g',
                "\u1E21": 'g',
                "\u011F": 'g',
                "\u0121": 'g',
                "\u01E7": 'g',
                "\u0123": 'g',
                "\u01E5": 'g',
                "\u0260": 'g',
                "\uA7A1": 'g',
                "\u1D79": 'g',
                "\uA77F": 'g',
                "\u24D7": 'h',
                "\uFF48": 'h',
                "\u0125": 'h',
                "\u1E23": 'h',
                "\u1E27": 'h',
                "\u021F": 'h',
                "\u1E25": 'h',
                "\u1E29": 'h',
                "\u1E2B": 'h',
                "\u1E96": 'h',
                "\u0127": 'h',
                "\u2C68": 'h',
                "\u2C76": 'h',
                "\u0265": 'h',
                "\u0195": 'hv',
                "\u24D8": 'i',
                "\uFF49": 'i',
                "\xEC": 'i',
                "\xED": 'i',
                "\xEE": 'i',
                "\u0129": 'i',
                "\u012B": 'i',
                "\u012D": 'i',
                "\xEF": 'i',
                "\u1E2F": 'i',
                "\u1EC9": 'i',
                "\u01D0": 'i',
                "\u0209": 'i',
                "\u020B": 'i',
                "\u1ECB": 'i',
                "\u012F": 'i',
                "\u1E2D": 'i',
                "\u0268": 'i',
                "\u0131": 'i',
                "\u24D9": 'j',
                "\uFF4A": 'j',
                "\u0135": 'j',
                "\u01F0": 'j',
                "\u0249": 'j',
                "\u24DA": 'k',
                "\uFF4B": 'k',
                "\u1E31": 'k',
                "\u01E9": 'k',
                "\u1E33": 'k',
                "\u0137": 'k',
                "\u1E35": 'k',
                "\u0199": 'k',
                "\u2C6A": 'k',
                "\uA741": 'k',
                "\uA743": 'k',
                "\uA745": 'k',
                "\uA7A3": 'k',
                "\u24DB": 'l',
                "\uFF4C": 'l',
                "\u0140": 'l',
                "\u013A": 'l',
                "\u013E": 'l',
                "\u1E37": 'l',
                "\u1E39": 'l',
                "\u013C": 'l',
                "\u1E3D": 'l',
                "\u1E3B": 'l',
                "\u017F": 'l',
                "\u0142": 'l',
                "\u019A": 'l',
                "\u026B": 'l',
                "\u2C61": 'l',
                "\uA749": 'l',
                "\uA781": 'l',
                "\uA747": 'l',
                "\u01C9": 'lj',
                "\u24DC": 'm',
                "\uFF4D": 'm',
                "\u1E3F": 'm',
                "\u1E41": 'm',
                "\u1E43": 'm',
                "\u0271": 'm',
                "\u026F": 'm',
                "\u24DD": 'n',
                "\uFF4E": 'n',
                "\u01F9": 'n',
                "\u0144": 'n',
                "\xF1": 'n',
                "\u1E45": 'n',
                "\u0148": 'n',
                "\u1E47": 'n',
                "\u0146": 'n',
                "\u1E4B": 'n',
                "\u1E49": 'n',
                "\u019E": 'n',
                "\u0272": 'n',
                "\u0149": 'n',
                "\uA791": 'n',
                "\uA7A5": 'n',
                "\u01CC": 'nj',
                "\u24DE": 'o',
                "\uFF4F": 'o',
                "\xF2": 'o',
                "\xF3": 'o',
                "\xF4": 'o',
                "\u1ED3": 'o',
                "\u1ED1": 'o',
                "\u1ED7": 'o',
                "\u1ED5": 'o',
                "\xF5": 'o',
                "\u1E4D": 'o',
                "\u022D": 'o',
                "\u1E4F": 'o',
                "\u014D": 'o',
                "\u1E51": 'o',
                "\u1E53": 'o',
                "\u014F": 'o',
                "\u022F": 'o',
                "\u0231": 'o',
                "\xF6": 'o',
                "\u022B": 'o',
                "\u1ECF": 'o',
                "\u0151": 'o',
                "\u01D2": 'o',
                "\u020D": 'o',
                "\u020F": 'o',
                "\u01A1": 'o',
                "\u1EDD": 'o',
                "\u1EDB": 'o',
                "\u1EE1": 'o',
                "\u1EDF": 'o',
                "\u1EE3": 'o',
                "\u1ECD": 'o',
                "\u1ED9": 'o',
                "\u01EB": 'o',
                "\u01ED": 'o',
                "\xF8": 'o',
                "\u01FF": 'o',
                "\u0254": 'o',
                "\uA74B": 'o',
                "\uA74D": 'o',
                "\u0275": 'o',
                "\u01A3": 'oi',
                "\u0223": 'ou',
                "\uA74F": 'oo',
                "\u24DF": 'p',
                "\uFF50": 'p',
                "\u1E55": 'p',
                "\u1E57": 'p',
                "\u01A5": 'p',
                "\u1D7D": 'p',
                "\uA751": 'p',
                "\uA753": 'p',
                "\uA755": 'p',
                "\u24E0": 'q',
                "\uFF51": 'q',
                "\u024B": 'q',
                "\uA757": 'q',
                "\uA759": 'q',
                "\u24E1": 'r',
                "\uFF52": 'r',
                "\u0155": 'r',
                "\u1E59": 'r',
                "\u0159": 'r',
                "\u0211": 'r',
                "\u0213": 'r',
                "\u1E5B": 'r',
                "\u1E5D": 'r',
                "\u0157": 'r',
                "\u1E5F": 'r',
                "\u024D": 'r',
                "\u027D": 'r',
                "\uA75B": 'r',
                "\uA7A7": 'r',
                "\uA783": 'r',
                "\u24E2": 's',
                "\uFF53": 's',
                "\xDF": 's',
                "\u015B": 's',
                "\u1E65": 's',
                "\u015D": 's',
                "\u1E61": 's',
                "\u0161": 's',
                "\u1E67": 's',
                "\u1E63": 's',
                "\u1E69": 's',
                "\u0219": 's',
                "\u015F": 's',
                "\u023F": 's',
                "\uA7A9": 's',
                "\uA785": 's',
                "\u1E9B": 's',
                "\u24E3": 't',
                "\uFF54": 't',
                "\u1E6B": 't',
                "\u1E97": 't',
                "\u0165": 't',
                "\u1E6D": 't',
                "\u021B": 't',
                "\u0163": 't',
                "\u1E71": 't',
                "\u1E6F": 't',
                "\u0167": 't',
                "\u01AD": 't',
                "\u0288": 't',
                "\u2C66": 't',
                "\uA787": 't',
                "\uA729": 'tz',
                "\u24E4": 'u',
                "\uFF55": 'u',
                "\xF9": 'u',
                "\xFA": 'u',
                "\xFB": 'u',
                "\u0169": 'u',
                "\u1E79": 'u',
                "\u016B": 'u',
                "\u1E7B": 'u',
                "\u016D": 'u',
                "\xFC": 'u',
                "\u01DC": 'u',
                "\u01D8": 'u',
                "\u01D6": 'u',
                "\u01DA": 'u',
                "\u1EE7": 'u',
                "\u016F": 'u',
                "\u0171": 'u',
                "\u01D4": 'u',
                "\u0215": 'u',
                "\u0217": 'u',
                "\u01B0": 'u',
                "\u1EEB": 'u',
                "\u1EE9": 'u',
                "\u1EEF": 'u',
                "\u1EED": 'u',
                "\u1EF1": 'u',
                "\u1EE5": 'u',
                "\u1E73": 'u',
                "\u0173": 'u',
                "\u1E77": 'u',
                "\u1E75": 'u',
                "\u0289": 'u',
                "\u24E5": 'v',
                "\uFF56": 'v',
                "\u1E7D": 'v',
                "\u1E7F": 'v',
                "\u028B": 'v',
                "\uA75F": 'v',
                "\u028C": 'v',
                "\uA761": 'vy',
                "\u24E6": 'w',
                "\uFF57": 'w',
                "\u1E81": 'w',
                "\u1E83": 'w',
                "\u0175": 'w',
                "\u1E87": 'w',
                "\u1E85": 'w',
                "\u1E98": 'w',
                "\u1E89": 'w',
                "\u2C73": 'w',
                "\u24E7": 'x',
                "\uFF58": 'x',
                "\u1E8B": 'x',
                "\u1E8D": 'x',
                "\u24E8": 'y',
                "\uFF59": 'y',
                "\u1EF3": 'y',
                "\xFD": 'y',
                "\u0177": 'y',
                "\u1EF9": 'y',
                "\u0233": 'y',
                "\u1E8F": 'y',
                "\xFF": 'y',
                "\u1EF7": 'y',
                "\u1E99": 'y',
                "\u1EF5": 'y',
                "\u01B4": 'y',
                "\u024F": 'y',
                "\u1EFF": 'y',
                "\u24E9": 'z',
                "\uFF5A": 'z',
                "\u017A": 'z',
                "\u1E91": 'z',
                "\u017C": 'z',
                "\u017E": 'z',
                "\u1E93": 'z',
                "\u1E95": 'z',
                "\u01B6": 'z',
                "\u0225": 'z',
                "\u0240": 'z',
                "\u2C6C": 'z',
                "\uA763": 'z',
                "\u0386": "\u0391",
                "\u0388": "\u0395",
                "\u0389": "\u0397",
                "\u038A": "\u0399",
                "\u03AA": "\u0399",
                "\u038C": "\u039F",
                "\u038E": "\u03A5",
                "\u03AB": "\u03A5",
                "\u038F": "\u03A9",
                "\u03AC": "\u03B1",
                "\u03AD": "\u03B5",
                "\u03AE": "\u03B7",
                "\u03AF": "\u03B9",
                "\u03CA": "\u03B9",
                "\u0390": "\u03B9",
                "\u03CC": "\u03BF",
                "\u03CD": "\u03C5",
                "\u03CB": "\u03C5",
                "\u03B0": "\u03C5",
                "\u03C9": "\u03C9",
                "\u03C2": "\u03C3"
            };
            return diacritics;
        });
        S2.define('select2/data/base', ['../utils'], function(Utils) {
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

            BaseAdapter.prototype.bind = function(container, $container) { // Can be implemented in subclasses
            };

            BaseAdapter.prototype.destroy = function() { // Can be implemented in subclasses
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
        S2.define('select2/data/select', ['./base', '../utils', 'jquery'], function(BaseAdapter, Utils, $) {
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
                data.selected = true; // If data.element is a DOM node, use it instead

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
                // Remove anything added to child elements
                this.$element.find('*').each(function() {
                    // Remove any custom data set by Select2
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

                normalizedData.element = option; // Override the option's data with the combined data

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
        S2.define('select2/data/array', ['./select', '../utils', 'jquery'], function(SelectAdapter, Utils, $) {
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
                var $options = []; // Filter out all items except for the one passed in the argument

                function onlyItem(item) {
                    return function() {
                        return $(this).val() == item.id;
                    };
                }

                for (var d = 0; d < data.length; d++) {
                    var item = this._normalizeItem(data[d]); // Skip items which were pre-loaded, only merge the data


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
        S2.define('select2/data/ajax', ['./array', '../utils', 'jquery'], function(ArrayAdapter, Utils, $) {
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
                    data: function data(params) {
                        return $.extend({}, params, {
                            q: params.term
                        });
                    },
                    transport: function transport(params, success, failure) {
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
                    // JSONP requests cannot always be aborted
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
                            // Check to make sure that the response included a `results` key.
                            if (!results || !results.results || !$.isArray(results.results)) {
                                console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');
                            }
                        }

                        callback(results);
                    }, function() {
                        // Attempt to detect if a request was aborted
                        // Only works if the transport exposes a status property
                        if ('status' in $request && ($request.status === 0 || $request.status === '0')) {
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
        S2.define('select2/data/tags', ['jquery'], function($) {
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
                        var checkChildren = option.children != null && !wrapper({
                            results: option.children
                        }, true);
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
        S2.define('select2/data/tokenizer', ['jquery'], function($) {
            function Tokenizer(decorated, $element, options) {
                var tokenizer = options.get('tokenizer');

                if (tokenizer !== undefined) {
                    this.tokenizer = tokenizer;
                }

                decorated.call(this, $element, options);
            }

            Tokenizer.prototype.bind = function(decorated, container, $container) {
                decorated.call(this, container, $container);
                this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');
            };

            Tokenizer.prototype.query = function(decorated, params, callback) {
                var self = this;

                function createAndSelect(data) {
                    // Normalize the data object so we can use it for checks
                    var item = self._normalizeItem(data); // Check if the data object already exists as a tag
                    // Select it if it doesn't


                    var $existingOptions = self.$element.find('option').filter(function() {
                        return $(this).val() === item.id;
                    }); // If an existing option wasn't found for it, create the option

                    if (!$existingOptions.length) {
                        var $option = self.option(item);
                        $option.attr('data-select2-tag', true);

                        self._removeOldTags();

                        self.addOptions([$option]);
                    } // Select the item, now that we know there is an option for it


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
                    // Replace the search term if we have the search box
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

                    callback(data); // Reset the term to not include the tokenized portion

                    term = term.substr(i + 1) || '';
                    i = 0;
                }

                return {
                    term: term
                };
            };

            return Tokenizer;
        });
        S2.define('select2/data/minimumInputLength', [], function() {
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
        S2.define('select2/data/maximumInputLength', [], function() {
            function MaximumInputLength(decorated, $e, options) {
                this.maximumInputLength = options.get('maximumInputLength');
                decorated.call(this, $e, options);
            }

            MaximumInputLength.prototype.query = function(decorated, params, callback) {
                params.term = params.term || '';

                if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
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
        S2.define('select2/data/maximumSelectionLength', [], function() {
            function MaximumSelectionLength(decorated, $e, options) {
                this.maximumSelectionLength = options.get('maximumSelectionLength');
                decorated.call(this, $e, options);
            }

            MaximumSelectionLength.prototype.query = function(decorated, params, callback) {
                var self = this;
                this.current(function(currentData) {
                    var count = currentData != null ? currentData.length : 0;

                    if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
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
        S2.define('select2/dropdown', ['jquery', './utils'], function($, Utils) {
            function Dropdown($element, options) {
                this.$element = $element;
                this.options = options;

                Dropdown.__super__.constructor.call(this);
            }

            Utils.Extend(Dropdown, Utils.Observable);

            Dropdown.prototype.render = function() {
                var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');
                $dropdown.attr('dir', this.options.get('dir'));
                this.$dropdown = $dropdown;
                return $dropdown;
            };

            Dropdown.prototype.bind = function() { // Should be implemented in subclasses
            };

            Dropdown.prototype.position = function($dropdown, $container) { // Should be implmented in subclasses
            };

            Dropdown.prototype.destroy = function() {
                // Remove the dropdown from the DOM
                this.$dropdown.remove();
            };

            return Dropdown;
        });
        S2.define('select2/dropdown/search', ['jquery', '../utils'], function($, Utils) {
            function Search() {}

            Search.prototype.render = function(decorated) {
                var $rendered = decorated.call(this);
                var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="none"' + ' spellcheck="false" role="textbox" />' + '</span>');
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
                }); // Workaround for browsers which do not support the `input` event
                // This will prevent double-triggering of events for browsers which support
                // both the `keyup` and `input` events.

                this.$search.on('input', function(evt) {
                    // Unbind the duplicated `keyup` event
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
        S2.define('select2/dropdown/hidePlaceholder', [], function() {
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
        S2.define('select2/dropdown/infiniteScroll', ['jquery'], function($) {
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
                    var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);

                    if (self.loading || !isLoadMoreVisible) {
                        return;
                    }

                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);

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
                var $option = $('<li ' + 'class="select2-results__option select2-results__option--load-more"' + 'role="treeitem" aria-disabled="true"></li>');
                var message = this.options.get('translations').get('loadingMore');
                $option.html(message(this.lastParams));
                return $option;
            };

            return InfiniteScroll;
        });
        S2.define('select2/dropdown/attachBody', ['jquery', '../utils'], function($, Utils) {
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
                // Clone all of the container classes
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

            AttachBody.prototype._attachPositioningHandler = function(decorated, container) {
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
                $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent, function(e) {
                    self._positionDropdown();

                    self._resizeDropdown();
                });
            };

            AttachBody.prototype._detachPositioningHandler = function(decorated, container) {
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
                var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
                var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
                var css = {
                    left: offset.left,
                    top: container.bottom
                }; // Determine what the parent element is to use for calciulating the offset

                var $offsetParent = this.$dropdownParent; // For statically positoned elements, we need to get the element
                // that is determining the offset

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

                if (newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below') {
                    css.top = container.top - parentOffset.top - dropdown.height;
                }

                if (newDirection != null) {
                    this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);
                    this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);
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
        S2.define('select2/dropdown/minimumResultsForSearch', [], function() {
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
        S2.define('select2/dropdown/selectOnClose', ['../utils'], function(Utils) {
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
                    var event = params.originalSelect2Event; // Don't select an item if the close event was triggered from a select or
                    // unselect event

                    if (event._type === 'select' || event._type === 'unselect') {
                        return;
                    }
                }

                var $highlightedResults = this.getHighlightedResults(); // Only select highlighted results

                if ($highlightedResults.length < 1) {
                    return;
                }

                var data = Utils.GetData($highlightedResults[0], 'data'); // Don't re-select already selected resulte

                if (data.element != null && data.element.selected || data.element == null && data.selected) {
                    return;
                }

                this.trigger('select', {
                    data: data
                });
            };

            return SelectOnClose;
        });
        S2.define('select2/dropdown/closeOnSelect', [], function() {
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
                var originalEvent = evt.originalEvent; // Don't close if the control key is being held

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
            // English
            return {
                errorLoading: function errorLoading() {
                    return 'The results could not be loaded.';
                },
                inputTooLong: function inputTooLong(args) {
                    var overChars = args.input.length - args.maximum;
                    var message = 'Please delete ' + overChars + ' character';

                    if (overChars != 1) {
                        message += 's';
                    }

                    return message;
                },
                inputTooShort: function inputTooShort(args) {
                    var remainingChars = args.minimum - args.input.length;
                    var message = 'Please enter ' + remainingChars + ' or more characters';
                    return message;
                },
                loadingMore: function loadingMore() {
                    return 'Loading more results…';
                },
                maximumSelected: function maximumSelected(args) {
                    var message = 'You can only select ' + args.maximum + ' item';

                    if (args.maximum != 1) {
                        message += 's';
                    }

                    return message;
                },
                noResults: function noResults() {
                    return 'No results found';
                },
                searching: function searching() {
                    return 'Searching…';
                }
            };
        });
        S2.define('select2/defaults', ['jquery', 'require', './results', './selection/single', './selection/multiple', './selection/placeholder', './selection/allowClear', './selection/search', './selection/eventRelay', './utils', './translation', './diacritics', './data/select', './data/array', './data/ajax', './data/tags', './data/tokenizer', './data/minimumInputLength', './data/maximumInputLength', './data/maximumSelectionLength', './dropdown', './dropdown/search', './dropdown/hidePlaceholder', './dropdown/infiniteScroll', './dropdown/attachBody', './dropdown/minimumResultsForSearch', './dropdown/selectOnClose', './dropdown/closeOnSelect', './i18n/en'], function($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
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
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
                    }

                    if (options.maximumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
                    }

                    if (options.maximumSelectionLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
                    }

                    if (options.tags) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                    }

                    if (options.tokenSeparators != null || options.tokenizer != null) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
                    }

                    if (options.query != null) {
                        var Query = require(options.amdBase + 'compat/query');

                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
                    }

                    if (options.initSelection != null) {
                        var InitSelection = require(options.amdBase + 'compat/initSelection');

                        options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
                    }
                }

                if (options.resultsAdapter == null) {
                    options.resultsAdapter = ResultsList;

                    if (options.ajax != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
                    }

                    if (options.placeholder != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
                    }

                    if (options.selectOnClose) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
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
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
                    }

                    if (options.closeOnSelect) {
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
                    }

                    if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
                        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
                    }

                    options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
                }

                if (options.selectionAdapter == null) {
                    if (options.multiple) {
                        options.selectionAdapter = MultipleSelection;
                    } else {
                        options.selectionAdapter = SingleSelection;
                    } // Add the placeholder mixin if a placeholder was specified


                    if (options.placeholder != null) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
                    }

                    if (options.allowClear) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
                    }

                    if (options.multiple) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
                    }

                    if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
                        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
                    }

                    options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
                }

                if (typeof options.language === 'string') {
                    // Check if the language is specified with a region
                    if (options.language.indexOf('-') > 0) {
                        // Extract the region information if it is included
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
                            // Try to load it with the original name
                            language = Translation.loadPath(name);
                        } catch (e) {
                            try {
                                // If we couldn't load it, check if it wasn't the full path
                                name = this.defaults.amdLanguageBase + name;
                                language = Translation.loadPath(name);
                            } catch (ex) {
                                // The translation could not be loaded at all. Sometimes this is
                                // because of a configuration problem, other times this can be
                                // because of how Select2 helps load all possible translation files.
                                if (options.debug && window.console && console.warn) {
                                    console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');
                                }

                                continue;
                            }
                        }

                        languages.extend(language);
                    }

                    options.translations = languages;
                } else {
                    var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + 'en');
                    var customTranslation = new Translation(options.language);
                    customTranslation.extend(baseTranslation);
                    options.translations = customTranslation;
                }

                return options;
            };

            Defaults.prototype.reset = function() {
                function stripDiacritics(text) {
                    // Used 'uni range + named function' from http://jsperf.com/diacritics/18
                    function match(a) {
                        return DIACRITICS[a] || a;
                    }

                    return text.replace(/[^\u0000-\u007E]/g, match);
                }

                function matcher(params, data) {
                    // Always return the object if there is nothing to compare
                    if ($.trim(params.term) === '') {
                        return data;
                    } // Do a recursive check for options with children


                    if (data.children && data.children.length > 0) {
                        // Clone the data object if there are children
                        // This is required as we modify the object to remove any non-matches
                        var match = $.extend(true, {}, data); // Check each child of the option

                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            var matches = matcher(params, child); // If there wasn't a match, remove the object in the array

                            if (matches == null) {
                                match.children.splice(c, 1);
                            }
                        } // If any children matched, return the new object


                        if (match.children.length > 0) {
                            return match;
                        } // If there were no matching children, check just the plain object


                        return matcher(params, match);
                    }

                    var original = stripDiacritics(data.text).toUpperCase();
                    var term = stripDiacritics(params.term).toUpperCase(); // Check if the text contains the term

                    if (original.indexOf(term) > -1) {
                        return data;
                    } // If it doesn't contain the term, don't return anything


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
                    sorter: function sorter(data) {
                        return data;
                    },
                    templateResult: function templateResult(result) {
                        return result.text;
                    },
                    templateSelection: function templateSelection(selection) {
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
        S2.define('select2/options', ['require', 'jquery', './defaults', './utils'], function(require, $, Defaults, Utils) {
            function Options(options, $element) {
                this.options = options;

                if ($element != null) {
                    this.fromElement($element);
                }

                this.options = Defaults.apply(this.options);

                if ($element && $element.is('input')) {
                    var InputCompat = require(this.get('amdBase') + 'compat/inputData');

                    this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
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
                        console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');
                    }

                    Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
                    Utils.StoreData($e[0], 'tags', true);
                }

                if (Utils.GetData($e[0], 'ajaxUrl')) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');
                    }

                    $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
                    Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
                }

                var dataset = {}; // Prefer the element's `dataset` attribute if it exists
                // jQuery 1.x does not correctly handle data attributes with multiple dashes

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
        S2.define('select2/core', ['jquery', './options', './utils', './keys'], function($, Options, Utils, KEYS) {
            var Select2 = function Select2($element, options) {
                if (Utils.GetData($element[0], 'select2') != null) {
                    Utils.GetData($element[0], 'select2').destroy();
                }

                this.$element = $element;
                this.id = this._generateId($element);
                options = options || {};
                this.options = new Options(options, $element);

                Select2.__super__.constructor.call(this); // Set up the tabindex


                var tabindex = $element.attr('tabindex') || 0;
                Utils.StoreData($element[0], 'old-tabindex', tabindex);
                $element.attr('tabindex', '-1'); // Set up containers and adapters

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
                this.results.position(this.$results, this.$dropdown); // Bind events

                var self = this; // Bind the container to all of the adapters

                this._bindAdapters(); // Register any DOM event handlers


                this._registerDomEvents(); // Register any internal event handlers


                this._registerDataEvents();

                this._registerSelectionEvents();

                this._registerDropdownEvents();

                this._registerResultsEvents();

                this._registerEvents(); // Set the initial state


                this.dataAdapter.current(function(initialData) {
                    self.trigger('selection:update', {
                        data: initialData
                    });
                }); // Hide the original select

                $element.addClass('select2-hidden-accessible');
                $element.attr('aria-hidden', 'true'); // Synchronize any monitored attributes

                this._syncAttributes();

                Utils.StoreData($element[0], 'select2', this); // Ensure backwards compatibility with $element.data('select2').

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

                    if (typeof style !== 'string') {
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

                var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

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
                    this.$element[0].addEventListener('DOMAttrModified', self._syncA, false);
                    this.$element[0].addEventListener('DOMNodeInserted', self._syncS, false);
                    this.$element[0].addEventListener('DOMNodeRemoved', self._syncS, false);
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
                        if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
                            self.close();
                            evt.preventDefault();
                        } else if (key === KEYS.ENTER) {
                            self.trigger('results:select', {});
                            evt.preventDefault();
                        } else if (key === KEYS.SPACE && evt.ctrlKey) {
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
                        if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
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
                var self = this; // Ignore any mutation events raised for elements that aren't options or
                // optgroups. This handles the case when the select element is destroyed

                if (evt && evt.target && evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP') {
                    return;
                }

                if (!mutations) {
                    // If mutation events aren't supported, then we can only assume that the
                    // change affected the selections
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
                } // Only re-pull the data if we think there is a change


                if (changed) {
                    this.dataAdapter.current(function(currentData) {
                        self.trigger('selection:update', {
                            data: currentData
                        });
                    });
                }
            };
            /**
             * Override the trigger method to automatically trigger pre-events when
             * there are events that can be prevented.
             */


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
                // No need to re-trigger focus events if we are already focused
                if (this.hasFocus()) {
                    return;
                }

                this.$container.addClass('select2-container--focus');
                this.trigger('focus', {});
            };

            Select2.prototype.enable = function(args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');
                }

                if (args == null || args.length === 0) {
                    args = [true];
                }

                var disabled = !args[0];
                this.$element.prop('disabled', disabled);
            };

            Select2.prototype.data = function() {
                if (this.options.get('debug') && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');
                }

                var data = [];
                this.dataAdapter.current(function(currentData) {
                    data = currentData;
                });
                return data;
            };

            Select2.prototype.val = function(args) {
                if (this.options.get('debug') && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');
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
                    this.$element[0].removeEventListener('DOMAttrModified', this._syncA, false);
                    this.$element[0].removeEventListener('DOMNodeInserted', this._syncS, false);
                    this.$element[0].removeEventListener('DOMNodeRemoved', this._syncS, false);
                }

                this._syncA = null;
                this._syncS = null;
                this.$element.off('.select2');
                this.$element.attr('tabindex', Utils.GetData(this.$element[0], 'old-tabindex'));
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
                var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');
                $container.attr('dir', this.options.get('dir'));
                this.$container = $container;
                this.$container.addClass('select2-container--' + this.options.get('theme'));
                Utils.StoreData($container[0], 'element', this.$element);
                return $container;
            };

            return Select2;
        });
        S2.define('jquery-mousewheel', ['jquery'], function($) {
            // Used to shim jQuery.mousewheel for non-full builds.
            return $;
        });
        S2.define('jquery.select2', ['jquery', 'jquery-mousewheel', './select2/core', './select2/defaults', './select2/utils'], function($, _, Select2, Defaults, Utils) {
            if ($.fn.select2 == null) {
                // All methods that should return the element
                var thisMethods = ['open', 'close', 'destroy'];

                $.fn.select2 = function(options) {
                    options = options || {};

                    if (_typeof(options) === 'object') {
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
                                console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');
                            }

                            ret = instance[options].apply(instance, args);
                        }); // Check if we should be returning `this`

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
        }); // Return the AMD loader configuration so it can be used outside of this file

        return {
            define: S2.define,
            require: S2.require
        };
    }(); // Autoload the jQuery bindings
    // We know that all of the modules exist above this, so we're safe


    var select2 = S2.require('jquery.select2'); // Hold the AMD module references on the jQuery function that was just loaded
    // This allows Select2 to use the internal loader outside of this file, such
    // as in the language files.


    jQuery.fn.select2.amd = S2; // Return the Select2 instance for anyone who is importing it.

    return select2;
});
var exports = {};
"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

(function(window, factory) {
    var globalInstall = function globalInstall() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes) {
    'use strict';

    if (!window.addEventListener) {
        return;
    }

    var forEach = Array.prototype.forEach;
    var imageRatio, extend$, $;
    var regPicture = /^picture$/i;
    var aspectRatioAttr = 'data-aspectratio';
    var aspectRatioSel = 'img[' + aspectRatioAttr + ']';

    var _matchesMedia = function matchesMedia(media) {
        if (window.matchMedia) {
            _matchesMedia = function matchesMedia(media) {
                return !media || (matchMedia(media) || {}).matches;
            };
        } else if (window.Modernizr && Modernizr.mq) {
            return !media || Modernizr.mq(media);
        } else {
            return !media;
        }

        return _matchesMedia(media);
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
        _setupEvents: function _setupEvents() {
            var module = this;

            var addRemoveAspectRatio = function addRemoveAspectRatio(elem) {
                if (elem.naturalWidth < 36) {
                    module.addAspectRatio(elem, true);
                } else {
                    module.removeAspectRatio(elem, true);
                }
            };

            var onload = function onload() {
                module.processImages();
            };

            document.addEventListener('load', function(e) {
                if (e.target.getAttribute && e.target.getAttribute(aspectRatioAttr)) {
                    addRemoveAspectRatio(e.target);
                }
            }, true);
            addEventListener('resize', function() {
                var timer;

                var resize = function resize() {
                    forEach.call(module.ratioElems, addRemoveAspectRatio);
                };

                return function() {
                    clearTimeout(timer);
                    timer = setTimeout(resize, 99);
                };
            }());
            document.addEventListener('DOMContentLoaded', onload);
            addEventListener('load', onload);
        },
        processImages: function processImages(context) {
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
        getSelectedRatio: function getSelectedRatio(img) {
            var i, len, sources, customMedia, ratio;
            var parent = img.parentNode;

            if (parent && regPicture.test(parent.nodeName || '')) {
                sources = parent.getElementsByTagName('source');

                for (i = 0, len = sources.length; i < len; i++) {
                    customMedia = sources[i].getAttribute('data-media') || sources[i].getAttribute('media');

                    if (lazySizesConfig.customMedia[customMedia]) {
                        customMedia = lazySizesConfig.customMedia[customMedia];
                    }

                    if (_matchesMedia(customMedia)) {
                        ratio = sources[i].getAttribute(aspectRatioAttr);
                        break;
                    }
                }
            }

            return ratio || img.getAttribute(aspectRatioAttr) || '';
        },
        parseRatio: function() {
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
        }(),
        addAspectRatio: function addAspectRatio(img, notNew) {
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
                    img.style.height = width / ratio + 'px';
                } else {
                    img.style.width = height * ratio + 'px';
                }
            }
        },
        removeAspectRatio: function removeAspectRatio(img) {
            removeClass(img, 'lazyaspectratio');
            img.style.height = '';
            img.style.width = '';
            img.removeAttribute(aspectRatioAttr);
        }
    };

    extend$ = function extend$() {
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

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        module.exports = imageRatio;
    } else if (typeof define == 'function' && define.amd) {
        define(imageRatio);
    }
});

(function(window, factory) {
    var globalInstall = function globalInstall() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes) {
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

    var proxyWidth = function proxyWidth(elem) {
        var width = lazySizes.gW(elem, elem.parentNode);

        if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
            elem._lazysizesWidth = width;
        }

        return elem._lazysizesWidth;
    };

    var getBgSize = function getBgSize(elem) {
        var bgSize;
        bgSize = (getComputedStyle(elem) || {
            getPropertyValue: function getPropertyValue() {}
        }).getPropertyValue('background-size');

        if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
            bgSize = elem.style.backgroundSize;
        }

        return bgSize;
    };

    var setTypeOrMedia = function setTypeOrMedia(source, match) {
        if (match) {
            var typeMatch = match.match(regType);

            if (typeMatch && typeMatch[1]) {
                source.setAttribute('type', typeMatch[1]);
            } else {
                source.setAttribute('media', lazySizesConfig.customMedia[match] || match);
            }
        }
    };

    var createPicture = function createPicture(sets, elem, img) {
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

            if (match = set.match(regSource)) {
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

    var proxyLoad = function proxyLoad(e) {
        if (!e.target._lazybgset) {
            return;
        }

        var image = e.target;
        var elem = image._lazybgset;
        var bg = image.currentSrc || image.src;

        if (bg) {
            var event = lazySizes.fire(elem, 'bgsetproxy', {
                src: bg,
                useSrc: regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg
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
});

(function(window, factory) {
    var globalInstall = function globalInstall() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes) {
    'use strict';

    var slice = [].slice;
    var regBlurUp = /blur-up["']*\s*:\s*["']*(always|auto)/;
    var regType = /image\/(jpeg|png|gif|svg\+xml)/;
    var transSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    var matchesMedia = function matchesMedia(source) {
        var media = source.getAttribute('data-media') || source.getAttribute('media');
        var type = source.getAttribute('type');
        return (!type || regType.test(type)) && (!media || window.matchMedia(lazySizes.cfg.customMedia[media] || media).matches);
    };

    var getLowSrc = function getLowSrc(picture, img) {
        var sources = picture ? slice.call(picture.querySelectorAll('source, img')) : [img];
        var element = sources.find(function(src) {
            return src.getAttribute('data-lowsrc') && matchesMedia(src);
        });
        return element && element.getAttribute('data-lowsrc');
    };

    var createBlurup = function createBlurup(picture, img, src, blurUp) {
        var blurImg;
        var isBlurUpLoaded = false;
        var isForced = false;
        var start = blurUp == 'always' ? 0 : Date.now();
        var isState = 0;
        var parent = (picture || img).parentNode;

        var createBlurUpImg = function createBlurUpImg() {
            if (!src) {
                return;
            }

            var onloadBlurUp = function onloadBlurUp() {
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

        var remove = function remove() {
            if (blurImg) {
                lazySizes.rAF(function() {
                    try {
                        blurImg.parentNode.removeChild(blurImg);
                    } catch (er) {}

                    blurImg = null;
                });
            }
        };

        var setStateUp = function setStateUp(force) {
            isState++;
            isForced = force || isForced;

            if (force) {
                remove();
            } else if (isState > 1) {
                setTimeout(remove, 5000);
            }
        };

        var onload = function onload() {
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

        var parentUnveil = function parentUnveil(e) {
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
});

(function(window, factory) {
    var globalInstall = function globalInstall(initialEvent) {
        factory(window.lazySizes, initialEvent);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes, initialEvent) {
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
        '50% 50%': 'center'
    };

    function getObject(element) {
        var css = getComputedStyle(element, null) || {};
        var content = css.fontFamily || '';
        var objectFit = content.match(regCssFit) || '';
        var objectPosition = objectFit && content.match(regCssPosition) || '';

        if (objectPosition) {
            objectPosition = objectPosition[1];
        }

        return {
            fit: objectFit && objectFit[1] || '',
            position: positionDefaults[objectPosition] || objectPosition || 'center'
        };
    }

    function initFix(element, config) {
        var switchClassesAdded, addedSrc;
        var lazysizesCfg = lazySizes.cfg;
        var styleElement = element.cloneNode(false);
        var styleElementStyle = styleElement.style;

        var onChange = function onChange() {
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

        var rafedOnChange = function rafedOnChange() {
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
        var onRead = function onRead(e) {
            if (e.detail.instance != lazySizes) {
                return;
            }

            var element = e.target;
            var obj = getObject(element);

            if (obj.fit && (!fitSupport || obj.position != 'center')) {
                initFix(element, obj);
            }
        };

        window.addEventListener('lazyunveilread', onRead, true);

        if (initialEvent && initialEvent.detail) {
            onRead(initialEvent);
        }
    }
});

(function(window, factory) {
    var globalInstall = function globalInstall() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes) {
    'use strict';

    if (!window.addEventListener) {
        return;
    }

    var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
    var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
    var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
    var regPicture = /^picture$/i;

    var getCSS = function getCSS(elem) {
        return getComputedStyle(elem, null) || {};
    };

    var parentFit = {
        getParent: function getParent(element, parentSel) {
            var parent = element;
            var parentNode = element.parentNode;

            if ((!parentSel || parentSel == 'prev') && parentNode && regPicture.test(parentNode.nodeName || '')) {
                parentNode = parentNode.parentNode;
            }

            if (parentSel != 'self') {
                if (parentSel == 'prev') {
                    parent = element.previousElementSibling;
                } else if (parentSel && (parentNode.closest || window.jQuery)) {
                    parent = (parentNode.closest ? parentNode.closest(parentSel) : jQuery(parentNode).closest(parentSel)[0]) || parentNode;
                } else {
                    parent = parentNode;
                }
            }

            return parent;
        },
        getFit: function getFit(element) {
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
        getImageRatio: function getImageRatio(element) {
            var i, srcset, media, ratio, match;
            var parent = element.parentNode;
            var elements = parent && regPicture.test(parent.nodeName || '') ? parent.querySelectorAll('source, img') : [element];

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
        calculateSize: function calculateSize(element, width) {
            var displayRatio, height, imageRatio, retWidth;
            var fitObj = this.getFit(element);
            var fit = fitObj.fit;
            var fitElem = fitObj.parent;

            if (fit != 'width' && (fit != 'contain' && fit != 'cover' || !(imageRatio = this.getImageRatio(element)))) {
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

                if (height > 40 && (displayRatio = width / height) && (fit == 'cover' && displayRatio < imageRatio || fit == 'contain' && displayRatio > imageRatio)) {
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
});
/*
This lazysizes plugin optimizes perceived performance by adding better support for rendering progressive JPGs/PNGs in conjunction with the LQIP pattern.
*/


(function(window, factory) {
    var globalInstall = function globalInstall() {
        factory(window.lazySizes);
        window.removeEventListener('lazyunveilread', globalInstall, true);
    };

    factory = factory.bind(null, window, window.document);

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        factory(require('lazysizes'));
    } else if (window.lazySizes) {
        globalInstall();
    } else {
        window.addEventListener('lazyunveilread', globalInstall, true);
    }
})(window, function(window, document, lazySizes) {
    /*jshint eqnull:true */
    'use strict';

    var regImg, _onLoad;

    if ('srcset' in document.createElement('img')) {
        regImg = /^img$/i;

        _onLoad = function onLoad(e) {
            e.target.style.backgroundSize = '';
            e.target.style.backgroundImage = '';
            e.target.removeEventListener(e.type, _onLoad);
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
                img.addEventListener('load', _onLoad);
            }
        }, false);
    }
});

(function(window, factory) {
    var lazySizes = factory(window, window.document);
    window.lazySizes = lazySizes;

    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
        module.exports = lazySizes;
    }
})(window, function l(window, document) {
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

    var hasClass = function hasClass(ele, cls) {
        if (!regClassCache[cls]) {
            regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        }

        return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
    };

    var addClass = function addClass(ele, cls) {
        if (!hasClass(ele, cls)) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
        }
    };

    var removeClass = function removeClass(ele, cls) {
        var reg;

        if (reg = hasClass(ele, cls)) {
            ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
        }
    };

    var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
        var action = add ? _addEventListener : 'removeEventListener';

        if (add) {
            addRemoveLoadEvents(dom, fn);
        }

        loadEvents.forEach(function(evt) {
            dom[action](evt, fn);
        });
    };

    var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
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

    var updatePolyfill = function updatePolyfill(el, full) {
        var polyfill;

        if (!supportPicture && (polyfill = window.picturefill || lazySizesConfig.pf)) {
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

    var getCSS = function getCSS(elem, style) {
        return (getComputedStyle(elem, null) || {})[style];
    };

    var getWidth = function getWidth(elem, parent, width) {
        width = width || elem.offsetWidth;

        while (width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth) {
            width = parent.offsetWidth;
            parent = parent.parentNode;
        }

        return width;
    };

    var rAF = function() {
        var running, waiting;
        var firstFns = [];
        var secondFns = [];
        var fns = firstFns;

        var run = function run() {
            var runFns = fns;
            fns = firstFns.length ? secondFns : firstFns;
            running = true;
            waiting = false;

            while (runFns.length) {
                runFns.shift()();
            }

            running = false;
        };

        var rafBatch = function rafBatch(fn, queue) {
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
    }();

    var rAFIt = function rAFIt(fn, simple) {
        return simple ? function() {
            rAF(fn);
        } : function() {
            var that = this;
            var args = arguments;
            rAF(function() {
                fn.apply(that, args);
            });
        };
    };

    var throttle = function throttle(fn) {
        var running;
        var lastTime = 0;
        var gDelay = lazySizesConfig.throttleDelay;
        var rICTimeout = lazySizesConfig.ricTimeout;

        var run = function run() {
            running = false;
            lastTime = Date.now();
            fn();
        };

        var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
            requestIdleCallback(run, {
                timeout: rICTimeout
            });

            if (rICTimeout !== lazySizesConfig.ricTimeout) {
                rICTimeout = lazySizesConfig.ricTimeout;
            }
        } : rAFIt(function() {
            setTimeout(run);
        }, true);
        return function(isPriority) {
            var delay;

            if (isPriority = isPriority === true) {
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
    }; //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html


    var debounce = function debounce(func) {
        var timeout, timestamp;
        var wait = 99;

        var run = function run() {
            timeout = null;
            func();
        };

        var later = function later() {
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
            throttleDelay: 125
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

    var loader = function() {
        var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
        var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
        var regImg = /^img$/i;
        var regIframe = /^iframe$/i;
        var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
        var shrinkExpand = 0;
        var currentExpand = 0;
        var isLoading = 0;
        var lowRuns = -1;

        var resetPreloading = function resetPreloading(e) {
            isLoading--;

            if (!e || isLoading < 0 || !e.target) {
                isLoading = 0;
            }
        };

        var isVisible = function isVisible(elem) {
            if (isBodyHidden == null) {
                isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
            }

            return isBodyHidden || getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden';
        };

        var isNestedVisible = function isNestedVisible(elem, elemExpand) {
            var outerRect;
            var parent = elem;
            var visible = isVisible(elem);
            eLtop -= elemExpand;
            eLbottom += elemExpand;
            eLleft -= elemExpand;
            eLright += elemExpand;

            while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
                visible = (getCSS(parent, 'opacity') || 1) > 0;

                if (visible && getCSS(parent, 'overflow') != 'visible') {
                    outerRect = parent.getBoundingClientRect();
                    visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
            }

            return visible;
        };

        var checkElements = function checkElements() {
            var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
            var lazyloadElems = lazysizes.elements;

            if ((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i = 0;
                lowRuns++;
                defaultExpand = !lazySizesConfig.expand || lazySizesConfig.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesConfig.expand;
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
                        eLvW = innerWidth + elemExpand * hFac;
                        elvH = innerHeight + elemExpand;
                        elemNegativeExpand = elemExpand * -1;
                        beforeExpandVal = elemExpand;
                    }

                    rect = lazyloadElems[i].getBoundingClientRect();

                    if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesConfig.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
                        unveilElement(lazyloadElems[i]);
                        loadedSomething = true;

                        if (isLoading > 9) {
                            break;
                        }
                    } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesConfig.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto'))) {
                        autoLoadElem = preloadElems[0] || lazyloadElems[i];
                    }
                }

                if (autoLoadElem && !loadedSomething) {
                    unveilElement(autoLoadElem);
                }
            }
        };

        var throttledCheckElements = throttle(checkElements);

        var switchLoadingClass = function switchLoadingClass(e) {
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

        var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
            rafedSwitchLoadingClass({
                target: e.target
            });
        };

        var changeIframeSrc = function changeIframeSrc(elem, src) {
            try {
                elem.contentWindow.location.replace(src);
            } catch (e) {
                elem.src = src;
            }
        };

        var handleSources = function handleSources(source) {
            var customMedia;

            var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

            if (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
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

                firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
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
                if (!firesLoad || elem.complete && elem.naturalWidth > 1) {
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

        var unveilElement = function unveilElement(elem) {
            var detail;
            var isImg = regImg.test(elem.nodeName); //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")

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

        var onload = function onload() {
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
            _: function _() {
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

                addEventListener('hashchange', throttledCheckElements, true); //, 'fullscreenchange'

                ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name) {
                    document[_addEventListener](name, throttledCheckElements, true);
                });

                if (/d$|^c/.test(document.readyState)) {
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
    }();

    var autoSizer = function() {
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

        var getSizeElement = function getSizeElement(elem, dataAttr, width) {
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

        var updateElementsSizes = function updateElementsSizes() {
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
            _: function _() {
                autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
                addEventListener('resize', debouncedUpdateElementsSizes);
            },
            checkElems: debouncedUpdateElementsSizes,
            updateElem: getSizeElement
        };
    }();

    var init = function init() {
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
        rAF: rAF
    };
    return lazysizes;
});
//# sourceMappingURL=maat-vendor.js.map
//# sourceMappingURL=maat-vendor.js.map