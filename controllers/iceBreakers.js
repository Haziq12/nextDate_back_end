import { Profile } from '../models/profile.js'
import { IceBreaker } from '../models/iceBreaker.js'


const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const iceBreaker = await new IceBreaker(req.body)
    const newiceBreaker = await iceBreaker.save()
    const populateIB = await newiceBreaker.populate('owner')
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { iceBreakers: iceBreaker } }
    )
    return res.status(201).json(populateIB)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const iceBreakers = await IceBreaker.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(iceBreakers)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteIceBreaker = async (req, res) => {
  console.log(req.user)
  console.log(req.user.profile)
  try {
    await IceBreaker.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.iceBreakers.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const iceBreaker = await IceBreaker.findById(req.params.id)
      .populate('owner')
      .populate('chats.commenter')
    return res.status(200).json(iceBreaker)
  } catch (err) {
    return res.status(500).json(err)
  }
}


export {
  create,
  index,
  deleteIceBreaker as delete,
  show
}