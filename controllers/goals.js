import { Goal } from "../models/goal.js"

function index(req, res) {
  Goal.find({})
  .then(goals => {
    res.render('goals/index', {
      goals,
      title: 'Goals'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

export {
  index,
}