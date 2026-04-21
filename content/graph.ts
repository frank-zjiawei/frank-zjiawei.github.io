export type GraphGroup = 'root' | 'domain' | 'project' | 'org' | 'publication';

export interface GraphNode {
  id: string;
  label: string;
  group: GraphGroup;
  href?: string;
  size?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export const graphData: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'frank', label: 'Frank', group: 'root', size: 16 },

    { id: 'ai', label: 'AI', group: 'domain', href: '/ai', size: 11 },
    { id: 'analytics', label: 'Analytics', group: 'domain', href: '/analytics', size: 11 },
    { id: 'research', label: 'Research', group: 'domain', href: '/research', size: 11 },
    { id: 'design', label: 'Learning Design', group: 'domain', href: '/academic', size: 11 },

    { id: 'yolov8', label: 'YOLOv8 98.55%', group: 'project', href: '/ai#yolov8' },
    { id: 'mit-venture', label: 'MIT AI Venture', group: 'project', href: '/ai#mit-venture' },
    { id: 'harvard-ilab', label: 'Harvard i-Lab', group: 'project', href: '/ai#harvard-ilab' },
    { id: 'oldpilot', label: 'OldPilot', group: 'project', href: '/research#tsinghua' },

    { id: 'wyloo', label: 'Wyloo Metals', group: 'org', href: '/analytics#wyloo' },
    { id: 'hirebeat', label: 'HireBeat', group: 'org', href: '/analytics#hirebeat' },
    { id: 'accenture', label: 'Accenture', group: 'org', href: '/analytics#accenture' },
    { id: 'google-hack', label: 'Google Hackathon', group: 'project', href: '/analytics#google-hackathon' },

    { id: 'harvard-gse', label: 'Harvard GSE Lab', group: 'org', href: '/research#harvard-gse' },
    { id: 'tsinghua', label: 'Tsinghua SIGS', group: 'org', href: '/research#tsinghua' },
    { id: 'papers', label: '10 Publications', group: 'publication', href: '/research#publications' },

    { id: 'harvard', label: 'Harvard Ed.M.', group: 'org', href: '/academic#harvard' },
    { id: 'mit', label: 'MIT Media Lab', group: 'org', href: '/academic#mit' },
    { id: 'ubc', label: 'UBC MBAN', group: 'org', href: '/academic#ubc' },
    { id: 'uoft', label: 'U of Toronto', group: 'org', href: '/academic#uoft' },
  ],
  links: [
    { source: 'frank', target: 'ai' },
    { source: 'frank', target: 'analytics' },
    { source: 'frank', target: 'research' },
    { source: 'frank', target: 'design' },

    { source: 'ai', target: 'yolov8' },
    { source: 'ai', target: 'mit-venture' },
    { source: 'ai', target: 'harvard-ilab' },
    { source: 'ai', target: 'oldpilot' },

    { source: 'analytics', target: 'wyloo' },
    { source: 'analytics', target: 'hirebeat' },
    { source: 'analytics', target: 'accenture' },
    { source: 'analytics', target: 'google-hack' },

    { source: 'research', target: 'harvard-gse' },
    { source: 'research', target: 'tsinghua' },
    { source: 'research', target: 'papers' },
    { source: 'research', target: 'oldpilot' },
    { source: 'research', target: 'yolov8' },

    { source: 'design', target: 'harvard' },
    { source: 'design', target: 'mit' },
    { source: 'design', target: 'ubc' },
    { source: 'design', target: 'uoft' },

    { source: 'harvard', target: 'harvard-gse' },
    { source: 'harvard', target: 'harvard-ilab' },
    { source: 'mit', target: 'mit-venture' },
    { source: 'ubc', target: 'google-hack' },
  ],
};
