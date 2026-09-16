import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ClientDashboard } from './views/ClientDashboard';
import { ProjectManagerDashboard } from './views/ProjectManagerDashboard';
import { TeamDashboard } from './views/TeamDashboard';
import { RequestReviewView } from './views/RequestReviewView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { FinalDeliveryView } from './views/FinalDeliveryView';
import { FileManager } from './components/files/FileManager';
import { ActivityLogView } from './components/communication/ActivityLogView';
import { FormalNotesList } from './components/communication/FormalNotesList';

const MainAppContent = () => {
  const { currentUser, projects } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'proj-1');

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === 'Client') {
          return (
            <ClientDashboard
              onNavigateToRequests={() => setActiveTab('requests')}
              onSelectProject={(pId) => {
                setSelectedProjectId(pId);
                setActiveTab('projects');
              }}
              onNavigateToDelivery={(pId) => {
                setSelectedProjectId(pId);
                setActiveTab('delivery');
              }}
            />
          );
        } else if (currentUser.role === 'Project Manager') {
          return (
            <ProjectManagerDashboard
              onNavigateToRequests={() => setActiveTab('requests')}
              onSelectProject={(pId) => {
                setSelectedProjectId(pId);
                setActiveTab('projects');
              }}
              onNavigateToTeams={() => setActiveTab('teams')}
            />
          );
        } else {
          return (
            <TeamDashboard
              onSelectProject={(pId) => {
                setSelectedProjectId(pId);
                setActiveTab('projects');
              }}
            />
          );
        }

      case 'requests':
        return (
          <RequestReviewView
            onSelectProject={(pId) => {
              setSelectedProjectId(pId);
              setActiveTab('projects');
            }}
          />
        );

      case 'projects':
        return (
          <ProjectDetailView
            projectId={selectedProjectId}
            onNavigateToDelivery={(pId) => {
              setSelectedProjectId(pId);
              setActiveTab('delivery');
            }}
          />
        );

      case 'files':
        return (
          <div className="content-padding animate-fade-in">
            <FileManager projectId={selectedProjectId} />
          </div>
        );

      case 'activity':
        return (
          <div className="content-padding animate-fade-in">
            <ActivityLogView projectId={selectedProjectId} />
          </div>
        );

      case 'delivery':
        return (
          <FinalDeliveryView
            projectId={selectedProjectId}
            onBack={() => setActiveTab('projects')}
          />
        );

      default:
        return (
          <ClientDashboard
            onNavigateToRequests={() => setActiveTab('requests')}
            onSelectProject={(pId) => {
              setSelectedProjectId(pId);
              setActiveTab('projects');
            }}
          />
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />

      <div className="main-content">
        <Header
          onOpenNotifications={() => setActiveTab('notifications')}
          onSelectProject={(pId) => {
            setSelectedProjectId(pId);
            setActiveTab('projects');
          }}
        />

        <main style={{ flex: 1 }}>
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
