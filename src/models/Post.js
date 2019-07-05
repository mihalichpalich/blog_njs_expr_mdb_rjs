import mongoose, { Schema } from 'mongoose'; //{ Schema } - схема для описания труктуры таблицы

const PostSchema = new Schema(
	{
	  title: String,
	  text: String
	},
	{
	  timestamps: true //добавление даты
	}
); //схема для модели

const Post = mongoose.model('Post', PostSchema);

export default Post;