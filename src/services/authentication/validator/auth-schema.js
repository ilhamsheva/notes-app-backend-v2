import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

export {
    loginSchema,
    refreshTokenSchema
};