const { Product, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.create = async (req, res) => {
  const productDetails = req.body;
  const userId = req.user._id;
  const url = await GoogleCloudStorage.upload(req.file);
  try {
    productDetails.product_url = url;
    productDetails.userId = mongoose.Types.ObjectId(userId);
    const productObj = new Product(productDetails);
    await productObj.save(async (err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      } else {
        Shop.find({ userId: mongoose.Types.ObjectId(userId) }).exec(async (err, result) => {
          if (err) {
            res.send({ msg: "shop not found", success: false });
          } else {
            if (!result.length) {
              let shopObj = new Shop();
              shopObj.userId = mongoose.Types.ObjectId(userId);
              shopObj.products.push(mongoose.Types.ObjectId(data._id));
              await shopObj.save(async (error, response) => {
                if (error) {
                  res.send({ msg: error.message, success: false });
                } else {
                  res.send({
                    msg: "product created successfully",
                    success: true,
                  });
                }
              });
            } else {
              let temp = await Shop.updateOne(
                { userId: mongoose.Types.ObjectId(userId) },
                { $push: { products: data._id } }
              );
              if (temp.modifiedCount > 0) {
                res.send({
                  msg: "product created successfully",
                  success: true,
                });
              }
            }
          }
        });
      }
    });
  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.productInfo = (req, res) => {
  const productId = req.params.productId;
  try {
    Product.findOne({ _id: mongoose.Types.ObjectId(productId), isDeleted: false }).exec(
      (err, data) => {
        if (err) {
          res.send({ msg: "product  not found", success: false });
        } else {
          res.send({ data, success: true });
        }
      }
    );
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.productPublicInfo = (req, res) => {
  const productId = req.params.productId;
  try {
    Product.findOne({
      _id: mongoose.Types.ObjectId(productId),
      isDeleted: false,
      $or: [{ permission: "public" }, { permission: "all" }],
    }).exec((err, data) => {
      if (err) {
        res.send({ msg: "product  not found", success: false });
      } else {
        res.send({ data, success: true });
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.productPublicList = async (req, res) => {
  try {
    const perPage = req.query.perPage;
    const sortBy = req.query.sortBy;
    const page = req.query.page;
    const q = req.query.q;
    const shopId = req.query.shopId;
    let sort_q;
    if (sortBy === "featured") {
      sort_q = {
        isfavorite: -1,
      };
    } else if (sortBy === "price-asc") {
      sort_q = {
        product_price: 1,
      };
    } else {
      sort_q = {
        product_price: -1,
      };
    }
    const options = {
      shopId: shopId,
      product_name: { $regex: q },
      $or: [{ permission: "public" }, { permission: "all" }],
    };
    const total = await Product.find(options).count();
    Product.find(options)
      .skip(page * perPage)
      .limit(perPage)
      .sort(sort_q)
      .exec((err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          res.send({ data, success: true, total });
        }
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.productList = async (req, res) => {
  try {
    const { _id } = req.user;
    const perPage = req.query.perPage || 10;
    const sortBy = req.query.sortBy || 'featured';
    const page = req.query.page || 0;
    const q = req.query.q || '';
    let sort_q;
    if (sortBy === "featured") {
      sort_q = {
        isfavorite: -1,
      };
    } else if (sortBy === "price-asc") {
      sort_q = {
        product_price: 1,
      };
    } else {
      sort_q = {
        product_price: -1,
      };
    }
    const total = await Product.find({
      product_name: { $regex: q },
      userId: mongoose.Types.ObjectId(_id),
    }).count();
    Product.find({ product_name: { $regex: q }, userId: mongoose.Types.ObjectId(_id) })
      .skip(page * perPage)
      .limit(perPage)
      .sort(sort_q)
      .exec((err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          res.send({ data, success: true, total });
        }
      });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.productUpdate = async (req, res) => {
  const productData = req.body;
  const productId = req.params.productId;
  try {
    Product.updateOne({ _id: productId }, { $set: productData }).exec(async (err, data) => {
      if (err) {
        res.send({
          msg: err,
          success: false,
        });
      } else {
        if (data.modifiedCount > 0) {
          return res.send({
            msg: "product updated succesfully",
            success: false,
          });
        }
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  const id = req.params.Id;
  try {
    let delete_product = await Product.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_product.modifiedCount > 0) {
      return res.send({ msg: "product deleted successfully", success: true });
    } else {
      return res.send({ msg: "product not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
