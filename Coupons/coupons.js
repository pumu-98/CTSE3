const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load mongoose
const mongoose=require("mongoose");

require("./Coupon")
const Coupon=mongoose.model("Coupon")
 
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Udara:Kiwidi980@users.dslj1.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     console.log("db connect");
//   client.close();
// });


mongoose.connect("mongodb+srv://Udara:Kiwidi980@users.dslj1.mongodb.net/couponservice?retryWrites=true&w=majority" ,{useNewUrlParser:true}).then(()=>
console.log("DB connected"))
.catch(err=>console.error(err));
 

app.get('/',(req,res)=>{
    res.send("main end1222");
})

//create functions
app.post("/coupon",(req,res)=>{
     var newCoupon={
        typeofcoupon:req.body.typeofcoupon,
        expdate:req.body.expdate,
        deal:req.body.deal,
        customername:req.body.customername
     }

     var coupon = new Coupon(newCoupon)
     coupon.save().then(()=>{
         console.log("New Coupon Created")
     }).catch((err)=>{
         if(err){
             throw err;
         }

     })
     res.send("a new coupon created successfully")
 
})

app.get("/coupons",(req,res)=>{
    Coupon.find().then((coupons)=>{
        res.json(coupons)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.get("/coupons/:id",(req,res)=>{
    Coupon.findById(req.params.id).then((coupon)=>{

        if(coupon){
            res.json(coupon)
        }else{
            res.sendStatus(404);
        }
    }).catch(err=>{
        if(err){
            throw err;
        }

    })
})

app.delete("/coupons/:id",(req,res)=>{
     
    Coupon.findOneAndRemove(req.params.id).then(()=>{
        res.send("Coupon Removed Sucessfully")
    }).catch(err=>{
        if(err){
            throw err;
        }

    })
}) 

app.listen(4548, ()=>{
    console.log("Up and Running --Coupon Server")
})