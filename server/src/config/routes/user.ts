import { Router } from 'express'
import { validateBody } from '../../utils/validator'
import { authRequest } from '../../utils/express/authMiddleware'
import * as Controller from '../../controllers/user'
import * as schemas from '../../validation/user'


const router: Router = Router();

router.route('/register').post(validateBody(schemas.validateRegister), Controller.register);
router.route('/login').post(validateBody(schemas.validateLogin), Controller.login);
router.route('/me').get(authRequest(), Controller.me);

export default router;