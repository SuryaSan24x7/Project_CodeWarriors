const Post = require("../models/Post")
const User = require("../models/User")

exports.createPost = (req,res) => {
    var data = {
        userId: req.user._id,
        postText: req.body.postText,
        postImage: req.file.filename
    }
    const post = new Post(data)
    post.save()
        .then((data) => {
            res.send({type: "success", msg: "post created successfully"})
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "danger", msg: "failed to save post"})
        })
}

exports.getPic = (req,res,next) => {
    const pciName = req.params.postpic
    res.sendFile(picName, {root: "media/posts"})
}

exports.getPosts = (req,res,next) => {
    User.findOne({_id: req.user._id})
        .then((usr) => {
            let idList = usr.friends.map((item) => item.userId)
            idList.unshift(req.user._id)
            Post.find({userId: {$in: idList}})
                .populate({
                    path: 'userId',
                    select: '_id name pic'
                })
                .then((postList) => res.send(postList))
                .catch((err) => {
                    console.log(err)
                    res.send({type: "error", msg: "failed to fetch post lists"})
                })
        })
        .catch((err) => {
            console.log(err)
            res.send({type: "error", msg: "failed to fetch posts"})
        })
}