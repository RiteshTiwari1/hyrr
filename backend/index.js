// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const rateLimit = require('express-rate-limit');


const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
  });

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use("/api/v1", rootRouter);



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
