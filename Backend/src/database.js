const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://MayaKhaled:Yooya2000@cluster0.5hrrd.mongodb.net/ACLdatabase?retryWrites=true&w=majority",
    async (err) => {
      if (err) {
        console.log(err);
      } else {
         console.log("DB connected successfully");
      }
    }
  );
};
module.exports = connectDB;
