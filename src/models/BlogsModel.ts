import mongoose, { Schema } from "mongoose";
import { blogs_status_enum } from "../constants/blogs";

const BlogsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    published_date: { type: Date, default: new Date() },
    modify_date: { type: Date, default: new Date() },
    status: {
      type: String,
      default: blogs_status_enum.unpublished,
      required: true,
    },
    category: { type: Array },
    author: { type: mongoose.Types.ObjectId, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  { collection: "Blogs" }
);

const BlogsModel = mongoose.model("Blogs", BlogsSchema);

export default BlogsModel;
