
import mongoose from 'mongoose';
import Choice from './choice';
import Rating from './rating';
import Page from './page';
import Quiz from './quiz';

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;


export const startDB = ({user,pwd,url,db}) => {
  const connectionString = `mongodb://${user}:${pwd}@${url}/${db}`
  mongoose.connect(connectionString, {
    useNewUrlParser: true
  });
  mongoose.connection.on("connected", function () {
    console.log("Connected to " + connectionString);
  });

  mongoose.connection.on("error", function (error) {
    console.log("Connection to " + connectionString + " failed:" + error);
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Disconnected from " + connectionString);
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Disconnected from " + connectionString + " through app termination");
      process.exit(0);
    });
  });
}

export const models = {
  Choice,
  Rating,
  Page,
  Quiz
}