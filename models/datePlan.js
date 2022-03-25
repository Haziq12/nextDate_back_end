import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema({
  chat: String
})

const datePlanSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  location: String,
  activity: String,
  food: String,
  chat: [chatSchema]
 })


 const DatePlan = mongoose.model('DatePlan', datePlanSchema)

 export {
   DatePlan
 }