const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id},process.env.jwt_secret_key,{expiresIn: '30d'});
};

exports.registerUser = async(req,res) => {
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password) return res.status(400).json({message: "Add all the required fields."});

        // checking if the user exists already in the database
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message: "User already exists."});

        // hashing the password before storing into the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // adding the new user to the database
        const user = await User.create({username,email,password: hashedPassword});

        // sending response back to the client
        if(user){
            res.status(201).json({_id: user._id,username: user.username,token: generateToken(user._id)});
        }
        else{
            res.status(400).json({message: "Invalid user data."});
        }
    }
    catch(error) {res.status(500).json({message: error.message})};
};

exports.loginUser = async(req,res) => {
    try{
        const {email, password} = req.body;

        // checking if the email and password are not empty
        if(!email || !password){
            return res.status(400).json({message: "Invalid or absent credentials."});
        }
        
        const user = await User.findOne({email});// finding the user in the database
        if(user && (await bcrypt.compare(password,user.password))){// checking the password
            res.json({_id : user._id, username: user.username, token: generateToken(user._id)});
        }
        else{
            res.status(401).json({message: "Invalid credentials."});
        }
    }
    catch(error) {res.status(500).json({message: error.message})};
};