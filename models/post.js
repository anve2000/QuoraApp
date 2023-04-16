const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
        type: Number
    },
    followPost: {
        type: Number
    },
    upV:{
        type:Number,
        min:0
    },
    downV:{
        type:Number,
        min:0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;