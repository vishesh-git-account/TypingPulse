const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// this creates a express server for our website
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tests",require("./routes/testRoutes"));

//database connection and server is started
mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("yayyy!! mongodb connected.");
    app.listen(process.env.port || 3000, ()=>{
        console.log(`wohoo!! server started and currently running on port ${process.env.port || 3000}.`);
    })
    
})
.catch((error) => console.error("oops, connection failed, "), error);
