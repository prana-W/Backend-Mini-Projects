import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    const [notes, setNotes] = useState([])
    useEffect(() => {

        (async () => {
            try {
                const response = await fetch('/api/notes')
                const jsonResponse = await response.json()
                setNotes(jsonResponse)
            } catch (error) {
                console.error('Error fetching notes:', error)
            }
        })();

    }, [])

    return (
        <>
                {
                    notes.map ((note) => {
                        return (
                            <div key = {note._id}>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                <p>Category: {note.category}</p>
                                <p>Created At: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p>Updated At: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                        )
                    })
                }
        </>
    )
}

export default App
