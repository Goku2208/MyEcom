const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check all fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "ALl fields are necessary",
      });
    }
    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      }

      res.json({
        product,
      });
    });
  });
};

exports.remove = (req, res, next, id) => {
  let product = req.product;
  console.log(product);
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log("deleted");
    res.json({
      deletedProduct,
      msg: "product deleted",
    });
    next();
  });
};

exports.productById = (req, res, next, id) => {
  console.log("this is execute 2");
  Product.findById(id).exec((Err, product) => {
    if (Err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next();
  });
};
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check all fields
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "ALl fields are necessary",
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      }
      res.json({
        product,
      });
    });
  });
};
