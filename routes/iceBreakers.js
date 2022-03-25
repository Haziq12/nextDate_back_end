import { Router } from 'express'
import * as iceBreakerCtrl from '../controllers/iceBreakers.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()




// ========= Protected Routes ========= 

router.use(decodeUserFromToken)
router.post('/', checkAuth, iceBreakerCtrl.create)




export {
  router
}