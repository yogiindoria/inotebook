import React, { useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleSubmit =(e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className='my-3'>
    <h2 className='my-3 mx-5' style={{textAlign: "center"}}>Add Your Note</h2>
    <div>
      <form className='py-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}  required/>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3"  onClick={handleSubmit}>Add Note</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddNote
