import { Router } from "express";
import { login, refreshToken, logout } from "../controller/auth-controller.js";
import validate from "../../../middlewares/validate.js";
import { loginSchema, refreshTokenSchema } from "../validator/auth-schema.js";

const router = Router();

router.post("/authentications", validate(loginSchema), login);
router.put("/authentications", validate(refreshTokenSchema), refreshToken);
router.delete("/authentications", validate(refreshTokenSchema), logout);

export default router;