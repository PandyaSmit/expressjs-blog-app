import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  },
  { collection: "Categories" }
);

const CategoryModel = mongoose.model("Categories", CategorySchema);

export default CategoryModel;
