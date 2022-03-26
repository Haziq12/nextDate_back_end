import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
    return res.status(200).json(profile)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true }
    )
    return res.status(200).json(updatedProfile)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteProfile = async (req, res) => {
  try {

    await Profile.findByIdAndDelete(req.params.id)
    await User.findByIdAndDelete(req.user)
    return res.status(200).json("Deleted")
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  show,
  index,
  update,
  deleteProfile as delete
}