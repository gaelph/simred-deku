"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Simred = _interopRequireWildcard(require("simred"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _require = require('deku'),
    element = _require.element;

var _renderTimer = null;

var _lastRender = performance.now();

var _timeToRender = 1000;

var onStateUpdate = function onStateUpdate(Component, render) {
  return function (state) {
    var now = performance.now();

    if (_lastRender - now < _timeToRender) {
      if (_renderTimer) cancelAnimationFrame(_renderTimer);
      _renderTimer = requestAnimationFrame(function () {
        try {
          console.log('render after state update');
          var before = performance.now();
          render(element(Component, null), {});
          _timeToRender = before - performance.now();
          _lastRender = now;
        } catch (e) {
          console.error(e);
        }
      });
    }
  };
};

var _default = {
  render: function render(_ref) {
    var props = _ref.props,
        children = _ref.children;
    var store = props.store,
        render = props.render;

    if (children.length !== 1) {
      throw new Error('Provider must have exactly one child');
    }

    var App = children[0];
    store.subscribe(onStateUpdate(App, render));
    return children;
  }
};
exports.default = _default;