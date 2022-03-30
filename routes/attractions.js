import { Router } from 'express'
import * as attractionCtrl from '../controllers/attraction.js'


const router = Router()

/*---------- Public Routes ----------*/
router.get('/:city', attractionCtrl.getAttraction)

/*---------- Protected Routes ----------*/


export { router }