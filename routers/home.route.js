const homecontroller=require('../controllers/home.controller')
const router=require('express').Router()



router.get('/',homecontroller.threebookscontroller)

module.exports=router