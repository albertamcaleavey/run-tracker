import { Router } from 'express'
import * as runsCtrl from '../controllers/runs.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()

// GET localhost:3000/runs
router.get('/', runsCtrl.index)
// GET localhost:3000/runs/new
router.get('/new', runsCtrl.new)
// POST
router.post('/', runsCtrl.create)

export {
  router
}