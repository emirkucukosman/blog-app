import Joi from 'joi'

export const validateCreate = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a text",
        "string.empty": "Title can not be empty",
        "any.required": "Title is required"
    }),
    body: Joi.string().required().messages({
        "string.base": "Body must be a text",
        "string.empty": "Body can not be empty",
        "any.required": "Body is required"
    }),
    author: Joi.string().required().messages({
        "string.base": "Author must be a text",
        "string.empty": "Author can not be empty",
        "any.required": "Author is required"
    })
})