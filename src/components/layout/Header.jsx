import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  User,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const Header = ({ onOpenNotifications, onSelectProject }) => {
  const { users, currentUser, switchUser, notifications, markNotificationAsRead, resetDemoData, projects, language, setLanguage, t, getText } = useApp();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifPreview, setShowNotifPreview] = useState(false);

  const unreadNotifs = notifications.filter(n => n.userId === currentUser.id && !n.isRead);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Client':
        return { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', label: t('clientRole') };
      case 'Project Manager':
        return { bg: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', label: t('pmRole') };
      case 'Team Leader':
        return { bg: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', label: t('leaderRole') };
      case 'Team Member':
        return { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', label: t('memberRole') };
      default:
        return { bg: 'rgba(255,255,255,0.1)', color: '#fff', label: role };
    }
  };

  const currentBadge = getRoleBadge(currentUser.role);

  return (
    <header style={{
      height: '70px',
      background: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left: Branding & Role Context Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
          }}>
            <Layers size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('platformName')}<span style={{ color: 'var(--accent-cyan)' }}>Pro</span>
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '-2px' }}>
              {t('platformSub')}
            </p>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>

        {/* Current Active Role Pill */}
        <div style={{
          background: currentBadge.bg,
          border: `1px solid ${currentBadge.color}`,
          color: currentBadge.color,
          padding: '0.3rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.78rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <ShieldCheck size={14} />
          {currentBadge.label}: {currentUser.name}
        </div>
      </div>

      {/* Right Actions: Language Switcher, Role Switcher, Reset Demo, Notification Bell, User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* TOP-RIGHT LANGUAGE SWITCHER (العربية | English) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: '9999px',
          padding: '2px',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.25)'
        }}>
          <button
            onClick={() => setLanguage('ar')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              background: language === 'ar' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)' : 'transparent',
              color: language === 'ar' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            العربية
          </button>

          <span style={{ color: 'var(--border-color-light)', fontSize: '0.75rem', margin: '0 1px' }}>|</span>

          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              background: language === 'en' ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)' : 'transparent',
              color: language === 'en' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            English
          </button>
        </div>
        
        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (window.confirm('Reset all workflow data to default seed state?')) {
              resetDemoData();
            }
          }}
          className="btn btn-secondary btn-sm"
          title="Reset to pre-loaded demo data state"
          style={{ gap: '0.35rem', fontSize: '0.78rem' }}
        >
          <RotateCcw size={14} />
          Reset Demo State
        </button>

        {/* Quick Role Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="btn btn-secondary btn-sm"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              borderColor: 'rgba(59, 130, 246, 0.4)',
              color: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <User size={14} />
            <span>Switch Role ({currentUser.role})</span>
            <ChevronDown size={14} />
          </button>

          {showRoleDropdown && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '280px',
              padding: '0.5rem',
              zIndex: 50,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.4rem 0.6rem 0.2rem 0.6rem', textTransform: 'uppercase' }}>
                Test Application As User:
              </p>
              {users.map(u => {
                const b = getRoleBadge(u.role);
                const isSelected = u.id === currentUser.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowRoleDropdown(false);
                    }}
                    style={{
                      padding: '0.6rem',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      border: isSelected ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.25rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
                  >
                    <img src={u.avatar} alt={u.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {u.name}
                      </p>
                      <p style={{ fontSize: '0.72rem', color: b.color, fontWeight: 600 }}>
                        {u.role} &bull; {u.organization}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Icon with Unread Badge */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifPreview(!showNotifPreview);
              if (onOpenNotifications) onOpenNotifications();
            }}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {unreadNotifs.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--accent-rose)',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)'
              }}>
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {/* Quick Notification Dropdown Preview */}
          {showNotifPreview && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '340px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '0.85rem',
              zIndex: 50,
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.9rem' }}>Notifications ({unreadNotifs.length} unread)</h4>
                <button
                  onClick={() => setShowNotifPreview(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  Close
                </button>
              </div>

              {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                  No notifications for {currentUser.name}.
                </p>
              ) : (
                notifications.filter(n => n.userId === currentUser.id).slice(0, 5).map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      if (n.linkProjectId && onSelectProject) {
                        onSelectProject(n.linkProjectId);
                        setShowNotifPreview(false);
                      }
                    }}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '8px',
                      background: n.isRead ? 'transparent' : 'rgba(59, 130, 246, 0.1)',
                      borderLeft: n.isRead ? '2px solid transparent' : '2px solid var(--accent-primary)',
                      marginBottom: '0.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    <p style={{ fontSize: '0.82rem', fontWeight: 700, color: n.isRead ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                      {n.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', lineClamp: 2 }}>
                      {n.message}
                    </p>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingLeft: '0.5rem' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color-light)' }}
          />
        </div>

      </div>
    </header>
  );
};
