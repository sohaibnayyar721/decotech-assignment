const productSchema = require("../model/productSchema");

const postProduct = async (req, res) => {
  const { name, color, size, details, price } = req.body;

  try {
    const imageUrls = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const addProducts = new productSchema({
      name: name,
      color: color,
      size: size,
      details: details,
      price: price,
      pictures: imageUrls,
    });

    const savedProduct = await addProducts.save();

    return res.status(201).json({
      message: "Product Added SuccessFully",
      products: savedProduct,
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(404).json({ message: "Products Insertion Failed" });
  }
};

const getProduct = async (req, res) => {
  let { search, limit = 5, page = 1 } = req.query;
  let offSet = (page - 1) * limit;
  let isNextPage = true;
  let products;

  try {
    if (search) {
      products = await productSchema
        .find({
          $or: [
            { name: { $regex: `${search}`, $options: "i" } },
            { description: { $regex: `${search}`, $options: "i" } },
            { category: { $regex: `${search}`, $options: "i" } },
          ],
        })
        .skip(offSet)
        .limit(limit);
    } else {
      products = await productSchema.find({}).skip(offSet).limit(limit);
    }

    return res.status(200).json({
      products: products,
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(404).json({ message: "Cannot get products" });
  }
};

const getSingleProduct = async (req, res) => {
  let { id } = req.params;
  try {
    const products = await productSchema.findById(id);
    return res.status(200).json({
      products: products,
    });
  } catch (err) {
    console.log("error: ", err);
    res.status(404).json({ message: "Cannot get products" });
  }
};

const deleteProduct = async (req, res) => {
  console.log("delete api");
  try {
    const { id } = req.params;
    // await cloudinary.uploader.destroy(public_id);
    let deleteProducts = await productSchema.findByIdAndDelete(id);
    console.log(deleteProducts);
    if (!deleteProducts) {
      res.status(404).json({ message: "Failed To Delete." });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting image" });
  }
};

const change = async (req, res) => {
  try {
    const products = await productSchema.find(); // Fetch all products

    // Loop through all products to update the price field
    const updatePromises = products.map(async (product) => {
      if (product.price && !isNaN(product.price)) {
        // Convert price from string to number and update in MongoDB
        const updatedProduct = await productSchema.findByIdAndUpdate(
          product._id,
          { price: parseFloat(product.price) },
          { new: true }  // Return the updated document
        );
        return updatedProduct;
      }
      return product;  // If price is already numeric or invalid, return the original product
    });

    // Wait for all updates to complete
    const updatedProducts = await Promise.all(updatePromises);

    // Return the updated products
    res.status(200).json(updatedProducts);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

module.exports = {
  postProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  change,
};
