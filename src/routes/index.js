import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/user/routes/user-routes.js';
import authentications from '../services/authentication/routes/auth-routes.js';
import exports from '../services/exports/routes/export-routes.js';
 
const router = Router();
 
router.use('/', notes);
router.use('/', users);
router.use('/', authentications);
router.use('/', exports);

export default router;