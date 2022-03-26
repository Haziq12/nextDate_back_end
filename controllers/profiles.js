import { Profile } from '../models/profile.js'

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

export {
  index,
  show,
}