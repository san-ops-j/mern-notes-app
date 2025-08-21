import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="bg-white  p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold">{note.title}</h2>
      <p className="text-gray-600">{note.description}</p>
      <div className="flex justify-end mt-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(note)}
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700 ml-2"
          onClick={() => {
            if (window.confirm("Delete this note?")) onDelete(note._id);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
    </div>
  );
}

export default NoteCard;
