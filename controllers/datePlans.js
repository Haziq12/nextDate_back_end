import { Profile } from '../models/profile.js'
import { DatePlan } from '../models/datePlan.js'


const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const datePlan = await new DatePlan(req.body)
    await datePlan.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { datePlans: datePlan } }
    )
    return res.status(201).json(datePlan)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const datePlans = await DatePlan.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(datePlans)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const datePlan = await DatePlan.findById(req.params.id)
      .populate('owner')
      .populate('chats.commenter')
    console.log(datePlan);
    return res.status(200).json(datePlan)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedDateplan = await DatePlan.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true }
    )
    return res.status(200).json(updatedDateplan)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteDatePlan = async (req, res) => {
  try {
    await DatePlan.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.datePlans.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createChat = async (req, res) => {
  try {
    req.body.commenter = req.user.profile
    const datePlan = await DatePlan.findById(req.params.id)
    datePlan.chats.push(req.body)
    await datePlan.save()
    const newChat = datePlan.chats[datePlan.chats.length - 1]
    return res.status(201).json(newChat)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteChat = async(req, res)=> {
  try {
    const datePlan = await DatePlan.findById(req.params.datePlanId)
    datePlan.chats.remove({_id: req.params.chatId})

    await datePlan.save()
    return res.status(204).end()
  }catch(err){
    res.status(500).json(err)
  }
}

export {
  createChat,
  deleteChat,

  create,
  index,
  show,
  update,
  deleteDatePlan as delete
}