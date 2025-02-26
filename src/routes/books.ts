import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { getBooks } from "../serverFunctions.js";

export const booksRouter = Router();

const validation = [
    body('ID').isInt(),
    body('title').isString(),
    body('writer').isString(),
    body('read').isBoolean(),
    body('review').isString()
]

booksRouter.get('/books', validation, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (errors.array().length > 0) {
            // res.status(400).json({ errors: errors.array() });
            console.log('Error')
        }
        const data = await getBooks();
        res.send({ books: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
