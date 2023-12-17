 Documentation for how to install and run this project in local system .


 1. clone the github repository in your local system .
 2. go to that directory
 3. run command npm install
 4. run command  npm tsc
 5. next command node dist/app.js

and now you can see message server is running on port 3000 

below are postman collection you can call this apis  with this collection as well 

post man collection link : https://api.postman.com/collections/13840909-26405462-a4e9-4a0c-b394-c44fa12195a4?access_key=PMAT-01HHVY2NBK6BT25KRS07VQZ7KD


Movie API Documentation
1. Add Movie
Endpoint: POST /api/movies/add
Description: This API endpoint is used to create a new movie entry in the database.
Request:
Method: POST
Body:
json
Copy code
{
  "title": "Movie Title",
  "genre": "Movie Genre",
  "rating": 8.5,
  "streamingLink": "https://example.com/movie-stream"
}
Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "_id": "generated_movie_id",
  "title": "Movie Title",
  "genre": "Movie Genre",
  "rating": 8.5,
  "streamingLink": "https://example.com/movie-stream"
}
2. Update Movie
Endpoint: PUT /api/movies/update/:id
Description: This API endpoint is used to update the details of an existing movie based on the provided id.
Request:
Method: PUT
Params: id (Movie ID)
Body (Fields to update, optional):
json
Copy code
{
  "title": "Updated Movie Title",
  "genre": "Updated Movie Genre",
  "rating": 9.0,
  "streamingLink": "https://updated-example.com/movie-stream"
}
Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "message": "Data updated successfully"
}
3. Get All Movies
Endpoint: GET /api/movies/all
Description: This API endpoint retrieves details for all movies in the database.
Request:
Method: GET
Response:
Status Code: 200 OK
Body:
json
Copy code
[
  {
    "_id": "movie_id_1",
    "title": "Movie Title 1",
    "genre": "Movie Genre 1",
    "rating": 8.0,
    "streamingLink": "https://example.com/movie-stream-1"
  },
  {
    "_id": "movie_id_2",
    "title": "Movie Title 2",
    "genre": "Movie Genre 2",
    "rating": 7.5,
    "streamingLink": "https://example.com/movie-stream-2"
  },
  // ... other movies
]
4. Delete Movie
Endpoint: DELETE /api/movies/delete/:id
Description: This API endpoint is used to delete a movie from the database based on the provided id.
Request:
Method: DELETE
Params: id (Movie ID)
Response:
Status Code: 200 OK
Body:
json
Copy code
{
  "message": "Movie deleted successfully..!"
}
5. Search Movies
Endpoint: GET /api/movies/search
Description: This API endpoint allows users to search for movies based on the provided search text.
Request:
Method: GET
Query Parameter: searchText (String to search for in movie titles or genres)
Response:
Status Code: 200 OK
Body:
json
Copy code
[
  {
    "_id": "movie_id_1",
    "title": "Matching Movie Title 1",
    "genre": "Matching Movie Genre 1",
    "rating": 8.0,
    "streamingLink": "https://example.com/movie-stream-1"
  },
  {
    "_id": "movie_id_2",
    "title": "Matching Movie Title 2",
    "genre": "Matching Movie Genre 2",
    "rating": 7.5,
    "streamingLink": "https://example.com/movie-stream-2"
  },
  // ... other matching movies
]
Status Code: 204 No Content if no matching movies are found.
