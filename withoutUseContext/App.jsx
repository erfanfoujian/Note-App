import { useReducer, useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";

function notesReducer(notes, action) {
  switch (action.type) {
    case "add": {
      return [...notes, action.payload];
    }
    case "delete": {
      return notes.filter((s) => s.id != action.payload);
    }
    case "complete": {
      return notes.map((note) =>
        note.id === action.payload
          ? { ...note, completed: !note.completed }
          : note
      );
    }

    default:
      throw new Error("Unknown Error " + action.type);
  }
}

function App() {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [sortBy, setSortBy] = useState("latest");

  const handleAddNote = (newNote) => {
    // setNotes((prevNotes) => [...prevNotes, newNote]);
    dispatch({ type: "add", payload: newNote });
  };

  const handleDeleteNote = (id) => {
    // const filterdNotes = notes.filter((filterNote) => filterNote.id != id);
    // setNotes(filterdNotes);
    dispatch({ type: "delete", payload: id });
  };

  const handleCompleteNote = (e) => {
    const noteId = Number(e.target.value);
    dispatch({ type: "complete", payload: noteId });
    // const newNotes = notes.map((note) =>
    //   note.id === noteId ? { ...note, completed: !note.completed } : note
    // );
    // setNotes((newNotes))

    // setNotes(
    //   (
    //     prevNotes //هم روش بالا و هم این روش درست است اما گفتیم اگر استیت ما به مقدار قبلی استیت نیاز داشته باشه ترجیحا از کال بک فانکشن استفاده میکنیم
    //   ) =>
    //     prevNotes.map((note) =>
    //       note.id === noteId ? { ...note, completed: !note.completed } : note
    //     )
    // );
    console.log(e.target.value);
  };

  return (
    <div className="container">
      <NoteHeader
        notes={notes}
        sortBy={sortBy}
        onSort={(e) => setSortBy(e.target.value)}
      />
      <div className="note-app">
        <AddNewNote onAddNote={handleAddNote} />
        <div className="note-container">
          <NoteStatus notes={notes} />
          <NoteList
            notes={notes}
            sortBy={sortBy}
            OnDelete={handleDeleteNote}
            onCompleted={handleCompleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
