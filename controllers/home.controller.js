const bookmodel=require('../models/book.model')

exports.threebookscontroller=(req,res,next)=>{
    bookmodel.getthreebooks().then(
    books=>{
        res.render('index',{books:books,verifuser:req.session.userId})
    }
 )

}
