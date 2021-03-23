import React from 'react'

export default function Highlights({ highlights }) {

    return (
        <div className="highlights">
            <h3>Highlights ({highlights && highlights.length})</h3>
            <ul>
                {
                    highlights && highlights.map(h => {
                        return (
                            <li key={h.id}>{h.highlight}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
