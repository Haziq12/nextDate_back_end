import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema({
  chat: String,
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
})

const iceBreakerSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  funFact: String, 
  question: String,
  chats: [chatSchema]
})

const IceBreaker = mongoose.model('IceBreaker', iceBreakerSchema)

export {
  IceBreaker
}