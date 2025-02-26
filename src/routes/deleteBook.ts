import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { deleteBook } from "../serverFunctions.js";

export const deleteBookRouter = Router();

deleteBookRouter.delete('/books/:id/delete', async (req: Request, res: Response, next: NextFunction) => {
    const bookID = parseInt(req.params.id);
    try {
            const errors = validationResult(req);
            if(errors.array().length > 0){
                res.status(400).json({errors: errors.array()});
                throw new Error('Invalid input');
            }
        await deleteBook(bookID);
        res.json({ message: 'Book deleted' });
    } catch (e) {
        next(e);
    }
});