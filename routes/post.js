const express = require('express');
const router = express.Router();
const Answer = require('../models/answer')
const { validateAnswer } = require('../middleware');
const Post = require('../models/post');

//view home (all posts)
router.get('/home', async (req, res) => {
    try {
        const posts = await Post.find({}).populate('answer');
        res.render('posts/home', { posts });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

//view a post
router.get('/home/:postid', async (req, res, next) => {
    try {
        const { postid } = req.params;
        console.log('inside get product with id:',postid);
        const post = await Post.findById(postid).populate('answer');
        res.render('posts/show', { post });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

//answer a post, GET page
router.get('/home/:postid/newanswer', async (req, res) => {
    try {
        res.locals.newAns = true;
        console.log('req.session.new:',req.session.newAns);
        console.log('req.session.new:',req.session.newAns);
        console.log(res.locals);
        const { postid } = req.params;
        const post = await Post.findById(postid).populate('answer');
        res.render('posts/show', { post });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

//answer a post, POST answer
router.post('/home/:postid', async (req, res) => {
    try {

        const { postid } = req.params;
        const { content, img } = req.body;
        const ans = await Answer.create({ content, img });
        const post = await Post.findById(postid).populate('answer');
        await post.answer.push(ans);
        ans.save();
        post.save();
        req.flash('success','added succesfully');
        res.redirect(`/home/${postid}`);
    }
    catch (e) {
        res.status(5000).render('error', { err: e.message });
    }
})



//Edit a post, GET page
router.get('/home/:postid/edit', async (req, res) => {
    try {
        const { postid } = req.params;
        const post = await Post.findById(postid);
        res.render('posts/edit', { post })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

//Edit a post,Push changes
router.patch('/home/:postid', async (req, res) => {
    try {
        const { postid } = req.params;
        const { question, answer, topic} = req.body;
        await Post.findByIdAndUpdate(postid, { question, answer, topic });
        res.redirect(`/home/${postid}`)
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


//DELETE a post
router.delete('/home/:postid', async (req, res) => {
    try {
        const { postid } = req.params;
        await Post.findByIdAndDelete(postid);
        res.redirect('/home');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});


module.exports = router;