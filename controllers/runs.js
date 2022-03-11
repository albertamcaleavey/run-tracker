import { Run } from '../models/run.js'
import { Goal } from '../models/goal.js'

function index(req, res) {
  Run.find({ creator: req.user.profile._id })
  .populate('achievements')
  .then(runs => {
    runs.reverse()
    Goal.find({ creator: req.user.profile._id })
    .then(goals => {
    res.render('runs/index', {
      runs,
      goals,
      title: 'All Runs',
    })
    
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs')
  })
}

function newRun(req, res) {
  res.render('runs/new', {
    title: 'Add a Run'
  })
}

function create(req, res) {
  req.body.creator = req.user.profile._id
  let runDate = new Date(req.body.date)
  req.body.date = new Date( runDate.getTime() + Math.abs(runDate.getTimezoneOffset()*60000))
  Run.create(req.body)
  .then(run => {
    console.log(run)
    res.redirect('/runs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs/new')
  })
}

function show(req, res) {
  Run.findById(req.params.id)
  .populate('achievements')
  .exec(function(err, run) {
    Goal.find({ creator: req.user.profile._id,_id: {$nin: run.achievements} }, function(err, goals) {
      console.log(run)
      console.log(goals)
      res.render('runs/show', {
        title: 'Run Summary', 
        run,
        goals
      })
    })
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
  .then(run => {
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

function addAchievement(req, res) {
  Run.findById(req.params.id, function(err, run) {
    run.achievements.push(req.body.goalId)
    run.save(function(err) {
      res.redirect(`/runs/${run._id}`)
    })
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
  addAchievement, 
}