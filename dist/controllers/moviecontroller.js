"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchMovie = exports.deleteMovie = exports.getAllMovies = exports.updateMovie = exports.addMovie = void 0;
const movieModel_1 = require("../models/movieModel");
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const movieDetails = new movieModel_1.default(data);
        const result = yield movieDetails.save();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}); // This api is used to crate new movie 
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            res.send({ message: "movie id fields is missing or Invalid" });
        const dataToUpdate = {};
        if (req.body.title)
            dataToUpdate.title = req.body.title;
        if (req.body.genre)
            dataToUpdate.genre = req.body.genre;
        if (req.body.rating)
            dataToUpdate.rating = req.body.rating;
        if (req.body.streamingLink)
            dataToUpdate.streamingLink = req.body.streamingLink;
        const result = yield movieModel_1.default.updateOne({ _id: req.params.id }, { $set: dataToUpdate });
        res.json({ message: 'data update successfully' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}); // This api is used to update movie  details
exports.updateMovie = updateMovie;
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movieModel_1.default.find();
        res.json(movies);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}); // api is used for get the  movie details
exports.getAllMovies = getAllMovies;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        console.log(movieId);
        const movies = yield movieModel_1.default.findByIdAndDelete({ _id: movieId });
        res.send({ message: "movie deleted successfully..!" });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}); // api is used for delete movie
exports.deleteMovie = deleteMovie;
const getSearchMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchText = req.query.searchText;
        if (!searchText)
            res.send({ "message": "searchText fields is messing in query." });
        const options = { title: { $regex: '^' + req.query.searchText, $options: 'i' } };
        const movies = yield movieModel_1.default.find({ $or: [
                { title: { $regex: '^' + req.query.searchText, $options: 'i' } },
                { genre: { $regex: '^' + req.query.searchText, $options: 'i' } }
            ] });
        if (movies.length > 0) {
            res.json(movies);
        }
        else {
            res.status(204).json({ "message": "data not found" });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}); // api is used for get the  movie details with searching feature as well
exports.getSearchMovie = getSearchMovie;
// Implement other controller functions (search, add, update, delete)
