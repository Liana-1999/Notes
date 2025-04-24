

export function loadNotes() {
    const saved = localStorage.getItem('my-notes');
    return saved ? JSON.parse(saved) : [];
}

export function saveNotes(notes) {
    localStorage.setItem('my-notes', JSON.stringify(notes));
}