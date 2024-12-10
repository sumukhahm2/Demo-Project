const express=require('express')

const route=express.Router()

const salonServicesControler=require('../controler/salonServices')

const authentication=require('../middleware/authentication')

const razorpayControler=require('../controler/RazorPay')
const Sib=require('../controler/Sib')

const notificationControler=require('../controler/notification')

const invoiceControler=require('../controler/createInvoice')

route.post('/salon-booking/postsalonServices',authentication.authentication,salonServicesControler.postsalonServices)
route.get('/salon-booking/getsalonServices',salonServicesControler.getsalonServices)
route.get('/admin/salon-booking/getsalonServices',authentication.authentication,salonServicesControler.getAdminSalonServices)
route.post('/salon-booking/book-appointment',authentication.authentication,Sib.sendConfirmationEmail)
route.get('/salon-booking/pay',authentication.authentication,razorpayControler.payAmount)
route.post('/salon-booking/update-transaction',authentication.authentication,razorpayControler.updateTransaction)
route.get('/salon-booking/getnotification',authentication.authentication,notificationControler.getNotification)
route.get('/salon-booking/getallnotification',notificationControler.getNotification)
route.post('/salon-booking/update-appointment',authentication.authentication,notificationControler.updateAppointment)
route.post('/salon-booking/reschedule-appointment',authentication.authentication,notificationControler.rescheduleAppointment)
route.get('/salon-booking/getinvoice',authentication.authentication,invoiceControler.getInvoice)
module.exports=route 