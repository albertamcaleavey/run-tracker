import { Router } from 'express'
import * as runsCtrl from '../controllers/runs.js'
import { isLoggedIn } from '../middleware/middleware.js'
const router = Router()

// GET localhost:3000/runs
router.get('/', runsCtrl.index)
// GET localhost:3000/runs/new
// POST localhost:3000/runs
router.post('/', isLoggedIn, runsCtrl.create)
// POST - localhost:3000/runs/:id/goals
router.post("/:id/goals", runsCtrl.addAchievement)
router.get('/new', isLoggedIn, runsCtrl.new)
// GET localhost:3000/runs/:id
router.get('/:id', runsCtrl.show)
// PUT localhost:3000/runs/:id
router.put('/:id', isLoggedIn, runsCtrl.update)
// DELETE - localhost:3000/runs/:id
router.delete('/:id', isLoggedIn, runsCtrl.delete)
// GET localhost:3000/runs/:id/edit
router.get('/:id/edit', isLoggedIn, runsCtrl.edit)



export {
  router
}