const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    let token = req.headers.authorization;
    if(token && token.startsWith("Bearer")){
        try{
            token = token.split(" ")[1];
            const decoded = jwt.verify(token,process.env.jwt_secret_key);
            req.user = decoded.id;// this is attaching the user id to the request
            next();
        }
        catch(error){
            res.status(401).json({message: "Not authorized, token failed!"});// here the 'message: ""' is a js object
        }
    }
    else{
        res.status(401).json({message: "Not authorized, no token!"});
    }
};

module.exports = auth;