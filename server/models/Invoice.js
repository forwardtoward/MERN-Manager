const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    description: {
      type: String,
    },
    rate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iban: {
      type: String,
    },
    swift: {
      type: String,
    },
    routing: {
      type: String,
    },
    accountNo: {
      type: String,
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client-contact",
      required: true,
    },
    itemType: {
      type: String, //course, product,event
      required: true,
    },
    no: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    alternatePhone: {
      type: String,
    },
    companyAddress: {
      zipCode: String,
      state: String,
      city: String,
      country: String,
      street: String,
    },
    internalPaymentNote: {
      type: String,
    },
    companyName: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentDue: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `payment due should be greater than invoice date`,
      },
    },
    // invoiceBalance: {
    //   type: Number,
    // },
    dueDate: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `Due date should be greater than invoice date`,
      },
    },
    issuedDate: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `issued date should be greater than invoice date`,
      },
    },
    userAddress: {
      zipCode: String,
      state: String,
      street: String,
      city: String,
      country: String,
    },
    items: {
      type: Array,
      value: [itemsSchema],
    },
    totalAmount: {
      type: Number,
    },
    discount: {
      type: Number,

      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    logoUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PAID", "SENT", "DRAFT", "DUE", "PARTIAL PAYMENT"],
      default: "DRAFT",
    },
    currency: {
      type: String,
      enum: ["USD"],
      default: "USD",
    },
    bank: {
      type: Object,
      value: bankSchema,
    },
    salesperson: {
      type: String,
    },
    note: {
      type: String,
    },
    isDelete: { type: Boolean, default: false },
    tags: {
      type: Array,
    },
    payments: [
      {
        paymentMethod: String,
        amount: Number,
        createdAt: Date,
        currency: String,
        clientSecret: String,
      },
    ],
    payNow: {
      type: Number,
      default: 0,
      // validate: {
      //   // eslint-disable-next-line object-shorthand, func-names
      //   validator: function (value) {
      //     return value <= this.total - this.paidAmount;
      //   },
      //   message: `Can't charge more than remaining amount`,
      // },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoice", invoiceSchema);
