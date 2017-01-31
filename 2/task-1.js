/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks(typeObj) {
			let toBeReturned = [];
			if (arguments.length === 0) {
				books.sort((a, b) => a.ID - b.ID);
				return books;
			} 
			else {
				if (typeObj.hasOwnProperty('category')) {
					books.forEach(function(book) {
						if (book.category === typeObj.category) {
							toBeReturned.push(book);
						}
					});
					toBeReturned.sort((a, b) => a.ID - b.ID);
					return toBeReturned;
				}
				if (typeObj.hasOwnProperty('author')) {
					books.forEach(function(book) {
						if (book.author === typeObj.author) {
							toBeReturned.push(book);
						}
					});
					toBeReturned.sort((a, b) => a.ID - b.ID);
					return toBeReturned;
				}
			}
		}

		function addBook(book) {
			if (book.title.length < 2 || book.title.length > 100 
				|| book.category.length < 2 || book.category.length > 100) {
				throw 'Invalid title';
			}
			if (!(/^\d{10,13}$/).test(book.isbn)) {
				throw 'Invalid isbn';
			}
			if (book.author.length === 0) {
				throw 'Invalid author';
			}
			for (let i = 0, len = books.length; i < len; i++) {
				if (book.title === books[i].title) {
					throw 'Book title already exists!';
				}
				else if (book.isbn === books[i].isbn) {
					throw 'Book ISBN already exists!';
				}	
			}
			if (!categories.includes(book.category)) {
				categories.push(book.category);
			}

			book.ID = books.length + 1;
			books.push(book);
			
			return book;
		}

		

		function listCategories() {
			categories.sort((a, b) => a.ID - b.ID);
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
