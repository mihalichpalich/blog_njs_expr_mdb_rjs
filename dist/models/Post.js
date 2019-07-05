'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//{ Schema } - схема для описания труктуры таблицы

var PostSchema = new _mongoose.Schema({
	title: String,
	text: String
}, {
	timestamps: true //добавление даты
}); //схема для модели

var Post = _mongoose2.default.model('Post', PostSchema);

exports.default = Post;