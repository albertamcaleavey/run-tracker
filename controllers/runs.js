import { Run } from '../models/run.js'
import { Goal } from '../models/goal.js'

// function index(req, res) {
//   // runs refers to the array of documents returned by .find
//   // only find runs that were created by the current user 
//   Run.find({ creator: req.user.profile._id })
//   .then(runs => {
//     res.render('runs/index', {
//       runs,
//       title: 'All Runs',
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/runs')
//   })
// }

function index(req, res) {
  Run.find({ creator: req.user.profile._id })
  .populate('achievements')
  .then(runs => {
    Goal.find({})
    .then(goals => {
      console.log(runs)
      console.log(goals)
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
    title: 'Add Run'
  })
}

function create(req, res) {
  // have to tell mongoose to add the id of what you're referencing 
  // adds creator with value of profile objectid
  req.body.creator = req.user.profile._id
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


// function show(req, res) {
//   Run.findById(req.params.id)
//   // .populate('creator')
//   .populate('achievements')
//   .then(run => {
//     res.render('runs/show', {
//       run,
//       title: 'Run Summary'
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/runs')
//   })
// }

function show(req, res) {
  Run.findById(req.params.id)
  .populate('achievements')
  .exec(function(err, run) {
    
    Goal.find({_id: {$nin: run.achievements}}, function(err, goals) {
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
  // add , {new: true}
  Run.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect('/runs')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/runs/edit')
  })
}

// change to findByIdAndDelete? since the user is only viewing data they created, this step of checking if the creator is the same as the current user may be repetitive 
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

// function addAchievement(req, res) {
//   Run.findById(req.params.id)
//   .then(run => {
//     run.achievements.push(req.body.goalId)
//     run.save()
//     .then(() => {
//       res.redirect(`/runs/${run._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/runs')
//   })
// }

function addAchievement(req, res) {
  Run.findById(req.params.id, function(err, run) {
    // console.log(run.achievements)
    // console.log(req.body)
    run.achievements.push(req.body.goalId)
    // console.log(run.achievements)
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