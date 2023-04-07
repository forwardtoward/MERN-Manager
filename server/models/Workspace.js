const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollaboratorSchema = Schema(
  {
    label: String,
    value: {
      type: Schema.Types.ObjectId,
      ref: "employee-contact",
    },
    img: String,
  },
  {
    timestamps: true,
  }
);

const WorkspaceSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    title: String,
    background: {
      type: String,
      default: "",
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    collaborators: {
      type: [CollaboratorSchema],
      default: [],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", WorkspaceSchema);
