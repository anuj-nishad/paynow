require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());

const mainRouter = require('./routes/main')
app.use('/api/v1', mainRouter);

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})