import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  CheckCircle2,
  FileCheck,
  Download,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalDeliveryView = ({ projectId, onBack }) => {
  const { projects, workflowStages, files, currentUser, acceptFinalDelivery, t, getText, formatCurrency } = useApp();

  const project = projects.find(p => p.id === projectId) || projects[1] || projects[0];
  const projectStages = workflowStages.filter(s => s.projectId === project.id);
  const projectFiles = files.filter(f => f.projectId === project.id);

  const handleAcceptDelivery = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });

    acceptFinalDelivery(project.id);
    alert(t('projectCompletedBadge'));
  };

  return (
    <div className="content-padding animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={onBack} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.25rem', gap: '0.4rem' }}>
        <ArrowLeft size={16} style={{ transform: document.documentElement.dir === 'rtl' ? 'rotate(180deg)' : 'none' }} /> {t('backToProjectsBtn')}
      </button>

      {/* Hero Delivery Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '2px solid var(--accent-emerald)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <Award size={36} color="#34d399" />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
          {t('finalDeliveryHubTitle')}
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#a7f3d0', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
          {t('finalDeliveryHubSub').replace('{name}', getText(project.name))}
        </p>

        {project.status === 'Ready for Delivery' && (
          <button
            onClick={handleAcceptDelivery}
            className="btn btn-success btn-lg"
            style={{ gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 1.75rem' }}
          >
            <CheckCircle2 size={20} /> {t('acceptFinalDeliveryAction')}
          </button>
        )}

        {project.status === 'Completed' && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.9rem'
          }}>
            <CheckCircle2 size={18} /> {t('projectCompletedBadge')}
          </div>
        )}
      </div>

      {/* Completed Stages Summary */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--accent-cyan)" /> {t('completedStageMilestones')} ({projectStages.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {projectStages.map(stg => (
            <div key={stg.id} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{t('stageLabel')} {stg.order}: {getText(stg.name)}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{getText(stg.description)}</p>
              </div>
              <span className="badge badge-approved">{t('Approved')} ✓</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Files Download Repository */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCheck size={20} color="var(--accent-cyan)" /> {t('finalProdDeliverables')} ({projectFiles.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {projectFiles.map(f => (
            <div key={f.id} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>{f.filename} ({f.currentVersion})</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getText(f.description)}</p>
              </div>

              <button
                onClick={() => alert(`${t('downloadTooltip')}: ${f.filename}`)}
                className="btn btn-primary btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <Download size={14} /> {t('downloadAssetBtn')} ({f.size})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
