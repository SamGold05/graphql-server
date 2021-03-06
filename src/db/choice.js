import mongoose, { Schema } from 'mongoose';

const ChoiceSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    default: "choice",
  },
  page: { 
    type: Schema.Types.ObjectId,
    ref: "Page"
  }
});

export default mongoose.model('Choice', ChoiceSchema);