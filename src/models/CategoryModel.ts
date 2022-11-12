import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  { collection: "Categories" }
);

const CategoryModel = mongoose.model("Categories", CategorySchema);

export default CategoryModel;
