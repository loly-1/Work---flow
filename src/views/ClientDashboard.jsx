import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FilePlus,
  Briefcase,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClientDashboard = ({ onNavigateToRequests, onSelectProject, onNavigateToDelivery }) => {
  const { currentUser, projectRequests, projects, workflowStages, t, getText, formatCurrency } = useApp();

  const clientRequests = projectRequests.filter(r => r.clientId === currentUser.id);
  const clientProjects = projects.filter(p => p.clientId === currentUser.id);

  const activeProjectsCount = clientProjects.filter(p => p.status === 'In Progress').length;
  const completedProjectsCount = clientProjects.filter(p => p.status === 'Completed').length;
  const readyForDeliveryProjects = clientProjects.filter(p => p.status === 'Ready for Delivery');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="content-padding animate-fade-in">
      {/* Welcome Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {t('welcomeBack')}, {currentUser.name}! <Sparkles size={20} color="var(--accent-cyan)" />
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t('clientPortal')} &bull; {currentUser.organization}
          </p>
        </div>

        <button
          onClick={onNavigateToRequests}
          className="btn btn-primary"
          style={{ gap: '0.5rem' }}
        >
          <FilePlus size={18} /> {t('submitNewReqBtn')}
        </button>
      </div>

      {/* Delivery Notification Banner */}
      {readyForDeliveryProjects.length > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)',
          border: '2px solid var(--accent-emerald)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={24} color="#34d399" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                🎉 {t('deliverablesReady')}: {getText(readyForDeliveryProjects[0].name)}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#a7f3d0', marginTop: '2px' }}>
                {t('deliverablesReadySub')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerConfetti();
              if (onNavigateToDelivery) onNavigateToDelivery(readyForDeliveryProjects[0].id);
            }}
            className="btn btn-success"
            style={{ gap: '0.4rem' }}
          >
            {t('reviewFinalDelivery')} <ArrowRight size={16} style={{ transform: document.documentElement.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
          </button>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('submittedRequests')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{clientRequests.length}</div>
          <p style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>{clientRequests.filter(r => r.status === 'Under Review').length} {t('underReviewCount')}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('activeOps')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{activeProjectsCount}</div>
          <p style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>{t('seqWorkflowRunning')}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('completedDeliveries')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{completedProjectsCount}</div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t('fullySignedOff')}</p>
        </div>
      </div>

      {/* Client Active Projects & Stage Progress Tracker */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Briefcase size={20} color="var(--accent-cyan)" />
          {t('activeWorkflows')}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {clientProjects.map(proj => {
            const projStages = workflowStages.filter(s => s.projectId === proj.id).sort((a,b) => a.order - b.order);
            const activeStage = projStages.find(s => s.id === proj.currentStageId) || projStages[0];

            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className="glass-panel"
                style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{getText(proj.name)}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{getText(proj.description)}</p>
                  </div>

                  <span className={`badge ${proj.status === 'Completed' ? 'badge-approved' : 'badge-active'}`} style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}>
                    {t(proj.status)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <span>{t('workflowProgress')}</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{proj.overallProgress}% {t('completePercent')}</strong>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(15,23,42,0.8)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${proj.overallProgress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                {/* Current Stage Meta */}
                {activeStage && (
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{t('currentActiveStage')}</span>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {t('stageLabel')} {activeStage.order}: {getText(activeStage.name)}
                      </p>
                    </div>

                    <div style={{ textAlign: document.documentElement.dir === 'rtl' ? 'left' : 'right', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {t('targetCompletion')} <strong style={{ color: '#ffffff' }}>{proj.targetDate}</strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
