


exports.getpagecontact=(req,res)=>{
    res.render('contact',{verifuser:req.session.userId})
}