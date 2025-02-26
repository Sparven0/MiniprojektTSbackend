import fs from "fs/promises"
const path = "DB.json"

type Books = {
ID:number,
title:string,
writer:string,
read:boolean,
review:string
}

export async function getBooks():Promise<Books[]>{
    const rawD = await fs.readFile(path, 'utf-8');
    const {books} = JSON.parse(rawD)
    console.log(books)
    return books
}


export async function updateReadStatus(bookID:number, readStatus:boolean):Promise<void>{
const books = await getBooks();
const book = books.find((b: Books) => b.ID === bookID);
if (!book) {
    throw new Error('Book not found');
}
book.read = readStatus;

await fs.writeFile(path, JSON.stringify({books}, null, 2))
}

export async function updateReviewStatus(bookID:number, reviewStatus:string):Promise<void>{
    const books = await getBooks();
    const book = books.find((b:Books) => b.ID ===bookID);
    if(!book){
        throw new Error('Book not found(change review)')
    }
    book.review = reviewStatus;
    await fs.writeFile(path, JSON.stringify({books}, null, 2))
}


export async function writeBook(newBook: Books): Promise<void> {
  const books = await getBooks();
  books.push(newBook);
  await fs.writeFile(path, JSON.stringify({ books }, null, 2));
}


export async function deleteBook(bookID:number):Promise<void>{
  const books = await getBooks();
  const bookIndex = books.findIndex((b) => b.ID === bookID);
  if(bookIndex === -1){
      throw new Error('Book not found')
  }
  books.splice(bookIndex, 1);
  await fs.writeFile(path, JSON.stringify({books}, null, 2))
}