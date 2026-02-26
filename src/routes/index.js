import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/user/routes/user-routes.js';
import authentications from '../services/authentication/routes/auth-routes.js';
 
const router = Router();
 
router.use('/', notes);
router.use('/', users);
router.use('/', authentications);

export default router;