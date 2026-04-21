export interface Publication {
  id: number;
  year: number;
  authors: string;
  title: string;
  venue?: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 1,
    year: 2024,
    authors: 'J. W. Zhang, G. Wang, S. Zhi',
    title: 'Improved YOLOv8 real-time object detection algorithm',
    venue: 'Submitted to MDPI Electronics (ISSN 2079-9292)',
    tags: ['Computer Vision', 'Deep Learning'],
  },
  {
    id: 2,
    year: 2024,
    authors: 'J. W. Zhang, Y. Liang, T. Liang, Y. Wang',
    title:
      'Predicting Optimal Pricing for Airbnb Listings at New York City Using Machine Learning',
    tags: ['Machine Learning', 'Pricing'],
  },
  {
    id: 3,
    year: 2024,
    authors: 'J. W. Zhang',
    title:
      'Enhancing Content Engagement and Monetization on Social Media with ML Models',
    tags: ['Machine Learning', 'Social Media'],
  },
  {
    id: 4,
    year: 2024,
    authors: 'J. W. Zhang',
    title:
      'Optimizing Supply Chain Hubs for Global Humanitarian Logistics Using Network Flow and Linear Programming',
    tags: ['Operations Research', 'Optimization'],
  },
  {
    id: 5,
    year: 2024,
    authors: 'J. W. Zhang, J. Yang, L. Li, W. Zhou, W. Wu',
    title: 'Optimizing Airline Revenue with Simulation Modeling',
    tags: ['Simulation', 'Revenue Management'],
  },
  {
    id: 6,
    year: 2024,
    authors: 'J. W. Zhang, X. Zhang, X. Lyu, Y. Yang, Y. Wang, Z. Gu',
    title:
      'Optimizing U.S. Investment Portfolios Using CAPM and Linear Programming: A Debt-to-Equity Analysis Across Industries',
    tags: ['Finance', 'Optimization'],
  },
  {
    id: 7,
    year: 2023,
    authors: 'J. W. Zhang, X. Shen, Y. Wang, Y. Wang',
    title:
      'Optimizing Coffee Bean Sales Strategy for B2C Company Bean Symphony through Data Analytics and Visualization',
    tags: ['Data Analytics', 'Visualization'],
  },
  {
    id: 8,
    year: 2023,
    authors: 'J. W. Zhang, B. Yang, Y. Liu, Z. Gu, X. Shen',
    title:
      'Optimizing Portfolio Management with Active Strategies: A Two-Year Financial Modeling Case Study',
    tags: ['Finance', 'Portfolio Management'],
  },
  {
    id: 9,
    year: 2023,
    authors: 'J. W. Zhang, S. Ahmed, Y. Ding, H. Xia, B. Zhao',
    title:
      'Inventory Management at JOANN Using JIAT: A Data-Driven Strategy for Seasonal Demand',
    tags: ['Operations Research', 'Supply Chain'],
  },
  {
    id: 10,
    year: 2023,
    authors: 'J. W. Zhang, S. Ahmed, Y. Ding, H. Xia, B. Zhao',
    title:
      'Tackling the Planning Fallacy in NYC Parks & Recreation: Data-Driven Solutions for Budget and Schedule Overruns',
    tags: ['Behavioral OR', 'Public Sector'],
  },
];
