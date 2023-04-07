const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    workspace_name: {
      type: String,
    },
    timezone: {
        type: String,
      },
      img:{
        type: Array,
      },
      social_platform:{
        type: String,
      },
      status:{
        type:String
      }
      
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("fbdata", thisSchema);
