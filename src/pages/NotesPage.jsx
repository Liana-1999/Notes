import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Drawer, Box, Button, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotesList from '../components/NotesList.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NoteModal from '../components/NoteModal.jsx';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx';
import { loadNotes, saveNotes } from '../utilities/localStorage.js';

function NotesPage() {
  const [notes,        setNotes]      = useState([]);
  const [selected,     setSelected]   = useState(null);
  const [drawerOpen,   setDrawerOpen] = useState(false);
  const [isModalOpen,  setIsModalOpen] = useState(false);
  const [modalMode,    setModalMode]    = useState('create');
  const [modalNote,    setModalNote]    = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const openCreate = () => {
    setModalMode('create');
    setModalNote(null);
    setIsModalOpen(true);
  };

  const openEdit = () => {
    setModalMode('edit');
    setModalNote(selected);
    setIsModalOpen(true);
  };

  const handleSave = note => {
    if (modalMode === 'create') {
      note.id = Date.now();
      setNotes(prev => [...prev, note]);
    } else {
      setNotes(prev => prev.map(n => n.id === note.id ? note : n));
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    setNotes(prev => prev.filter(n => n.id !== selected.id));
    setSelected(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>Notes</Typography>

          <Button color="inherit" onClick={openCreate}>New Note</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <NotesList
            notes={notes}
            selectedId={selected?.id}
            onSelect={note => {
              setSelected(note);
              setDrawerOpen(false);
            }}
          />
        </Box>
      </Drawer>

      <Box sx={{ p: 3 }}>
        {selected ? (
          <NoteCard
            note={selected}
            onEdit={() => {
              openEdit();
            }}
            onDelete={() => setIsDeleteOpen(true)}
          />
        ) : (
          <Typography color="text.secondary" sx={{ mt: 4 }}>There is no selected note</Typography>
        )}
      </Box>

      <NoteModal
        open={isModalOpen}
        mode={modalMode}
        note={modalNote}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDeleteModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default NotesPage;