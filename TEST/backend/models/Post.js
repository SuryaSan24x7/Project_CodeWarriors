const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId},
        postText: {type: String},
        postImage: {type: String},
        postVideo: {type: String}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("post", postSchema)