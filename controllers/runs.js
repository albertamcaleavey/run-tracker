import { Run } from '../models/run.js'

function index(req, res) {
  // runs refers to the array of documents returned by .find
  Run.find({})
  .then(runs => {
    res.render('runs/index', {
      runs,
      title: 'All Runs',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

function newRun(req, res) {
  res.render('runs/new', {
    title: 'Add Run'
  })
}

export {
  index,
  newRun as new,
}