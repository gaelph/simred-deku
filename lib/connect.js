"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var Simred = _interopRequireWildcard(require("simred"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _require = require('deku'),
    element = _require.element;

var connect = function connect(stateToProps, actionsToProps) {
  return function (Component) {
    return Object.assign({}, Component, {
      render: function render(_ref) {
        var props = _ref.props,
            children = _ref.children;
        children = children || [];
        var state = Simred.getState();
        var actions = Simred.getActions();
        props = Object.assign(props, stateToProps(state), actionsToProps(actions));
        return element(Component, props, " ", children, " ");
      }
    });
  };
};

exports.connect = connect;