const pool = require("../config/db");

// TODO: Implement the following functions

exports.getProducts = async(req, res) => {
  const { product_name } = req.query;
  
  
  res.json({ success: true, message: "This feature is not yet implemented." });
};

exports.addProduct = async(req, res) => {
  res.json({ success: true, message: "This feature is not yet implemented." });
}

exports.deleteProduct = async(req, res) => {
  res.json({ success: true, message: "This feature is not yet implemented." });
}