"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getOption = getOption;
exports.isUndefined = exports.isFunction = void 0;
exports.transformError = transformError;
exports.transformResponse = transformResponse;
exports.uniqueId = uniqueId;

var _rambda = require("rambda");

var _error = _interopRequireDefault(require("./error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var isFunction = (0, _rambda.pipe)(_rambda.type, (0, _rambda.equals)("Function"));
exports.isFunction = isFunction;
var isUndefined = (0, _rambda.pipe)(_rambda.type, (0, _rambda.equals)("Undefined"));
exports.isUndefined = isUndefined;

function get(inputObject, inputPath, defaultValue) {
  var inputValue = (0, _rambda.path)(inputPath, inputObject);
  return isUndefined(inputValue) ? defaultValue : inputValue;
}

function getOption(key, options, defaults) {
  return get(options, key, (0, _rambda.path)(key, defaults));
}

function transformResponse(response) {
  return (0, _rambda.path)("data", response);
}

function transformError(error) {
  throw (0, _error.default)(error);
}

function uniqueId() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CHARS;
  var i,
      result = "";

  for (i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}