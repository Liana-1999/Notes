import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{note.body}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onEdit}>Edit</Button>
        <Button color="error" onClick={onDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default NoteCard;