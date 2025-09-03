import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesService } from '../services/api';
import { Note } from '../types';
import { useAuth } from '../context/AuthContext';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await notesService.getNotes();
      setNotes(data);
    } catch (err: any) {
      setError('Failed to fetch notes');
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    setError('');

    try {
      const newNote = await notesService.createNote(title, content);
      setNotes([newNote, ...notes]);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create note');
    }

    setLoading(false);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete note');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Notes App</h1>
            </div>
            <div className="flex items-center">
              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full mr-2"
                />
              )}
              <span className="mr-4">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
          <form onSubmit={handleCreateNote}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div key={note._id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-600">{note.content}</p>
              <div className="mt-4 text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesPage;
