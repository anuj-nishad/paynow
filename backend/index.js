require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyparser = require('body-parser');

if (process.env.NODE_ENV === "production") job.start();
app.use(cors());
app.use(bodyparser.json());

const mainRouter = require('./routes/main');
const { default: job } = require('./crons');


app.use('/api/v1', mainRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})