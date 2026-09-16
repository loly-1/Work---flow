import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckSquare,
  Paperclip,
  MessageSquare,
  Send,
  FileUp
} from 'lucide-react';

export const TaskModal = ({ isOpen, onClose, task, projectId, stageId, defaultAssigneeId }) => {
  const { users, currentUser, createTask, updateTaskStatus, reassignTask, comments, addComment, files, uploadFile, t, getText } = useApp();

  const [title, setTitle] = useState(task ? getText(task.title) : '');
  const [description, setDescription] = useState(task ? getText(task.description) : '');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(task ? getText(task.acceptanceCriteria) : '');
  const [assigneeId, setAssigneeId] = useState(task ? task.assigneeId : (defaultAssigneeId || currentUser.id));
  const [priority, setPriority] = useState(task ? task.priority : 'Medium');
  const [deadline, setDeadline] = useState(task ? task.deadline : new Date(Date.now() + 5*86400000).toISOString().split('T')[0]);
  const [newComment, setNewComment] = useState('');
  const [uploadFileName, setUploadFileName] = useState('');

  if (!isOpen) return null;

  const isEditing = !!task;
  const taskComments = task ? comments.filter(c => c.taskId === task.id) : [];
  const taskFiles = task ? files.filter(f => f.taskId === task.id) : [];

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!isEditing) {
      createTask({
        projectId,
        stageId,
        title,
        description,
        acceptanceCriteria,
        assigneeId,
        priority,
        deadline
      });
    } else {
      if (task.assigneeId !== assigneeId) {
        reassignTask(task.id, assigneeId);
      }
    }
    onClose();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !task) return;

    addComment({
      projectId: task.projectId,
      stageId: task.stageId,
      taskId: task.id,
      content: newComment
    });
    setNewComment('');
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!uploadFileName.trim() || !task) return;

    uploadFile({
      projectId: task.projectId,
      stageId: task.stageId,
      taskId: task.id,
      filename: uploadFileName,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      description: `Task attachment for ${getText(task.title)}`
    });

    setUploadFileName('');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckSquare size={20} color="var(--accent-cyan)" />
            {isEditing ? `${t('taskDetailsTitle')} ${getText(task.title)}` : t('createStageTaskTitle')}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">{t('taskTitleField')}</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={isEditing && currentUser.role === 'Client'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t('assigneeField')}</label>
              <select
                className="form-select"
                value={assigneeId}
                onChange={e => setAssigneeId(e.target.value)}
                disabled={isEditing && currentUser.role === 'Client'}
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({t(u.role)})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t('priorityField')}</label>
              <select
                className="form-select"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                disabled={isEditing && currentUser.role === 'Client'}
              >
                <option value="Low">{t('Low')}</option>
                <option value="Medium">{t('Medium')}</option>
                <option value="High">{t('High')}</option>
                <option value="Urgent">{t('Urgent')}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t('deadlineField')}</label>
              <input
                type="date"
                className="form-input"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                disabled={isEditing && currentUser.role === 'Client'}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('descriptionField')}</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={isEditing && currentUser.role === 'Client'}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('acceptanceCriteriaField')}</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={acceptanceCriteria}
              onChange={e => setAcceptanceCriteria(e.target.value)}
              disabled={isEditing && currentUser.role === 'Client'}
            />
          </div>

          {!isEditing && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>{t('cancelBtn')}</button>
              <button type="submit" className="btn btn-primary">{t('saveTaskBtn')}</button>
            </div>
          )}
        </form>

        {/* Task Detail Tabbed Content */}
        {isEditing && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            
            {/* Status Change Buttons */}
            <div style={{ marginBottom: '1.5rem', background: 'rgba(15,23,42,0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {t('changeTaskStatusLabel')}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['To Do', 'In Progress', 'Blocked', 'In Review', 'Completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => updateTaskStatus(task.id, st)}
                    className={`btn btn-sm ${task.status === st ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {t(st)}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Files */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Paperclip size={16} color="var(--accent-cyan)" />
                {t('taskFilesTitle')} ({taskFiles.length})
              </h3>

              {taskFiles.map(f => (
                <div key={f.id} style={{ padding: '0.5rem 0.75rem', background: 'var(--bg-card)', borderRadius: '6px', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span>{f.filename} ({f.currentVersion})</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{f.size}</span>
                </div>
              ))}

              <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Design_Mockup_v1.fig"
                  value={uploadFileName}
                  onChange={e => setUploadFileName(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-secondary btn-sm" style={{ gap: '0.3rem' }}>
                  <FileUp size={14} /> {t('attachFileBtn')}
                </button>
              </form>
            </div>

            {/* Task Discussion Comments */}
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={16} color="var(--accent-cyan)" />
                {t('discussionTitle')} ({taskComments.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
                {taskComments.length === 0 ? (
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('noCommentsYet')}</p>
                ) : (
                  taskComments.map(c => {
                    const author = users.find(u => u.id === c.authorId);
                    return (
                      <div key={c.id} style={{ padding: '0.65rem', background: 'rgba(15,23,42,0.6)', borderRadius: '8px', fontSize: '0.82rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <strong style={{ color: 'var(--text-primary)' }}>{author?.name || 'User'}</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>{getText(c.content)}</p>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder={t('writeCommentPlaceholder')}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={14} /> {t('postBtn')}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
