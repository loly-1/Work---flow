import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FilePlus,
  Briefcase,
  GitBranch,
  Users,
  FolderKanban,
  FileCheck,
  Bell,
  History,
  CheckSquare,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, selectedProjectId, setSelectedProjectId }) => {
  const { currentUser, projects, projectRequests, notifications, t, getText } = useApp();

  const unreadNotifs = notifications.filter(n => n.userId === currentUser.id && !n.isRead).length;
  const pendingRequests = projectRequests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

  const navItems = [
    {
      id: 'dashboard',
      label: t('dashboard'),
      icon: LayoutDashboard,
      roles: ['Client', 'Project Manager', 'Team Leader', 'Team Member']
    },
    {
      id: 'requests',
      label: currentUser.role === 'Client' ? t('submitRequest') : t('projectRequests'),
      icon: FilePlus,
      badge: currentUser.role === 'Project Manager' && pendingRequests > 0 ? pendingRequests : null,
      roles: ['Client', 'Project Manager']
    },
    {
      id: 'projects',
      label: t('projectsWorkflows'),
      icon: Briefcase,
      roles: ['Client', 'Project Manager', 'Team Leader', 'Team Member']
    },
    {
      id: 'teams',
      label: t('teamsWorkload'),
      icon: Users,
      roles: ['Project Manager', 'Team Leader']
    },
    {
      id: 'files',
      label: t('filesVersions'),
      icon: FileCheck,
      roles: ['Client', 'Project Manager', 'Team Leader', 'Team Member']
    },
    {
      id: 'notifications',
      label: t('notificationHub'),
      icon: Bell,
      badge: unreadNotifs > 0 ? unreadNotifs : null,
      roles: ['Client', 'Project Manager', 'Team Leader', 'Team Member']
    },
    {
      id: 'activity',
      label: t('activityLog'),
      icon: History,
      roles: ['Client', 'Project Manager', 'Team Leader', 'Team Member']
    }
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      padding: '1.25rem 0.85rem',
      justifyContent: 'space-between'
    }}>
      <div>
        {/* Navigation Menu */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '0 0.75rem 0.6rem 0.75rem'
          }}>
            {t('navTitle')}
          </p>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems
              .filter(item => item.roles.includes(currentUser.role))
              .map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(59, 130, 246, 0.5)'
                        : '1px solid transparent',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={18} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span style={{
                        padding: '0.15rem 0.55rem',
                        borderRadius: '9999px',
                        background: 'var(--accent-rose)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </nav>
        </div>

        {/* Quick Active Project Switcher Section */}
        <div style={{
          padding: '0.85rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid var(--border-color)',
          marginTop: '1rem'
        }}>
          <p style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            Active Projects ({projects.length})
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '180px', overflowY: 'auto' }}>
            {projects.map(p => {
              const isSelected = selectedProjectId === p.id && activeTab === 'projects';
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setActiveTab('projects');
                  }}
                  style={{
                    padding: '0.5rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
                >
                  <p style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isSelected ? '#ffffff' : 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {getText(p.name)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3px' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {t(p.status)}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {p.overallProgress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Role Info */}
      <div style={{
        padding: '0.85rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentUser.name}
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {getText(currentUser.title)}
          </p>
        </div>
      </div>
    </aside>
  );
};
