import { Goal } from "../models/goal.js"

function index(req, res) {
  // only find goals that were created by the current user 
  Goal.find({ creator: req.user.profile._id })
  .then(goals => {
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
  if(req.body.achieved === null){
    req.body.achieved = 'false'
  } else {
    req.body.achieved = 'true'
  }
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

export {
  index,
  create,
  deleteGoal as delete,
}