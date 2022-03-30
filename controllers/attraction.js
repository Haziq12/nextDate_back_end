import axios from "axios";

function getAttraction(req,res){
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${process.env.API_KEY}&city=${req.params.city}`)
  .then(apiResponse =>{
    res.json(apiResponse.data)
  })
}

export {
  getAttraction
}