const { Cart, ProductUserCart } = require("../models/index/index");
const { default: mongoose } = require("mongoose");

exports.addmembership = async (req, res) => {
  try {
    let params = req.body;
    const { _id } = req.user;
    Cart.find({ userId: mongoose.Types.ObjectId(_id) }).exec(async (err, data) => {
      if (err) {
        res.send({ msg: "membership  not found", success: false });
      } else {
        if (!data.length) {
          let cartObj = new Cart();
          cartObj.userId = mongoose.Types.ObjectId(_id);
          cartObj.membership_list.push(mongoose.Types.ObjectId(params.membershipId));
          await cartObj.save(async (error, result) => {
            if (error) {
              res.send({ msg: error.message, success: false });
            } else {
              res.send({
                msg: "membership created successfully",
                success: true,
              });
            }
          });
        } else {
          await Cart.updateOne(
            { userId: mongoose.Types.ObjectId(_id) },
            { $push: { membership_list: params.membershipId } }
          );
          res.send({
            msg: "membership added successfully",
            success: true,
          });
        }
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.addproduct = async (req, res) => {
  try {
    let params = req.body;
    const { _id } = req.user;
    Cart.find({ userId: mongoose.Types.ObjectId(_id) }).exec(async (err, data) => {
      if (err) {
        res.send({ msg: "membership  not found", success: false });
      } else {
        if (!data.length) {
          let cartObj = new Cart();
          cartObj.userId = mongoose.Types.ObjectId(_id);
          cartObj.product_list.push({ product: mongoose.Types.ObjectId(params.productId) });
          await cartObj.save(async (error, result) => {
            if (error) {
              res.send({ msg: error.message, success: false });
            } else {
              res.send({
                msg: "product added successfully",
                success: true,
              });
            }
          });
        } else {
          await Cart.updateOne(
            { userId: mongoose.Types.ObjectId(_id) },
            { $push: { product_list: { product: mongoose.Types.ObjectId(params.productId) } } }
          );
          res.send({
            msg: "product added successfully",
            success: true,
          });
        }
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.removemembership = async (req, res) => {
  try {
    const membershipId = req.params.membershipId;
    const { _id } = req.user;
    Cart.updateOne(
      { userId: mongoose.Types.ObjectId(_id) },
      { $pull: { membership_list: membershipId } }
    ).exec((err, data) => {
      if (err) {
        res.send({ msg: error.message, success: false });
      } else {
        res.send({
          msg: "membership removed from cart successfully",
          success: true,
        });
      }
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.getitems = async (req, res) => {
  try {
    const { _id } = req.user;
    Cart.find({ userId: mongoose.Types.ObjectId(_id) })
      .populate({ path: "product_list.product" })
      .exec((err, data) => {
        if (err) {
          res.send({ msg: "product not found", success: false });
        } else {
          res.send({ data: data[0], success: true });
        }
      });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.updateProductAmount = async (req, res) => {
  try {
    const { product_id, amount } = req.body;
    const { _id } = req.user;
    Cart.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          "product_list.$[list].amount": amount,
        },
      },
      {
        arrayFilters: [
          {
            "list.product": {
              $eq: mongoose.Types.ObjectId(product_id),
            },
          },
        ],
      }
    ).exec((err, data) => {
      res.send({ msg: "successfully updated", success: true });
    });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
};

exports.membershipList = async (req, res) => {
  try {
    const perPage = req.query.perPage;
    const page = req.query.page;
    const q = req.query.q;
    const total = await Membership.find({ membership_name: { $regex: q } }).count();
    Membership.find({ membership_name: { $regex: q } })
      .skip(page * perPage)
      .limit(perPage)
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

exports.membershipUpdate = async (req, res) => {
  try {
    let membershipData = req.body;
    const membershipId = req.params.membershipId;
    Membership.updateOne({ _id: membershipId }, { $set: membershipData }).exec(
      async (err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          if (data.modifiedCount > 0) {
            return res.send({
              msg: "membership updated succesfully",
              success: true,
            });
          }
        }
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.remove = async (req, res) => {
  try {
    let id = req.params.Id;
    let delete_membership = await Membership.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    if (delete_membership.modifiedCount > 0) {
      return res.send({ msg: "membership deleted successfully", success: true });
    } else {
      return res.send({ msg: "membership not deleted", success: false });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.addUpdateProductToUserCart = async (req, res) => {
  try {
    const { _id } = req.user;
    let { productId, quantity } = req.body;
    productId = mongoose.Types.ObjectId(productId);

    const payload = { userId: _id };
    payload.products = { id: productId, quantity };

    let cart = null;
    // Check if cart and product both exists
    cart = await ProductUserCart.findOneAndUpdate(
      {
        userId: mongoose.Types.ObjectId(_id),
        "products.id": productId,
      },
      {
        $set: {
          "products.$.quantity": quantity,
        },
      },
      { new: true, runValidators: true }
    );
    if (!cart) {
      cart = await ProductUserCart.findOne({
        userId: mongoose.Types.ObjectId(_id),
      });
      // Check if only cart exists, push items
      if (cart !== null) {
        cart.products.push({
          id: productId,
          quantity,
        });
        await cart.save();
      }
      // If neither cart and product exists
      else {
        cart = await ProductUserCart.create(payload);
      }
    }

    return res.status(201).json(cart);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.deleteProductFromUserCart = async (req, res) => {
  try {
    const { _id } = req.user;
    let { productId } = req.body;

    Cart.updateOne(
      { userId: mongoose.Types.ObjectId(_id) },
      {
        $pull: { product_list: { product: mongoose.Types.ObjectId(productId) } },
      }
    ).exec((err, data) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "Cart not found or item doesn't exist" });
      } else {
        return res.status(200).json({ success: true, message: "Item Deleted" });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getProductsFromUserCart = async (req, res) => {
  try {
    const { _id } = req.user;
    // REF: GET QUERY
    const cart = await ProductUserCart.aggregate([
      {
        $match: {
          userId: _id,
        },
      },
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.id",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: {
          path: "$products",
        },
      },
      { $addFields: { products: { $mergeObjects: "$products" } } },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          products: { $push: "$products" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);
    if (cart) {
      return res.status(200).json(cart);
    }
    return res.status(404).json({ success: false, message: "Cart not found" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
