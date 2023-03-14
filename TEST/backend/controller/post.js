// const mongoose = require('mongoose');
// const Post = require("../models/Post");
// const User = require("../models/User");
// const Ledger=require("../models/Ledger");
// const contractInstance = require("../helpers/getContractInstance");


// exports.createPost = async (req, res) => {
//   try {
//     var data = {
//       userId: req.user._id,
//       postText: req.body.postText,
//       postImage: req.file.filename,
//       postType: req.body.postType,
//       postCity: req.body.postCity,
//       postState: req.body.postState,
//       postDistrict: req.body.postDistrict,
//       postAddress: req.body.postAddress,
//       postYear: req.body.postYear,
//       postDimension: req.body.postDimension,
//       postSqArea: req.body.postSqArea,
//       userAddress: req.body.userAddress,
//       old_owner:req.body.userAddress
//     };
//     const post = new Post(data);
//     console.log(data);
//     // Call to Blockchain : createNFTToken function
//     const { REToken, MyRealEstate } = await contractInstance.getInstance();
//     // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
//     let txObj = await contractInstance.getTxObject(data.userAddress);

//     let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
//     // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
    
//     console.log('Transaction Hash : ', txReceipt.transactionHash);
//     console.log('Block Number : ', txReceipt.blockNumber);
//     let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
//     console.log('Events',returnValue);
//     console.log(' ID', returnValue.id);
    
//     let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();
//     // console.log('REsult -----> ', owner);

//     //TODO: insert required data into database
//     var data2={
//       userId: req.user._id,
//       postText: req.body.postText,
//       postImage: req.file.filename,
//       postType: req.body.postType,
//       postCity: req.body.postCity,
//       postState: req.body.postState,
//       postDistrict: req.body.postDistrict,
//       postAddress: req.body.postAddress,
//       postYear: req.body.postYear,
//       postDimension: req.body.postDimension,
//       postSqArea: req.body.postSqArea,
//       userAddress: req.body.userAddress,
//       txn_id:returnValue.id
//     }
//     const ledger = new Ledger(data2);

//     await post.save();
//     await ledger.save();
//     res.send({ type: "success", msg: "post created successfully" });
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "danger", msg: "failed to save post" });
//   }
// };
// exports.updatePost = (req, res, next) => {
//   console.log(req.body._id);
// 	Post.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				price: req.body.price,
// 				list: req.body.list
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Successfully updated profile" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to update the profile" });
// 		});
// };

// exports.getPic = async (req, res, next) => {
//   const picName = req.params.postpic;
//   res.sendFile(picName, { root: "media/posts" });
// };

// exports.getPosts = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ _id: req.user._id });
//     let idList = user.posts.map((item) => item.userId);
//     idList.unshift(req.user._id);
//     const postList = await Post.find({ userId: { $in: idList } }).populate({
//       path: "userId",
//       select: "_id name pic",
//     });
//     res.send(postList);
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "error", msg: "failed to fetch property lists" });
//   }
//   // try {
//   //   const user = await User.findOne({ _id: req.user._id });
//   //   let idList = user.posts.map((item) => item.userId);
//   //   idList.unshift(req.user._id);
//   //   const postList = await Post.find({ userId: { $in: idList } }).populate({
//   //     path: "userId",
//   //     select: "_id name pic",
//   //   });
//   // } catch (err) {
//   //   console.log(err);
//   //   res.send({ type: "error", msg: "failed to fetch property posts" });
//   // }
// };

// exports.getAllPosts = async (req, res, next) => {
//   try {
//     if(Post.list="1"){
//     const postList = await Post.find({}).populate({
//       path: "userId",
//       select: "_id name pic",
//     });
//     res.send(postList);}
//   } catch (err) {
//     console.log(err);
//     res.send({ type: "error", msg: "failed to fetch property lists" });
//   }

// };
// exports.sellPost = async (req, res, next) => {
//   var data = {
//     userId: req.user._id,
//     postText: req.body.postText,
//     postImage: req.file.filename,
//     postType: req.body.postType,
//     postCity: req.body.postCity,
//     postState: req.body.postState,
//     postDistrict: req.body.postDistrict,
//     postAddress: req.body.postAddress,
//     postYear: req.body.postYear,
//     postDimension: req.body.postDimension,
//     postSqArea: req.body.postSqArea,
//     userAddress: req.body.userAddress,
//     old_owner:req.body.userAddress,
//     price:req.body.price
//   };
//   const post = new Post(data);
//   console.log(data);
//   const { REToken, MyRealEstate } = await contractInstance.getInstance();
//   // console.log('MyRealEstate Methods: ', MyRealEstate.methods);
//   let txObj = await contractInstance.getTxObject(data.userAddress);

//   let txReceipt = await MyRealEstate.methods.createNFTToken(data.userAddress, "URI").send(txObj);
//   // console.log('TxObj ------', txReceipt.events.RNFTTokenMinted.returnValues);
  
//   console.log('Transaction Hash : ', txReceipt.transactionHash);
//   console.log('Block Number : ', txReceipt.blockNumber);

//   let returnValue = txReceipt.events.RNFTTokenMinted.returnValues;
//   console.log('Events',returnValue);
//   console.log(' ID', returnValue.id);

//   let txReceipt1 = await MyRealEstate.methods.PurchaseERC20Tokens(data.userAddress,"URI", "UPI").send(txObj);
//   console.log('Transaction Hash : ', txReceipt.transactionHash);
//   console.log('Block Number : ', txReceipt.blockNumber);

//   let returnValue1 = txReceipt1.events.ERC20TokenMinted.returnValues;
//   console.log('amount',returnValue1.price);


  
//   let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();

//   let new_owner = await MyRealEstate.methods.getPropertyOwner(returnValue1.id).call();

//   console.log(req.body._id);
// 	Post.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				new_owner: req.body.new_owner,
//         list:"0"
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Sold" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to Sell" });
// 		});
// };
// exports.updateLedger =async(req,res) => {
//   try {
//     console.log(req.body._id);
// 	Ledger.findOneAndUpdate(
// 		{ _id: mongoose.Types.ObjectId(req.body._id)},
// 		{
// 			$set: {
// 				new_owner: req.body.new_owner,
// 				list: "0",
//         old_owner:req.body.userAddress
// 			},
// 		},
// 		{ new: true }
// 	)
// 		.then((data) => {
//       console.log(data);
// 			res.send({ type: "success", msg: "Successfully updated profile" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({ type: "error", msg: "Failed to update the profile" });
// 		});
    

//   } catch (err) {
//     console.log(err);
//     res.send({ type: "danger", msg: "failed to save post" });
//   }
// };

const mongoose = require('mongoose');
const Post = require("../models/Post");
const User = require("../models/User");
const Ledger=require("../models/Ledger");
const contractInstance = require("../helpers/getContractInstance");


exports.createPost = async (req, res) => {
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
      userAddress: req.body.userAddress
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
    var data2={
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
      userAddress: req.body.userAddress,
      txn_id:returnValue.id
    }
    const ledger = new Ledger(data2);

    await post.save();
    await ledger.save();
    res.send({ type: "success", msg: "post created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "failed to save post" });
  }
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
    const postList = await Post.find({ list: "1" }).populate({
      path: "userId",
      select: "_id name pic",
    });
    res.send(postList);
  } catch (err) {
    console.log(err);
    res.send({ type: "error", msg: "failed to fetch property lists" });
  }

};
exports.sellPost = async (req, res, next) => {
  console.log(req.body._id);
	Post.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body._id)},
		{
			$set: {
				new_owner: req.body.new_owner,
        list:"0"
			},
		},
		{ new: true }
	)
		.then((data) => {
      console.log(data);
			res.send({ type: "success", msg: "Sold" });
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to Sell" });
		});
};
exports.updateLedger =async(req,res) => {
  console.log(req.body._id);
	Ledger.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body._id)},
		{
			$set: {
				new_owner: req.body.new_owner,
				list: req.body.list
			},
		},
		{ new: true }
	)
		.then((data) => {
      console.log(data);
			res.send({ type: "success", msg: "Successfully updated Ledger" });
		})
		.catch((err) => {
			console.log(err);
			res.send({ type: "error", msg: "Failed to update the profile" });
		});
};

