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
  // create a new document with the Run template using the content in the request (user input)
  Run.create(req.body)
  .then(run => {
    res.redirect('/runs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs/new')
  })
}

function show(req, res) {
  Run.findById(req.params.id)
  .populate('creator')
  .then(run => {
    console.log(run)
    res.render('runs/show', {
      run,
      title: `Run from ${run.date}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

function edit(req, res) {
  Run.findById(req.params.id)
  .then(run => {
    res.render('runs/edit', {
      run,
      title: 'Edit Run'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

function update(req,res) {
  Run.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/runs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs/edit')
  })
}

export {
  index,
  newRun as new,
  create,
  show,
  edit,
  update,
}