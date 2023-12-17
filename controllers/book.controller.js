const bookmodel=require('../models/book.model')


exports.allbookscontroller=(req,res,next)=>{
    bookmodel.getallbooks().then(
       books=>{
           res.render('books',{books:books,verifuser:req.session.userId})
       }
    )
   
   }
exports.onebookdetailscontroller=(req,res,next)=>{
    let id=req.params.id
    bookmodel.getonebookdetails(id).then(
       resbook=>{
           res.render('details',{book:resbook,verifuser:req.session.userId})
       }
    )
   
   }
exports.getaddbookcontroller=(req,res,next)=>{
    res.render('addbook',{verifuser:req.session.userId,smessage:req.flash('successmessage')[0],emessage:req.flash('errormessage')[0]})
}
exports.postaddbookcontroller=(req,res,next)=>{
    console.log(req.body)
    console.log(req.file.filename)
    bookmodel.postdatabookmodel(req.body.title,req.body.discription,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
        req.flash('successmessage',msg)
        res.redirect('/addbook')
    }).catch(((err)=>{
        req.flash('errormessage',err)
        res.redirect('/addbook')
    }))
}
exports.getmybookscontroller=(req,res,next)=>{
    bookmodel.getmybooks(req.session.userId).then((books)=>{
        // console.log(req.session.userId)
        // console.log(books)
        res.render('mybooks',{verifuser:req.session.userId,mbooks:books})
    })
    
}
exports.deletebookcontroller=(req,res,next)=>{
    id=req.params.id
    
    bookmodel.deletebook(id).then((verif)=>{
        res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
    })
}
exports.updatebookcontroller=(req,res,next)=>{
    let id=req.params.id
    bookmodel.getpageupdatebookmodel(id).then((book)=>{
       
        res.render('updatebook',{bookUpdate:book,verifuser:req.session.userId,smessage:req.flash('successmessage')[0],emessage:req.flash('errormessage')[0]})    
    })
    
}
exports.postupdatebookcontroller=(req,res,next)=>{
    if(req.file){
        bookmodel.postupdatebookmodel(req.body.bookid,req.body.title,req.body.discription,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
            req.flash('successmessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        }).catch((err)=>{
            req.flash('errormessage',err)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        })
    }else{
        bookmodel.postupdatebookmodel(req.body.bookid,req.body.title,req.body.discription,req.body.author,req.body.price,req.body.oldimage,req.session.userId).then((msg)=>{
            req.flash('successmessage',msg)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        }).catch((err)=>{
            req.flash('errormessage',err)
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        })
    }
   
}