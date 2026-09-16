import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Activity
} from 'lucide-react';

export const ProjectManagerDashboard = ({ onNavigateToRequests, onSelectProject, onNavigateToTeams }) => {
  const { projects, projectRequests, workflowStages, tasks, teams, activityLogs, currentUser, t, getText, formatCurrency } = useApp();

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  
  const submittedStages = workflowStages.filter(s => s.status === 'Submitted');
  const pendingRequests = projectRequests.filter(r => r.status === 'Submitted' || r.status === 'Under Review');
  const overdueTasks = tasks.filter(t => t.overdue || new Date(t.deadline) < new Date());

  return (
    <div className="content-padding animate-fade-in">
      {/* PM Overview Title Banner */}
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
            {t('pmCommand')} <ShieldCheck size={22} color="var(--accent-cyan)" />
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {t('pmSub')}: {currentUser.name}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onNavigateToRequests}
            className="btn btn-primary"
            style={{ gap: '0.4rem' }}
          >
            {t('reviewReqsBtn')} ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* High-Level Stat Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('totalPortfolio')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{totalProjects}</div>
          <p style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>{t('projectsUnderMgmt')}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('activeOpsStat')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>{activeProjects}</div>
          <p style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>{t('seqStagesRunning')}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: submittedStages.length > 0 ? '4px solid var(--accent-amber)' : '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('requiresPmReview')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: submittedStages.length > 0 ? 'var(--accent-amber)' : '#ffffff', marginTop: '4px' }}>
            {submittedStages.length}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t('submittedStageHandoffs')}</p>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: overdueTasks.length > 0 ? '4px solid var(--accent-rose)' : '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{t('overdueTasks')}</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: overdueTasks.length > 0 ? 'var(--accent-rose)' : '#ffffff', marginTop: '4px' }}>
            {overdueTasks.length}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '4px' }}>{t('reassignNotice')}</p>
        </div>
      </div>

      {/* Main Grid: Pending Reviews & Active Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Left Column: Stages Requiring PM Approval & Active Projects */}
        <div>
          {/* Pending Stage Reviews Alert */}
          {submittedStages.length > 0 && (
            <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--accent-amber)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-amber)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} /> {t('submittedDeliverablesPm')} ({submittedStages.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {submittedStages.map(stg => {
                  const proj = projects.find(p => p.id === stg.projectId);
                  return (
                    <div key={stg.id} style={{ background: 'var(--bg-card)', padding: '0.9rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                          {getText(stg.name)} &bull; {t('stageLabel')} {stg.order}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {t('projectLabel')} <strong>{getText(proj?.name)}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectProject(stg.projectId)}
                        className="btn btn-warning btn-sm"
                        style={{ gap: '0.3rem' }}
                      >
                        {t('inspectReviewHandoff')} <ArrowRight size={14} style={{ transform: document.documentElement.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Projects List */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} color="var(--accent-cyan)" />
              {t('activeProjectsPortfolios')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p.id)}
                  className="glass-panel"
                  style={{ padding: '1.25rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>{getText(p.name)}</h4>
                    <span className="badge badge-active">{t(p.status)}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{getText(p.description)}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>{t('categoryLabel')} <strong style={{ color: 'var(--text-primary)' }}>{getText(p.category)}</strong></span>
                    <span>{t('deadlineLabel')} <strong style={{ color: 'var(--text-primary)' }}>{p.targetDate}</strong></span>
                    <span>{t('progressLabel')} <strong style={{ color: 'var(--accent-cyan)' }}>{p.overallProgress}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Team Workload & Activity Log Stream */}
        <div>
          {/* Team Workload Summary */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} color="var(--accent-cyan)" /> {t('teamWorkloadDist')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {teams.map(team => (
                <div key={team.id} style={{ background: 'var(--bg-card)', padding: '0.7rem', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: '2px' }}>
                    <span>{getText(team.name)}</span>
                    <span style={{ color: team.color }}>{getText(team.status)}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {team.members.length} {t('activeMembersAssigned')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Operations Activity */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={18} color="var(--accent-cyan)" /> {t('liveAuditStream')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '300px', overflowY: 'auto' }}>
              {activityLogs.slice(0, 6).map(act => (
                <div key={act.id} style={{ fontSize: '0.78rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    <strong>{act.actorName} ({t(act.actorRole)})</strong>
                    <span>{new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p style={{ color: '#ffffff', fontWeight: 600, marginTop: '2px' }}>{getText(act.action)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
