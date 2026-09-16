import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { StageReviewModal } from '../components/workflow/StageReviewModal';
import {
  Layers,
  Send
} from 'lucide-react';

export const TeamDashboard = ({ onSelectProject }) => {
  const { currentUser, projects, workflowStages, tasks, t, getText } = useApp();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const userStages = workflowStages.filter(s =>
    s.leaderId === currentUser.id || s.memberIds?.includes(currentUser.id)
  );

  const activeStage = userStages.find(s => s.status === 'Active' || s.status === 'Revision Required' || s.status === 'Submitted') || userStages[0];
  const activeProject = activeStage ? projects.find(p => p.id === activeStage.projectId) : projects[0];

  const stageTasks = activeStage ? tasks.filter(t => t.stageId === activeStage.id) : [];
  const completedTasksCount = stageTasks.filter(t => t.status === 'Completed').length;
  const stageProgress = stageTasks.length > 0 ? Math.round((completedTasksCount / stageTasks.length) * 100) : 0;

  const isLeader = currentUser.role === 'Team Leader' || (activeStage && activeStage.leaderId === currentUser.id);

  if (!activeStage) {
    return (
      <div className="content-padding text-center">
        <h2>{t('noActiveStage')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('noActiveStageSub')}</p>
      </div>
    );
  }

  return (
    <div className="content-padding animate-fade-in">
      {/* Active Stage Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: activeStage.status === 'Revision Required' ? '2px solid var(--accent-rose)' : '1px solid var(--border-color)',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className={`badge ${activeStage.status === 'Active' ? 'badge-active' : activeStage.status === 'Revision Required' ? 'badge-revision' : 'badge-submitted'}`}>
                {t(activeStage.status)}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {t('projectLabel')} <strong style={{ color: '#ffffff' }}>{getText(activeProject?.name)}</strong>
              </span>
            </div>

            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {t('stageLabel')} {activeStage.order}: {getText(activeStage.name)}
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {getText(activeStage.description)}
            </p>
          </div>

          {/* Team Leader Deliverables Submit Button */}
          {isLeader && (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn btn-warning"
              style={{ gap: '0.4rem' }}
            >
              <Send size={16} /> {t('submitStageDeliverables')}
            </button>
          )}
        </div>

        {/* Stage Feedback Alert (If PM returned for Revision!) */}
        {activeStage.status === 'Revision Required' && activeStage.feedbackNotes && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid var(--accent-rose)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            color: '#fb7185',
            fontSize: '0.85rem'
          }}>
            <strong>{t('pmRevisionNotes')}</strong> "{getText(activeStage.feedbackNotes)}"
          </div>
        )}

        {/* Stage Task Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>{t('stageTasksProgress')}</span>
            <strong style={{ color: 'var(--accent-cyan)' }}>{completedTasksCount} {t('tasksCompletedOf')} {stageTasks.length} {t('tasksCompletedText')} ({stageProgress}%)</strong>
          </div>
          <div style={{ height: '8px', background: 'rgba(15,23,42,0.8)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${stageProgress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Main Kanban Task Management Board */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={20} color="var(--accent-cyan)" />
          {t('teamStageTasksKanban')}
        </h3>

        <KanbanBoard
          projectId={activeStage.projectId}
          stageId={activeStage.id}
          canManageTasks={true}
        />
      </div>

      {/* Stage Review Handoff Modal */}
      {isSubmitModalOpen && (
        <StageReviewModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          stage={activeStage}
          project={activeProject}
        />
      )}
    </div>
  );
};
