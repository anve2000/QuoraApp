const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.engine('ejs', ejsMate);

//session stuff *****************************************
// const {flashVar} = require('./middleware');
const flash = require('connect-flash');

const sessionConfig = {
    secret: "thisisasecret",
    resave: 'false',
    saveUnitialised: true
}

app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash())
app.use((req, res, next) => {
    console.log(req.session.id);
    res.locals.newAns = false;

    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    // console.log(req.session.id);
    // console.log('SUCCESS',req.flash('success'));
    next();
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


//session stuff *****************************************





const postRoutes = require('./routes/post');
app.use(postRoutes);

const userRoutes = require('./routes/user');
app.use(userRoutes);

const answerRoutes = require('./routes/answer');
app.use(answerRoutes);

const reviewRoutes = require('./routes/review');
app.use(reviewRoutes);

app.listen('8000', () => {
    console.log('Server running at 8000');
})


mongoose.connect('mongodb://127.0.0.1:27017/quoraApp').then(() => console.log('connected database')).catch((err) => {
    console.log(err);
})
