const router=require('express').Router()
const authcontroller=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})
const guardauth=require('./guardauth')

router.get('/register',guardauth.notauth,authcontroller.getregisterpage)
router.post('/register',body,authcontroller.postregisterdata)
router.get('/login',guardauth.notauth,authcontroller.getloginpage)
router.post('/login',body,authcontroller.postlogindata)
router.post('/logout',authcontroller.logoutfunctioncontroller)



module.exports=router