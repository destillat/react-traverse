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

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var _global = global,
  describe = _global.describe,
  it = _global.it;

describe('wrapRender', function() {
  function wrapFoo(node) {
    return (0, _2.default)(node, {
      DOMElement: function DOMElement(path) {
        var nextProps = Object.assign({}, path.node.props);
        if (nextProps.className === 'foo') {
          nextProps.className = nextProps.className + ' foo-wrapped';
        }
        return _react2.default.cloneElement.apply(
          _react2.default,
          [path.node, nextProps].concat(
            _toConsumableArray(path.traverseChildren()),
          ),
        );
      },
    });
  }

  it('wraps stateless components', function() {
    function Foo() {
      return _react2.default.createElement(
        'div',
        { className: 'foo' },
        _react2.default.createElement('span', null, 'foo'),
      );
    }

    var WrappedFoo = (0, _.wrapRender)(wrapFoo)(Foo);

    var actual = _react2.default.createElement(WrappedFoo, null);
    var expected = _react2.default.createElement(
      'div',
      { className: 'foo foo-wrapped' },
      _react2.default.createElement('span', null, 'foo'),
    );
    (0, _asFunction2.default)(
      _server2.default.renderToStaticMarkup(actual),
    ).be.exactly(_server2.default.renderToStaticMarkup(expected));
  });

  it('wraps stateful components', function() {
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
              { className: 'foo' },
              _react2.default.createElement('span', null, 'foo'),
            );
          },
        },
      ]);

      return Foo;
    })(_react2.default.Component);

    var WrappedFoo = (0, _.wrapRender)(wrapFoo)(Foo);

    var actual = _react2.default.createElement(WrappedFoo, null);
    var expected = _react2.default.createElement(
      'div',
      { className: 'foo foo-wrapped' },
      _react2.default.createElement('span', null, 'foo'),
    );
    (0, _asFunction2.default)(
      _server2.default.renderToStaticMarkup(actual),
    ).be.exactly(_server2.default.renderToStaticMarkup(expected));
  });

  it('decorates stateful components', function() {
    var _dec, _class;

    var WrappedFoo = (
      (_dec = (0, _.wrapRender)(wrapFoo)),
      _dec(
        (_class = (function(_React$Component2) {
          _inherits(WrappedFoo, _React$Component2);

          function WrappedFoo() {
            _classCallCheck(this, WrappedFoo);

            return _possibleConstructorReturn(
              this,
              (WrappedFoo.__proto__ || Object.getPrototypeOf(WrappedFoo))
                .apply(this, arguments),
            );
          }

          _createClass(WrappedFoo, [
            {
              key: 'render',
              value: function render() {
                return _react2.default.createElement(
                  'div',
                  { className: 'foo' },
                  _react2.default.createElement('span', null, 'foo'),
                );
              },
            },
          ]);

          return WrappedFoo;
        })(_react2.default.Component)),
      ) || _class
    );

    var actual = _react2.default.createElement(WrappedFoo, null);
    var expected = _react2.default.createElement(
      'div',
      { className: 'foo foo-wrapped' },
      _react2.default.createElement('span', null, 'foo'),
    );
    (0, _asFunction2.default)(
      _server2.default.renderToStaticMarkup(actual),
    ).be.exactly(_server2.default.renderToStaticMarkup(expected));
  });
});
