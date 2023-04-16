const Joi = require('joi');


module.exports.postSchema = Joi.object({
    question: Joi.string().required(),
    answer:Joi.string().required(),
    // topic:Joi.number().min(0).max(6);
})


module.exports.reviewSchema = Joi.object({
    comment:Joi.string().required(),
})

module.exports.answerSchema = Joi.object({
    content:Joi.string(),
    img:Joi.string(),
})


