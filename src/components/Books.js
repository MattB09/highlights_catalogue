import React from 'react'

export default function Books({ books, filterFunc }) {
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
                                {b.title}
                            </li>
                        );
                    })
                }
            </ul>   
        </div>
    )
}
