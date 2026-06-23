export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignees: User[];
  labels: Label[];
  dueDate?: string;
  comments: Comment[];
  attachments: Attachment[];
}

export interface ColumnData {
  id: Status;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<Status, ColumnData>;
  columnOrder: Status[];
}

export const users: Record<string, User> = {
  'u1': { id: 'u1', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  'u2': { id: 'u2', name: 'Bob Jones', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  'u3': { id: 'u3', name: 'Charlie Davis', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
  'u4': { id: 'u4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
};

export const labels: Record<string, Label> = {
  'l1': { id: 'l1', name: 'Frontend', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'l2': { id: 'l2', name: 'Backend', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  'l3': { id: 'l3', name: 'Design', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  'l4': { id: 'l4', name: 'Bug', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  'l5': { id: 'l5', name: 'Feature', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
};

export const initialData: BoardData = {
  tasks: {
    't1': {
      id: 't1',
      title: 'Design System Documentation',
      description: 'Create comprehensive documentation for our new design system components including usage guidelines and code snippets.',
      status: 'backlog',
      priority: 'medium',
      assignees: [users['u3']],
      labels: [labels['l3']],
      dueDate: '2026-07-15T10:00:00Z',
      comments: [
        { id: 'c1', userId: 'u1', text: 'Looks good', createdAt: '2026-06-20T10:00:00Z' }
      ],
      attachments: []
    },
    't2': {
      id: 't2',
      title: 'Implement Authentication Flow',
      description: 'Build login, registration, and password recovery flows using NextAuth.',
      status: 'todo',
      priority: 'high',
      assignees: [users['u1'], users['u2']],
      labels: [labels['l1'], labels['l2']],
      dueDate: '2026-06-25T18:00:00Z',
      comments: [
        { id: 'c2', userId: 'u2', text: 'I will start with the DB schema.', createdAt: '2026-06-21T10:00:00Z' },
        { id: 'c3', userId: 'u1', text: 'Great, I will handle the UI.', createdAt: '2026-06-21T11:00:00Z' }
      ],
      attachments: [
        { id: 'a1', name: 'flow.pdf', type: 'application/pdf', url: '#' }
      ]
    },
    't3': {
      id: 't3',
      title: 'Fix Navigation Bug on Mobile',
      description: 'The hamburger menu is not opening on iOS Safari.',
      status: 'in-progress',
      priority: 'urgent',
      assignees: [users['u1']],
      labels: [labels['l1'], labels['l4']],
      dueDate: '2026-06-22T12:00:00Z', // Past due for realism
      comments: [],
      attachments: []
    },
    't4': {
      id: 't4',
      title: 'Create Dashboard Layout',
      description: 'Implement the main layout shell with sidebar and header.',
      status: 'review',
      priority: 'high',
      assignees: [users['u4']],
      labels: [labels['l1'], labels['l5']],
      dueDate: '2026-06-26T18:00:00Z',
      comments: [
        { id: 'c4', userId: 'u3', text: 'Please check the margins on the sidebar.', createdAt: '2026-06-22T14:00:00Z' }
      ],
      attachments: [
        { id: 'a2', name: 'mockup.png', type: 'image/png', url: '#' },
        { id: 'a3', name: 'assets.zip', type: 'application/zip', url: '#' }
      ]
    },
    't5': {
      id: 't5',
      title: 'Optimize Core Web Vitals',
      description: 'Improve LCP and CLS scores on the landing page.',
      status: 'done',
      priority: 'medium',
      assignees: [users['u2']],
      labels: [labels['l1']],
      dueDate: '2026-06-20T18:00:00Z',
      comments: [],
      attachments: []
    },
    't6': {
      id: 't6',
      title: 'Update Privacy Policy',
      description: 'Review and update the privacy policy to comply with new regulations.',
      status: 'todo',
      priority: 'low',
      assignees: [],
      labels: [],
      comments: [],
      attachments: []
    }
  },
  columns: {
    'backlog': {
      id: 'backlog',
      title: 'Backlog',
      taskIds: ['t1']
    },
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['t2', 't6']
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['t3']
    },
    'review': {
      id: 'review',
      title: 'Review',
      taskIds: ['t4']
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['t5']
    }
  },
  columnOrder: ['backlog', 'todo', 'in-progress', 'review', 'done']
};
