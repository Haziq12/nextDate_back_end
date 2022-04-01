import { Profile } from '../models/profile.js'
import { DatePlan } from '../models/datePlan.js'
import { v2 as cloudinary } from 'cloudinary'
import { Chat } from '../models/chat.js'


function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    console.log('hit if photo undefined')
    DatePlan.create(req.body)
    .then(datePlan => {
      datePlan.populate('owner')
      // Profile.updateOne(
      //   { _id: req.user.profile },
      //   { $push: { datePlans: datePlan } }
      // )
          .then(populatedDp => {
            res.status(201).json(populatedDp)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    console.log('hit if photo exists')
    const imageFile = req.files.photo.path
    console.log(imageFile)
    cloudinary.uploader.upload(imageFile, { tags: `${req.body.name}` })
      .then(image => {
        req.body.photo = image.url
        DatePlan.create(req.body)
          .then(datePlan => {
            datePlan.populate('owner')
              .then(populatedDp => {
                res.status(201).json(populatedDp)
              })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
      })
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
      .populate(['owner', 'chats'])

    return res.status(200).json(datePlan)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
}


function update(req, res) {
  console.log(req.body, req.params.id)
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    DatePlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dp => {
        dp.populate('owner')
          .then(populatedDp => {
            res.status(201).json(populatedDp)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, { tags: `${req.body.name}` })
      .then(image => {
        req.body.photo = image.url
        DatePlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then(dp => {
            dp.populate('owner')
              .then(populatedDp => {
                res.status(201).json(populatedDp)
              })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
      })
  }
}

const deleteDatePlan = async (req, res) => {
  try {
    const deleteDatePlan = await DatePlan.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.datePlans.remove({ _id: req.params.id })
    const populateDp = await deleteDatePlan.populate('owner')
    await profile.save()
    return res.json(populateDp)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const chatIndex = async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    return res.status(200).json(chats)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createChat = async (req, res) => {
  console.log(req.params.id)
  try {
    req.body.owner = req.params.id
    const chat = await new Chat(req.body)
    console.log(req.body)
    const newChat = await chat.save()
    const newDatePlan = await DatePlan.findById(req.params.id)
    await newDatePlan.chats.push(newChat)
    newDatePlan.save()
    const populatedDp = await newDatePlan.populate('chats')
    return res.status(201).json(populatedDp)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id)
    const datePlan = await DatePlan.findById(req.profile.datePlans)
    datePlan.chats.remove({ _id: req.params.id })
    await datePlan.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  createChat,
  deleteChat,
  chatIndex,
  create,
  index,
  show,
  update,
  deleteDatePlan as delete
}