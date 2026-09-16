import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FilePlus,
  XCircle,
  ShieldCheck,
  Trash2,
  Briefcase
} from 'lucide-react';

export const RequestReviewView = ({ onSelectProject }) => {
  const { currentUser, projectRequests, submitProjectRequest, reviewProjectRequest, convertRequestToProject, teams, users, t, getText, formatCurrency } = useApp();

  const [activeTab, setActiveTab] = useState(currentUser.role === 'Client' ? 'new_request' : 'review_list');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Client Request Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [businessStatement, setBusinessStatement] = useState('');
  const [category, setCategory] = useState('catFintech');
  const [priority, setPriority] = useState('High');
  const [expectedDeadline, setExpectedDeadline] = useState('2026-12-15');
  const [budget, setBudget] = useState('320000');

  // Custom Workflow Builder state for PM Conversion
  const [customStages, setCustomStages] = useState([
    { name: { en: '1. Requirement & Architecture Planning', ar: '1. التخطيط وهندسة المعمارية التقنية' }, teamId: 'team-1' },
    { name: { en: '2. Interactive UI/UX Design', ar: '2. تصميم واجهات وتجربة المستخدم UI/UX' }, teamId: 'team-2' },
    { name: { en: '3. Core Development', ar: '3. تطوير البرمجيات والواجهات' }, teamId: 'team-3' },
    { name: { en: '4. QA & Security Compliance', ar: '4. اختبارات الجودة والأمن السيبراني' }, teamId: 'team-4' }
  ]);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    submitProjectRequest({
      title,
      description,
      businessStatement,
      category: t(category) || category,
      priority,
      expectedDeadline,
      budgetNum: Number(budget) || 100000
    });

    setTitle('');
    setDescription('');
    setBusinessStatement('');
    alert(t('submitProjectReqBtn') + ' ✓');
    setActiveTab('review_list');
  };

  const handleConvertProject = (reqId) => {
    const createdProject = convertRequestToProject(reqId, customStages);
    if (createdProject && onSelectProject) {
      onSelectProject(createdProject.id);
    }
  };

  return (
    <div className="content-padding animate-fade-in">
      {/* Top Header Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FilePlus size={24} color="var(--accent-cyan)" />
            {t('reqOpsTitle')}
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {t('reqOpsSub')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.3rem', borderRadius: 'var(--radius-md)' }}>
          {currentUser.role === 'Client' && (
            <button
              onClick={() => setActiveTab('new_request')}
              className={`btn btn-sm ${activeTab === 'new_request' ? 'btn-primary' : 'btn-secondary'}`}
            >
              {t('submitNewReqTab')}
            </button>
          )}

          <button
            onClick={() => setActiveTab('review_list')}
            className={`btn btn-sm ${activeTab === 'review_list' ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t('allReqsTab')} ({projectRequests.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Client Request Form */}
      {activeTab === 'new_request' && (
        <div className="glass-panel" style={{ padding: '1.75rem', maxWidth: '850px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            {t('intakeFormTitle')}
          </h2>

          <form onSubmit={handleSubmitRequest}>
            <div className="form-group">
              <label className="form-label">{t('projectTitleReq')}</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">{t('projectCategoryLabel')}</label>
                <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="catFintech">{t('catFintech')}</option>
                  <option value="catMobile">{t('catMobile')}</option>
                  <option value="catHealthcare">{t('catHealthcare')}</option>
                  <option value="catBranding">{t('catBranding')}</option>
                  <option value="catCloud">{t('catCloud')}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('priorityField')}</label>
                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="Low">{t('Low')}</option>
                  <option value="Medium">{t('Medium')}</option>
                  <option value="High">{t('High')}</option>
                  <option value="Urgent">{t('Urgent')}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('targetCompletionDate')}</label>
                <input
                  type="date"
                  className="form-input"
                  value={expectedDeadline}
                  onChange={e => setExpectedDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('projectDescReq')}</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('businessProblemStatement')}</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={businessStatement}
                onChange={e => setBusinessStatement(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('estimatedBudget')}</label>
              <input
                type="number"
                className="form-input"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary btn-lg" style={{ gap: '0.4rem' }}>
                <FilePlus size={18} /> {t('submitProjectReqBtn')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Requests List & PM Conversion Workflow Builder */}
      {activeTab === 'review_list' && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedRequest ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
          
          {/* Requests Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{t('submittedRequests')} ({projectRequests.length})</h3>

            {projectRequests.map(req => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="glass-panel"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>{getText(req.title)}</h4>
                    <span className={`badge ${req.status === 'Converted to Project' ? 'badge-approved' : req.status === 'Accepted' ? 'badge-active' : 'badge-submitted'}`}>
                      {t(req.status)}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{getText(req.description)}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{t('budgetLabel')} <strong style={{ color: 'var(--accent-cyan)' }}>{formatCurrency(req.budgetNum || 350000)}</strong></span>
                    <span>{t('targetDateLabel')} <strong style={{ color: '#ffffff' }}>{req.expectedDeadline}</strong></span>
                    <span>{t('priorityField')}: <strong style={{ color: '#ffffff' }}>{t(req.priority)}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Request Inspection & PM Custom Workflow Builder */}
          {selectedRequest && (
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{t('reviewReqTitle')} {getText(selectedRequest.title)}</h3>
                <button onClick={() => setSelectedRequest(null)} className="btn btn-secondary btn-sm"><XCircle size={16} /></button>
              </div>

              <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <p><strong>{t('businessCaseLabel')}</strong> {getText(selectedRequest.businessStatement) || 'N/A'}</p>
                <p><strong>{t('statusLabel')}</strong> <span className="badge badge-active">{t(selectedRequest.status)}</span></p>
              </div>

              {/* PM Actions */}
              {currentUser.role === 'Project Manager' && selectedRequest.status !== 'Converted to Project' && (
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={18} /> {t('customWorkflowBuilderTitle')}
                  </h4>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {t('customWorkflowSub')}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {customStages.map((stg, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <strong>{getText(stg.name)}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('teamsWorkload')}: {stg.teamId}</div>
                        </div>
                        <button
                          onClick={() => setCustomStages(prev => prev.filter((_, i) => i !== idx))}
                          style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => reviewProjectRequest(selectedRequest.id, 'Rejected', 'Does not align with scope')}
                      className="btn btn-danger btn-sm"
                    >
                      {t('rejectReqBtn')}
                    </button>

                    <button
                      onClick={() => handleConvertProject(selectedRequest.id)}
                      className="btn btn-success btn-sm"
                      style={{ gap: '0.4rem', flex: 1 }}
                    >
                      <Briefcase size={16} /> {t('acceptConvertBtn')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
