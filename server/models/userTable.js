const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    
    firstName: {
      type: String,
    },
    lastName:{
        type: String,
    },
    email: {
      type: String,
    },
     
    mobile: {
      type: Number,
      require: true,
    },
    
   
    password: {
      type: String,
    },
   

  
    status: {
      type: String,
      //default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userTable", userSchema);
