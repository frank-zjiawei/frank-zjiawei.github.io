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

/** Lean hub map — three domains, a few landmarks each. */
export const graphData: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'frank', label: 'Jiawei', group: 'root', size: 18 },

    { id: 'about', label: 'About Me', group: 'domain', href: '/about', size: 13 },
    { id: 'experience', label: 'Experience', group: 'domain', href: '/experience', size: 13 },
    { id: 'research', label: 'Papers', group: 'domain', href: '/research', size: 13 },

    { id: 'harvard', label: 'Harvard Ed.M.', group: 'org', href: '/about#harvard' },
    { id: 'mit', label: 'MIT', group: 'org', href: '/about#mit' },
    { id: 'ubc', label: 'UBC · Vancouver', group: 'org', href: '/about#ubc' },
    { id: 'uoft', label: 'Toronto', group: 'org', href: '/about#uoft' },
    { id: 'boxing', label: 'Boxing', group: 'project', href: '/about/interests' },

    { id: 'lit', label: 'LIT Lab', group: 'org', href: '/experience#hgse-lit' },
    { id: 'foundry', label: 'Business School Foundry', group: 'project', href: '/experience#hbs-foundry' },
    { id: 'ilab', label: 'Innovation Lab', group: 'project', href: '/experience#harvard-ilab' },
    { id: 'yolov8', label: 'YOLOv8 98.55%', group: 'project', href: '/experience#yolov8' },

    { id: 'acm-mm', label: 'ACM MM First Prize', group: 'publication', href: '/research#paper-1' },
    { id: 'ivmsp', label: 'IVMSP Best Paper', group: 'publication', href: '/research#paper-2' },
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
    { source: 'experience', target: 'ilab' },
    { source: 'experience', target: 'yolov8' },

    { source: 'research', target: 'acm-mm' },
    { source: 'research', target: 'ivmsp' },

    { source: 'harvard', target: 'lit' },
    { source: 'harvard', target: 'foundry' },
    { source: 'harvard', target: 'ilab' },
    { source: 'mit', target: 'ilab' },
  ],
};
