const User = require("../models/User");

exports.updateUser = async (req,res,next) => {

    try{
       const{ _id, name, email, phone} =req.body;
       const updateData ={
        name,
        email,
        phone,
        pic: req.file?.filename,
        posts:[],
       };
       const updateUser = await User.findOneAndUpdate({_id}, {$set: updateData}, {new :true});
       res.send({type: "success",  msg: "successfully updated profile"});
    } catch (error) {
        console.log(error);
        res.send({ type: "error", msg: "failed to update profile" });
      }
    };

exports.getPic = async(req,res,next) => {
    try {
        const pic = req.params.userpic;
        const user = await User.findOne({ _id: req.user._id });
        if (user) {
          res.sendFile(pic, { root: "media/user" });
        }
      } catch (error) {
        console.log(error);
        res.send({ type: "error", msg: "file not found" });
      }
    };
    
// exports.getPersonList = async (req,res) => {
//     try {
//         const users = await User.find(
//           { _id: { $ne: req.user._id } },
//           { _id: 1, name: 1, pic: 1 }
//         );
//         res.send(users);
//       } catch (error) {
//         console.log(error);
//         res.send({ type: "error", msg: "failed to fetch users" });
//       }
//     };

exports.getPropetyList = async(req,res) => {
    try {
        var user = await User.findOne({ _id: req.user._id });
        const propertyList = user.property.map((item) => item.userId);
        const userList = await User.find(
          { _id: { $in: propertyList } },
          { _id: 1, name: 1, pic: 1 }
        );
        res.send(userList);
      } catch (error) {
        console.log(error);
        res.send({ type: "error", msg: "some problem occurred" });
      }
    };

// exports.getSellerList = async (req,res) => {
//     try {
//         const user = await User.findOne({ _id: req.user._id });
//         const sellersList = user.seller.map((item) => item.userId);
//         const userList = await User.find(
//           { _id: { $in: sellersList } },
//           { _id: 1, name: 1, pic: 1 }
//         );
//         res.send(userList);
//       } catch (error) {
//         console.log(error);
//         res.send({ type: "error", msg: "failed to fetch the sellers list" });
//       }
//     };

exports.approveRequest = async (req,res) => {
    try{
    console.log(req.body);
    const approvedUser = req.body;
    const currentUserId = req.user._id;

    const user = await User.findOne({_id: currentUserId})
    const propertyListArr = user.propertyListArr.filter((item) => approvedUser._id == item.userId)
            
    if(propertyListArr.length > 0){
     const currentUserUpdateStatusDoc = await User.updateOne(
                    {_id: currentUserId},
                    {
                        $push: {buyer: {userId: approvedUser._id}},
                        $pull: {buyersReq: {userId: approvedUser._id}}
                    }
                );
                const approvedUserUpdateStatusDoc = await User.updateOne(
                    {_id: approvedUser._id},
                    {
                        $push: {buyer: {userId: currentUserId}},
                        $pull: {buyersReq: {userId: currentUserId}},
                    }
                );
                res.send({type: "success", msg: "approved successfully"});
            }else{
                res.send({type: "error", msg: "invalid buyer request"});
            }
        }
    catch(err) {
            console.log(err)
            res.send({type: "error", msg: "failed to approve request"})
        }
};