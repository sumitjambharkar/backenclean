const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const Port = process.env.PORT || 3001
const fast2sms = require('fast-two-sms')
const Data = require('./model/Data');
const User = require('./model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://sumit:Sumitjambharkar@cluster0.tseta.mongodb.net/sundaymern?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})


app.get('/',(req,res)=>{
    Data.find()
   .then(result=>{
        res.json({result})})
   .catch(err=>{
    res.json({err})
   })

})

app.get('/:id',(req,res)=>{
    Data.findById({_id:req.params.id})
    .then(result=>{
        res.json({result})})
   .catch(err=>{
        res.json({err})
   })



})

app.post('/register',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
        return res.json({err})
    }
    else{
        const user = User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })
        user.save()
        .then(result=>{
            res.json({result})
        })
        .catch(err=>{
            res.json({err})
        })
    }
    })


})

app.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(!user){
            return res.json({masge:"not user"})
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                return res.json({masge:"pass Not Match"})
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,
                    email:user[0].email,
                    password:user[0].password
                },
                "MY SECRET CODE",
                {
                    expiresIn:24
                }
                )
                res.json({
                    username:user[0].username,
                    email:user[0].email,
                    password:user[0].password,
                    token:token

                })
            }
        })
    })
    .catch(err=>{
        res.json({err:"err",err})
    })
    

})

app.post('/datas',(req,res)=>{
    const data = new Data({
        top_name:req.body.top_name,
        service:req.body.service,
        Descrption:req.body.Descrption,
        image:req.body.image,
        menu:[
            {
                name:req.body.name,
                price:req.body.price
            }
        ]
    })
    data.save()
    .then((result)=>{
        res.json({result})
    }).catch(err=>{
        res.json({err})
    })

})





app.put('/datas/:id',(req,res)=>{
   Data.findOneAndUpdate({id:req.params.id},{
       $set:{
        top_name:req.body.top_name,
        service:req.body.service,
        Descrption:req.body.Descrption,
        image:req.body.image,
       }
   }).then(result=>{
       res.json({result,msge:'update data'})
   })
   .catch(err=>{
       res.json({err,msge:'err'})
   })

})

app.post('/user-feedback',async(req,res)=>{
    const feedBack = await User.create(req.body)
    res.status(200).json(feedBack)

})
app.post('/user-send-message',async(req,res)=>{
    try{
        const user = await User.create(req.body)
        const respone = await fast2sms.sendMessage({authorization : process.env.API_KEY , message :req.body.message, numbers : [7021595850]})
        res.status(200).send(respone).json(user)
    }catch(err) {
        console.error(err);
    }

})

app.listen(Port,()=>{
    console.log(`Example app listening on port ${Port}`);
})