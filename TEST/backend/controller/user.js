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

exports.sendFriendRequest = (req,res) => {
    const loggedInUserId = req.user._id
    const otherUserId = req.body.userId
    User.updateOne(
        {_id: req.body.userId},
        {$push: {friendRequest: {userId: loggedInUserId}}}
    )
        .then((doc) => {
            if(doc.modifiedCount){
                User.updateOne(
                    {_id: req.user._id},
                    {$push: {sendFriendRequest: {userId: otherUserId}}}
                )
                    .then((doc) => res.send({type: "success", msg: "friend request sent"}))
                    .catch((err) => {
                        console.log(err)
                        res.send({type: "error", msg: "failed to send friend request"})
                    })
            }   
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to send friend request"})
        })
        
}

exports.getFriendsRequestList = (req,res) => {
    User.findOne({_id: req.user._id})
        .then((usr) => {
            let friendsRequestIdList = usr.friendRequest.map((item) => item.userId)
            User.find({_id: {$in:friendsRequestIdList}},{_id: 1, name: 1, pic: 1})
                .then((usrList) => res.send(usrList))
                .catch((err) => {
                    console.log(err)
                    res.send({type: "error", msg: "some problem occured"})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to fetch the friend requests"})
        })
}

exports.getFriendsList = (req, res) => {
	User.findOne({ _id: req.user._id })
		.then((usr) => {
			let friendsIdList = usr.friends.map((item) => item.userId);
			User.find(
				{ _id: { $in: friendsIdList } },
				{ _id: 1, name: 1, pic: 1 }
			)
				.then((usrList) => {
					res.send(usrList);
				})
				.catch((err) => {
					console.log(err);
					res.send({ type: "error", msg: "Some Problem Occured" });
				});
		})
		.catch((err) => {
			console.log(err);
			res.send({
				type: "error",
				msg: "Failed to fetch the friends",
			});
		});
};

exports.approveRequest = (req,res) => {
    console.log(req.body)
    let approvedUser = req.body
    let currentUserId = req.user._id
    User.findOne({_id: currentUserId})
        .then(async (usr) => {
            let friendRequestArr = usr.friendRequest.filter((item) => approvedUser._id == item.userId)
            if(friendRequestArr.length > 0){
                let currentUserUpdateStatusDoc = await User.updateOne(
                    {_id: currentUserId},
                    {
                        $push: {friends: {userId: approvedUser._id}},
                        $pull: {friendRequest: {userId: approvedUser._id}}
                    }
                )
                let approvedUserUpdateStatusDoc = await User.updateOne(
                    {_id: approvedUser._id},
                    {
                        $push: {friends: {userId: currentUserId}},
                        $pull: {sentFriendRequest: {userId: currentUserId}}
                    }
                )
                res.send({type: "success", msg: "approved successfully"})
            }else{
                res.send({type: "error", msg: "invalid friend request"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to approve request"})
        })
}