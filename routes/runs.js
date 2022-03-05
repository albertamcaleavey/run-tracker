import { Router } from 'express'
import * as runsCtrl from '../controllers/runs.js'
const router = Router()

// GET localhost:3000/runs
router.get('/', runsCtrl.index)
// GET localhost:3000/runs/new
router.get('/new', runsCtrl.new)

export {
  router
}