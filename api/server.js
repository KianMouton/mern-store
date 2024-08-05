const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Port = 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));