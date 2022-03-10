import { Goal } from "../models/goal.js"

function index(req, res) {
  // only find goals that were created by the current user 
  Goal.find({ creator: req.user.profile._id })
  .then(goals => {
    goals.reverse()
    res.render('goals/index', {
      goals,
      title: 'Goals'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/goals')
  })
}

function create(req, res) {
  req.body.creator = req.user.profile._id
  req.body.achieved = !!req.body.achieved
  console.log(req.body)
  Goal.create(req.body)
  .then(goal => {
    console.log(goal)
    res.redirect('/goals')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

function deleteGoal(req, res) {
  Goal.findById(req.params.id)
  .then(goal => {
    if (goal.creator.equals(req.user.profile._id)){
      goal.delete()
      .then(() => {
        res.redirect('/goals')
      })
    } else {
      throw new Error ("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/goals')
  })
}

function edit(req, res) {
  Goal.findById(req.params.id)
  .then(goal => {
    console.log(goal)
    res.render('goals/edit', {
      goal,
      title: 'Edit Goal'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/goals')
  })
}

function update(req,res) {
  req.body.achieved = !!req.body.achieved
  Goal.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    console.log(req.body)
    res.redirect('/goals')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/goals/edit')
  })
}

function newGoal(req, res) {
  res.render('goals/new', {
    title: 'Add Goal'
  })
}

export {
  index,
  create,
  deleteGoal as delete,
  edit,
  update,
  newGoal as new
}