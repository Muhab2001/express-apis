const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxLength: 100,
  },
  status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending"
  },
  createdBy: {
      type: mongoose.Types.ObjectId, // a mongoose object
      ref: "User", // referenced mongoose object
      required: [true, "Please provide user"]
  }
}, {timestamps: true});


module.exports = mongoose.model("Job", JobSchema)