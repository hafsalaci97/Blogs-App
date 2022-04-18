const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    
    register: (req, res) => {
        const user = new User(req.body)
        
        user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Successfully registered!")
                res.json({
                    successMessage: "Thanx for registering!",
                    user: newUser
                })
            })
            .catch((err)=>{
                console.log("Registration failed!")
                res.status(400).json(err)
            })
    },
    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                //check if the object  return is null
                if(userRecord === null){
                    res.status(400).json({message: "Your login attempt is invalid!"})
                }
                else {
                    bcrypt.compare(req.body.password, userRecord.password) //salt both and return boolean
                        .then((isPasswordValid)=>{
                            if (isPasswordValid){
                                console.log("Password is Valid!")
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            ussername: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    //make sure cookies are http only
                                    {
                                        http: true,
                                        expires: new Date(Date.now() + 9000000) 
                                    }
                                ).json({
                                    message: "Successfully",
                                    userLoggedIn: userRecord.username,
                                    // userId: userRecord._id
                                });
                            }
                            else{
                                res.status(400).json({message: "Invalid Attempt!"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message: "Invalid Attempt!"});
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message: "Invalid Attempt!"});
            })
    },
    logout: (req, res)=>{
        console.log("Logging Out!");
        res.clearCookie("usertoken");
        res.json({
            message: "You are successfully logged out!"
        });
    },
    getLoggedInUser: (req, res)=>{
        // const decodedJWT = jwt.decode(req.cookies.usertoken, {
        //     complete: true
        // })
        User.findOne({_id: req.jwtpayload.id})
            .then((user)=>{
                console.log(user);
                res.json(user);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}