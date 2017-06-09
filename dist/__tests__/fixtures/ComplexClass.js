'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _autobind = require('./autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function Base(v) {
  _classCallCheck(this, Base);

  this.v = v;
};

function multiply(by) {
  return function $multiply(target, name, descriptor) {
    return Object.assign({}, descriptor, {
      value: function value() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return by * Reflect.apply(descriptor.value, this, args);
      }
    });
  };
}

var FIVE = 5;
var SEVEN = 7;

var Complex = (_dec = multiply(SEVEN), _dec2 = multiply(1 / SEVEN), (0, _autobind2.default)(_class = (_class2 = function (_Base) {
  _inherits(Complex, _Base);

  function Complex() {
    _classCallCheck(this, Complex);

    return _possibleConstructorReturn(this, (Complex.__proto__ || Object.getPrototypeOf(Complex)).apply(this, arguments));
  }

  _createClass(Complex, [{
    key: 'multiplyByFortyFive',
    value: function multiplyByFortyFive() {
      return SEVEN * this.constructor.multiplyByFortyFive(this.v);
    }
  }], [{
    key: 'multiplyByFortyFive',
    value: function multiplyByFortyFive(v) {
      return FIVE * v;
    }
  }]);

  return Complex;
}(Base), (_applyDecoratedDescriptor(_class2, 'multiplyByFortyFive', [_dec], Object.getOwnPropertyDescriptor(_class2, 'multiplyByFortyFive'), _class2), _applyDecoratedDescriptor(_class2.prototype, 'multiplyByFortyFive', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'multiplyByFortyFive'), _class2.prototype)), _class2)) || _class);


var x = Complex;

exports.default = x;