import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    default: "rating",
  },
});

export default mongoose.model('Rating', RatingSchema);