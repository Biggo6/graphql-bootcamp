'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(password) {
    if (password.length < 8) {
        throw new Error('Password must be 9 characters or longer');
    }

    var hashPassword = _bcryptjs2.default.hash(apassword, 10);
    return hashPassword;
};

exports.default = hashPassword;