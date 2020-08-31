const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: String,
    tags: Array,
    imageURL: String,
    body: String,
    createdAt: {type: Date, default: Date.now()},
    author: String,
    views: {type: Number, default: 0},
    isPublic: Boolean
});

const Post = mongoose.model('Post', postSchema)

module.exports = Post