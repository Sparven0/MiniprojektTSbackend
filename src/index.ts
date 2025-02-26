import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import {newBookRouter} from "./routes/newBook.js";
import {booksRouter} from "./routes/books.js";
import {readRouter} from "./routes/updateRead.js";
import { reviewRouter } from "./routes/updateReview.js";
import { deleteBookRouter } from "./routes/deleteBook.js";


const server = express();
server.use(express.json());
server.use(cors());
server.use(newBookRouter);
server.use(booksRouter);
server.use(readRouter);
server.use(reviewRouter);
server.use(deleteBookRouter);




server.listen(3030, () => {
    console.log('Listening on http://localhost:3030');
});



server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Something went south' });
});

