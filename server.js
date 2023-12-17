const express=require('express')

const path=require('path')
const routerhome=require('./routers/home.route')
const routerbook=require('./routers/book.route')
const routerauth=require('./routers/auth.route')
const routercontact=require('./routers/contact.route')
const routerabout=require('./routers/about.route')
const session=require('express-session')
const mongodbstore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')

const app=express()

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

var store=new mongodbstore({
    uri:'mongodb://localhost:27017/library',
    collection:'mysession'
})
app.use(flash())
app.use(session({
    secret:'this is my secret key dfjsgdhdjekdjriji',
    store:store,
    resave:true,
    saveUninitialized:true
}))


app.use('/',routerhome)
app.use('/',routerbook)
app.use('/',routerauth)
app.use('/',routercontact)
app.use('/',routerabout)


app.get('/mybooks',(req,res,next)=>{
    res.render('mybooks.ejs',{verifuser:req.session.userId})
})




app.listen(3000,()=>console.log('server run in http://localhost:3000/'))