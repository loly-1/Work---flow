import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  History,
  ShieldCheck,
  User,
  Clock,
  CheckCircle2,
  FileUp,
  AlertTriangle,
  PlayCircle,
  FolderPlus,
  MessageSquare
} from 'lucide-react';

export const ActivityLogView = ({ projectId }) => {
  const { activityLogs, projects, getText } = useApp();

  const filteredLogs = activityLogs.filter(log => !projectId || log.projectId === projectId);

  const getActionIcon = (actionVal) => {
    const action = getText(actionVal);
    if (action.includes('Approved') || action.includes('قبول')) return <CheckCircle2 size={16} color="#34d399" />;
    if (action.includes('Submitted') || action.includes('تقديم')) return <Clock size={16} color="#fbbf24" />;
    if (action.includes('Uploaded') || action.includes('رفع')) return <FileUp size={16} color="#38bdf8" />;
    if (action.includes('Created') || action.includes('إنشاء')) return <FolderPlus size={16} color="#60a5fa" />;
    if (action.includes('Revision') || action.includes('تعديل')) return <AlertTriangle size={16} color="#fb7185" />;
    return <PlayCircle size={16} color="#c084fc" />;
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={22} color="var(--accent-cyan)" />
          Chronological Activity Log & Audit Trail
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Immutable record of project creation, stage approvals, file version uploads, and sequential handoffs.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)' }}>
          {filteredLogs.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No activity records found.</p>
          ) : (
            filteredLogs.map(log => {
              const proj = projects.find(p => p.id === log.projectId);

              return (
                <div key={log.id} style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  {/* Timeline Dot Icon */}
                  <div style={{
                    position: 'absolute',
                    left: '-2.15rem',
                    top: '0',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getActionIcon(log.action)}
                  </div>

                  {/* Log Content Card */}
                  <div className="glass-card" style={{ padding: '0.9rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                        {getText(log.action)}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {getText(log.details)}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Actor: <strong style={{ color: 'var(--accent-cyan)' }}>{log.actorName}</strong> ({log.actorRole})</span>
                      {proj && (
                        <span>Project: <strong>{getText(proj.name)}</strong></span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
