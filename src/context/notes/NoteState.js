import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {

  const host = "http://localhost:5000"

  const notesIntial = []

  const [notes, setNotes] = useState(notesIntial)

  // Get ALL Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWRlNGVkMzQ2MmQ3MjgyY2YwY2M1In0sImlhdCI6MTY3ODQzMzkwNn0.WEWCs15bLrU5t2v35oqrULGZqTdYRPzxSwuZnHbVPhE"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // Todo API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWRlNGVkMzQ2MmQ3MjgyY2YwY2M1In0sImlhdCI6MTY3ODQzMzkwNn0.WEWCs15bLrU5t2v35oqrULGZqTdYRPzxSwuZnHbVPhE"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json(); 
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWRlNGVkMzQ2MmQ3MjgyY2YwY2M1In0sImlhdCI6MTY3ODQzMzkwNn0.WEWCs15bLrU5t2v35oqrULGZqTdYRPzxSwuZnHbVPhE"
      }
    });
    const json = await response.json()
    console.log("delete note id : " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWRlNGVkMzQ2MmQ3MjgyY2YwY2M1In0sImlhdCI6MTY3ODQzMzkwNn0.WEWCs15bLrU5t2v35oqrULGZqTdYRPzxSwuZnHbVPhE"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to Edit Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;