const express=require('express')

const route=express.Router()

const userControler=require('../controler/user')


route.post('/salon-booking/signup',userControler.postUserAuthentication)
route.post('/salon-booking/signin',userControler.postSignInAuthentication)

module.exports=route