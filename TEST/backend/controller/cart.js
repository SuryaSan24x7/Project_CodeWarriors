const Cart = require("../models/Cart");
const User = require("../models/User");

// POST endpoint for adding items to cart
exports.createCart = async (req, res) => {
  try {
    var data = {
      userId: req.user._id,
      postText: req.body.postText,
      postImage: req.file.filename,
      postType: req.body.postType,
      postCity: req.body.postCity,
      postState: req.body.postState,
      postDistrict: req.body.postDistrict,
      postAddress: req.body.postAddress,
      postYear: req.body.postYear,
      postDimension: req.body.postDimension,
      postSqArea: req.body.postSqArea,
    };
    const cart = new Cart(data);
    console.log(data);
    await cart.save();
    res.send({ type: "success", msg: "Cart updated successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "Failed to update cart" });
  }
};

// Function to get cart items for a user
exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.posts.map((item) => item.postId);
    idList.unshift(req.user._id);
    const cartList = await Cart.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(cartList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to fetch cart" });
  }
};

// Function to get cart items added by a user
exports.getAddedCart = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.carts.map((item) => item.cartId);
    idList.unshift(req.user._id);
    const cartList = await Cart.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(cartList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "Failed to fetch added cart" });
  }
};


exports.updateCart = (req, res, next) => {
  Cart.findOneAndUpdate(
      { _id: req.user._id },
      {
          $set: {
              postText: req.body.postText,
              postImage: req.file.filename,
              postType: req.body.postType,
              postCity: req.body.postCity,
              postState: req.body.postState,
              postDistrict: req.body.postDistrict,
              postAddress: req.body.postAddress,
              postYear: req.body.postYear,
              postDimension: req.body.postDimension,
              postSqArea: req.body.postSqArea,
              userAddress: "0x0e97c9BC912D6e26fE6854dC5FBC2eAD62a662a8",
              newOwnerAddress:req.body.newOwner
          },
      },
      { new: true }
  )
      .then((data) => {
          res.send({ type: "success", msg: "Successfully Transfered Ownership" });
      })
      .catch((err) => {
          console.log(err);
          res.send({ type: "error", msg: "Failed" });
      });
};

