'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _simred = require('simred');

var Simred = _interopRequireWildcard(_simred);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _require = require('deku'),
    element = _require.element;

var connect = exports.connect = function connect(stateToProps, actionsToProps) {
  return function (Component) {
    return Object.assign({}, Component, {
      render: function render(_ref) {
        var props = _ref.props,
            children = _ref.children;

        children = children || [];
        var state = Simred.getState();
        var actions = Simred.getActions();
        props = Object.assign(props, stateToProps(state, props), actionsToProps(actions, props));

        return element(
          Component,
          props,
          ' ',
          children,
          ' '
        );
      }
    });
  };
};