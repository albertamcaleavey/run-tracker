import mongoose from "mongoose"

const Schema = mongoose.Schema

const runSchema = new Schema({
  date: Date,
  distance: {
    type: Number,
    required: true,
    min: 0
  },
  time: {
    type: Number,
    required: true,
    min: 0,
  },
  // achievement: {
  //   type: Schema.Types.ObjectId, ref: "Goal"
  // },
  notes: String,
})

const Run = mongoose.model('Run', runSchema)

export {
  Run
}