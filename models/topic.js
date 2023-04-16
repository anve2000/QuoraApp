const mongoose = require('mongoose');



const topicSchema = new mongoose.Schema({
    ind:Number,
    name:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

const Topic = mongoose.model('Topic',topicSchema);
module.exports = Topic;