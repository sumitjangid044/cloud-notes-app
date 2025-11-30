import React, { useEffect, useState, useCallback } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // 👈 Add this new CSS file

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get('/notes', {
        headers: { 'auth-token': token }
      });
      setNotes(res.data);
    } catch (err) {
      alert('Could not load notes');
    }
  }, [token]);

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchNotes();
  }, [token, navigate, fetchNotes]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/notes/${editId}`, form, {
          headers: { 'auth-token': token }
        });
        setEditId(null);
      } else {
        await axios.post('/notes', form, {
          headers: { 'auth-token': token }
        });
      }
      setForm({ title: '', content: '' });
      fetchNotes();
    } catch {
      alert('Note action failed');
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    await axios.delete(`/notes/${id}`, {
      headers: { 'auth-token': token }
    });
    fetchNotes();
  };

  return (
    <div className="dashboard-page">

      {/* Top header */}
      <div className="top-bar">
        <h2>Cloud Notes</h2>
      </div>

      {/* Add Note Card */}
      <div className="add-note-card">
        <h3>{editId ? "Edit Note ✏️" : "Add a Note 📝"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="note-input"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            className="note-textarea"
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
          />

          <button className="add-btn" type="submit">
            {editId ? "Update Note" : "Add Note"}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <h3 className="notes-heading">Your Notes</h3>

      <div className="notes-container">
        {notes.length === 0 && <p className="no-notes">No notes yet.</p>}

        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h4>{note.title}</h4>
            <p>{note.content}</p>

            <div className="note-btn-row">
              <button className="edit-btn" onClick={() => handleEdit(note)}>
                Edit
              </button>

              <button className="delete-btn" onClick={() => handleDelete(note._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
