import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { updateReadStatus } from "../serverFunctions.js";

export const readRouter = Router();

const readValidation = [
    body('read').isBoolean()
]

readRouter.put('/books/:id/readstatus', readValidation, async (req: Request, res: Response, next: NextFunction) => {
    const bookID = parseInt(req.params.id);
    const { read } = req.body;
    try {
            const errors = validationResult(req);
            if(errors.array().length > 0){
                res.status(400).json({errors: errors.array()});
                throw new Error('Invalid input');
            }
        await updateReadStatus(bookID, read);
        res.json({ read });
    } catch (e) {
        next(e);
    }
});