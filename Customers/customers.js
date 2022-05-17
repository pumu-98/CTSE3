const express= require("express");
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load mongoose
const mongoose=require("mongoose");

require("./Customer")
const Customer=mongoose.model("Customer")

mongoose.connect("mongodb+srv://Udara:Kiwidi980@users.dslj1.mongodb.net/customerservice?retryWrites=true&w=majority" ,{useNewUrlParser:true}).then(()=>
console.log("DB connected"))
.catch(err=>console.error(err));
 

app.get('/',(req,res)=>{
    res.send("customer");
})

//create functions
app.post("/customer",(req,res)=>{
     var newCustomer={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        country:req.body.country
     }

     var customer = new Customer(newCustomer)
     customer.save().then(()=>{
         console.log("New user Created")
     }).catch((err)=>{
         if(err){
             throw err;
         }

     })
     res.send("a new user created successfully")
 
})

app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.get("/customers/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{

        if(customer){
            res.json(customer)
        }else{
            res.sendStatus(404);
        }
    }).catch(err=>{
        if(err){
            throw err;
        }

    })
})

app.delete("/customers/:id",(req,res)=>{
     
    Customer.findOneAndRemove(req.params.id).then(()=>{
        res.send("Customer Removed Sucessfully")
    }).catch(err=>{
        if(err){
            throw err;
        }

    })
}) 

app.listen(5558, ()=>{
    console.log("Up and Running --Customer Server")
})