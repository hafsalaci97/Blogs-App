const Blog = require("../models/blog.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//test function to check routes
module.exports.index = (req, res) =>{
    res.json({message: "Hello Dojo!"});
}
module.exports.getAllBlogs = (req,res) => {
    Blog.find({}).sort({title: 1})
    .populate("createdBy", "username email") //in order to get more info about that user (createdBy is the field that connects the 2 collections)
        .then(allBlogs => res.json({results: allBlogs}))
        .catch(err =>res.status(400).json({message: "Couldn't get all Blogs!", err}));
}

module.exports.getAllBlogsByUser = (req,res)=>{
    if (req.jwtpayload.username !== req.params.username){
        console.log("Not the user!");
        User.findOne({username: req.params.username})
            .then((userNotLoggedIn)=>{
                Blog.find({createdBy: userNotLoggedIn._id})
                    .populate("createdBy", "username")
                    .then((allBlogsFromUser)=>{
                        console.log(allBlogsFromUser);
                        res.json(allBlogsFromUser);
                    })
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }
    else {
        console.log("Current user");
        console.log("req.jwtpayload.id", req.jwtpayload.id);
        Blog.find({createdBy: req.jwtpayload.id})
            .populate("createdBy", "username")
            .then((allBlogsFromLoggedInUser)=>{
                console.log(allBlogsFromLoggedInUser);
                res.json(allBlogsFromLoggedInUser);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports.createBlog= (req,res) => {
    const newBlogObject = new Blog(req.body);
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
        complete: true
    })

    newBlogObject.createdBy = decodedJWT.payload.id;
    newBlogObject.save()
    .then(newBlog =>res.json({results: newBlog}))
    .catch(err=>res.status(400).json({message: "Couldn't create the Blog!", err}));
}
module.exports.getOneBlog = (req, res) => {
    Blog.findOne({_id: req.params.id})
        .populate("createdBy", "username")
        .then(oneBlog => res.json({results: oneBlog}))
        .catch(err =>res.status(400).json({message: "Couldn't get the Blog!", err}));
}

module.exports.getFoodBlogs = (req, res) => {
    Blog.find({categories: "Food"})
        .populate("createdBy", "username")
        .then(foodBlogs => res.json({results: foodBlogs}))
        .catch(err =>res.status(400).json({message: "Couldn't get the Blogs!", err}));
}
module.exports.getMusicBlogs = (req, res) => {
    Blog.find({categories: "Music"})
        .populate("createdBy", "username")
        .then(musicBlogs => res.json({results: musicBlogs}))
        .catch(err =>res.status(400).json({message: "Couldn't get the Blogs!", err}));
}
module.exports.getSportBlogs = (req, res) => {
    Blog.find({categories: "Sport"})
        .populate("createdBy", "username")
        .then(sportBlogs => res.json({results: sportBlogs}))
        .catch(err =>res.status(400).json({message: "Couldn't get the Blogs!", err}));
}

module.exports.updateBlog = (req, res) => {
    Blog.updateOne({_id:req.params.id}, req.body, {runValidators: true})
    .then(updatedBlog => res.json({results: updatedBlog}))
        .catch(err =>res.status(400).json({message: "Couldn't update the Blog!", err}));
}
module.exports.deleteBlog = (req, res) => {
    Blog.deleteOne({_id: req.params.id})
        .then(deletedBlog => res.json({results: deletedBlog}))
        .catch(err =>res.status(400).json({message: "Couldn't delete the Blog!", err}));
}