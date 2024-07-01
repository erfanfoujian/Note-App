import { useReducer, useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";
import { NotesProvider } from "./context/NotesContext";
import NoteApp from "./components/NoteApp";
import AppProviders from "./providers/AppProviders";

function App() {
  const [sortBy, setSortBy] = useState("latest");
  return (
    <AppProviders>
      <div className="container">
        <NoteHeader sortBy={sortBy} onSort={(e) => setSortBy(e.target.value)} />
        <NoteApp />
      </div>
    </AppProviders>
  );
}

export default App;
