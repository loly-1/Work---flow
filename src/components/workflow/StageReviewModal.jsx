import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Send
} from 'lucide-react';

export const StageReviewModal = ({ isOpen, onClose, stage, project }) => {
  const { currentUser, submitStageForReview, approveStage, rejectStage, files, t, getText } = useApp();

  const [submissionNotes, setSubmissionNotes] = useState('');
  const [pmFeedback, setPmFeedback] = useState('');

  if (!isOpen || !stage) return null;

  const stageFiles = files.filter(f => f.stageId === stage.id || f.projectId === stage.projectId);
  const isPM = currentUser.role === 'Project Manager';

  const handleSubmitDeliverables = (e) => {
    e.preventDefault();
    if (!submissionNotes.trim()) return;
    submitStageForReview(stage.id, submissionNotes);
    onClose();
  };

  const handleApprove = () => {
    approveStage(stage.id, pmFeedback);
    onClose();
  };

  const handleReject = () => {
    if (!pmFeedback.trim()) {
      alert(t('feedbackApprovalNotes'));
      return;
    }
    rejectStage(stage.id, pmFeedback);
    onClose();
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
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={22} color="var(--accent-cyan)" />
              {t('stageSubmissionReviewTitle')}
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('stageLabel')} {stage.order}: {getText(stage.name)}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Deliverables Checklist */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
            {t('requiredStageDeliverables')}
          </h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0, paddingRight: 0, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {Array.isArray(stage.deliverablesNeeded) ? stage.deliverablesNeeded.map((del, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                <FileCheck size={14} color="var(--accent-emerald)" /> {getText(del)}
              </li>
            )) : (
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                <FileCheck size={14} color="var(--accent-emerald)" /> {getText(stage.deliverablesNeeded)}
              </li>
            )}
          </ul>
        </div>

        {/* Attached Deliverable Files Repository */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {t('attachedFilesReview')} ({stageFiles.length}):
          </h4>
          {stageFiles.length === 0 ? (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('noFilesUploadedStage')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {stageFiles.map(f => (
                <div key={f.id} style={{ padding: '0.5rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: '#ffffff' }}>{f.filename}</strong> ({f.currentVersion})
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{getText(f.description)}</p>
                  </div>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{f.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submission Action for Team Leader */}
        {stage.status === 'Active' || stage.status === 'Revision Required' ? (
          <form onSubmit={handleSubmitDeliverables} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t('leaderSubmissionNotes')}</h4>
            <div className="form-group">
              <textarea
                className="form-textarea"
                rows={3}
                value={submissionNotes}
                onChange={e => setSubmissionNotes(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>{t('cancelBtn')}</button>
              <button type="submit" className="btn btn-warning" style={{ gap: '0.4rem' }}>
                <Send size={16} /> {t('submitStagePmReviewBtn')}
              </button>
            </div>
          </form>
        ) : null}

        {/* PM Approval / Revision Controls */}
        {isPM && stage.status === 'Submitted' && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', background: 'rgba(59, 130, 246, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="var(--accent-cyan)" />
              {t('pmReviewDecisionTitle')}
            </h4>

            <div className="form-group">
              <label className="form-label">{t('feedbackApprovalNotes')}</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={pmFeedback}
                onChange={e => setPmFeedback(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleReject}
                className="btn btn-danger"
                style={{ gap: '0.4rem' }}
              >
                <AlertTriangle size={16} /> {t('requestRevisionsBtn')}
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="btn btn-success"
                style={{ gap: '0.4rem' }}
              >
                <CheckCircle2 size={16} /> {t('approveActivateNextBtn')}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
