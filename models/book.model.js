

const mongoose=require('mongoose')
const { resolve } = require('path')

var schemabook=mongoose.Schema({
id:String,
title:String,
author:String,
discription:String,
price:Number,
image:String,
userId:String,
})
var Book=mongoose.model('book',schemabook)
var url='mongodb://localhost:27017/library'
exports.getthreebooks=()=>{
   return new Promise((resolve,reject)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
     return Book.find({}).limit(3)



    }
    ).then(books=>{
        mongoose.disconnect()
        resolve(books)
    }).catch(err=>{reject(err)})

   })

}
exports.getallbooks=()=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return Book.find({})
 
 
 
     }
     ).then(books=>{
         mongoose.disconnect()
         resolve(books)
     }).catch(err=>{reject(err)})
 
    })
 
 
 
 
 }
exports.getonebookdetails=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return Book.findById(id)
 
 
 
     }
     ).then(books=>{
         mongoose.disconnect()
         resolve(books)
     }).catch(err=>{reject(err)})
 
    })
 
 
 
 
 }
exports.postdatabookmodel=(title,description,author,price,image,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let book=new Book({
                title:title,
                discription:description,
                author:author,
                price:price,
                image:image,
                userId:userId
            })
            return book.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve('added !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getmybooks=(userId)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return Book.find({userId:userId}) 
 
 
 
     }
     ).then(books=>{
         mongoose.disconnect()
         resolve(books)
     }).catch(err=>reject(err))
 
    })
 
 
 
 
 }
exports.deletebook=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return Book.deleteOne({_id:id})
 
 
 
     }
     ).then(books=>{
         mongoose.disconnect()
         resolve(true)
     }).catch(err=>{reject(err)})
 
    })
}

exports.getpageupdatebookmodel=(id)=>{
    return new Promise((resolve,reject)=>{
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      return Book.findById(id) 
 
 
 
     }
     ).then(books=>{
         mongoose.disconnect()
         resolve(books)
     }).catch(err=>reject(err))
 
    })
 
 
 
 
}
exports.postupdatebookmodel=(bookid,title,discription,author,price,filename,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Book.updateOne({_id:bookid},{title:title,discription:discription,author:author,image:filename,price:price,userid:userId})
        }).then(()=>{
            mongoose.disconnect()
            resolve('updated !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}












