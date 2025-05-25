import React from "react";
import { useDispatchNotes, useNotes } from "../context/NotesContext";

function NoteList({ sortBy }) {
  const notes = useNotes();
  let sortedNotes = notes;
  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createAt) - new Date(b.createAt)
    ); // a -b  => a > b ? 1 : -1

  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    ); // b -a  => a > b ? -1 : 1

  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;

function NoteItem({ note }) {
  const dispatch = useDispatchNotes();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div
      className={`note-item ${note.completed ? "completed" : ""}`}
      data-testid="note_item"
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => dispatch({ type: "Delete", paylod: note.id })}>
            {" "}
            ❌{" "}
          </button>
          <input
            type="checkbox"
            name={note.id}
            id={note.id}
            checked={note.completed}
            value={note.id}
            onChange={(e) => {
              const noteID = Number(e.target.value);
              dispatch({ type: "Check", paylod: noteID });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
