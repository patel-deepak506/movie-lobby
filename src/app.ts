const express  = require('express');
import mongoose from 'mongoose';
const  bodyParser  = require('body-parser');
import movieRoutes from './routes/movieRoutes';

mongoose.connect('mongodb://localhost:27017/movie-lobby');
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(bodyParser.json());
app.use('/api', movieRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
