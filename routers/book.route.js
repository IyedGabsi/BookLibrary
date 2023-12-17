const bookcontroller=require('../controllers/book.controller')
const guardauth=require('./guardauth')
const router=require('express').Router()
const route=require('./auth.route')
const multer=require('multer')


router.get('/books',guardauth.isauth,bookcontroller.allbookscontroller)
router.get('/books/:id',guardauth.isauth,bookcontroller.onebookdetailscontroller)
route.get('/addbook',guardauth.isauth,bookcontroller.getaddbookcontroller)
route.post('/addbook',multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'assets/uploads')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'-'+ file.originalname)
    }
})}).single('image'),guardauth.isauth,bookcontroller.postaddbookcontroller)

router.get('/mybooks',bookcontroller.getmybookscontroller)
router.get('/mybooks/delete/:id',bookcontroller.deletebookcontroller)
router.get('/mybooks/update/:id',bookcontroller.updatebookcontroller)
router.post('/mybooks/update',multer({storage:multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'assets/uploads')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'-'+ file.originalname)
    }
})}).single('image'),guardauth.isauth,bookcontroller.postupdatebookcontroller)
module.exports=router












