import React, { useState } from 'react';

function NotesPage() {
  const [notes, setNotes ] = useState([]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>My Notes</h1>
      <button style={{ padding: '8px 12px', marginTop: 10 }}
        onClick={() => {
          const title = prompt('Note title:');
          if (!title) return;
          const body = prompt('Note body:');
          if (body === null) return;
          setNotes([...notes, { title, body }]);
        }}
      >
      + Add Note
      </button>

      <ul style={{ marginTop: 20 }}>
        {notes.length === 0 && <li>No notes yet.</li>}
        {notes.map((note, idx) => (
          <li key={idx}>
            <strong>{note.title}</strong>: {note.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesPage;