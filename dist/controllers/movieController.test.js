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
const request = require('supertest');
const controller = require('./movieController');
const app = require('express');
// Assuming your Express app is exported from the file where it's created.
describe('Movie API Endpoints', () => {
    // Assuming you have some test data for each test case
    const testMovieData = {
        title: 'Test Movie',
        genre: 'Action',
        rating: 8.5,
        streamingLink: 'http://test-movie-link.com',
    };
    let createdMovieId;
    // Test for addMovie endpoint
    it('should add a new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .controller.adMovie('/api/movies')
            .send(testMovieData)
            .expect(200);
        console.log(response);
        expect(response.body).toHaveProperty('_id');
        createdMovieId = '657c35f49865dbd643bf12bd';
    }));
    // Test for updateMovie endpoint
    it('should update movie details', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedData = {
            title: 'Updated Movie Title',
            genre: 'Drama',
        };
        const response = yield request(app)
            .put(`/api/movies/${createdMovieId}`)
            .send(updatedData)
            .expect(200);
        expect(response.body.message).toEqual('data update successfully');
    }));
    // Test for getAllMovies endpoint
    it('should get all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/get-all-movies')
            .expect(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    }));
    // Test for deleteMovie endpoint
    it('should delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request(app)
            .delete(`/api/delete-movie/${createdMovieId}`)
            .expect(200);
    }));
    // Test for getSearchMovie endpoint
    it('should get movies with search feature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/search-movie')
            .query({ searchText: 'Action' })
            .expect(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    }));
    it('should handle missing searchText in getSearchMovie', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/search-movie')
            .expect(400);
        expect(response.body.message).toEqual('searchText fields is messing in query.');
    }));
});
