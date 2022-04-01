import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  avatar: String,
  address: String,
  aboutMe: String,
  contactInfo: String,
  relationshipStatus: String,
  iceBreakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "IceBreaker" }],
  datePlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "DatePlan" }],
  photo: { type: String }
}, {
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
