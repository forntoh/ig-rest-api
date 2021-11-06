"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.setHeaderTokens = setHeaderTokens;

var _axios = _interopRequireDefault(require("axios"));

var _rambda = require("rambda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appToken = (0, _rambda.path)("headers.x-security-token");
var clientToken = (0, _rambda.path)("headers.cst");

function create(apiKey, isDemo) {
  return _axios.default.create({
    baseURL: "https://".concat(isDemo ? "demo-" : "", "api.ig.com/gateway/deal/"),
    headers: {
      Accept: "application/json; charset=UTF-8",
      "Content-Type": "application/json; charset=UTF-8",
      "X-IG-API-KEY": apiKey
    }
  });
}

function setHeaderTokens(instance, response) {
  instance.defaults.headers["X-SECURITY-TOKEN"] = appToken(response);
  instance.defaults.headers["CST"] = clientToken(response);
}