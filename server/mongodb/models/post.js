import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: String,
  prompt: String,
  photo: String,
});

export default mongoose.model('Post', PostSchema);
