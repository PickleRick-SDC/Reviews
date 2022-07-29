require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes.js');

const app = express();

app.use(cors());
app.use(express.json());



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
