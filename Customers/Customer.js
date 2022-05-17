const mongoose= require("mongoose");

mongoose.model("Customer",{
    
    name:{
        type: String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true
    },
    country:{
        type:String,
        require:false,
    }
});