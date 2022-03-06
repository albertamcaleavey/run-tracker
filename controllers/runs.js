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
  console.log(req.user)
  // adds creator with value of profile objectid
  req.body.creator = req.user.profile._id
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

function deleteRun(req, res) {
  Run.findById(req.params.id)
  // console.log(req.params.id)
  .then(run => {
    console.log(run)
    if (run.creator.equals(req.user.profile._id)){
      run.delete()
      .then(() => {
        res.redirect('/runs')
      })
    } else {
      throw new Error ("NOT AUTHORIZED")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

export {
  index,
  newRun as new,
  create,
  show,
  edit,
  update,
  deleteRun as delete,
}