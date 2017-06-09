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

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

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

describe('transformComponents', function() {
  describe('replaces divs with spans', function() {
    function replaceDivsWithSpansInNode(node) {
      return (0, _2.default)(node, {
        DOMElement: function DOMElement(path) {
          if (path.node.type !== 'div') {
            return path.defaultTraverse();
          }
          return _react2.default.createElement.apply(
            _react2.default,
            ['span', path.node.props].concat(
              _toConsumableArray(path.traverseChildren()),
            ),
          );
        },
      });
    }

    var replaceDivsWithSpansInComponent = (0, _.wrapRender)(
      replaceDivsWithSpansInNode,
    );

    it('replaces in stateless components', function() {
      function Foo() {
        return _react2.default.createElement(
          'div',
          { className: 'foo' },
          _react2.default.createElement('span', null, 'foo'),
        );
      }

      var TransformedFoo = (0, _.transformComponents)(
        replaceDivsWithSpansInComponent,
      )(Foo);
      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', null, 'foo'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('replaces in stateful components', function() {
      var Foo = (function(_React$Component) {
        _inherits(Foo, _React$Component);

        function Foo() {
          _classCallCheck(this, Foo);

          return _possibleConstructorReturn(
            this,
            (Foo.__proto__ || Object.getPrototypeOf(Foo))
              .apply(this, arguments),
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

      var TransformedFoo = (0, _.transformComponents)(
        replaceDivsWithSpansInComponent,
      )(Foo);
      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', null, 'foo'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('replaces in nested stateless components', function() {
      function Bar() {
        return _react2.default.createElement(
          'div',
          { className: 'bar' },
          'bar',
        );
      }

      function Foo() {
        return _react2.default.createElement(
          'div',
          { className: 'foo' },
          _react2.default.createElement(Bar, null),
        );
      }

      var TransformedFoo = (0, _.transformComponents)(
        replaceDivsWithSpansInComponent,
      )(Foo);
      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', { className: 'bar' }, 'bar'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('replaces in nested stateful components', function() {
      var Bar = (function(_React$Component2) {
        _inherits(Bar, _React$Component2);

        function Bar() {
          _classCallCheck(this, Bar);

          return _possibleConstructorReturn(
            this,
            (Bar.__proto__ || Object.getPrototypeOf(Bar))
              .apply(this, arguments),
          );
        }

        _createClass(Bar, [
          {
            key: 'render',
            value: function render() {
              return _react2.default.createElement(
                'div',
                { className: 'bar' },
                'bar',
              );
            },
          },
        ]);

        return Bar;
      })(_react2.default.Component);

      var Foo = (function(_React$Component3) {
        _inherits(Foo, _React$Component3);

        function Foo() {
          _classCallCheck(this, Foo);

          return _possibleConstructorReturn(
            this,
            (Foo.__proto__ || Object.getPrototypeOf(Foo))
              .apply(this, arguments),
          );
        }

        _createClass(Foo, [
          {
            key: 'render',
            value: function render() {
              return _react2.default.createElement(
                'div',
                { className: 'foo' },
                _react2.default.createElement(Bar, null),
              );
            },
          },
        ]);

        return Foo;
      })(_react2.default.Component);

      var TransformedFoo = (0, _.transformComponents)(
        replaceDivsWithSpansInComponent,
      )(Foo);
      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', { className: 'bar' }, 'bar'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('replaces in nested mixed stateless and stateful components', function() {
      function Bar() {
        return _react2.default.createElement(
          'div',
          { className: 'bar' },
          'bar',
        );
      }

      var Foo = (function(_React$Component4) {
        _inherits(Foo, _React$Component4);

        function Foo() {
          _classCallCheck(this, Foo);

          return _possibleConstructorReturn(
            this,
            (Foo.__proto__ || Object.getPrototypeOf(Foo))
              .apply(this, arguments),
          );
        }

        _createClass(Foo, [
          {
            key: 'render',
            value: function render() {
              return _react2.default.createElement(
                'div',
                { className: 'foo' },
                _react2.default.createElement(Bar, null),
              );
            },
          },
        ]);

        return Foo;
      })(_react2.default.Component);

      var TransformedFoo = (0, _.transformComponents)(
        replaceDivsWithSpansInComponent,
      )(Foo);
      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', { className: 'bar' }, 'bar'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('replaces in complex components nested in a ReactElement', function() {
      function Bar() {
        return _react2.default.createElement(
          'div',
          { className: 'bar' },
          'bar',
        );
      }

      var Foo = (function(_React$Component5) {
        _inherits(Foo, _React$Component5);

        function Foo() {
          _classCallCheck(this, Foo);

          return _possibleConstructorReturn(
            this,
            (Foo.__proto__ || Object.getPrototypeOf(Foo))
              .apply(this, arguments),
          );
        }

        _createClass(Foo, [
          {
            key: 'render',
            value: function render() {
              return _react2.default.createElement(
                'div',
                { className: 'foo' },
                _react2.default.createElement(Bar, null),
              );
            },
          },
        ]);

        return Foo;
      })(_react2.default.Component);

      var actual = (0, _.transformComponents)(replaceDivsWithSpansInComponent)(
        _react2.default.createElement(
          'div',
          { className: 'wrapper' },
          _react2.default.createElement(Foo, null),
        ),
      );
      var expected = _react2.default.createElement(
        'span',
        { className: 'wrapper' },
        _react2.default.createElement(
          'span',
          { className: 'foo' },
          _react2.default.createElement('span', { className: 'bar' }, 'bar'),
        ),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });

    it('decorates mixed stateless and stateful components', function() {
      var _dec, _class;

      function Bar() {
        return _react2.default.createElement(
          'div',
          { className: 'bar' },
          'bar',
        );
      }

      var TransformedFoo = (
        (_dec = (0, _.transformComponents)(replaceDivsWithSpansInComponent)),
        _dec(
          (_class = (function(_React$Component6) {
            _inherits(TransformedFoo, _React$Component6);

            function TransformedFoo() {
              _classCallCheck(this, TransformedFoo);

              return _possibleConstructorReturn(
                this,
                (TransformedFoo.__proto__ ||
                  Object.getPrototypeOf(TransformedFoo))
                  .apply(this, arguments),
              );
            }

            _createClass(TransformedFoo, [
              {
                key: 'render',
                value: function render() {
                  return _react2.default.createElement(
                    'div',
                    { className: 'foo' },
                    _react2.default.createElement(Bar, null),
                  );
                },
              },
            ]);

            return TransformedFoo;
          })(_react2.default.Component)),
        ) || _class
      );

      var actual = _react2.default.createElement(TransformedFoo, null);
      var expected = _react2.default.createElement(
        'span',
        { className: 'foo' },
        _react2.default.createElement('span', { className: 'bar' }, 'bar'),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });
  });

  describe('hashes all classNames', function() {
    var HASH_LENGTH = 10;

    function hashClassName(hashKey) {
      return function(className) {
        return (0, _sha2.default)(className + ':' + hashKey).slice(
          0,
          HASH_LENGTH,
        );
      }; // eslint-disable-line new-cap
    }

    function hashAllClassNamesInNode(hashKey) {
      return function(node) {
        return (0, _2.default)(node, {
          DOMElement: function DOMElement(path) {
            if (typeof path.node.props.className !== 'string') {
              return path.defaultTraverse();
            }
            var nextProps = Object.assign({}, path.node.props);
            nextProps.className = path.node.props.className
              .split(' ')
              .map(hashClassName(hashKey))
              .join(' ');
            return _react2.default.cloneElement.apply(
              _react2.default,
              [path.node, nextProps].concat(
                _toConsumableArray(path.traverseChildren()),
              ),
            );
          },
        });
      };
    }

    function createTransformComponent(hashKey) {
      return (0, _.wrapRender)(hashAllClassNamesInNode(hashKey));
    }

    it('hashes all classNames correctly', function() {
      var _dec2, _class2;

      var hashKey = 'foobar';

      function Bar() {
        return _react2.default.createElement(
          'div',
          { className: 'bar' },
          'bar',
        );
      }

      var Foo = (
        (_dec2 = (0, _.transformComponents)(createTransformComponent(hashKey))),
        _dec2(
          (_class2 = (function(_React$Component7) {
            _inherits(Foo, _React$Component7);

            function Foo() {
              _classCallCheck(this, Foo);

              return _possibleConstructorReturn(
                this,
                (Foo.__proto__ || Object.getPrototypeOf(Foo))
                  .apply(this, arguments),
              );
            }

            _createClass(Foo, [
              {
                key: 'render',
                value: function render() {
                  return _react2.default.createElement(
                    'div',
                    { className: 'foo' },
                    _react2.default.createElement(
                      'span',
                      { className: 'foo-bar bar-foo' },
                      _react2.default.createElement(Bar, null),
                    ),
                  );
                },
              },
            ]);

            return Foo;
          })(_react2.default.Component)),
        ) || _class2
      );

      var actual = _react2.default.createElement(Foo, null);
      var expected = _react2.default.createElement(
        'div',
        { className: hashClassName(hashKey)('foo') },
        _react2.default.createElement(
          'span',
          {
            className:
              hashClassName(hashKey)('foo-bar') +
                ' ' +
                hashClassName(hashKey)('bar-foo'),
          },
          _react2.default.createElement(
            'div',
            { className: hashClassName(hashKey)('bar') },
            'bar',
          ),
        ),
      );
      (0, _asFunction2.default)(
        _server2.default.renderToStaticMarkup(actual),
      ).be.exactly(_server2.default.renderToStaticMarkup(expected));
    });
  });
});
