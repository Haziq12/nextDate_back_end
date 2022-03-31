import { Profile } from '../models/profile.js'
import { DatePlan } from '../models/datePlan.js'
import {v2 as cloudinary} from 'cloudinary'


function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    console.log('hit if photo undefined')
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
  } else {
    console.log('hit if photo exists')
    const imageFile = req.files.photo.path
    console.log(imageFile)
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
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


// const create = async (req, res) => {
//   try {
//     req.body.owner = req.user.profile
//     const datePlan = await new DatePlan(req.body)
//     const newDatePlan = await datePlan.save()
//     const populateDp = await newDatePlan.populate('owner') 
//     await Profile.updateOne(
//       { _id: req.user.profile },
//       { $push: { datePlans: datePlan } }
//     )
//     return res.status(201).json(populateDp)
//   } catch (err) {
//     return res.status(500).json(err)
//   }
// }

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
    
    return res.status(200).json(datePlan)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
}


function update(req, res) {
  // req.body.owner = req.user.profile
  console.log(req.body, req.params.id)
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    DatePlan.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.photo = image.url
      DatePlan.findByIdAndUpdate(req.params.id, req.body, {new: true})
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

// const update = async (req, res) => {
//   try {
//     const updatedDateplan = await DatePlan.findByIdAndUpdate(
//       req.params.id, req.body,
//       { new: true }
//     )
//     const newUpdateDatePlan = await updatedDateplan.save()
//     const populateDp = await newUpdateDatePlan.populate('owner') 
//     return res.status(200).json(populateDp)
//   } catch (err) {
//     return res.status(500).json(err)
//   }
// }

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