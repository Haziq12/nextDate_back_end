import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
  avatar: String,
  datePlan: [{type: mongoose.Schema.Types.ObjectId, ref:"DatePlan"}],
  aboutMe: {type: mongoose.Schema.Types.ObjectId, ref:"AboutMe"},
  iceBreakers: [{type: mongoose.Schema.Types.ObjectId, ref:"IceBreaker"}],
},{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
