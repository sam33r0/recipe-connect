import React from 'react'

function Message({ role, content }) {
    const bg = role == 'user' ? 'bg-blue-100 text-blue-700  border-blue-500' : 'bg-yellow-100 text-red-600 border-red-500';
    return (
        <div className={`border rounded px-4 py-3 ${bg}`} >
            <p>{content}</p>
        </div>
    )
}

export default Message