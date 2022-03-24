import mongoose from 'mongoose'
const Schema = mongoose.Schema

const iceBreakerSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  funFact: String, 
  question: String,
})

const IceBreaker = mongoose.model('IceBreaker', iceBreakerSchema)

export {
  IceBreaker
}