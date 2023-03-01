const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req,res) => {
    try{
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
    const post = new Post(data);
    await post.save();
            res.send({type: "success", msg: "post created successfully"});
        }
        catch(err) {
            console.log(err)
            res.send({type: "danger", msg: "failed to save post"});
        }
};

exports.getPic = async (req,res,next) => {
    const picName = req.params.postpic;
    res.sendFile(picName, {root: "media/posts"});
};

exports.getPosts = async (req,res,next) => {
    try{
    const user = await User.findOne({_id: req.user._id});
            let idList = user.posts.map((item) => item.userId);
            idList.unshift(req.user._id);
    const postList= await Post.find({userId: {$in: idList}})
                .populate({
                    path: 'userId',
                    select: '_id name pic'
                })
                res.send(postList);
        }
            catch(err) {
                    console.log(err);
                    res.send({type: "error", msg: "failed to fetch property lists"});
            } 
            try {
                const user = await User.findOne({ _id: req.user._id });
                let idList = user.posts.map((item) => item.userId);
                idList.unshift(req.user._id);
                const postList = await Post.find({ userId: { $in: idList } }).populate({
                  path: "userId",
                  select: "_id name pic",
                });
            }
            catch(err) {
            console.log(err);
            res.send({type: "error", msg: "failed to fetch property posts"});
        }
    };