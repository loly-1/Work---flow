import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkflowVisualizer } from '../components/workflow/WorkflowVisualizer';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { FileManager } from '../components/files/FileManager';
import { FormalNotesList } from '../components/communication/FormalNotesList';
import { ActivityLogView } from '../components/communication/ActivityLogView';
import { StageReviewModal } from '../components/workflow/StageReviewModal';
import {
  Briefcase,
  Layers,
  CheckSquare,
  Users,
  FileCheck,
  MessageSquare,
  History,
  Send
} from 'lucide-react';

export const ProjectDetailView = ({ projectId, onNavigateToDelivery }) => {
  const { projects, workflowStages, users, teams, currentUser, t, getText, formatCurrency } = useApp();

  const project = projects.find(p => p.id === projectId) || projects[0];
  const projectStages = workflowStages.filter(s => s.projectId === project.id).sort((a,b) => a.order - b.order);

  const [activeTab, setActiveTab] = useState('workflow');
  const [selectedStageId, setSelectedStageId] = useState(project.currentStageId || projectStages[0]?.id);
  const [isStageReviewOpen, setIsStageReviewOpen] = useState(false);

  const selectedStage = projectStages.find(s => s.id === selectedStageId) || projectStages[0];
  const client = users.find(u => u.id === project.clientId);
  const pm = users.find(u => u.id === project.managerId);

  const tabs = [
    { id: 'overview', label: t('projectSummaryTitle'), icon: Briefcase },
    { id: 'workflow', label: t('workflowPipeline'), icon: Layers },
    { id: 'tasks', label: t('dashboard'), icon: CheckSquare },
    { id: 'teams', label: t('teamsWorkload'), icon: Users },
    { id: 'files', label: t('filesVersions'), icon: FileCheck },
    { id: 'notes', label: t('formalNotesTitle'), icon: MessageSquare },
    { id: 'activity', label: t('activityLog'), icon: History }
  ];

  return (
    <div className="content-padding animate-fade-in">
      {/* Project Banner Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-active">{t(project.status)}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('categoryLabel')} {getText(project.category)}</span>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>{getText(project.name)}</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{getText(project.description)}</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {selectedStage && (selectedStage.status === 'Active' || selectedStage.status === 'Submitted') && (
              <button
                onClick={() => setIsStageReviewOpen(true)}
                className="btn btn-warning btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <Send size={14} /> {t('submitStageDeliverables')}
              </button>
            )}

            {project.status === 'Ready for Delivery' && (
              <button
                onClick={() => onNavigateToDelivery && onNavigateToDelivery(project.id)}
                className="btn btn-success btn-sm"
                style={{ gap: '0.4rem' }}
              >
                {t('inspectFinalDeliveryBtn')}
              </button>
            )}
          </div>
        </div>

        {/* Workflow Overall Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>{t('workflowProgress')}</span>
            <strong style={{ color: 'var(--accent-cyan)' }}>{project.overallProgress}% {t('completePercent')}</strong>
          </div>
          <div style={{ height: '8px', background: 'rgba(15,23,42,0.8)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${project.overallProgress}%`, background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-cyan))', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '0.25rem'
      }}>
        {tabs.map(tItem => {
          const Icon = tItem.icon;
          const isActive = activeTab === tItem.id;
          return (
            <button
              key={tItem.id}
              onClick={() => setActiveTab(tItem.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
              {tItem.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.85rem' }}>{t('projectSummaryTitle')}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>{getText(project.description)}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('clientOrgLabel')}</span>
                <p style={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{client?.name} ({getText(client?.organization)})</p>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>{t('pmLabel')}</span>
                <p style={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>{pm?.name}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.85rem' }}>{t('keyMetricsTitle')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div>{t('budgetLabel')} <strong>{formatCurrency(project.budgetNum || 450000)}</strong></div>
              <div>{t('targetDateLabel')} <strong>{project.targetDate}</strong></div>
              <div>{t('workflowStagesLabel')} <strong>{projectStages.length} {t('sequentialStagesText')}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Visual Workflow */}
      {activeTab === 'workflow' && (
        <div>
          <WorkflowVisualizer
            stages={projectStages}
            activeStageId={selectedStageId}
            onSelectStage={(stgId) => setSelectedStageId(stgId)}
          />

          {selectedStage && (
            <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem' }}>
                {t('stageLabel')} {selectedStage.order}: {getText(selectedStage.name)} ({t(selectedStage.status)})
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {getText(selectedStage.description)}
              </p>

              <KanbanBoard
                projectId={project.id}
                stageId={selectedStage.id}
                canManageTasks={true}
              />
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Tasks Kanban */}
      {activeTab === 'tasks' && selectedStage && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <KanbanBoard
            projectId={project.id}
            stageId={selectedStage.id}
            canManageTasks={true}
          />
        </div>
      )}

      {/* Tab 4: Teams & Workload */}
      {activeTab === 'teams' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem' }}>{t('assignedProjectTeams')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {teams.map(team => (
              <div key={team.id} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: team.color }}>{getText(team.name)}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t('statusLabel')} {getText(team.status)}</p>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                  {team.members.length} {t('activeContributorsText')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Files */}
      {activeTab === 'files' && (
        <FileManager projectId={project.id} />
      )}

      {/* Tab 6: Formal Notes */}
      {activeTab === 'notes' && (
        <FormalNotesList projectId={project.id} stageId={selectedStageId} />
      )}

      {/* Tab 7: Activity Log */}
      {activeTab === 'activity' && (
        <ActivityLogView projectId={project.id} />
      )}

      {/* Stage Review Modal */}
      {isStageReviewOpen && selectedStage && (
        <StageReviewModal
          isOpen={isStageReviewOpen}
          onClose={() => setIsStageReviewOpen(false)}
          stage={selectedStage}
          project={project}
        />
      )}
    </div>
  );
};
