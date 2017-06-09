'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _asFunction = require('should/as-function');

var _asFunction2 = _interopRequireDefault(_asFunction);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _global = global,
    describe = _global.describe,
    it = _global.it;


describe('isStatelessComponent', function () {
  function RegularFunctionComponent() {
    return _react2.default.createElement('div', null);
  }

  var ArrowFunctionComponent = function ArrowFunctionComponent() {
    return _react2.default.createElement('div', null);
  };

  var ClassComponent = function (_React$Component) {
    _inherits(ClassComponent, _React$Component);

    function ClassComponent() {
      _classCallCheck(this, ClassComponent);

      return _possibleConstructorReturn(this, (ClassComponent.__proto__ || Object.getPrototypeOf(ClassComponent)).apply(this, arguments));
    }

    _createClass(ClassComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('div', null);
      }
    }]);

    return ClassComponent;
  }(_react2.default.Component);

  it('detects regular functions as stateless components', function () {
    var _ref = _react2.default.createElement(RegularFunctionComponent, null),
        type = _ref.type;

    (0, _asFunction2.default)((0, _.isStatelessComponent)(type)).be.exactly(true);
  });

  it('detects arrow functions as stateless components', function () {
    var _ref2 = _react2.default.createElement(ArrowFunctionComponent, null),
        type = _ref2.type;

    (0, _asFunction2.default)((0, _.isStatelessComponent)(type)).be.exactly(true);
  });

  it('detects classes extending React.Component as stateful components', function () {
    var _ref3 = _react2.default.createElement(ClassComponent, null),
        type = _ref3.type;

    (0, _asFunction2.default)((0, _.isStatelessComponent)(type)).be.exactly(false);
  });
});