import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/user/routes/user-routes.js';
import authentications from '../services/authentication/routes/auth-routes.js';
import exports from '../services/exports/routes/export-routes.js';
import uploads from '../services/uploads/routes/upload-routes.js';
 
const router = Router();
 
router.use('/', notes);
router.use('/', users);
router.use('/', authentications);
router.use('/', exports);
router.use('/', uploads);

export default router;