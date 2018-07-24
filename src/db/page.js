import mongoose from 'mongoose';
var Schema = mongoose.Schema;
const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  choises: [{
    type: Schema.Types.ObjectId, ref: "Choise"
  }]
});

export default mongoose.model('Page', PageSchema);