import mongoose, { Schema } from 'mongoose';

const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  }
});

export default mongoose.model('Page', PageSchema);