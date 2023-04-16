const mongoose = require('mongoose');

// passport req

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        trim:true,
        required:true
    },
    toi:[
        {
            type:String
        }
    ],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

const User = mongoose.model('User',userSchema);

module.export = User;