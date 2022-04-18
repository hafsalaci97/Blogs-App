const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const BlogSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false,
    },
    categories: {
        type: String,
        enum: ["Food", "Music", "Sport"]
    },
    likes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //the collection
    }
},  { timestamps: true });

BlogSchema.plugin(uniqueValidator);
const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;