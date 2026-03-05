// src/pages/utilities/NotePad.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotePad = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('utilityHub_notes')
    return saved ? JSON.parse(saved) : []
  })
  const [activeNote, setActiveNote] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    localStorage.setItem('utilityHub_notes', JSON.stringify(notes))
  }, [notes])

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      updatedAt: new Date().toISOString(),
    }
    setNotes(prev => [newNote, ...prev])
    setActiveNote(newNote.id)
    setTitle(newNote.title)
    setContent(newNote.content)
  }

  const selectNote = (note) => {
    saveCurrentNote()
    setActiveNote(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  const saveCurrentNote = () => {
    if (activeNote) {
      setNotes(prev => prev.map(n =>
        n.id === activeNote
          ? { ...n, title, content, updatedAt: new Date().toISOString() }
          : n
      ))
    }
  }

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (activeNote === id) {
      setActiveNote(null)
      setTitle('')
      setContent('')
    }
  }

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(saveCurrentNote, 500)
    return () => clearTimeout(timer)
  }, [title, content])

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-white mb-6 text-center">📒 Notepad</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Notes List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Notes</h2>
            <button
              onClick={createNote}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">📝</div>
                <p className="text-sm">No notes yet</p>
              </div>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note)}
                  className={`p-3 rounded-xl cursor-pointer transition-all group ${
                    activeNote === note.id
                      ? 'bg-indigo-500/20 border border-indigo-500/30'
                      : 'bg-gray-800 border border-gray-700 hover:bg-gray-750'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-white truncate">{note.title}</h3>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {note.content || 'Empty note'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                      className="p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {activeNote ? (
            <div className="h-full flex flex-col">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold bg-transparent text-white border-none focus:outline-none mb-4 w-full placeholder-gray-600"
                placeholder="Note title..."
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 min-h-64 bg-gray-800 border border-gray-700 rounded-xl text-white p-4 focus:outline-none focus:border-indigo-500 resize-none placeholder-gray-500"
                placeholder="Start typing your note..."
              />
              <div className="flex justify-between mt-3 text-xs text-gray-500">
                <span>{wordCount} words · {charCount} characters</span>
                <span className="text-green-400">Auto-saved ✓</span>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-80 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-5xl mb-4">📒</div>
                <p>Select a note or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotePad