const mongoose = require('mongoose');
const Post = require('./models/post');

//Do this :- to avoid seedDB function call and directly insert here
mongoose.connect('mongodb://127.0.0.1:27017/quoraApp').then(()=>console.log('connected database')).catch((err)=>{
    console.log(err);
})


const posts = [
    {
        question:"How do I make money?",
        answer:["643806945fa1c7f2168bddb6","643806945fa1c7f2168bddb7"],
        topic:0,
    },
];


Post.insertMany(posts)
.then(()=>{
    console.log('Posts Seeded');
});

// function seedDB //<-- either make function