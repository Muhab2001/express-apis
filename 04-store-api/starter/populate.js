require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // delete all available products
    await Product.deleteMany();
    // populate from a json array
    await Product.create(jsonProducts);
    console.log("Successful connection");
    process.exit(0); // terminate process with success code
  } catch (err) {
    console.log(err);
    process.exit(1); // terminate process with err code
  }
};

start();
