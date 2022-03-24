import mongoose from 'mongoose'
const Schema = mongoose.Schema

const aboutMeSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
  location: String, 
  aboutMe: String,
  contactInfo: String,
  relationshipStatus: String
})

const AboutMe = mongoose.model('AboutMe', aboutMeSchema)

export {
  AboutMe
}