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
    { id: 'frank', label: 'Jiawei', group: 'root', size: 16 },

    { id: 'about', label: 'About Me', group: 'domain', href: '/about', size: 11 },
    { id: 'experience', label: 'Experience', group: 'domain', href: '/experience', size: 11 },
    { id: 'research', label: 'Papers', group: 'domain', href: '/research', size: 11 },

    { id: 'yolov8', label: 'YOLOv8 98.55%', group: 'project', href: '/experience#yolov8' },
    { id: 'mit-venture', label: 'MIT AI Venture', group: 'project', href: '/experience#mit-venture' },
    { id: 'harvard-ilab', label: 'Harvard i-Lab', group: 'project', href: '/experience#harvard-ilab' },
    { id: 'foundry', label: 'HBS Foundry', group: 'project', href: '/experience#hbs-foundry' },
    { id: 'lit', label: 'HGSE LIT Lab', group: 'org', href: '/experience#hgse-lit' },

    { id: 'wyloo', label: 'Wyloo Metals', group: 'org', href: '/experience#wyloo' },
    { id: 'hirebeat', label: 'HireBeat', group: 'org', href: '/experience#hirebeat' },
    { id: 'accenture', label: 'Accenture', group: 'org', href: '/experience#accenture' },
    { id: 'google-hack', label: 'Google Hackathon', group: 'project', href: '/experience#google-hackathon' },

    { id: 'papers', label: 'Publications', group: 'publication', href: '/research' },
    { id: 'acm-mm', label: 'ACM MM First Prize', group: 'publication', href: '/research#paper-1' },
    { id: 'ivmsp', label: 'IVMSP Best Paper', group: 'publication', href: '/research#paper-2' },
    { id: 'boxing', label: 'Boxing', group: 'project', href: '/about/interests' },

    { id: 'harvard', label: 'Harvard Ed.M.', group: 'org', href: '/about#cambridge' },
    { id: 'mit', label: 'MIT', group: 'org', href: '/about#cambridge' },
    { id: 'ubc', label: 'UBC MBAN', group: 'org', href: '/about#vancouver' },
    { id: 'uoft', label: 'U of Toronto', group: 'org', href: '/about#toronto' },
  ],
  links: [
    { source: 'frank', target: 'about' },
    { source: 'frank', target: 'experience' },
    { source: 'frank', target: 'research' },

    { source: 'about', target: 'harvard' },
    { source: 'about', target: 'mit' },
    { source: 'about', target: 'ubc' },
    { source: 'about', target: 'uoft' },
    { source: 'about', target: 'boxing' },

    { source: 'experience', target: 'lit' },
    { source: 'experience', target: 'foundry' },
    { source: 'experience', target: 'yolov8' },
    { source: 'experience', target: 'mit-venture' },
    { source: 'experience', target: 'harvard-ilab' },
    { source: 'experience', target: 'wyloo' },
    { source: 'experience', target: 'hirebeat' },
    { source: 'experience', target: 'accenture' },
    { source: 'experience', target: 'google-hack' },

    { source: 'research', target: 'papers' },
    { source: 'papers', target: 'acm-mm' },
    { source: 'papers', target: 'ivmsp' },

    { source: 'harvard', target: 'lit' },
    { source: 'harvard', target: 'foundry' },
    { source: 'mit', target: 'mit-venture' },
    { source: 'ubc', target: 'google-hack' },
  ],
};
