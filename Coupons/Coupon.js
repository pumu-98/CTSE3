const mongoose= require("mongoose");

mongoose.model("Coupon",{
    
    typeofcoupon:{
        type: String,
        require:true,
    },
    expdate:{
        type:Date,
        require:true,
    },
    deal:{
        type:Number,
        require:true
    },
    customername:{
        type:String,
        require:false,
    }
});