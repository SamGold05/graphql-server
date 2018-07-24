import mongoose from 'mongoose';

const ChoiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    default: "choice",
  },
});

export default mongoose.model('Choice', ChoiceSchema);