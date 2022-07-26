//Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');

//Setting up Express App
const app = express();
const PORT = process.env.PORT || 3000;

//Setting up the data parsing for express.
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Routes
app

