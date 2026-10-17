const Test = require("../models/Test");

exports.saveTest = async (req,res) => {
    try{
        const {wpm,cpm,accuracy,errors,time,difficulty} = req.body;
        // if(!wpm || !cpm || !accuracy || !errors || !time || !difficulty) return res.status(400).json({message: "Insufficient data"});
        const test= await Test.create({
            userId : req.user, wpm,cpm,accuracy,errors,time,difficulty
        });
        res.status(201).json(test);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
};

exports.getHistory = async (req,res) => {
    try{
        const tests = await Test.find({userId : req.user}).sort({createdAt: -1});
        // calculate dashboard stats
        const totalTests = tests.length;
        const bestWpm = totalTests > 0 ? Math.max(...tests.map(t => t.wpm)) : 0;
        const avgWpm = totalTests > 0 ? Math.round(tests.reduce((acc,curr) => acc + curr.wpm,0)/totalTests) : 0;

        res.json({tests, stats: {totalTests,bestWpm,avgWpm}});
    }
    catch(error){res.status(500).json({message: error.message});}
    
};

exports.getLeaderboard = async(req,res) => {
    try{
        // top 10 highest WPM
        const leaderboard = await Test.find().sort({wpm: -1}).limit(10).populate("userId","username");
        res.json(leaderboard);
    }
    catch(error) {res.status(500).json({message: error.message});}
};