import { Profile } from '../models/profile.js'
import { IceBreaker } from '../models/iceBreaker.js'


const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const iceBreaker = await new IceBreaker(req.body)
    await iceBreaker.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { iceBreakers: iceBreaker } }
    )
    return res.status(201).json(iceBreaker)
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

const createChat = async (req, res) => {
  try {
    req.body.commenter = req.user.profile
    const iceBreaker = await IceBreaker.findById(req.params.id)
    iceBreaker.chats.push(req.body)
    await iceBreaker.save()
    const newChat = iceBreaker.chats[iceBreaker.chats.length - 1]
    return res.status(201).json(newChat)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  create,
  index,
  deleteIceBreaker as delete,
  createChat
}