'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(req) {
    var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


    var header = req.request ? req.request.headers.authorization : req.connection.context.Authorization;

    if (header) {
        var token = header.replace('Bearer ', '');
        var decode = _jsonwebtoken2.default.verify(token, 'izwebishot!');
        return decode.userId;
    }

    if (requireAuth) {
        throw new Error('Authorization required');
    }

    return null;
};

exports.default = getUserId;