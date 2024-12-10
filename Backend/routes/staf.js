const express=require('express')

const route=express.Router()

const stafControler=require('../controler/staf')
const authentication=require('../middleware/authentication')

route.post('/admin/salon-booking/addStaf',authentication.authentication,stafControler.postAddStaf)
route.get('/salon-booking/getStaf',stafControler.getStafs)
route.get('/salon-booking/getadminStaf',authentication.authentication,stafControler.getAdminStafs)

module.exports=route