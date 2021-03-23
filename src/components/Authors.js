import React from 'react'

export default function Authors({ authors, filterFunc }) {
    return (
        <div className="authors">
            <h3>Authors ({authors && authors.length})</h3>
            <ul>
                {
                    authors && authors.map(a => {
                        return (
                            <li 
                                key={a.id}
                                value={a.id}
                                onClick={filterFunc}
                            >
                                {a.name}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
