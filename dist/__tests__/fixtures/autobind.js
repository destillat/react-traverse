'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _typeof = typeof Symbol === 'function' &&
  typeof Symbol.iterator === 'symbol'
  ? function(obj) {
      return typeof obj;
    }
  : function(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };

exports.default = autobind;
/*
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */

/*
  * Return a descriptor removing the value and returning a getter
  * The getter will return a .bind version of the function
  * and memoize the result against a symbol on the instance
  */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error(
      '@autobind decorator can only be applied to methods not: ' +
        (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)),
    );
  }

  return {
    configurable: true,
    get: function get() {
      if (this === target.prototype) {
        return fn;
      }
      var boundFn = fn.bind(this);
      Reflect.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true,
      });
      return boundFn;
    },
  };
}

/*
  * Use boundMethod to bind all methods on the target.prototype
  */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = Reflect.ownKeys(target.prototype);

  keys.forEach(function(key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Reflect.defineProperty(
        target.prototype,
        key,
        boundMethod(target, key, descriptor),
      );
    }
  });
  return target;
}

function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(undefined, arguments);
  }
  return boundMethod.apply(undefined, arguments);
}
