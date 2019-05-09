const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

module.export = mongoose.model("Data", DataSchema);
