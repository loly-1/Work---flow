export const INITIAL_USERS = [
  {
    id: 'user-1',
    name: 'سارة جينكينز / Sarah Jenkins',
    email: 'sarah.j@acmecorp.com',
    role: 'Client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    organization: 'شركة أكامي العالمية / Acme Global Tech',
    title: { en: 'VP of Product', ar: 'نائب رئيس المنتجات' }
  },
  {
    id: 'user-2',
    name: 'أليكس مورجان / Alex Morgan',
    email: 'alex.m@workflowpro.io',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    organization: 'إدارة العمليات / WorkFlow Ops',
    title: { en: 'Senior Operations Manager', ar: 'مدير العمليات الأرشد' }
  },
  {
    id: 'user-3',
    name: 'داوود تشن / David Chen',
    email: 'david.c@workflowpro.io',
    role: 'Team Leader',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    organization: 'فريق الهندسة / Engineering Team',
    title: { en: 'Lead System Architect & Dev Lead', ar: 'كبير مهندسي النظام وقائد التطوير' }
  },
  {
    id: 'user-4',
    name: 'إيلينا روستوفا / Elena Rostova',
    email: 'elena.r@workflowpro.io',
    role: 'Team Member',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    organization: 'فريق الهندسة / Engineering Team',
    title: { en: 'Senior Frontend Engineer', ar: 'مهندسة واجهات أمامي أرشد' }
  },
  {
    id: 'user-5',
    name: 'ماركوس فانس / Marcus Vance',
    email: 'marcus.v@workflowpro.io',
    role: 'Team Leader',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    organization: 'استوديو التصميم / Design Studio',
    title: { en: 'Lead UI/UX Designer', ar: 'قائد تصميم واجهات المستخدم' }
  },
  {
    id: 'user-6',
    name: 'عائشة باتيل / Aisha Patel',
    email: 'aisha.p@workflowpro.io',
    role: 'Team Member',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    organization: 'فريق الجودة والأمن / QA & Security',
    title: { en: 'Senior Automation & Security Engineer', ar: 'مهندسة أتمتة وأمن أرشد' }
  }
];

export const INITIAL_TEAMS = [
  {
    id: 'team-1',
    name: { en: 'Planning & Strategy Team', ar: 'فريق التخطيط والاستراتيجية' },
    leaderId: 'user-3',
    members: ['user-3', 'user-4'],
    status: { en: 'Active Workload', ar: 'عبء عمل نشط' },
    color: '#3B82F6'
  },
  {
    id: 'team-2',
    name: { en: 'UI/UX Design Studio', ar: 'استوديو تصميم الواجهات UI/UX' },
    leaderId: 'user-5',
    members: ['user-5', 'user-4'],
    status: { en: 'Active Workload', ar: 'عبء عمل نشط' },
    color: '#8B5CF6'
  },
  {
    id: 'team-3',
    name: { en: 'Core Software Engineering', ar: 'فريق الهندسة والبرمجيات الرئيسي' },
    leaderId: 'user-3',
    members: ['user-3', 'user-4'],
    status: { en: 'Pending Handoff', ar: 'بانتظار التسليم' },
    color: '#10B981'
  },
  {
    id: 'team-4',
    name: { en: 'QA & Security Operations', ar: 'فريق الجودة والأمن السيبراني' },
    leaderId: 'user-6',
    members: ['user-6'],
    status: { en: 'Available', ar: 'متاح' },
    color: '#F59E0B'
  },
  {
    id: 'team-5',
    name: { en: 'DevOps & Cloud Deployment', ar: 'فريق النشر السحابي والعمليات' },
    leaderId: 'user-3',
    members: ['user-3'],
    status: { en: 'Available', ar: 'متاح' },
    color: '#EC4899'
  }
];

export const INITIAL_PROJECT_REQUESTS = [
  {
    id: 'req-101',
    clientId: 'user-1',
    title: {
      en: 'FinTech AI Financial Portal',
      ar: 'منصة الذكاء الاصطناعي والتحليلات المالية'
    },
    description: {
      en: 'A comprehensive web platform for AI-assisted financial analytics, real-time portfolio balancing, and secure client reporting.',
      ar: 'منصة ويب متكاملة للتحليلات المالية بمساعدة الذكاء الاصطناعي، وموازنة المحافظ الاستثمارية، والتقارير الآمنة.'
    },
    businessStatement: {
      en: 'Our current client portal is outdated, resulting in 25% client churn. We need a modern, high-speed, security-compliant portal.',
      ar: 'بوابة العملاء الحالية قديمة وتسببت في فقدان 25% من العملاء. نحتاج منصة حديثة وسريعة وآمنة للغاية.'
    },
    category: { en: 'Web Application / FinTech', ar: 'تطبيق ويب / تقنية مالية' },
    priority: 'Urgent',
    expectedDeadline: '2026-11-30',
    budgetNum: 450000,
    requiredFeatures: {
      en: ['Real-time portfolio charts', 'AI Risk-analysis widget', 'Role-based permissions'],
      ar: ['رسوم بيانية فورية للمحافظ', 'أداة تحليل المخاطر بالذكاء الاصطناعي', 'صلاحيات متعددة الأدوار']
    },
    expectedDeliverables: {
      en: ['Interactive Design System in Figma', 'Frontend React Codebase', 'SOC2 Security Audit Certificate'],
      ar: ['نظام تصميم تفاعلي في فيجما', 'شيفرة المصدر للتطبيق بلغة رياكت', 'شهادة التدقيق الأمني SOC2']
    },
    attachments: [
      { name: 'Acme_Fintech_Requirements_Brief.pdf', size: '2.4 MB', date: '2026-09-10' }
    ],
    additionalNotes: { en: 'Strict compliance with ISO27001 guidelines.', ar: 'الالتزام الصارم بمعايير الآيزو 27001.' },
    status: 'Converted to Project',
    projectId: 'proj-1',
    createdAt: '2026-09-10T09:30:00Z'
  },
  {
    id: 'req-102',
    clientId: 'user-1',
    title: {
      en: 'Healthcare Patient Telehealth Portal',
      ar: 'بوابة الرعاية الصحية والاستشارات الطبية عن بعد'
    },
    description: {
      en: 'HIPAA-compliant video consultation & prescription management interface for regional clinics.',
      ar: 'منصة استشارات طبية وإدارة وصفات متوافقة مع معايير الأمان للعيادات والمستشفيات.'
    },
    businessStatement: {
      en: 'Provide instant remote consultations for rural patients with integrated EHR records.',
      ar: 'تقديم استشارات فورية للمرضى عن بعد مع الربط بالسجلات الطبية الإلكترونية.'
    },
    category: { en: 'Healthcare App', ar: 'تطبيق رعاية صحية' },
    priority: 'High',
    expectedDeadline: '2026-12-15',
    budgetNum: 320000,
    requiredFeatures: {
      en: ['Encrypted WebRTC Video Call', 'EHR System Sync'],
      ar: ['اتصال فيديو مشفر', 'مزامنة السجلات الطبية']
    },
    expectedDeliverables: {
      en: ['UX Wireframes', 'Mobile & Desktop App'],
      ar: ['مخططات واجهة المستخدم', 'تطبيق الجوال والمكتب']
    },
    attachments: [],
    additionalNotes: { en: 'Requires multi-factor authentication.', ar: 'تطلب مصادقة متعددة العوامل.' },
    status: 'Submitted',
    createdAt: '2026-09-15T14:20:00Z'
  }
];

export const INITIAL_WORKFLOW_STAGES = [
  {
    id: 'stage-1',
    projectId: 'proj-1',
    name: {
      en: 'Requirement & Architecture Planning',
      ar: '1. التخطيط وهندسة المعمارية التكنولوجية'
    },
    description: {
      en: 'Gather complete product specifications, draft technical architecture blueprint, and finalize API contracts.',
      ar: 'جمع المتطلبات الكاملة، وإعداد مخطط الهندسة المعمارية للتطبيق، وتحديد واجهات البرمجة API.'
    },
    order: 1,
    responsibleTeamId: 'team-1',
    leaderId: 'user-3',
    memberIds: ['user-3', 'user-4'],
    startDate: '2026-09-11',
    deadline: '2026-09-15',
    deliverablesNeeded: {
      en: ['Technical Architecture Specification PDF', 'API Schema Doc'],
      ar: ['وثيقة المواصفات المعمارية التقنية PDF', 'وثيقة مخطط واجهات البرمجة API']
    },
    priority: 'High',
    status: 'Approved',
    dependencies: [],
    approvalDate: '2026-09-15T16:00:00Z',
    feedbackNotes: {
      en: 'Architecture approved without exceptions. Excellent database model.',
      ar: 'تم اعتماد التخطيط المعماري دون ملاحظات. نموذج قواعد البيانات ممتاز.'
    }
  },
  {
    id: 'stage-2',
    projectId: 'proj-1',
    name: {
      en: 'Interactive UI/UX Design',
      ar: '2. تصميم واجهات وتجربة المستخدم UI/UX'
    },
    description: {
      en: 'Create high-fidelity interactive wireframes, component design system, and responsive prototypes.',
      ar: 'إنشاء مخططات تفاعلية عالية الدقة، ونظام مكونات الواجهة، والأنماط المتجاوبة.'
    },
    order: 2,
    responsibleTeamId: 'team-2',
    leaderId: 'user-5',
    memberIds: ['user-5', 'user-4'],
    startDate: '2026-09-16',
    deadline: '2026-09-22',
    deliverablesNeeded: {
      en: ['Interactive Figma Prototype', 'UI Kit & Design Tokens PDF'],
      ar: ['نموذج فيجما التفاعلي', 'كتيب مكونات وتصميم الواجهات PDF']
    },
    priority: 'Urgent',
    status: 'Active',
    dependencies: ['stage-1'],
    approvalDate: null,
    feedbackNotes: null
  },
  {
    id: 'stage-3',
    projectId: 'proj-1',
    name: {
      en: 'Frontend & Backend Development',
      ar: '3. تطوير البرمجيات والواجهات الخلفية والأمامية'
    },
    description: {
      en: 'Build core application logic, integrated WebSocket data feeds, and authentication services.',
      ar: 'بناء البرمجيات الرئيسية، وربط البث المباشر، وخدمات المصادقة والأمان.'
    },
    order: 3,
    responsibleTeamId: 'team-3',
    leaderId: 'user-3',
    memberIds: ['user-3', 'user-4'],
    startDate: '2026-09-23',
    deadline: '2026-10-15',
    deliverablesNeeded: {
      en: ['Full Working Application Codebase', 'API Integration Tests'],
      ar: ['الشيفرة البرمجية الكاملة للتطبيق', 'اختبارات تكامل واجهات البرمجة']
    },
    priority: 'High',
    status: 'Locked',
    dependencies: ['stage-2'],
    approvalDate: null,
    feedbackNotes: null
  },
  {
    id: 'stage-4',
    projectId: 'proj-1',
    name: {
      en: 'QA Testing & Security Audit',
      ar: '4. اختبارات الجودة والتدقيق الأمني'
    },
    description: {
      en: 'Execute automated regression testing suite, penetration testing, and security compliance.',
      ar: 'تنفيذ اختبارات أتمتة الجودة، واختبارات الاختراق، والتحقق من الامتثال الأمني.'
    },
    order: 4,
    responsibleTeamId: 'team-4',
    leaderId: 'user-6',
    memberIds: ['user-6'],
    startDate: '2026-10-16',
    deadline: '2026-10-25',
    deliverablesNeeded: {
      en: ['QA Test Coverage Report', 'Security Audit Certificate'],
      ar: ['تقرير تغطية اختبارات الجودة', 'شهادة التدقيق الأمني السيبراني']
    },
    priority: 'High',
    status: 'Locked',
    dependencies: ['stage-3'],
    approvalDate: null,
    feedbackNotes: null
  },
  {
    id: 'stage-5',
    projectId: 'proj-1',
    name: {
      en: 'Cloud Production Deployment',
      ar: '5. النشر والتشغيل في البيئة السحابية الإنتاجية'
    },
    description: {
      en: 'Provision production AWS infrastructure, SSL certificates, CDN caching, and automated CI/CD.',
      ar: 'تهيئة البنية التحتية السحابية، وشهادات الأمان SSL، وشبكات توزيع المحتوى.'
    },
    order: 5,
    responsibleTeamId: 'team-5',
    leaderId: 'user-3',
    memberIds: ['user-3'],
    startDate: '2026-10-26',
    deadline: '2026-11-05',
    deliverablesNeeded: {
      en: ['Live Production URL', 'Disaster Recovery Playbook'],
      ar: ['رابط المنصة الإنتاجية الحي', 'دليل التعافي من الكوارث']
    },
    priority: 'Urgent',
    status: 'Locked',
    dependencies: ['stage-4'],
    approvalDate: null,
    feedbackNotes: null
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    projectId: 'proj-1',
    stageId: 'stage-1',
    title: {
      en: 'Draft Technical Architecture Schema',
      ar: 'صياغة مخطط المفهوم المعماري التقني'
    },
    description: {
      en: 'Define relational database models, entity relationships, and WebSocket event structures.',
      ar: 'تحديد نماذج قواعد البيانات والعلاقات وبنية أحداث البث المباشر.'
    },
    acceptanceCriteria: {
      en: 'Complete ERD diagram and JSON schema definitions approved by PM.',
      ar: 'اعتماد مخطط قواعد البيانات وحزم البيانات من قبل مدير المشروع.'
    },
    assigneeId: 'user-3',
    priority: 'High',
    deadline: '2026-09-14',
    status: 'Completed',
    attachmentsCount: 2,
    commentsCount: 3,
    completedAt: '2026-09-14T15:30:00Z'
  },
  {
    id: 'task-201',
    projectId: 'proj-1',
    stageId: 'stage-2',
    title: {
      en: 'High-Fidelity Dashboard Figma Mockup',
      ar: 'تصميم نموذج الواجهة الرئيسية الدقيق في فيجما'
    },
    description: {
      en: 'Design dark glassmorphism dashboard layout with real-time portfolio widget and financial charts.',
      ar: 'تصميم لوحة التحكم الزجاجية المعتمة مع أداة المحافظ الاستثمارية والرسوم البيانية.'
    },
    acceptanceCriteria: {
      en: 'Interactive prototype with dynamic hover states and mobile breakpoints.',
      ar: 'نموذج تفاعلي يعرض التجاوب مع مختلف أحجام الشاشات.'
    },
    assigneeId: 'user-5',
    priority: 'Urgent',
    deadline: '2026-09-20',
    status: 'In Review',
    attachmentsCount: 2,
    commentsCount: 4,
    overdue: false
  },
  {
    id: 'task-202',
    projectId: 'proj-1',
    stageId: 'stage-2',
    title: {
      en: 'Design Token System & Color Palette',
      ar: 'بناء نظام مكونات التصميم والألوان'
    },
    description: {
      en: 'Establish typography scale, HSL color variables, and status badge styles.',
      ar: 'تحديد أحجام الخطوط، ومتغيرات الألوان، وأنماط شارات الحالات.'
    },
    acceptanceCriteria: {
      en: 'Exportable JSON tokens and Figma UI Kit library component file.',
      ar: 'تصدير رموس التصميم بصيغة JSON ومكتبة مكونات فيجما.'
    },
    assigneeId: 'user-4',
    priority: 'High',
    deadline: '2026-09-19',
    status: 'In Progress',
    attachmentsCount: 1,
    commentsCount: 2,
    overdue: false
  },
  {
    id: 'task-204',
    projectId: 'proj-1',
    stageId: 'stage-2',
    title: {
      en: 'Financial Chart Canvas Micro-Animations',
      ar: 'تحريك رسومات الرسوم البيانية المالية'
    },
    description: {
      en: 'Prototype smooth line transitions for live stock price ticker.',
      ar: 'تصميم تحركات سلسة للرسوم البيانية المالية المباشرة.'
    },
    acceptanceCriteria: {
      en: 'Lottie animations or CSS transition spec delivered to developers.',
      ar: 'تسليم التحرّكات والأنماط المخصصة لفريق التطوير.'
    },
    assigneeId: 'user-4',
    priority: 'Low',
    deadline: '2026-09-18',
    status: 'In Progress',
    attachmentsCount: 0,
    commentsCount: 1,
    overdue: true,
    overdueDays: 2
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    requestId: 'req-101',
    name: {
      en: 'FinTech AI Financial Portal',
      ar: 'منصة الذكاء الاصطناعي والتحليلات المالية'
    },
    description: {
      en: 'A comprehensive web platform for AI-assisted financial analytics, real-time portfolio balancing, and secure client reporting.',
      ar: 'منصة ويب متكاملة للتحليلات المالية بمساعدة الذكاء الاصطناعي، وموازنة المحافظ الاستثمارية، والتقارير الآمنة.'
    },
    clientId: 'user-1',
    managerId: 'user-2',
    status: 'In Progress',
    priority: 'Urgent',
    startDate: '2026-09-11',
    targetDate: '2026-11-30',
    overallProgress: 35,
    workflowStageIds: ['stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5'],
    currentStageId: 'stage-2',
    budgetNum: 450000,
    category: { en: 'Web Application / FinTech', ar: 'تطبيق ويب / تقنية مالية' }
  },
  {
    id: 'proj-2',
    requestId: 'req-200',
    name: {
      en: 'Enterprise CRM Integration Platform',
      ar: 'منصة تكامل ومزامنة إدارة علاقات العملاء'
    },
    description: {
      en: 'Custom cloud connector syncing Salesforce, HubSpot, and Internal Postgres database.',
      ar: 'موصل سحابي مخصص لمزامنة أنظمة مبيعات وعلاقات العملاء وقواعد البيانات.'
    },
    clientId: 'user-1',
    managerId: 'user-2',
    status: 'Ready for Delivery',
    priority: 'High',
    startDate: '2026-08-01',
    targetDate: '2026-09-18',
    overallProgress: 100,
    workflowStageIds: ['stage-201', 'stage-202'],
    currentStageId: 'stage-202',
    budgetNum: 350000,
    category: { en: 'Cloud Engineering', ar: 'هندسة سحابية' }
  }
];

export const INITIAL_FILES = [
  {
    id: 'file-101',
    projectId: 'proj-1',
    stageId: 'stage-1',
    taskId: 'task-101',
    filename: 'FinTech_System_Architecture_v1.2.pdf',
    fileType: 'application/pdf',
    size: '3.8 MB',
    currentVersion: 'v1.2',
    uploaderId: 'user-3',
    uploadedAt: '2026-09-14T14:15:00Z',
    description: {
      en: 'Approved technical system architecture diagram and database ERD.',
      ar: 'مخطط الهندسة المعمارية التقنية المعتمد ومخطط قواعد البيانات.'
    },
    versions: [
      {
        version: 'v1.2',
        filename: 'FinTech_System_Architecture_v1.2.pdf',
        size: '3.8 MB',
        uploaderId: 'user-3',
        timestamp: '2026-09-14T14:15:00Z',
        changeNotes: { en: 'Updated database index keys and added Redis cache layer.', ar: 'تحديث مفاتيح الفهرسة وإضافة طبقة التخزين المؤقت Redis.' }
      },
      {
        version: 'v1.1',
        filename: 'FinTech_System_Architecture_v1.1.pdf',
        size: '3.5 MB',
        uploaderId: 'user-3',
        timestamp: '2026-09-12T10:30:00Z',
        changeNotes: { en: 'Initial draft for review with PM.', ar: 'المسودة الأولى للمراجعة مع مدير المشروع.' }
      }
    ]
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'comm-1',
    projectId: 'proj-1',
    stageId: 'stage-2',
    taskId: 'task-201',
    authorId: 'user-2',
    type: 'comment',
    content: {
      en: 'Great progress on the financial dashboard layout! @Marcus Vance please verify if the stock ticker chart updates at 60fps.',
      ar: 'تقدم ممتاز في تصميم الواجهة الرئيسية! @ماركوس فانس يرجى التحقق من سرعة تحديث الرسوم المالية.'
    },
    mentions: ['user-5'],
    createdAt: '2026-09-16T12:00:00Z'
  }
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    projectId: 'proj-1',
    stageId: 'stage-2',
    taskId: null,
    authorId: 'user-2',
    title: {
      en: 'Accessibility & WCAG 2.1 AAA Requirement',
      ar: 'معايير إمكانية الوصول والتوافق القياسي WCAG 2.1 AAA'
    },
    content: {
      en: 'Formal requirement: All text headers and active financial badge indicators must pass minimum 7:1 contrast ratio.',
      ar: 'تعليمات رسمية: يجب أن تحقق جميع العناوين وشارات الحالات حد تباين ألوان لا يقل عن 7:1 لضمان الامتثال.'
    },
    isResolved: false,
    createdAt: '2026-09-15T15:00:00Z',
    resolvedBy: null,
    resolvedAt: null
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'user-5',
    title: {
      en: 'Stage Activated: Interactive UI/UX Design',
      ar: 'تم تفعيل المرحلة: تصميم واجهات وتجربة المستخدم'
    },
    message: {
      en: 'Requirement & Architecture Planning was approved by Project Manager Alex Morgan. Your stage is now ACTIVE!',
      ar: 'تمت مصادقة مرحلة التخطيط من قبل مدير المشروع. مرحلتك الآن نشطة وجاهزة للتنفيذ!'
    },
    type: 'stage_active',
    linkProjectId: 'proj-1',
    isRead: false,
    createdAt: '2026-09-16T09:00:00Z'
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 'act-1',
    projectId: 'proj-1',
    actorId: 'user-1',
    actorName: 'سارة جينكينز / Sarah Jenkins',
    actorRole: 'Client',
    action: {
      en: 'Submitted Project Request',
      ar: 'تقديم طلب مشروع جديد'
    },
    details: {
      en: 'Created request "FinTech AI Financial Portal" with budget SAR 450,000.',
      ar: 'إنشاء طلب "منصة الذكاء الاصطناعي والتحليلات المالية" بميزانية 450,000 ر.س.'
    },
    timestamp: '2026-09-10T09:30:00Z'
  },
  {
    id: 'act-2',
    projectId: 'proj-1',
    actorId: 'user-2',
    actorName: 'أليكس مورجان / Alex Morgan',
    actorRole: 'Project Manager',
    action: {
      en: 'Approved Request & Created Project',
      ar: 'قبول الطلب وإنشاء المشروع'
    },
    details: {
      en: 'Converted request into active project with 5-stage sequential workflow.',
      ar: 'تحويل الطلب إلى مشروع نشط بخط مسار عمل مكون من 5 مراحل تسلسلية.'
    },
    timestamp: '2026-09-11T10:00:00Z'
  }
];
