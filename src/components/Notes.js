import './Notes.css';
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { AddNote } from "./AddNote";
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('auth-token')) { 
      getNotes(); 
    } else {
      navigate("/Login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", eArrival_gate: "", eScheduled_departure: "", eScheduled_arrival: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag, note.eArrival_gate, note.eScheduled_departure, note.eScheduled_arrival );
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">flight id</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Status</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Departure gate</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Arrival gate</label>
                  <input type="text" className="form-control" id="eArrival_gate" name="eArrival_gate" value={note.eArrival_gate} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Scheduled departure</label>
                  <input type="text" className="form-control" id="eScheduled_departure" name="eScheduled_departure" value={note.eScheduled_departure} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Scheduled arrivale</label>
                  <input type="text" className="form-control" id="eScheduled_arrival" name="eScheduled_arrival" value={note.eScheduled_arrival} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 2 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Customer Data</h2>
        <div className="container">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
