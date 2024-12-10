const express=require('express')

const route=express.Router()

const userControler=require('../controler/user')
const salonServicesControler=require('../controler/salonServices')
const s3BucketControler=require('../controler/S3Bucket')
route.post('/salon-booking/adminsignup',userControler.postUserAuthentication,salonServicesControler.postsalonServices)
route.post('/salon-booking/adminsignin',userControler.postSignInAuthentication) 
route.post('/salon-booking/upload',s3BucketControler.addDocuments)
module.exports=route