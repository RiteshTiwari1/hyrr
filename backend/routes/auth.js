// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User} = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");


router.get("/", async (req, res) => {

    const authHeader = req.headers.authorization;
    console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized - Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

    
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        console.log(decoded);
        return res.status(200).json({ message: 'You are authenticated'});
        
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.log("hello fwsfsdf fsdf sd");
          return res.status(401).json({ error: 'Unauthorized - Token expired' });
        } else {
          return res.status(403).json({ error: 'Unauthorized - Invalid token' });
        }
      }
})




module.exports = router;