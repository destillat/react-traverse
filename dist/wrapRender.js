'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = wrapRender;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isStatelessComponent = require('./isStatelessComponent');

var _isStatelessComponent2 = _interopRequireDefault(_isStatelessComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wrapRenderMemo = new WeakMap();
function wrapRender(transformNode) {
  if (!wrapRenderMemo.has(transformNode)) {
    wrapRenderMemo.set(transformNode, new WeakMap());
  }
  var memo = wrapRenderMemo.get(transformNode);
  return function (type) {
    if (!memo.has(type)) {
      memo.set(type, function () {
        if ((0, _isStatelessComponent2.default)(type)) {
          var klass = function (_React$Component) {
            _inherits(klass, _React$Component);

            function klass() {
              _classCallCheck(this, klass);

              return _possibleConstructorReturn(this, (klass.__proto__ || Object.getPrototypeOf(klass)).apply(this, arguments));
            }

            _createClass(klass, [{
              key: 'render',
              value: function render() {
                return transformNode(type(this.props));
              }
            }]);

            return klass;
          }(_react2.default.Component);

          klass.displayName = type.displayName || type.name;
          klass.propTypes = type.propTypes;
          return klass;
        }
        return function (_type) {
          _inherits(_class, _type);

          function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
          }

          _createClass(_class, [{
            key: 'render',
            value: function render() {
              return transformNode(_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this));
            }
          }]);

          return _class;
        }(type);
      }());
    }
    return memo.get(type);
  };
}