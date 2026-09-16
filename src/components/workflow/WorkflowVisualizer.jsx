import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Lock,
  Clock,
  AlertTriangle,
  PlayCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const WorkflowVisualizer = ({ stages = [], activeStageId, onSelectStage }) => {
  const { t, getText } = useApp();

  if (!stages || stages.length === 0) return null;

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  const getStageBadgeProps = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          border: '#10b981',
          color: '#34d399',
          icon: CheckCircle2,
          text: t('approvedCheck')
        };
      case 'Active':
        return {
          bg: 'rgba(6, 182, 212, 0.2)',
          border: '#06b6d4',
          color: '#38bdf8',
          icon: PlayCircle,
          text: t('activeWorkDot')
        };
      case 'Submitted':
        return {
          bg: 'rgba(245, 158, 11, 0.2)',
          border: '#f59e0b',
          color: '#fbbf24',
          icon: Clock,
          text: t('pmReviewClock')
        };
      case 'Revision Required':
        return {
          bg: 'rgba(244, 63, 94, 0.2)',
          border: '#f43f5e',
          color: '#fb7185',
          icon: AlertTriangle,
          text: t('revisionNeededAlert')
        };
      case 'Locked':
      default:
        return {
          bg: 'rgba(100, 116, 139, 0.15)',
          border: '#64748b',
          color: '#94a3b8',
          icon: Lock,
          text: t('lockedLock')
        };
    }
  };

  return (
    <div style={{
      width: '100%',
      padding: '1.25rem',
      borderRadius: 'var(--radius-lg)',
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid var(--border-color)',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--accent-cyan)" />
            {t('workflowPipeline')}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {t('workflowPipelineSub')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12} color="#34d399" /> {t('Approved')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><PlayCircle size={12} color="#38bdf8" /> {t('Active')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} color="#fbbf24" /> {t('In Review')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Lock size={12} color="#94a3b8" /> {t('Locked')}</span>
        </div>
      </div>

      {/* Workflow Connected Chain */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: '0.75rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {sortedStages.map((stage, idx) => {
          const badge = getStageBadgeProps(stage.status);
          const Icon = badge.icon;
          const isSelected = activeStageId === stage.id;
          const isLast = idx === sortedStages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Card */}
              <div
                onClick={() => onSelectStage && onSelectStage(stage.id)}
                style={{
                  flex: '1 1 200px',
                  minWidth: '210px',
                  background: isSelected
                    ? 'rgba(30, 41, 59, 0.95)'
                    : stage.status === 'Active'
                    ? 'rgba(6, 182, 212, 0.08)'
                    : 'var(--bg-card)',
                  border: isSelected
                    ? '2px solid var(--accent-primary)'
                    : `1px solid ${badge.border}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px'
                  }}>
                    {t('stage')} {stage.order}
                  </span>

                  <span style={{
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.border}`,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Icon size={12} />
                    {badge.text}
                  </span>
                </div>

                {/* Stage Title */}
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '0.35rem',
                  color: stage.status === 'Locked' ? 'var(--text-muted)' : 'var(--text-primary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {getText(stage.name)}
                </h4>

                <p style={{
                  fontSize: '0.73rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                  height: '32px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {getText(stage.description)}
                </p>

                {/* Stage Footer Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {t('deadline')} <strong style={{ color: 'var(--text-primary)' }}>{stage.deadline}</strong>
                  </span>
                  {stage.deliverablesNeeded && (
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {Array.isArray(stage.deliverablesNeeded) ? stage.deliverablesNeeded.length : (getText(stage.deliverablesNeeded) ? 2 : 0)} {t('deliverablesCount')}
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting Arrow between Stages */}
              {!isLast && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  padding: '0 0.15rem'
                }}>
                  <ChevronRight size={20} color="var(--border-color-light)" style={{ transform: document.documentElement.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
