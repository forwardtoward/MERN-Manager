const mongoose = require("mongoose");

const planBoughtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: false,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: false,
    },
    paymentInfo: {
      type: Object,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription-plan",
      require: true,
    },
    startDate:{
        type:Date
    },
    expireDate:{
        type:Date
    },
    isSubscribed:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['active','waiting','suspended','upgraded']
    }
  },
  {
    collection: "subscriptions-bought",
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("subscriptions-bought", planBoughtSchema);
