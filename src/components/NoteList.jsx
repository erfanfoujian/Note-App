import { useNotes, useNotesDispatch } from "../context/NotesContext";

function NoteList({ onDelete, onComplete, sortBy }) {
  const notes = useNotes();

  let sortedNotes = notes;
  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(b.completed) - Number(a.completed)
      // برای اینکه کلیده کامپلیتد یک عبارت بولین یعنی تروو یا فالس هست ان را با متد نامبر به عدد تبدیل کردیم
      //یعنی اگر شرط برقرار بود عدد ان یک و اگر برقرار نبود -1 میشود
    );

  return (
    <div className="note-list">
      {sortedNotes.map((note) => {
        return <NoteItem key={note.id} note={note} />;
      })}
    </div>
  );
}

export default NoteList;
function NoteItem({ note }) {
  const dispatch = useNotesDispatch();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div
      className={`note-item ${note.completed ? "completed" : ""}`}
      data-testid="note-item"
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "delete", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            name={note.id}
            id={note.id}
            value={note.id}
            checked={note.completed}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "complete", payload: noteId });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
