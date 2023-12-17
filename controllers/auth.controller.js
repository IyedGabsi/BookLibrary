const authmodel=require('../models/auth.model')



exports.getregisterpage=(req,res,next)=>{

    res.render('register',{verifuser:req.session.userId,message:req.flash('error')[0]})
}
exports.postregisterdata=(req,res,next)=>{
    authmodel.registerfunctionmodel(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect('/login')
    }).catch((msg)=>{
        // console.log(msg)
        req.flash('error',msg)
        res.redirect('/register')
    })
    
}
exports.getloginpage=(req,res,next)=>{

    res.render('login',{verifuser:req.session.userId,message:req.flash('error')[0]})
}
exports.postlogindata=(req,res,next)=>{
    authmodel.loginfunctionmodel(req.body.email,req.body.password).then((id)=>{
        
        req.session.userId=id
        res.redirect('/')
    }).catch((err)=>{
        // console.log(err)
        req.flash('error',err)
        res.redirect('/login')
    })
}
exports.logoutfunctioncontroller=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}