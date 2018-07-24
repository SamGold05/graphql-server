
import mongoose from 'mongoose';
import Choice from './choice';
import Rating from './rating';

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

export const startDB = ({ user, pwd, url, db }) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`, {useNewUrlParser: true});
  
export const models = {
  Choice,
  Rating
}
