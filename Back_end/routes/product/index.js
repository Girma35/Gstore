const db = require("../../models/index");

const getProducts = async (req, res) => {
    try {
      // Fetching products from the "product" collection using Mongoose model
      const products = await db.product.find(); 
      
      // Sending the products as JSON response
      res.json(products); 
    } catch (error) {
      // In case of an error, send a server error response
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  };

  const setProducts = async (req, res) => {
    try {
       
      const { title, description, price, category, image, rating, id } = req.body;
      
      if (!title || !description || !price || !category || !image || !rating || !id || !rating.count || !rating.rate) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      
      const newProduct = new db.product({
        id,
        title,
        description,
        price,
        category,
        image,
        rating
      });

      const saveProduct = await newProduct.save()

      res.status(201).json(saveProduct);

    }catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Error saving product' });
      }
    }
  

  module.exports = { 
    getProducts ,
    setProducts

  };