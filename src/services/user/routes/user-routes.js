import { Router } from "express";
import validate from "../../../middlewares/validate.js"
import userSchemaPayload from "../validator/user-schema.js";
import { addUserHandler, deleteUserByIdHandler, getAllUserHandler, getUserByIdHandler, updateUserByIdHandler } from "../controller/user-controller.js";

const router = Router();

router.post("/users", validate(userSchemaPayload), addUserHandler);
router.get("/users", getAllUserHandler);
router.get("/users/:id", getUserByIdHandler);
router.put("/users/:id", validate(userSchemaPayload), updateUserByIdHandler);
router.delete("/users/:id", deleteUserByIdHandler);

export default router;