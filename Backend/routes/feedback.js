const express=require('express')

const route=express.Router()

const feedBackControler=require('../controler/feedback')
const authentication=require('../middleware/authentication')

route.post('/salon-booking/sendFeedback',authentication.authentication,feedBackControler.postFeedBack)
route.get('/salon-booking/getFeedBacks',authentication.authentication,feedBackControler.getFeedBacks)
route.get('/salon-booking/getAllFeedBacks',feedBackControler.getAllFeedBacks)


module.exports=route