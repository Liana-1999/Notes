import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

function NotesList({ notes, selectedId, onSelect }) {
  if (notes.length === 0) {
    return <ListItemText sx={{ p: 2 }} primary="No notes yet." />;
  }

  return (
    <List>
      {notes.map(note => (
        <ListItemButton
          key={note.id}
          selected={note.id === selectedId}
          onClick={() => onSelect(note)}
        >
          <ListItemText primary={note.title} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default NotesList;