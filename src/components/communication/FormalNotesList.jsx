import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCode,
  CheckCircle2,
  Clock,
  Plus,
  User,
  AlertCircle,
  Tag,
  CheckSquare,
  X
} from 'lucide-react';

export const FormalNotesList = ({ projectId, stageId }) => {
  const { notes, users, currentUser, addFormalNote, toggleNoteResolved, getText } = useApp();

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const projectNotes = notes.filter(n => (!projectId || n.projectId === projectId) && (!stageId || n.stageId === stageId));

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addFormalNote({
      projectId: projectId || 'proj-1',
      stageId: stageId || null,
      title,
      content
    });

    setTitle('');
    setContent('');
    setIsAddNoteOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileCode size={18} color="var(--accent-cyan)" />
            Formal Instructions & Review Notes
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Official requirements and feedback items needing resolution by responsible teams.
          </p>
        </div>

        <button
          onClick={() => setIsAddNoteOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ gap: '0.35rem', fontSize: '0.78rem' }}
        >
          <Plus size={14} /> Add Formal Note
        </button>
      </div>

      {/* List of Notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {projectNotes.length === 0 ? (
          <div style={{
            padding: '1.5rem',
            textAlign: 'center',
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}>
            No formal instructions or review notes logged.
          </div>
        ) : (
          projectNotes.map(note => {
            const author = users.find(u => u.id === note.authorId);
            const resolver = users.find(u => u.id === note.resolvedBy);

            return (
              <div
                key={note.id}
                className="glass-card"
                style={{
                  padding: '1rem',
                  borderLeft: note.isResolved ? '4px solid var(--accent-emerald)' : '4px solid var(--accent-amber)',
                  background: note.isResolved ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', textDecoration: note.isResolved ? 'line-through' : 'none' }}>
                      {getText(note.title)}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Added by <strong>{author?.name || 'User'}</strong> on {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleNoteResolved(note.id)}
                    className={`btn btn-sm ${note.isResolved ? 'btn-success' : 'btn-secondary'}`}
                    style={{ gap: '0.35rem', fontSize: '0.75rem' }}
                  >
                    <CheckSquare size={14} />
                    {note.isResolved ? 'Resolved ✓' : 'Mark Resolved'}
                  </button>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {getText(note.content)}
                </p>

                {note.isResolved && resolver && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={12} /> Resolved by {resolver.name} on {new Date(note.resolvedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Note Modal */}
      {isAddNoteOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileCode size={18} color="var(--accent-cyan)" /> Create Formal Instruction Note
              </h3>
              <button onClick={() => setIsAddNoteOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddNoteSubmit}>
              <div className="form-group">
                <label className="form-label">Note Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Accessibility WCAG 2.1 Compliance standard"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instruction Details *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Specific technical requirement or review directive..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddNoteOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Note</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
