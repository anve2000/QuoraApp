const mongoose = require('mongoose');
const Answer = require('./models/answer');

//Do this :- to avoid seedDB function call and directly insert here
mongoose.connect('mongodb://127.0.0.1:27017/quoraApp').then(()=>console.log('connected database')).catch((err)=>{
    console.log(err);
})


const answers = [
    {
        content:"Take an existing business that has lots of users, and make whatever process they have even easier to use to accomplish the same goal. The less steps to accomplish the same task the better. People want convenience at it's easiest. If you can make it to where you press ONE button, and magic happens, then you will be rich. A good example is a company called 'Uber'.",
        img:"https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
        topic:2,
        upV:0,
        downV:0
    },
    {
        content:"Take an existing business that has lots of users, and make whatever process they have even easier to use to accomplish the same goal. The less steps to accomplish the same task the better. People want convenience at it's easiest. If you can make it to where you press ONE button, and magic happens, then you will be rich. A good example is a company called 'Uber'.",
        img:"https://images.unsplash.com/photo-1459257831348-f0cdd359235f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1vbmV5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
        topic:2,
        upV:0,
        downV:0
    },
];


Answer.insertMany(answers)
.then(()=>{
    console.log('Answer Seeded');
});

// function seedDB //<-- either make function