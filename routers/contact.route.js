const router=require('express').Router()
const contactcontroller=require('../controllers/contact.controller')



router.get('/contact',contactcontroller.getpagecontact)




module.exports=router