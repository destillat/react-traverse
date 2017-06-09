'use strict';

require('babel-polyfill');

var _asFunction = require('should/as-function');

var _asFunction2 = _interopRequireDefault(_asFunction);

var _ComplexClass = require('./fixtures/ComplexClass');

var _ComplexClass2 = _interopRequireDefault(_ComplexClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;


describe('sanity', function () {
  it('shouldjs should not extend Object.prototype', function () {
    return (0, _asFunction2.default)(Object.prototype).not.have.property('should');
  });
  it('Complex class transforms should work', function () {
    var TEN = 10;
    var THIRTYFIVE = 35;
    var inst = new _ComplexClass2.default(TEN);
    (0, _asFunction2.default)(inst).be.an.instanceOf(_ComplexClass2.default);
    (0, _asFunction2.default)(inst.v).be.exactly(TEN);
    var multiplyByFortyFive = inst.multiplyByFortyFive;
    (0, _asFunction2.default)(multiplyByFortyFive()).be.exactly(TEN * THIRTYFIVE);
    (0, _asFunction2.default)(_ComplexClass2.default.multiplyByFortyFive(TEN)).be.exactly(TEN * THIRTYFIVE);
  });
  it('should transform async functions properly', function () {
    var asyncFunc = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.resolve('foobar');

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function asyncFunc() {
        return _ref.apply(this, arguments);
      };
    }();

    return asyncFunc().then(function (result) {
      return (0, _asFunction2.default)(result).be.exactly('foobar');
    });
  });
});