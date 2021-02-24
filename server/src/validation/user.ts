import Joi from 'joi'

export const validateRegister = Joi.object({
    username: Joi.string().required().messages({
        "string.base": "Username must be a text",
        "string.empty": "Username can not be empty",
        "any.required": "Username is required"
    }),
    password: Joi.string().required().min(4).max(16).messages({
        "string.base": "Password must be a text",
        "string.empty": "Password can not be empty",
        "string.min": "Password must be at least 4 characters",
        "string.max": "Password can be maximum 16 characters",
        "any.required": "Password is required"
    })
})

export const validateLogin = Joi.object({
    username: Joi.string().required().messages({
        "string.base": "Username must be a text",
        "string.empty": "Username can not be empty",
        "any.required": "Username is required"
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a text",
        "string.empty": "Password can not be empty",
        "any.required": "Password is required"
    })
})