const  express  = require('express');
import * as movieController from '../controllers/moviecontroller';

const router = express.Router();

router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);
router.get('/search', movieController.getSearchMovie);
// Implement other routes

export default router;
