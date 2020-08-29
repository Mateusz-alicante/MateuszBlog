const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5
    },
    description: String,
    tags: Array,
    imageURL: String,
    body: String,
    createdAt: {type: Date, default: Date.now()},
    author: String,
    views: {type: Number, default: 0}
});

const Post = mongoose.model('Post', postSchema)

module.exports = Post