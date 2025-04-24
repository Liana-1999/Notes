import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

function NoteModal({ open, mode, note, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [body,  setBody]  = useState('');

  useEffect(() => {
    if (mode === 'edit' && note) {
      setTitle(note.title);
      setBody(note.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [mode, note]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === 'create' ? 'Create Note' : 'Edit Note'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth margin="dense"
          label="Title" value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          fullWidth margin="dense" multiline minRows={3}
          label="Description" value={body}
          onChange={e => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onSave({ id: note?.id, title, body })}
          disabled={!title}
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NoteModal;