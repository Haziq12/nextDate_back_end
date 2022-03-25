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

export {
   create,
}
