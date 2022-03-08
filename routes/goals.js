import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as goalsCtrl from '../controllers/goals.js'
const router = Router()

// GET - localhost:3000/goals
router.get('/', goalsCtrl.index)
// POST - localhost:3000/goals
router.post('/', isLoggedIn, goalsCtrl.create)
// DELETE - localhost:3000/goals
router.delete('/:id', isLoggedIn, goalsCtrl.delete)
// PUT localhost:3000/runs/:id
router.put('/:id', isLoggedIn, goalsCtrl.update)
// GET localhost:3000/goals/:id/edit
router.get('/:id/edit', isLoggedIn, goalsCtrl.edit)



export {
  router
}