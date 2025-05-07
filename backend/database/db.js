const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://angiedejauregui:hVs5llzED9iIuOUY@cluster0.t2anmhn.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = db