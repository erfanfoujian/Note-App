function NoteList({ notes, OnDelete, onCompleted, sortBy }) {
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
        return (
          <NoteItem
            key={note.id}
            note={note}
            OnDelete={OnDelete}
            onCompleted={onCompleted}
          />
        );
      })}
    </div>
  );
}

export default NoteList;
function NoteItem({ note, OnDelete, onCompleted }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => OnDelete(note.id)}>❌</button>
          <input
            type="checkbox"
            name={note.id}
            id={note.id}
            value={note.id}
            checked={note.completed}
            onChange={onCompleted}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </div>
    </div>
  );
}
