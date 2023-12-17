"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const movieController = require("../controllers/moviecontroller");
const router = express.Router();
router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);
router.get('/search', movieController.getSearchMovie);
// Implement other routes
exports.default = router;
