import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  FileUp,
  History,
  Download,
  User,
  Clock,
  Layers,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

export const FileManager = ({ projectId }) => {
  const { files, users, currentUser, uploadFile, getText } = useApp();

  const [selectedFileForHistory, setSelectedFileForHistory] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileDescription, setNewFileDescription] = useState('');
  const [newFileChangeNotes, setNewFileChangeNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const projectFiles = files.filter(f => !projectId || f.projectId === projectId);
  const filteredFiles = projectFiles.filter(f => {
    const fn = (f.filename || '').toLowerCase();
    const desc = getText(f.description).toLowerCase();
    const q = searchQuery.toLowerCase();
    return fn.includes(q) || desc.includes(q);
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    uploadFile({
      projectId: projectId || 'proj-1',
      filename: newFileName,
      size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      description: newFileDescription,
      changeNotes: newFileChangeNotes || 'Uploaded new version.'
    });

    setNewFileName('');
    setNewFileDescription('');
    setNewFileChangeNotes('');
    setIsUploadOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* File Repository Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={22} color="var(--accent-cyan)" />
            Version-Controlled File Repository
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Historical versioning preserves every iteration. Previous versions are stored immutably.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search files..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.2rem', fontSize: '0.85rem' }}
            />
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <FileUp size={16} /> Upload New File / Version
          </button>
        </div>
      </div>

      {/* Files Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>File Name</th>
              <th style={{ padding: '0.85rem 1rem' }}>Current Version</th>
              <th style={{ padding: '0.85rem 1rem' }}>Uploader</th>
              <th style={{ padding: '0.85rem 1rem' }}>Date Uploaded</th>
              <th style={{ padding: '0.85rem 1rem' }}>Size</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No files found in repository.
                </td>
              </tr>
            ) : (
              filteredFiles.map(file => {
                const uploader = users.find(u => u.id === file.uploaderId);
                return (
                  <tr
                    key={file.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{file.filename}</div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{getText(file.description) || 'Deliverable asset'}</div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>
                        {file.currentVersion}
                      </span>
                    </td>

                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {uploader && (
                          <img src={uploader.avatar} alt={uploader.name} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                        )}
                        <span>{uploader?.name || 'User'}</span>
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {file.size}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => setSelectedFileForHistory(file)}
                          className="btn btn-secondary btn-sm"
                          style={{ gap: '0.3rem', fontSize: '0.75rem' }}
                          title="View complete version history"
                        >
                          <History size={14} /> Version History ({file.versions?.length || 1})
                        </button>

                        <button
                          onClick={() => alert(`Simulated Download of ${file.filename} (${file.currentVersion})`)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.5rem' }}
                          title="Download File"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
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
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileUp size={18} color="var(--accent-cyan)" /> Upload File / New Version
              </h3>
              <button onClick={() => setIsUploadOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="form-group">
                <label className="form-label">File Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. FinTech_UI_Figma_Prototypes.fig"
                  value={newFileName}
                  onChange={e => setNewFileName(e.target.value)}
                  required
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  If a file with this name already exists, a new version (e.g. v2.0) will automatically be appended!
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Asset description..."
                  value={newFileDescription}
                  onChange={e => setNewFileDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Version Change Notes</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Summarize changes in this version iteration..."
                  value={newFileChangeNotes}
                  onChange={e => setNewFileChangeNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsUploadOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Upload & Preserve Version</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {selectedFileForHistory && (
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
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <History size={18} color="var(--accent-cyan)" /> Version History: {selectedFileForHistory.filename}
              </h3>
              <button onClick={() => setSelectedFileForHistory(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto' }}>
              {selectedFileForHistory.versions?.map((ver, idx) => {
                const uploader = users.find(u => u.id === ver.uploaderId);
                const isLatest = idx === 0;
                return (
                  <div key={idx} style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: isLatest ? 'rgba(59, 130, 246, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                    border: isLatest ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge badge-active" style={{ fontSize: '0.72rem' }}>
                          {ver.version} {isLatest ? '(Latest)' : ''}
                        </span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                          {ver.filename}
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading version ${ver.version}`)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.2rem 0.4rem' }}
                      >
                        <Download size={12} />
                      </button>
                    </div>

                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      {getText(ver.changeNotes) || 'No release notes.'}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <span>Uploader: <strong>{uploader?.name || 'User'}</strong></span>
                      <span>Time: <strong>{new Date(ver.timestamp).toLocaleString()}</strong></span>
                      <span>Size: <strong>{ver.size}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedFileForHistory(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
