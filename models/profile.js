import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  avatar: String,
  location: String, 
  aboutMe: String,
  contactInfo: String,
  relationshipStatus: String,
  iceBreakers: [{type: mongoose.Schema.Types.ObjectId, ref:"IceBreaker"}],
  datePlan: [{type: mongoose.Schema.Types.ObjectId, ref:"DatePlan"}],
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
