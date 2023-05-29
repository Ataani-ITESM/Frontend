import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this post."],
  },
  secret: {
    type: String,
  },
  categories: {
    type: [String],
    required: [true, "Please provide at least one category."],
  },
  message: {
    type: String,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
