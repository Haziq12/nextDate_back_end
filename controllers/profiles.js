import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'
import { v2 as cloudinary } from 'cloudinary'

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
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(profile => {
        res.status(201).json(profile)

      })
      .catch(err => {
        console.log(err)
        return res.status(500).json(err)
      })
  } else {
    console.log('hit line 39')
    const imageFile = req.files.photo.path
    console.log(imageFile)
    cloudinary.uploader.upload(imageFile, { tags: `${req.body.name}` })
      .then(image => {
        console.log(image)
        req.body.photo = image.url
        Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then(profile => {
            res.status(201).json(profile)
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
      })
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