import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema({
  chat: String,
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
})

const datePlanSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  title: String,
  location: String,
  activity: String,
  detail: String,
  food: String,
  chats: [chatSchema]
 })


 const DatePlan = mongoose.model('DatePlan', datePlanSchema)

 export {
   DatePlan
 }