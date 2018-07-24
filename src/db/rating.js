import mongoose, { Schema } from 'mongoose';

const RatingSchema = new Schema({
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