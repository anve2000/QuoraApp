const express = require('express');
const router = express.Router();
const Answer = require('../models/answer')
const { validateAnswer } = require('../middleware');
const Post = require('../models/post');

// //view home (all posts)
// router.get('/home', async (req, res) => {
//     try {
//         const posts = await Post.find({}).populate('answer');
//         res.render('posts/home', { posts });
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// })

// //view a post
// router.get('/home/:postid', async (req, res, next) => {
//     try {
//         const { postid } = req.params;
//         console.log('inside get product with id:',postid);
//         const post = await Post.findById(postid).populate('answer');
//         res.render('posts/show', { post });
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// })

// //answer a post, GET page
// router.get('/home/:postid/newanswer', async (req, res) => {
//     try {
//         const { postid } = req.params;
//         const post = await Post.findById(postid).populate('answer');
//         res.render('answer/new', { post });
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// })

// //answer a post, POST answer
// router.post('/posts/:postid',validateAnswer, async (req, res) => {
//     try {

//         const { postid } = req.params;
//         const { content, img } = req.body;
//         const ans = await Answer.create({ content, img });
//         const post = await Post.findById(postid).populate('answer');
//         await post.answer.push(ans);
//         ans.save();
//         post.save();
//         req.flash('success','added succesfully');
//         res.redirect(`/posts/${postid}`);
//     }
//     catch (e) {
//         res.status(5000).render('error', { err: e.message });
//     }
// })



// //Edit a post, GET page
// router.get('/posts/:postid/edit', async (req, res) => {
//     try {
//         const { postid } = req.params;
//         const post = await Post.findById(postid);
//         res.render('posts/edit', { post })
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// })

// //Edit a post,Push changes
// router.patch('/posts/:postid', validatePost, async (req, res) => {
//     try {
//         const { postid } = req.params;
//         const { question, answer, topic} = req.body;
//         await Post.findByIdAndUpdate(postid, { question, answer, topic });
//         res.redirect(`/products/${postid}`)
//     }
//     catch (e) {
//         res.status(500).render('error', { err: e.message });
//     }
// })


//DELETE a post
router.delete('/home/:postid/:ansid', async (req, res) => {
    try {
        const { postid } = req.params;
        const {ansid} = req.params;
        await Answer.findByIdAndDelete(ansid);
        const post = await Post.findById(postid);
        console.log('post;',post);
        console.log('ans;',ansid);
        post.answer = post.answer.filter(function(value, index, arr){
            console.log(String(value)===String(ansid));
            return String(value)!==String(ansid);
        });



        post.save();
        console.log('post;',post);
        res.redirect(`/home/${postid}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});


module.exports = router;