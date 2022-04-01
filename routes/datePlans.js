import { Router } from 'express'
import * as datePlanCtrl from '../controllers/datePlans.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 



// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, datePlanCtrl.create)
router.post('/:id/chat', checkAuth, datePlanCtrl.createChat)
router.get('/', datePlanCtrl.index)
router.get('/:id', datePlanCtrl.show)
router.put('/:id', checkAuth, datePlanCtrl.update)
router.delete('/:id', checkAuth, datePlanCtrl.delete)

export {
    router
}