const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content:{
        type:String
    },
    img:{
        type:String
    },
    // questionid: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Post'
    // },
    topic: {
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
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;