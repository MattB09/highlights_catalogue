import React from 'react'

export default function Highlights({ highlights, tags, htags }) {
    if (highlights && htags) {
        console.log(highlights)
        for (const h of highlights) {
            h.tags = [];
            for (const htag of htags) {
                if (htag.highlight_id === h.id) h.tags.push({id: htag.tag_id});
            }
            for (const t of h.tags) {
                t.tag = tags.find(tag => tag.id === t.id).tag;
            }
        }
    } 
    console.log(highlights);

    function listTags(tagsArr) {
        let str = "Tags: ";
        if (!tagsArr.length) return str;
        let tArr = tagsArr.map(t => t.tag);
        str += tArr.sort().join(", ");
        return str;
    }
    return (
        <div className="highlights">
            <h3>Highlights ({highlights && highlights.length})</h3>
            <ul>
                {
                    highlights && highlights.map(h => {
                        return (
                            <li key={h.id}>
                                {h.highlight}
                                <div className="htags">
                                    {listTags(h.tags)}
                                </div>
                                {/* {h.tags.length && h.tags.map(tag => {
                                    return <div className="htags">{tag.tag}</div>
                                })} */}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}
