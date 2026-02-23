import Joi from "joi";

const userSchemaPayload = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(3).max(100).required()
});

export default userSchemaPayload;