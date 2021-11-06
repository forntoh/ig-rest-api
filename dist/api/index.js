"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = require("./connection");

var _utils = require("./utils.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class IG {
  constructor(apiKey, isDemo, options) {
    this.api = (0, _connection.create)(apiKey, isDemo);
    this.defaults = Object.assign({
      transformResponse: _utils.transformResponse,
      transformError: _utils.transformError
    }, options);
  }

  request(method, path, version, config, options) {
    var transformRes = (0, _utils.getOption)("transformResponse", options, this.defaults);
    var transformErr = (0, _utils.getOption)("transformError", options, this.defaults);
    var request = this.api.request(Object.assign({}, config, {
      method,
      url: path,
      headers: {
        Version: version || 1
      }
    }));
    if ((0, _utils.isFunction)(transformRes)) request = request.then(transformRes);
    if ((0, _utils.isFunction)(transformErr)) request = request.catch(transformErr);
    return request;
  }

  get(path, version, params, options) {
    return this.request("get", path, version, {
      params
    }, options);
  }

  post(path, version, data, options) {
    return this.request("post", path, version, {
      data
    }, options);
  }

  put(path, version, data, options) {
    return this.request("put", path, version, {
      data
    }, options);
  }

  delete(path, version, data, options) {
    return this.request("delete", path, version, {
      data
    }, options);
  }

  login(username, password, options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var processPassword = Promise.resolve(password);
      return processPassword.then(result => {
        return _this.post("session", 2, {
          identifier: username,
          password: result
        }, {
          transformResponse: false
        }).then(response => {
          (0, _connection.setHeaderTokens)(_this.api, response);
          var transformRes = (0, _utils.getOption)("transformResponse", options, _this.defaults);
          return (0, _utils.isFunction)(transformRes) ? transformRes(response) : response;
        });
      });
    })();
  }

  logout(options) {
    return this.delete("session", 1, null, options);
  }

}

exports.default = IG;

_defineProperty(IG, "transformResponse", _utils.transformResponse);

_defineProperty(IG, "transformError", _utils.transformError);

_defineProperty(IG, "uniqueId", _utils.uniqueId);