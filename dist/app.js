"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose_1 = require("mongoose");
const bodyParser = require('body-parser');
const movieRoutes_1 = require("./routes/movieRoutes");
mongoose_1.default.connect('mongodb://localhost:27017/movie-lobby');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', movieRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
