import { Request, Response } from 'express';
import Movie from '../models/movieModel';

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body
        const movieDetails = new Movie(data)
        const result =  await movieDetails.save();
        res.json(result);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
}; // This api is used to crate new movie 

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {

        if(!req.params.id)res.send({message:"movie id fields is missing or Invalid"})
        const dataToUpdate:{title?:String, genre?:string, rating?:number, streamingLink?:string}= {}
        if(req.body.title)dataToUpdate.title = req.body.title
        if(req.body.genre)dataToUpdate.genre = req.body.genre
        if(req.body.rating)dataToUpdate.rating = req.body.rating
        if(req.body.streamingLink)dataToUpdate.streamingLink = req.body.streamingLink
        const result =  await Movie.updateOne({_id:req.params.id}, {$set:dataToUpdate});
        res.json({message:'data update successfully'});
    } catch (error:any) {
        res.status(500).send(error.message);
    }
}; // This api is used to update movie  details

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};// api is used for get the  movie details

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieId = req.params.id
        console.log(movieId)
        const movies = await Movie.findByIdAndDelete({_id:movieId});
        res.send({message:"movie deleted successfully..!"});
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};// api is used for delete movie


export const getSearchMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.query.searchText
        if(!searchText) res.send({"message":"searchText fields is messing in query."})
        const options = { title: { $regex: '^' + req.query.searchText, $options: 'i' } }

        const movies = await Movie.find({$or: [
            { title: { $regex: '^' + req.query.searchText, $options: 'i' } },
            { genre: { $regex: '^' + req.query.searchText, $options: 'i' } }
          ]});
          if(movies.length>0){
              res.json(movies);
          }else{
            res.status(204).json({"message":"data not found"})
          }
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};// api is used for get the  movie details with searching feature as well

// Implement other controller functions (search, add, update, delete)
