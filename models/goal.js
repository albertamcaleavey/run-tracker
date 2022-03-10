import mongoose from "mongoose"

const Schema = mongoose.Schema

const goalSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  achieved: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: Schema.Types.ObjectId, 
    ref: "Profile",
  }
}, {
  timestamps: true
})


const Goal = mongoose.model('Goal', goalSchema)

export {
  Goal
}