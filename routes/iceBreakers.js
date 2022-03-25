import { Router } from 'express'
import * as iceBreakerCtrl from '../controllers/iceBreakers.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========

router.get('/', iceBreakerCtrl.index)


// ========= Protected Routes ========= 

router.use(decodeUserFromToken)
router.post('/', checkAuth, iceBreakerCtrl.create)
router.delete('/:id', checkAuth, iceBreakerCtrl.delete)





export {
  router
}