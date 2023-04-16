const mongoose = require('mongoose');
const Topic = require('./models/topic');


const topics = ["Science","Entertainment","Money","Mythology"];

mongoose.connect('mongodb://127.0.0.1:27017/quoraApp').then(()=>console.log('connected database')).catch((err)=>{
    console.log(err);
})


const feedTopics =()=>{
    for (let step = 0; step < topics.length; step++) {
            Topic.create({
                ind:step,
                name:topics[step],
                post:[]
            }).then(()=>{
                console.log(topics[step],"  added");
            })
      }
}


feedTopics();
