import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then()
  .catch((err) => {
    console.log(err);
    console.log(
      err.code === "ETIMEOUT"
        ? "Hi Poll App! Please check your internet connection and try again."
        : ""
    );
  });

const mongoConnection = mongoose.connection;

export default mongoConnection;
