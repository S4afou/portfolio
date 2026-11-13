export type Entry = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

export type CertificationEntry = {
  period?: string;
  title: string;
  issuer: string;
  detail?: string;
  url?: string;
};

export const EDUCATION: Entry[] = [
  {
    period: '2024 to 2027 (expected)',
    title: 'Higher Cycle (Engineering)',
    org: 'ESI-SBA · Artificial Intelligence & Data Science',
    detail: 'Engineering cycle in artificial intelligence and data science.',
  },
  {
    period: '2022 to 2024',
    title: 'Preparatory Cycle',
    org: 'ESI-SBA',
    detail: 'Intensive mathematics and computer science.',
  },
  {
    period: '2022',
    title: 'Baccalaureate in Mathematics',
    org: 'Highest Honors · 16.39 / 20',
    detail: 'Graduated with the highest distinction before entering the ESI-SBA preparatory cycle.',
  },
];

export const EXPERIENCE: Entry[] = [
  {
    period: 'Sep 2025',
    title: 'Network & Security Engineering Intern',
    org: 'Space Techniques Center (CTS), Arzew',
    detail:
      'Deployed VLANs, trunks, and SSH on Cisco routers to secure internal communications, and integrated a FortiGate 400E firewall to filter traffic.',
  },
  {
    period: 'Aug to Nov 2024',
    title: 'English Instructor',
    org: 'Zenith Academy',
    detail: 'Taught English to groups of students while completing the engineering cycle.',
  },
];

export const LEADERSHIP: Entry[] = [
  {
    period: '2024 to 2025',
    title: 'HR Manager',
    org: 'Ingeniums Club',
    detail: 'Ran recruitment and internal coordination for the student club.',
  },
  {
    period: '2024 to 2025',
    title: 'Finance Manager',
    org: 'GDG SBA',
    detail: 'Managed the budget and sponsorship tracking for the Google Developer Group chapter.',
  },
];

/**
 * Only add a certificate after its public verification page resolves.
 * The About page hides the whole section while this list is empty.
 */
export const CERTIFICATIONS: CertificationEntry[] = [
  {
    title: 'Intro to Programming',
    issuer: 'Kaggle',
    detail: 'Arithmetic, variables, functions, data types, conditions and lists, from first principles.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/intro-to-programming',
  },
  {
    title: 'Python',
    issuer: 'Kaggle',
    detail: 'Functions, booleans, lists, loops, strings, dictionaries and external libraries.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/python',
  },
  {
    title: 'Pandas',
    issuer: 'Kaggle',
    detail: 'Series and DataFrames, indexing, selecting, grouping, sorting and handling data types.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/pandas',
  },
  {
    title: 'Data Cleaning',
    issuer: 'Kaggle',
    detail: 'Missing values, scaling and normalization, parsing dates and untangling inconsistent entries.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/data-cleaning',
  },
  {
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    detail: 'Data exploration, model validation, overfitting, random forests and competitions.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/intro-to-machine-learning',
  },
  {
    title: 'Intermediate Machine Learning',
    issuer: 'Kaggle',
    detail: 'Pipelines, cross-validation, gradient boosting, categorical encoding and data leakage.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/intermediate-machine-learning',
  },
  {
    title: 'Data Visualization',
    issuer: 'Kaggle',
    detail: 'Line charts, bar charts, heatmaps, scatter plots and distributions with seaborn.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/data-visualization',
  },
  {
    title: 'Feature Engineering',
    issuer: 'Kaggle',
    detail: 'Mutual information, clustering, principal component analysis and target encoding.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/feature-engineering',
  },
  {
    title: 'Intro to Deep Learning',
    issuer: 'Kaggle',
    detail: 'Dense layers, activation functions, stochastic gradient descent, dropout and batch normalization.',
    url: 'https://www.kaggle.com/learn/certification/s4afou/intro-to-deep-learning',
  },
];
