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

exports.getBuyerList = (req,res) => {
    User.findOne({_id: req.user._id})
        .then((usr) => {
            let buyersList = usr.buyer.map((item) => item.userId)
            User.find({_id: {$in:buyersList}},{_id: 1, name: 1, pic: 1})
                .then((usrList) => res.send(usrList))
                .catch((err) => {
                    console.log(err)
                    res.send({type: "error", msg: "some problem occured"})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to fetch the buyers  list"})
        })
}

exports.getSellerList = (req,res) => {
    User.findOne({_id: req.user._id})
        .then((usr) => {
            let sellersList = usr.seller.map((item) => item.userId)
            User.find({_id: {$in:sellersList}},{_id: 1, name: 1, pic: 1})
                .then((usrList) => res.send(usrList))
                .catch((err) => {
                    console.log(err)
                    res.send({type: "error", msg: "some problem occured"})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to fetch the sellers list"})
        })
}

exports.approveRequest = (req,res) => {
    console.log(req.body)
    let approvedUser = req.body
    let currentUserId = req.user._id
    User.findOne({_id: currentUserId})
        .then(async (usr) => {
            let buyerReqArr = usr.buyersReq.filter((item) => approvedUser._id == item.userId)
            if(buyerReqArr.length > 0){
                let currentUserUpdateStatusDoc = await User.updateOne(
                    {_id: currentUserId},
                    {
                        $push: {buyer: {userId: approvedUser._id}},
                        $pull: {buyersReq: {userId: approvedUser._id}}
                    }
                )
                let approvedUserUpdateStatusDoc = await User.updateOne(
                    {_id: approvedUser._id},
                    {
                        $push: {buyer: {userId: currentUserId}},
                        $pull: {buyersReq: {userId: currentUserId}}
                    }
                )
                res.send({type: "success", msg: "approved successfully"})
            }else{
                res.send({type: "error", msg: "invalid buyer request"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to approve request"})
        })
}