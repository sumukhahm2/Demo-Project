const express=require('express')

const route=express.Router()

const userprofileControler=require('../controler/userProfile')

const authentication=require('../middleware/authentication')

const multer = require('multer');

const S3Controler=require('../controler/S3Bucket')

const upload = multer({
    storage: multer.memoryStorage(), 
  }); 
  //authentication.authentication,userprofileControler.postProfileDetails

route.post('/salon-booking/postProfile',S3Controler.addDocuments,authentication.authentication,userprofileControler.postProfileDetails)
route.get('/salon-booking/getProfile',authentication.authentication,userprofileControler.getProfileDetails)
route.get('/salon-booking/getAllProfile',userprofileControler.getProfileDetails)

module.exports=route 