import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../pages/NoteCard";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const { user } = useAuth();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotes([]);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/auth/note", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setNotes(res.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      let res = await axios.post(
        "http://localhost:5000/api/auth/add",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.put(
        `http://localhost:5000/api/auth/update/${id}`,  // Correct URL here
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };


  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:5000/api/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-6  px-4">
        {user && !isModalOpen ? (
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name} 👋</h2>
        ) : (
          !user && <h2 className="text-xl font-bold mb-4">Please log in</h2>
        )}

        {!user ? (
          <p>No notes found. Please log in to see your notes.</p>
        ) : notes.length === 0 ? (
          <p>No notes yet. Add your first note!</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              className="col-span-2"
              key={note._id}
              note={note}
              onEdit={(note) => {
                setCurrentNote(note);
                setModalOpen(true);
              }}
              onDelete={deleteNote}
            />
          ))
        )}
      </div>

      {user && (
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          Add Note
        </button>
      )}

      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}

    </div>
  );
};

export default Home;
