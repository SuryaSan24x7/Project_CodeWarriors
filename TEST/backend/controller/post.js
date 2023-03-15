const mongoose = require('mongoose');
const Post = require("../models/Post");
const User = require("../models/User");
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
      userAddress: "0xc67e5FFF9316476236B104993d91309170bb7BAC"
    };
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
    data['tokenId'] = returnValue.id;
    const post = new Post(data);
    console.log(data);
    
    let owner = await MyRealEstate.methods.getPropertyOwner(returnValue.id).call();
    // console.log('REsult -----> ', owner);

    //TODO: insert required data into database
    await post.save();
    res.send({ type: "success", msg: "post created successfully" });
  } catch (err) {
    console.log(err);
    res.send({ type: "danger", msg: "failed to save post" });
  }
};
exports.updatePost = async (req, res, next) => {
  console.log(req.body._id);
  try {
   let result = await Post.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id)},
      {
        $set: {
          price: req.body.price,
          list: req.body.list
        },
      },
      { new: true }
    )
  console.log('List property for sale', result);
  const { REToken, MyRealEstate } = await contractInstance.getInstance();
  let txObj = await contractInstance.getTxObject(result.userAddress);
  let isPropertyForSale = false;
  if(req.body.list == '1'){
    isPropertyForSale = true;
  }
  // Smart contract call to list property for sale
  let txReceipt = await MyRealEstate.methods.listPropertyForSale(result.tokenId, req.body.price, isPropertyForSale).send(txObj);
  console.log('TxReceipt for listPreoertyForSale', txReceipt);
  //TODO: get the required data from events and push to database

  // Smart contract call to setApprovalForAll 
  // this allows Escrow contract to transfer the NFT token to buyer on behalf of owner
  let escrowContractAddress = await MyRealEstate.methods.getEscrowContractAddress().call();
  console.log('Escrow Contract Address', escrowContractAddress);
  txReceipt = await REToken.methods.setApprovalForAll(escrowContractAddress, isPropertyForSale).send(txObj);
  console.log('Tx Receipt for setApprovalForAll', txReceipt);
  //TODO: get the required data from events and push to database
  res.send({ type: "success", msg: "Property is listed for sale" });

  } catch (error) {
    console.log(error);
    res.send({ type: "error", msg: "Failed to list property for sale" });

  }

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
