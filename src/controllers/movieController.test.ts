const request = require('supertest')
const controller = require('./movieController')
const app = require('express')

// Assuming your Express app is exported from the file where it's created.
describe('Movie API Endpoints', () => {
  // Assuming you have some test data for each test case
  const testMovieData = {
    title: 'Test Movie',
    genre: 'Action',
    rating: 8.5,
    streamingLink: 'http://test-movie-link.com',
  };

  let createdMovieId: string;

  // Test for addMovie endpoint
  it('should add a new movie', async () => {
    const response = await request(app)
      .controller.adMovie('/api/movies')
      .send(testMovieData)
      .expect(200);
console.log(response);
    expect(response.body).toHaveProperty('_id');
    createdMovieId = '657c35f49865dbd643bf12bd';
  });

  // Test for updateMovie endpoint
  it('should update movie details', async () => {
    const updatedData = {
      title: 'Updated Movie Title',
      genre: 'Drama',
    };

    const response = await request(app)
      .put(`/api/movies/${createdMovieId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.message).toEqual('data update successfully');
  });

  // Test for getAllMovies endpoint
  it('should get all movies', async () => {
    const response = await request(app)
      .get('/api/movies')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  // Test for deleteMovie endpoint
  it('should delete a movie', async () => {
    await request(app)
      .delete(`/api/movies/${createdMovieId}`)
      .expect(200);
  });

  // Test for getSearchMovie endpoint
  it('should get movies with search feature', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ searchText: 'Action' })
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should handle missing searchText in getSearchMovie', async () => {
    const response = await request(app)
      .get('/api/search')
      .expect(400);

    expect(response.body.message).toEqual('searchText fields is messing in query.');
  });
});

