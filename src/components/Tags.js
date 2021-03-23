import React from 'react'

export default function Tags({ tags, filterFunc }) {
    function handleClick() {
        console.log("clicked");
    }
    return (
        <div className="tags">
            <h3>Tags ({tags && tags.length})</h3>
            <ul>
                {
                    tags && tags.map(t => {
                        return (
                            <li 
                                key={t.id}
                                value={t.id} 
                                onClick={filterFunc}>
                                {t.tag}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
