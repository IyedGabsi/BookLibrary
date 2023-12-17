const aboutcontroller=require('../controllers/about.controller')

const router=require('express').Router()

router.get('/about',aboutcontroller.getpageabout)



module.exports=router