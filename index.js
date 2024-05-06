const mongoose = require("mongoose");
const envProcess = require("./utils/config");
const app = require("./app");

console.log("Connecting to the database.... ");

mongoose
  .connect(`${envProcess.MONGODB_URI}${envProcess.DB_NAME}`)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(envProcess.PORT, () => {
      console.log(`Server running on port ${envProcess.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the MongoDB", error.message);
  });
