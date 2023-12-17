

exports.getpageabout=(req,res)=>{
    res.render('about',{verifuser:req.session.userId})
}