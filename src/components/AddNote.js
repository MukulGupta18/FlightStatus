import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleClick = (e) => {
    e.preventDefault();
    addNote( note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: ""});
    props.showAlert("Added Successfully", "success");

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add Flight Details Manualy</h2>
        <form className="my-3">

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Id</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label"> Status </label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} /> </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label"> Departure gate </label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
          </div>
          <button disabled={note.title.length<2 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} > AddNote </button>
        </form>
      </div>
    </div>
  );
};
