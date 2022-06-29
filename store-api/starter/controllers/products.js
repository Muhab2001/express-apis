const Product = require("../models/product");

// testing route
const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  // querying for all objects in the DB
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  // throw new Error("Testing async errors")
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query); we have checkes access correctly
  const { featured, company, name, sort, fields, numericFilters } = req.query; // destruture to filter unspecified features
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true"; // boolean is a string
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"]
    filters = filters.split(",").forEach(item => {
      const [field, operator, value] = item.split("-")
      if(options.includes(field)){  // check for the option exiatence in our list
        queryObject[field] = {[operator]: Number(value)} // Be careful from strings !!
      }
    })
    console.log(filters);
  }

  console.log(queryObject);
  // we removed await, to chain the query, and not the returned object
  let result = Product.find(queryObject);
  if (sort) {
    // products = products.sort();
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit); // pagination functionality
  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
