const express = require("express");
const router = express.Router();
const {saveTest,getHistory,getLearderboard} = require("../controllers/testController");
const {auth} = require("../middleware/authMiddleware");

router.post("/save",auth,saveTest);
router.get("/history",auth,getHistory);
router.get("/leaderboard",getLearderboard);

module.exports = router;