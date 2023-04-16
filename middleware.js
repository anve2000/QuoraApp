const {postSchema} = require('./Schema');
const {reviewSchema} = require('./Schema');
const {answerSchema} = require('./Schema');

//Schema Valiation Middlewares****************************
module.exports.validatePost=(req,res,next)=>{
    const {question, answer,upV,downV} = req.body;
    const {error} = postSchema.validate({question,answer,upV,downV});
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        console.log('Inside error middleware');
        return res.render('error',{err:msg});
    }
    next();
}

module.exports.validateAnswer=(req,res,next)=>{
    const {content,img,upV,downV} =req.body;
    const {error} = answerSchema.validate({content,img,upV,downV});
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        res.render('error',{err:msg});
    }
    next();
}

module.exports.validateReview = (req,res,next)=>{
    const {comment} = req.body;
    const {error} = reviewSchema.validate({comment});
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        res.render('error',{err:msg});
    }
    next();
}
 //<---********************************************

//Session Middlewares

// module.exports.flashVar=(req,res,next)=>{
//     res.locals.success=req.flash('success','success by default');
//     res.locals.failure=req.flash('failure','failure by default');
//     next();
// }

