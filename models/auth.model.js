const mongoose=require('mongoose')
const  bcrypt=require('bcrypt')
const joi=require('joi')

const schemaValidation=joi.object({
    name:joi.string().alphanum().min(4).required().max(15),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

var schemaauth=mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
var User=mongoose.model('user',schemaauth)
var url="mongodb://localhost:27017/library"
exports.registerfunctionmodel=(name,email,password)=>{
//test email if exist(true goo to login)(false add this user to users collection)
     return new  Promise((resolve,reject)=> {
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let validation=  schemaValidation.validate({name:name,email:email,password:password})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            return User.findOne({email:email})
        }).then((user)=>{
            if(user){

                mongoose.disconnect()
                reject('this email already registred!')
            }else{
               const hashedpassword= bcrypt.hash(password,15)
               console.log(hashedpassword)
             return hashedpassword
            }
        }).then((hpassword)=>{
            console.log(hpassword)
             let user=new User({
                name:name,
                email:email,
                password:hpassword,
             })
             return user.save()
        }).then((user)=>{
            mongoose.disconnect()
            resolve('registered!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
     })
}
exports.loginfunctionmodel=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return User.findOne({email:email})
        }).then((user)=>{
            if(user){
                bcrypt.compare(password,user.password).then((verif)=>{
                     if(verif){
                        mongoose.disconnect()
                        resolve(user._id)
                     }else{
                        mongoose.disconnect()
                        reject('invalid password')
                     }

                })
            }else{
                mongoose.disconnect()
                reject("wee don't have this user in our database")
            }
        }).catch(()=>{
            reject(err)
        })
    })
}