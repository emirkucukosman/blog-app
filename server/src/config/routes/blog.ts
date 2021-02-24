import { Router } from 'express'
import { authRequest } from '../../utils/express/authMiddleware'
import * as Controller from '../../controllers/blog'

const router: Router = Router();

router.use(authRequest());

router.route('/').get(Controller.findAll);
router.route('/:author').get(Controller.findByAuhtor);
router.route('/').post(Controller.create);
router.route('/:id').delete(Controller.deleteById);

export default router;