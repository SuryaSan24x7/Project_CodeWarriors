const mongoose = require('mongoose');
const Post = require("../models/Post");
const User = require("../models/User");
const contractInstance = require("../helpers/getContractInstance");


exports.createPost = async (req, res) => {
  // try {
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
      userAddress: "0xDC1f5CA2661404b2c9544E529bB2D65DfABA03c0"
    };
    const post = new Post(data);
    console.log(data);
    // Call to Blockchain : createNFTToken function
    const { REToken, MyRealEstate } = await contractInstance.getInstance();
    // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
    let txObj = await contractInstance.getTxObject(data.userAddress);

    let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
    // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
    
    console.log('Transaction Hash : ', txReceipt.transactionHash);
    console.log('Block Number : ', txReceipt.blockNumber);
    let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
    console.log('Events',returnValue);
    console.log(' ID', returnValue.id);
    
    let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();
    // console.log('REsult -----> ', owner);

    //TODO: insert required data into database
    await post.save();
    res.send({ type: "success", msg: "post created successfully" });
  // } catch (err) {
  //   console.log(err);
  //   res.send({ type: "danger", msg: "failed to save post" });
  // }
};
exports.updatePost = (req, res, next) => {
  console.log(req.body._id);
	Post.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body._id)},
		{
			$set: {
				price: req.body.price,
				list: req.body.list
			},
		},
		{ new: true }
	)
		.then((data) => {
      console.log(data);
			res.send({ type: "success", msg: "Successfully updated profile" });
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to update the profile" });
		});
};

exports.getPic = async (req, res, next) => {
  const picName = req.params.postpic;
  res.sendFile(picName, { root: "media/posts" });
};

exports.getPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    let idList = user.posts.map((item) => item.userId);
    idList.unshift(req.user._id);
    const postList = await Post.find({ userId: { $in: idList } }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch property lists" });
  }
  // try {
  //   const user = await User.findOne({ _id: req.user._id });
  //   let idList = user.posts.map((item) => item.userId);
  //   idList.unshift(req.user._id);
  //   const postList = await Post.find({ userId: { $in: idList } }).populate({
  //     path: "userId",
  //     select: "_id name pic",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.send({ type: "error", msg: "failed to fetch property posts" });
  // }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const postList = await Post.find({}).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch property lists" });
  }
};
