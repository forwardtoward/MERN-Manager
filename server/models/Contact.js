const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    contactType: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "contact-type",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    photo: { type: String, default: "" },

    gender: {
      type: String,
      enum: ["male", "female", "transgender", ""],
      default: "",
    },
    address: {
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
    },
    socialLinks: [
      {
        logo: String,
        name: String,
        link: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
    note: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },

    tags: {
      type: Array,
      default: [],
    },

    company: { type: String, default: "" },
    companyPhone: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyAddress: {
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
    },
    type: {
      type: String,
      // enum: ["individual", "company", "n/a"],
      default: "n/a",
    },

    position: {
      type: String,
      // enum: ["owner", "assitant", "billing", "n/a"],
      // enum is not ok here because it can be other Position like Manager, Secretary etc
      default: "n/a",
    },
    ranks: [
      {
        name: {
          type: String,
          required: true,
        },
        photo: String,
        createdAt: Date,
      },
    ],

    // ** files
    files: [
      {
        title: {
          type: String,
          required: true,
        },
        file: String,
        createdAt: Date,
      },
    ],

    //
    others: [
      {
        address: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        startDate: { type: Date, default: Date.now() },
        endDate: Date,
        file: String,
      },
    ],

    // Billing Address
    billingAddress: {
      // firstName: String,
      // lastName: String,
      country: {
        type: String,
        default: "",
      },

      street: {
        type: String,
        default: "",
      }, // ** New Field
      town: {
        type: String,
        default: "",
      },
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
    },
    paymentMethods: [
      {
        cardType: String, // visa, mastercard,
        isPrimary: {
          type: Boolean,
          default: false,
        },
        cardHolder: String,
        cardNumber: {
          type: String,
          maxlength: 16,
        },
        expiryDate: {
          type: String,
        },
        // cvv: {
        //   type: String,
        // },
      },
    ],

    leadSource: {
      type: String,
    },
    isFormer: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    //------------ Employee ----------------------------------------------------------------
    role: { type: mongoose.Schema.Types.ObjectId, ref: "roles", required: false },
    shift: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee-shift" }],
    salary: {
      type: Number,
    },
    punchId: {
      type: Number,
    },
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "outlets",
      default: null,
    },
    employee_position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee-positions",
      default: null,
    },
    hashed_password: {
      type: String,
      default: null,
    },
    punchState: {
      type: Boolean,
      default: false,
    },
    isAddCalendar: { type: Boolean, default: false },
    isInternship: { type: Boolean, default: false },
    //------------ Lead ----------------------------------------------------------------
    stage: {
      type: String,
      default: "cold",
      enum: ["cold", "warm", "hot"],
    },
    //------------New ------------------------------------------------------------------
    family: [
      {
        name: {
          type: String,
          default: "",
        },
        age: {
          type: Number,
          default: 0,
        },
        gender: {
          type: String,
          default: "",
        },
        weight: {
          type: String,
          default: "",
        },
        height: {
          type: String,
          default: "",
        },
        size: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", ContactSchema);
