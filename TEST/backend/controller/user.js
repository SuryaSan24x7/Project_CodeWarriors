const User = require("../models/User")

exports.updateUser = (req,res,next) => {
    User.findOneAndUpdate(
        {_id: req.body._id}, 
        {$set: {
            name: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone, 
            gender: req.body.gender,
            pic: req.file?.filename
        }
    },
    {new: true}
    )
    .then((data) => {
        res.send({type: "success", msg: "successfully updated profile"})
    })
    .catch((err) => {
        console.log(err)
        res.send({type: "error", msg: "failed to update profile"})
    })
}

exports.getPic = (req,res,next) => {
    const picName = req.params.userpic
    res.sendFile(picName, {root: "media/user"})
    // User.findOne({_id: req.user._id})
    //     .then((usr) => {
    //         if(usr){
    //             res.sendFile(usr.pic, {root: "media/user"})
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         res.send({type: "error", msg: "file not found"})
    //     })
}

exports.getPersonList = (req,res) => {
    User.find({_id: {$ne: req.user._id}}, {_id: 1, name: 1, pic: 1})
        .then((usrs) => {
            res.send(usrs)
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to fetch users"})
        })
}

// exports.send BuyRequest = (req,res) => {
//     const loggedInUserId = req.user._id
//     const otherUserId = req.body.userId
//     User.updateOne(
//         {_id: req.body.userId},
//         {$push: { BuyRequest: {userId: loggedInUserId}}}
//     )
//         .then((doc) => {
//             if(doc.modifiedCount){
//                 User.updateOne(
//                     {_id: req.user._id},
//                     {$push: {send BuyRequest: {userId: otherUserId}}}
//                 )
//                     .then((doc) => res.send({type: "success", msg: " Buy request sent"}))
//                     .catch((err) => {
//                         console.log(err)
//                         res.send({type: "error", msg: "failed to send  Buy request"})
//                     })
//             }   
//         })
//         .catch((err) => {
//             console.log(err)
//             res.send({type: "error", msg: "failed to send  Buy request"})
//         })
        
// }

// exports.get BuyRequestList = (req,res) => {
//     User.findOne({_id: req.user._id})
//         .then((usr) => {
//             let  BuysRequestIdList = usr. BuyRequest.map((item) => item.userId)
//             User.find({_id: {$in: BuysRequestIdList}},{_id: 1, name: 1, pic: 1})
//                 .then((usrList) => res.send(usrList))
//                 .catch((err) => {
//                     console.log(err)
//                     res.send({type: "error", msg: "some problem occured"})
//                 })
//         })
//         .catch((err) => {
//             console.log(err)
//             res.send({type: "error", msg: "failed to fetch the  Buy requests"})
//         })
// }

// exports.get BuysList = (req, res) => {
// 	User.findOne({ _id: req.user._id })
// 		.then((usr) => {
// 			let  BuysIdList = usr. Buys.map((item) => item.userId);
// 			User.find(
// 				{ _id: { $in:  BuysIdList } },
// 				{ _id: 1, name: 1, pic: 1 }
// 			)
// 				.then((usrList) => {
// 					res.send(usrList);
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					res.send({ type: "error", msg: "Some Problem Occured" });
// 				});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.send({
// 				type: "error",
// 				msg: "Failed to fetch the  Buys",
// 			});
// 		});
// };

// exports.approveRequest = (req,res) => {
//     console.log(req.body)
//     let approvedUser = req.body
//     let currentUserId = req.user._id
//     User.findOne({_id: currentUserId})
//         .then(async (usr) => {
//             let  BuyRequestArr = usr. BuyRequest.filter((item) => approvedUser._id == item.userId)
//             if( BuyRequestArr.length > 0){
//                 let currentUserUpdateStatusDoc = await User.updateOne(
//                     {_id: currentUserId},
//                     {
//                         $push: { Buys: {userId: approvedUser._id}},
//                         $pull: { BuyRequest: {userId: approvedUser._id}}
//                     }
//                 )
//                 let approvedUserUpdateStatusDoc = await User.updateOne(
//                     {_id: approvedUser._id},
//                     {
//                         $push: { Buys: {userId: currentUserId}},
//                         $pull: {sent BuyRequest: {userId: currentUserId}}
//                     }
//                 )
//                 res.send({type: "success", msg: "approved successfully"})
//             }else{
//                 res.send({type: "error", msg: "invalid  Buy request"})
//             }
//         })
//         .catch((err) => {
//             console.log(err)
//             res.send({type: "error", msg: "failed to approve request"})
//         })
// }