import mongoose, { Schema } from 'mongoose';

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  pages: [{
    type: Schema.Types.ObjectId,
    ref: "Page"
  }]
});

export default mongoose.model('Quiz', QuizSchema);