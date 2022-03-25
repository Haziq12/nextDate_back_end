import { Router } from 'express'
import * as datePlanCtrl from '../controllers/datePlans.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 



// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, datePlanCtrl.create)
router.get('/', datePlanCtrl.index)
router.get('/:id', datePlanCtrl.show)

export {
    router
}