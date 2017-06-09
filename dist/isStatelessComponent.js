'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = isStatelessComponent;
function isStatelessComponent(type) {
  return (
    typeof type.prototype === 'undefined' ||
    typeof type.prototype.render !== 'function'
  );
}
