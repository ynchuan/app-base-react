'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _index = require('./app/index.js');

var _index2 = _interopRequireDefault(_index);

var _routes = require('./routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// app core
// react


var appInstance = _react2.default.createElement(
    _reactRouter2.default.Route,
    { name: 'app', path: '/', handler: _index2.default },
    _routes2.default
);
// user routes


var Bootstrapper = {
    start: function start() {
        _reactRouter2.default.run(appInstance, _reactRouter2.default.HistoryLocation, function (Handler) {
            _react2.default.render(_react2.default.createElement(Handler, null), document.getElementById('mainContainer'));
        });
    }
};

exports.default = Bootstrapper;
