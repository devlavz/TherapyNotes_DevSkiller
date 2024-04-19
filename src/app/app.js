import { BookWithReviews } from "./model";

/**
 * Parses passed books and reviews arrays to create an array of BookWithReviews object. Each row from books input array
 * should have a corresponding row in resulting array. For example, for following input data:
 *    books = [ { "id" : 101, "title" : "Some book title" } ]
 *    reviews = [ { "bookId" : 101, "author" : "John", "content" : "Great book!" } ];
 * It should return following result:
 *    result = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 *
 * @param books - an array of input books, see 'src/app/dataset/books.json' for sample data.
 * @param reviews - an array of input reviews, see 'src/app/dataset/reviews.json' for sample data.
 * @returns {Array} - an array of BookWithReviews objects
 */
export function parseBooksData(books, reviews) {
  let result = [];
  books.forEach(book => {
      let bookReviews = reviews.filter(review => review.bookId == book.id);
      var bookWithReviews = new BookWithReviews(book.id, book.title);
      bookReviews.forEach(review => {
        bookWithReviews.addReview(review.author, review.content);
      });
      //if(bookWithReviews.length > 0)
        result.push(bookWithReviews);
    });

return result;  
}

/**
 * Displays data from passed `books` array. For example, if books argument would have following value:
 *    books = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 * then, following structure should be created under the parentNode:
 * <ol>
 *    <li>
 *      <span>Some book title</span>
 *      <ul>
 *        <li>Great book! by John</li>
 *      </ul>
 *    </li>
 * </ol>
 * @param parentNode - parent node for all books
 * @param booksWithReviews - an array of BookWithReviews objects.
 */
export function displayBooksWithReviews(parentNode, booksWithReviews) {
  booksWithReviews.forEach(bookWithReviews => {
        let bookContainer = document.createElement('ol');
        let bookTitleContainer = document.createElement('li');
        let bookTitle = document.createElement('span');

        bookTitle.textContent = bookWithReviews.title;       
                
        let reviewsList = document.createElement('ul');                
        bookWithReviews.reviews.forEach(review => {
            let reviewItem = document.createElement('li');
            reviewItem.textContent = review.content + ' by ' + review.author;
            reviewsList.appendChild(reviewItem);
        });
        bookTitleContainer.appendChild(bookTitle);  
        if(reviewsList.hasChildNodes()){            
            bookTitleContainer.appendChild(reviewsList);            
         }
         bookContainer.appendChild(bookTitleContainer);
         parentNode.appendChild(bookContainer);
    });
}
