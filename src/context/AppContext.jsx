import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_TEAMS,
  INITIAL_PROJECT_REQUESTS,
  INITIAL_WORKFLOW_STAGES,
  INITIAL_TASKS,
  INITIAL_PROJECTS,
  INITIAL_FILES,
  INITIAL_COMMENTS,
  INITIAL_NOTES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS
} from '../data/initialDemoData';
import { TRANSLATIONS, getBilingualText } from '../utils/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language State ('en' or 'ar')
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('wf_lang') || 'en';
  });

  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const getText = (val) => getBilingualText(val, language);

  const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    if (language === 'ar') {
      return `${num.toLocaleString('ar-SA')} ر.س`;
    }
    return `SAR ${num.toLocaleString('en-US')}`;
  };

  // Sync RTL / LTR document attributes
  useEffect(() => {
    localStorage.setItem('wf_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  // Load state from localStorage or initial seed
  const [users] = useState(INITIAL_USERS);
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('wf_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });
  
  // Current active user (default to Project Manager Alex Morgan for full visibility)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedId = localStorage.getItem('wf_user_id');
    const found = INITIAL_USERS.find(u => u.id === savedId);
    return found || INITIAL_USERS[1]; // Alex Morgan (PM)
  });

  const [projectRequests, setProjectRequests] = useState(() => {
    const saved = localStorage.getItem('wf_requests');
    return saved ? JSON.parse(saved) : INITIAL_PROJECT_REQUESTS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('wf_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [workflowStages, setWorkflowStages] = useState(() => {
    const saved = localStorage.getItem('wf_stages');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOW_STAGES;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('wf_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('wf_files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('wf_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('wf_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('wf_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem('wf_logs');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('wf_user_id', currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('wf_requests', JSON.stringify(projectRequests));
  }, [projectRequests]);

  useEffect(() => {
    localStorage.setItem('wf_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('wf_stages', JSON.stringify(workflowStages));
  }, [workflowStages]);

  useEffect(() => {
    localStorage.setItem('wf_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('wf_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem('wf_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('wf_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('wf_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('wf_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Helper to log activities
  const logActivity = (projectId, action, details) => {
    const newLog = {
      id: `act-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      projectId,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Helper to add notifications
  const sendNotification = (userId, title, message, type = 'info', linkProjectId = null) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      userId,
      title,
      message,
      type,
      linkProjectId,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Switch Role/User
  const switchUser = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  // 1. Client Request Actions
  const submitProjectRequest = (requestData) => {
    const newReqId = `req-${Date.now().toString().slice(-4)}`;
    const newRequest = {
      id: newReqId,
      clientId: currentUser.id,
      title: requestData.title,
      description: requestData.description,
      businessStatement: requestData.businessStatement,
      category: requestData.category || 'Software Application',
      priority: requestData.priority || 'Medium',
      expectedDeadline: requestData.expectedDeadline,
      budget: requestData.budget ? `$${requestData.budget}` : 'TBD',
      requiredFeatures: requestData.requiredFeatures || [],
      expectedDeliverables: requestData.expectedDeliverables || [],
      attachments: requestData.attachments || [],
      additionalNotes: requestData.additionalNotes || '',
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    setProjectRequests(prev => [newRequest, ...prev]);

    // Notify PMs
    users.filter(u => u.role === 'Project Manager').forEach(pm => {
      sendNotification(
        pm.id,
        'New Project Request Submitted',
        `${currentUser.name} submitted a new project request: "${requestData.title}".`,
        'request_submitted'
      );
    });

    logActivity(null, 'Submitted Project Request', `Client ${currentUser.name} created request "${requestData.title}".`);
    return newRequest;
  };

  const reviewProjectRequest = (requestId, status, pmsFeedback = '') => {
    setProjectRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status, pmsFeedback };
      }
      return req;
    }));

    const req = projectRequests.find(r => r.id === requestId);
    if (req) {
      sendNotification(
        req.clientId,
        `Project Request ${status}`,
        `Your request "${req.title}" status has been updated to ${status}. ${pmsFeedback ? `PM Note: ${pmsFeedback}` : ''}`,
        status === 'Accepted' ? 'success' : 'warning'
      );

      logActivity(null, `Request Review: ${status}`, `PM ${currentUser.name} updated request "${req.title}" to ${status}.`);
    }
  };

  // 2. Project & Custom Workflow Creation
  const convertRequestToProject = (requestId, customStages = []) => {
    const req = projectRequests.find(r => r.id === requestId);
    if (!req) return;

    const projectId = `proj-${Date.now().toString().slice(-4)}`;
    
    // Process custom stages or default setup
    const createdStages = (customStages.length > 0 ? customStages : [
      {
        name: 'Requirement & Planning',
        description: 'Gather specs and build architecture blueprint.',
        teamId: 'team-1',
        leaderId: 'user-3',
        deliverablesNeeded: ['Architecture Spec PDF']
      },
      {
        name: 'UI/UX Design',
        description: 'Figma interactive wireframes and design system.',
        teamId: 'team-2',
        leaderId: 'user-5',
        deliverablesNeeded: ['Figma Prototype']
      },
      {
        name: 'Core Development',
        description: 'Frontend React UI and REST API integration.',
        teamId: 'team-3',
        leaderId: 'user-3',
        deliverablesNeeded: ['Working Codebase']
      },
      {
        name: 'QA & Security',
        description: 'Automated testing and security scan.',
        teamId: 'team-4',
        leaderId: 'user-6',
        deliverablesNeeded: ['QA Test Clearance']
      }
    ]).map((stg, idx) => {
      const stageId = `stage-${Date.now()}-${idx+1}`;
      const isFirst = idx === 0;
      return {
        id: stageId,
        projectId: projectId,
        name: stg.name,
        description: stg.description || '',
        order: idx + 1,
        responsibleTeamId: stg.teamId || 'team-1',
        leaderId: stg.leaderId || 'user-3',
        memberIds: stg.memberIds || ['user-3', 'user-4'],
        startDate: new Date().toISOString().split('T')[0],
        deadline: stg.deadline || req.expectedDeadline,
        deliverablesNeeded: stg.deliverablesNeeded || ['Deliverable Document'],
        priority: stg.priority || 'High',
        status: isFirst ? 'Active' : 'Locked', // First stage ACTIVE, others LOCKED
        dependencies: idx > 0 ? [`stage-${Date.now()}-${idx}`] : [],
        approvalDate: null,
        feedbackNotes: null
      };
    });

    const newProject = {
      id: projectId,
      requestId: req.id,
      name: req.title,
      description: req.description,
      clientId: req.clientId,
      managerId: currentUser.id,
      status: 'In Progress',
      priority: req.priority,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: req.expectedDeadline,
      overallProgress: 0,
      workflowStageIds: createdStages.map(s => s.id),
      currentStageId: createdStages[0].id,
      budget: req.budget,
      category: req.category
    };

    // Update request state
    setProjectRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Converted to Project', projectId } : r));

    // Add stages and project
    setWorkflowStages(prev => [...createdStages, ...prev]);
    setProjects(prev => [newProject, ...prev]);

    // Notify Client and First Stage Team Leader
    sendNotification(
      req.clientId,
      'Project Created!',
      `Your request "${req.title}" has officially been converted into an active project with a custom workflow!`,
      'success',
      projectId
    );

    sendNotification(
      createdStages[0].leaderId,
      'Stage Activated!',
      `You are assigned as Team Leader for Stage 1 ("${createdStages[0].name}") of project "${req.title}". Work can now begin!`,
      'stage_active',
      projectId
    );

    logActivity(projectId, 'Created Project & Workflow', `PM ${currentUser.name} converted request into project with ${createdStages.length} sequential workflow stages.`);
    return newProject;
  };

  // 3. Stage Submission & PM Review (Sequential Handoff Engine)
  const submitStageForReview = (stageId, submissionNotes = '') => {
    setWorkflowStages(prev => prev.map(stg => {
      if (stg.id === stageId) {
        return {
          ...stg,
          status: 'Submitted',
          submissionNotes,
          submittedAt: new Date().toISOString()
        };
      }
      return stg;
    }));

    const stage = workflowStages.find(s => s.id === stageId);
    if (stage) {
      const proj = projects.find(p => p.id === stage.projectId);
      
      // Notify PM
      if (proj) {
        sendNotification(
          proj.managerId,
          'Stage Submitted for Review',
          `Team Leader ${currentUser.name} submitted deliverables for Stage "${stage.name}". PM review required.`,
          'stage_submitted',
          proj.id
        );

        logActivity(proj.id, 'Submitted Stage for Review', `${currentUser.name} submitted Stage "${stage.name}" deliverables for review.`);
      }
    }
  };

  const approveStage = (stageId, feedbackNotes = '') => {
    const currentStage = workflowStages.find(s => s.id === stageId);
    if (!currentStage) return;

    const projectId = currentStage.projectId;
    const projectStages = workflowStages
      .filter(s => s.projectId === projectId)
      .sort((a, b) => a.order - b.order);

    const currentIndex = projectStages.findIndex(s => s.id === stageId);
    const nextStage = projectStages[currentIndex + 1];

    // Update current stage to Approved
    setWorkflowStages(prev => prev.map(stg => {
      if (stg.id === stageId) {
        return {
          ...stg,
          status: 'Approved',
          approvalDate: new Date().toISOString(),
          feedbackNotes
        };
      }
      // Unlock & activate NEXT stage automatically!
      if (nextStage && stg.id === nextStage.id) {
        return {
          ...stg,
          status: 'Active',
          activatedAt: new Date().toISOString()
        };
      }
      return stg;
    }));

    // Update overall project progress
    const updatedApprovedCount = projectStages.filter(s => s.status === 'Approved' || s.id === stageId).length;
    const newProgress = Math.round((updatedApprovedCount / projectStages.length) * 100);

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const isAllApproved = updatedApprovedCount === projectStages.length;
        return {
          ...p,
          overallProgress: newProgress,
          currentStageId: nextStage ? nextStage.id : currentStage.id,
          status: isAllApproved ? 'Ready for Delivery' : p.status
        };
      }
      return p;
    }));

    // Notifications & Logs
    sendNotification(
      currentStage.leaderId,
      'Stage Approved!',
      `Stage "${currentStage.name}" was approved by PM ${currentUser.name}. ${feedbackNotes ? `Feedback: ${feedbackNotes}` : ''}`,
      'success',
      projectId
    );

    if (nextStage) {
      // AUTOMATIC HANDOFF TO NEXT TEAM!
      sendNotification(
        nextStage.leaderId,
        'Next Stage Activated!',
        `Previous stage approved! Your stage "${nextStage.name}" is now ACTIVE. You can assign tasks and begin work.`,
        'stage_active',
        projectId
      );

      logActivity(
        projectId,
        'Approved Stage & Triggered Automatic Handoff',
        `PM ${currentUser.name} approved Stage "${currentStage.name}". Automatic handoff activated Stage "${nextStage.name}" for ${nextStage.responsibleTeamId}.`
      );
    } else {
      // All stages approved!
      const proj = projects.find(p => p.id === projectId);
      if (proj) {
        sendNotification(
          proj.clientId,
          'Project Ready for Final Delivery!',
          `All workflow stages for "${proj.name}" have been successfully completed and approved! Please review final deliverables.`,
          'success',
          projectId
        );
      }

      logActivity(projectId, 'All Stages Completed', `All workflow stages approved! Project marked Ready for Delivery.`);
    }
  };

  const rejectStage = (stageId, feedbackNotes) => {
    const stage = workflowStages.find(s => s.id === stageId);
    if (!stage) return;

    setWorkflowStages(prev => prev.map(stg => {
      if (stg.id === stageId) {
        return {
          ...stg,
          status: 'Revision Required',
          feedbackNotes
        };
      }
      return stg;
    }));

    sendNotification(
      stage.leaderId,
      'Stage Revision Required',
      `PM ${currentUser.name} requested changes for Stage "${stage.name}". Feedback: "${feedbackNotes}". Next stages remain locked.`,
      'warning',
      stage.projectId
    );

    logActivity(stage.projectId, 'Requested Stage Revision', `PM ${currentUser.name} returned Stage "${stage.name}" for revision with feedback: "${feedbackNotes}".`);
  };

  // 4. Task Management Actions
  const createTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now().toString().slice(-4)}`,
      projectId: taskData.projectId,
      stageId: taskData.stageId,
      title: taskData.title,
      description: taskData.description || '',
      acceptanceCriteria: taskData.acceptanceCriteria || '',
      assigneeId: taskData.assigneeId || currentUser.id,
      priority: taskData.priority || 'Medium',
      deadline: taskData.deadline,
      status: 'To Do',
      attachmentsCount: 0,
      commentsCount: 0,
      overdue: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);

    if (taskData.assigneeId && taskData.assigneeId !== currentUser.id) {
      sendNotification(
        taskData.assigneeId,
        'New Task Assigned',
        `${currentUser.name} assigned task "${taskData.title}" to you.`,
        'task_assigned',
        taskData.projectId
      );
    }

    logActivity(taskData.projectId, 'Created Task', `${currentUser.name} created task "${taskData.title}".`);
    return newTask;
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const isCompleted = newStatus === 'Completed';
        return {
          ...t,
          status: newStatus,
          completedAt: isCompleted ? new Date().toISOString() : t.completedAt
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      logActivity(task.projectId, 'Updated Task Status', `${currentUser.name} changed task "${task.title}" status to "${newStatus}".`);
    }
  };

  const reassignTask = (taskId, newAssigneeId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, assigneeId: newAssigneeId } : t));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      sendNotification(
        newAssigneeId,
        'Task Reassigned to You',
        `${currentUser.name} reassigned task "${task.title}" to you.`,
        'task_assigned',
        task.projectId
      );
      logActivity(task.projectId, 'Reassigned Task', `${currentUser.name} reassigned task "${task.title}".`);
    }
  };

  // 5. File & Multi-Version Preservation Engine
  const uploadFile = (fileObj) => {
    // Check if file with same filename exists in this stage/task context
    const existingIndex = files.findIndex(f => 
      f.projectId === fileObj.projectId && 
      f.filename.split('_v')[0] === fileObj.filename.split('_v')[0]
    );

    if (existingIndex >= 0) {
      // PRESERVE HISTORICAL VERSIONS!
      const existing = files[existingIndex];
      const prevVerNum = parseFloat(existing.currentVersion.replace('v', '')) || 1.0;
      const nextVerStr = `v${(prevVerNum + 0.1).toFixed(1)}`;

      const newVersionEntry = {
        version: nextVerStr,
        filename: `${fileObj.filename.replace(/\.[^/.]+$/, "")}_${nextVerStr}.${fileObj.filename.split('.').pop()}`,
        size: fileObj.size || '2.5 MB',
        uploaderId: currentUser.id,
        timestamp: new Date().toISOString(),
        changeNotes: fileObj.changeNotes || 'Updated deliverable version.'
      };

      const updatedFile = {
        ...existing,
        currentVersion: nextVerStr,
        uploadedAt: new Date().toISOString(),
        uploaderId: currentUser.id,
        versions: [newVersionEntry, ...existing.versions]
      };

      setFiles(prev => prev.map((f, i) => i === existingIndex ? updatedFile : f));

      logActivity(fileObj.projectId, 'Uploaded New File Version', `${currentUser.name} uploaded ${nextVerStr} for file "${existing.filename}". Previous version preserved.`);
      return updatedFile;
    } else {
      // Create new File entry with v1.0
      const newFileId = `file-${Date.now().toString().slice(-4)}`;
      const newFile = {
        id: newFileId,
        projectId: fileObj.projectId,
        stageId: fileObj.stageId || null,
        taskId: fileObj.taskId || null,
        filename: fileObj.filename,
        fileType: fileObj.fileType || 'application/octet-stream',
        size: fileObj.size || '1.8 MB',
        currentVersion: 'v1.0',
        uploaderId: currentUser.id,
        uploadedAt: new Date().toISOString(),
        description: fileObj.description || '',
        versions: [
          {
            version: 'v1.0',
            filename: fileObj.filename,
            size: fileObj.size || '1.8 MB',
            uploaderId: currentUser.id,
            timestamp: new Date().toISOString(),
            changeNotes: 'Initial upload.'
          }
        ]
      };

      setFiles(prev => [newFile, ...prev]);

      logActivity(fileObj.projectId, 'Uploaded New File', `${currentUser.name} uploaded file "${fileObj.filename}" (v1.0).`);
      return newFile;
    }
  };

  // 6. Comments, Formal Notes & @Mentions
  const addComment = (commentObj) => {
    const newComm = {
      id: `comm-${Date.now()}`,
      projectId: commentObj.projectId,
      stageId: commentObj.stageId || null,
      taskId: commentObj.taskId || null,
      authorId: currentUser.id,
      type: 'comment',
      content: commentObj.content,
      mentions: commentObj.mentions || [],
      createdAt: new Date().toISOString()
    };

    setComments(prev => [...prev, newComm]);

    // Parse @mentions in content and send notifications!
    users.forEach(u => {
      if (commentObj.content.includes(`@${u.name}`)) {
        sendNotification(
          u.id,
          'Mentioned in Comment',
          `${currentUser.name} mentioned you in a discussion: "${commentObj.content.substring(0, 60)}..."`,
          'mention',
          commentObj.projectId
        );
      }
    });

    logActivity(commentObj.projectId, 'Added Comment', `${currentUser.name} posted a comment in discussion.`);
  };

  const addFormalNote = (noteObj) => {
    const newNote = {
      id: `note-${Date.now()}`,
      projectId: noteObj.projectId,
      stageId: noteObj.stageId || null,
      taskId: noteObj.taskId || null,
      authorId: currentUser.id,
      title: noteObj.title,
      content: noteObj.content,
      isResolved: false,
      createdAt: new Date().toISOString(),
      resolvedBy: null,
      resolvedAt: null
    };

    setNotes(prev => [newNote, ...prev]);
    logActivity(noteObj.projectId, 'Added Formal Instruction Note', `${currentUser.name} added note: "${noteObj.title}".`);
  };

  const toggleNoteResolved = (noteId) => {
    setNotes(prev => prev.map(n => {
      if (n.id === noteId) {
        const nextResolved = !n.isResolved;
        return {
          ...n,
          isResolved: nextResolved,
          resolvedBy: nextResolved ? currentUser.id : null,
          resolvedAt: nextResolved ? new Date().toISOString() : null
        };
      }
      return n;
    }));
  };

  // 7. Deadline Updates & Delivery
  const updateProjectDeadline = (projectId, newTargetDate, reason) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, targetDate: newTargetDate } : p));
    logActivity(projectId, 'Updated Target Deadline', `${currentUser.name} updated project target deadline to ${newTargetDate}. Reason: ${reason}`);
  };

  const acceptFinalDelivery = (projectId) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'Completed', overallProgress: 100 } : p));
    const proj = projects.find(p => p.id === projectId);
    if (proj) {
      sendNotification(
        proj.managerId,
        'Project Accepted & Completed!',
        `Client ${currentUser.name} has reviewed final deliverables and marked project "${proj.name}" COMPLETED! 🎉`,
        'success',
        projectId
      );
      logActivity(projectId, 'Accepted Final Delivery', `Client ${currentUser.name} formally accepted final delivery. Project is marked COMPLETED.`);
    }
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setTeams(INITIAL_TEAMS);
    setCurrentUser(INITIAL_USERS[1]);
    setProjectRequests(INITIAL_PROJECT_REQUESTS);
    setProjects(INITIAL_PROJECTS);
    setWorkflowStages(INITIAL_WORKFLOW_STAGES);
    setTasks(INITIAL_TASKS);
    setFiles(INITIAL_FILES);
    setComments(INITIAL_COMMENTS);
    setNotes(INITIAL_NOTES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      getText,
      formatCurrency,
      users,
      teams,
      currentUser,
      switchUser,
      projectRequests,
      projects,
      workflowStages,
      tasks,
      files,
      comments,
      notes,
      notifications,
      activityLogs,
      submitProjectRequest,
      reviewProjectRequest,
      convertRequestToProject,
      submitStageForReview,
      approveStage,
      rejectStage,
      createTask,
      updateTaskStatus,
      reassignTask,
      uploadFile,
      addComment,
      addFormalNote,
      toggleNoteResolved,
      updateProjectDeadline,
      acceptFinalDelivery,
      resetDemoData,
      sendNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
