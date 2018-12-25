'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _simred = require('simred');

var Simred = _interopRequireWildcard(_simred);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _require = require('deku'),
    createApp = _require.createApp,
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
          console.log('render after state update', Component);
          var before = performance.now();

          render(Component, {});

          _timeToRender = before - performance.now();
          _lastRender = now;
        } catch (e) {
          console.error(e);
        }
      });
    }
  };
};

var render = exports.render = function render(App, store, rootElement) {
  var renderer = createApp(rootElement, {});
  renderer(App, {});

  store.subscribe(onStateUpdate(App, renderer));
};