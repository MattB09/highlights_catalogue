import React from 'react'

export default function Books({ books, authors, filterFunc }) {
    if (books && authors) {
        for (const book of books) {
            book.author = authors.find(auth => book.author_id === auth.id).name;
        }
    }

    return (
        <div className="books">
            <h3>Books ({books && books.length})</h3>
            <ul>
                {
                    books && books.map(b => {
                        return (
                            <li 
                                key={b.id}
                                value={b.id}
                                onClick={filterFunc}
                            >
                                <span className="book-title">{b.title}</span> by <span className="book-author">{b.author}</span>
                            </li>
                        );
                    })
                }
            </ul>   
        </div>
    )
}
