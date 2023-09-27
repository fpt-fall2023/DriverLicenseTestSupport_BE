const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });


//* Connect MongoDB
const connectString = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(connectString, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 9900;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}...`);
});
