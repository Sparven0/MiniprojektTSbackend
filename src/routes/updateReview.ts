
import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { updateReviewStatus } from "../serverFunctions.js";

export const reviewRouter = Router();

const reviewValidation = [
    body('review').isString()
]

reviewRouter.patch('/books/:id/reviewstatus', reviewValidation, async (req: Request, res: Response, next: NextFunction) => {
    const bookID = parseInt(req.params.id);
    const { review } = req.body;
    try {
            const errors = validationResult(req);
            if(errors.array().length > 0){
                res.status(400).json({errors: errors.array()});
                throw new Error('Invalid input');
            }
        await updateReviewStatus(bookID, review);
        res.json({ review });
    } catch (e) {
        next(e);
    }
});