import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"DatePlan"},
  comments: {type: String}
 })

 const Chat = mongoose.model('Chat', chatSchema)

 export {
   Chat
 }