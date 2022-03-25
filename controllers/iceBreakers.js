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

export {
  create,
  index,
}