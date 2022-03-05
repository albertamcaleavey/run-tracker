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

function create(req, res) {
  const run = new Run(req.body)
  console.log(run)
  run.save(function(err) {
    if (err) return res.redirect('/runs/new')
    console.log('CREATE NEW RUN')
    
    res.redirect('/runs')
  })
}

export {
  index,
  newRun as new,
  create,
}