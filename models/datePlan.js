import mongoose from 'mongoose'
const Schema = mongoose.Schema



const datePlanSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  title: String,
  location: String,
  activity: String,
  detail: String,
  food: String,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  photo: { type: String }
})


const DatePlan = mongoose.model('DatePlan', datePlanSchema)

export {
  DatePlan
}