import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  avatar: String,
  location: String, 
  aboutMe: String,
  contactInfo: String,
  relationshipStatus: String,
  datePlan: [{type: mongoose.Schema.Types.ObjectId, ref:"DatePlan"}],
  iceBreakers: [{type: mongoose.Schema.Types.ObjectId, ref:"IceBreaker"}],
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
