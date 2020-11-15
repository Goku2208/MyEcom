const Category = require("../models/category");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const { findById } = require("../models/category");
const { json } = require("body-parser");

exports.categoryById = (req, res, next, id) => {
  const category = findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: err,
      });
    }
    req.category = category;
    next();
  });
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "category deleted" });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    res.json({
      category,
    });
  });
};
