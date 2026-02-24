import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/user/routes/user-routes.js';
import authentication from '../services/authentication/routes/auth-routes.js';
 
const router = Router();
 
router.use('/', notes);
router.use('/', users);
router.use('/', authentication);

export default router;