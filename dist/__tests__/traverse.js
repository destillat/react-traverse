'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _asFunction = require('should/as-function');

var _asFunction2 = _interopRequireDefault(_asFunction);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var _global = global,
  describe = _global.describe,
  it = _global.it;

describe('traverse', function() {
  it('capitalize all text', function() {
    var Foo = (function(_React$Component) {
      _inherits(Foo, _React$Component);

      function Foo() {
        _classCallCheck(this, Foo);

        return _possibleConstructorReturn(
          this,
          (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments),
        );
      }

      _createClass(Foo, [
        {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('span', null, 'Foo:'),
              _react2.default.createElement('span', null, this.props.children),
            );
          },
        },
      ]);

      return Foo;
    })(_react2.default.Component);

    function Bar(props) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('span', null, 'Bar:'),
        _react2.default.createElement('span', null, props.children),
      );
    }
    Bar.propTypes = {
      children: _propTypes2.default.node,
    };
    var original = _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement('li', null, 'foo'),
      _react2.default.createElement('li', null, 'Bar'),
      _react2.default.createElement('li', null, 'BAZ'),
      _react2.default.createElement('li', null, 'buZZ'),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(Foo, null, 'bazZ'),
        _react2.default.createElement(Bar, null, 'fozZ'),
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement('div', null, 1),
      ),
    );
    var traversed = (0, _2.default)(original, {
      Text: function Text(path) {
        if (typeof path.node === 'string') {
          return path.node.toUpperCase();
        }
        return path.node;
      },
    });
    var expected = _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement('li', null, 'FOO'),
      _react2.default.createElement('li', null, 'BAR'),
      _react2.default.createElement('li', null, 'BAZ'),
      _react2.default.createElement('li', null, 'BUZZ'),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('span', null, 'Foo:'),
          _react2.default.createElement('span', null, 'BAZZ'),
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('span', null, 'Bar:'),
          _react2.default.createElement('span', null, 'FOZZ'),
        ),
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement('div', null, 1),
      ),
    );
    (0, _asFunction2.default)(
      _server2.default.renderToStaticMarkup(traversed),
    ).be.exactly(_server2.default.renderToStaticMarkup(expected));
  });
});
