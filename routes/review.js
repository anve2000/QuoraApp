const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Answer = require('../models/answer');
const Review = require('../models/review');
const {validateReview} = require('../middleware');


router.post('/posts/:postid/:ansid/review',validateReview, async (req, res) => {
    try {
        const { ansid } = req.params;  const { postid } = req.params;  const {comment} = req.body;
        const answer = await Answer.findById(ansid);
        const review = new Review({comment });
        answer.reviews.push(review);
        await review.save(); await answer.save();
        req.flash('success','Ánswer added successfully');
        res.redirect(`/posts/${postid}`)
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/post/:postid/upvote', async (req, res) => {
    const { postid } = req.params;
    const post = await Post.findById(postid);
    post.upV += 1; post.save();
    res.redirect(`post/${postid}`)
})

router.get('/post/:postid/downvote', async (req, res) => {
    const { postid } = req.params;
    const post = await Post.findById(postid);
    post.downV += 1;post.save();
    res.redirect(`post/${postid}`)
})

router.get('/posts/:postid/:ansid/downvote', async (req, res) => {
    const { postid } = req.params; const { ansid } = req.params;
    const ans = await Answer.findById(ansid);
    ans.downV = ans.downV + 1;  ans.save();
    res.redirect(`/posts/${postid}`)
})


router.get('/posts/:postid/:ansid/upvote', async (req, res) => {
    const { postid } = req.params; const { ansid } = req.params;
    const ans = await Answer.findById(ansid);
    ans.upV = ans.upV + 1; ans.save();
    res.redirect(`/posts/${postid}`);
})

module.exports = router;