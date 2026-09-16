import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskModal } from './TaskModal';
import {
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Paperclip,
  MessageSquare,
  Search
} from 'lucide-react';

export const KanbanBoard = ({ projectId, stageId, canManageTasks = true }) => {
  const { tasks, users, currentUser, updateTaskStatus, t, getText } = useApp();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');

  const stageTasks = tasks.filter(t => t.stageId === stageId && t.projectId === projectId);

  const filteredTasks = stageTasks.filter(task => {
    const titleText = getText(task.title).toLowerCase();
    const descText = getText(task.description).toLowerCase();
    const matchesSearch = titleText.includes(searchQuery.toLowerCase()) || descText.includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const columns = [
    { id: 'To Do', title: t('To Do'), color: '#94a3b8' },
    { id: 'In Progress', title: t('In Progress'), color: '#38bdf8' },
    { id: 'Blocked', title: t('Blocked'), color: '#f43f5e' },
    { id: 'In Review', title: t('In Review'), color: '#fbbf24' },
    { id: 'Completed', title: t('Completed'), color: '#34d399' }
  ];

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'Urgent':
        return { bg: 'rgba(244, 63, 94, 0.2)', border: '#f43f5e', color: '#fda4af', text: t('Urgent') };
      case 'High':
        return { bg: 'rgba(245, 158, 11, 0.2)', border: '#f59e0b', color: '#fbbf24', text: t('High') };
      case 'Medium':
        return { bg: 'rgba(59, 130, 246, 0.2)', border: '#3b82f6', color: '#93c5fd', text: t('Medium') };
      case 'Low':
      default:
        return { bg: 'rgba(100, 116, 139, 0.2)', border: '#64748b', color: '#cbd5e1', text: t('Low') };
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Board Controls: Search, Priority Filter, Add Task Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              placeholder={t('searchTasksPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: document.documentElement.dir === 'rtl' ? '0.9rem' : '2.2rem', paddingRight: document.documentElement.dir === 'rtl' ? '2.2rem' : '0.9rem', fontSize: '0.85rem' }}
            />
          </div>

          <select
            className="form-select"
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            style={{ width: '150px', fontSize: '0.85rem' }}
          >
            <option value="ALL">{t('allPriorities')}</option>
            <option value="Urgent">{t('Urgent')}</option>
            <option value="High">{t('High')}</option>
            <option value="Medium">{t('Medium')}</option>
            <option value="Low">{t('Low')}</option>
          </select>
        </div>

        {canManageTasks && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <Plus size={16} /> {t('createTaskBtn')}
          </button>
        )}
      </div>

      {/* Kanban Columns Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1rem',
        alignItems: 'start'
      }}>
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem',
                minHeight: '420px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Column Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${col.color}`
              }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }}></span>
                  {col.title}
                </h4>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '9999px'
                }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List inside Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {colTasks.length === 0 ? (
                  <div style={{
                    padding: '1.5rem 0.5rem',
                    textAlign: 'center',
                    border: '1px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem'
                  }}>
                    {t('noTasksInCol')} {col.title}
                  </div>
                ) : (
                  colTasks.map(task => {
                    const assignee = users.find(u => u.id === task.assigneeId);
                    const prio = getPriorityBadge(task.priority);

                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="glass-card"
                        style={{
                          padding: '0.9rem',
                          borderLeft: document.documentElement.dir === 'rtl' ? 'none' : (task.overdue ? '3px solid var(--accent-rose)' : `3px solid ${prio.border}`),
                          borderRight: document.documentElement.dir === 'rtl' ? (task.overdue ? '3px solid var(--accent-rose)' : `3px solid ${prio.border}`) : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {/* Overdue Warning Alert */}
                        {task.overdue && (
                          <div style={{
                            background: 'rgba(244, 63, 94, 0.15)',
                            color: '#fb7185',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}>
                            <AlertCircle size={12} /> {t('overdueBadge')} ({task.overdueDays || 2}d)
                          </div>
                        )}

                        {/* Priority Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{
                            background: prio.bg,
                            color: prio.color,
                            border: `1px solid ${prio.border}`,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.1rem 0.45rem',
                            borderRadius: '4px'
                          }}>
                            {prio.text}
                          </span>

                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {t('deadlineLabel')} {task.deadline}
                          </span>
                        </div>

                        {/* Title */}
                        <h5 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: '1.3' }}>
                          {getText(task.title)}
                        </h5>

                        {/* Description Preview */}
                        <p style={{
                          fontSize: '0.74rem',
                          color: 'var(--text-muted)',
                          marginBottom: '0.75rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {getText(task.description) || '—'}
                        </p>

                        {/* Card Footer Meta */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid var(--border-color)',
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                              <Paperclip size={12} /> {task.attachmentsCount || 0}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                              <MessageSquare size={12} /> {task.commentsCount || 0}
                            </span>
                          </div>

                          {assignee && (
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              title={assignee.name}
                              style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {isCreateModalOpen && (
        <TaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          projectId={projectId}
          stageId={stageId}
        />
      )}

      {selectedTask && (
        <TaskModal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          projectId={projectId}
          stageId={stageId}
        />
      )}
    </div>
  );
};
