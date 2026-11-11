export type Entry = {
  period: string;
  title: string;
  org: string;
  detail: string;
};

export type CertificationEntry = {
  period: string;
  title: string;
  issuer: string;
  detail?: string;
};

export const EDUCATION: Entry[] = [
  {
    period: '2024 — Present',
    title: 'Higher Cycle (Engineering)',
    org: 'ESI-SBA · Artificial Intelligence & Data Science',
    detail: 'Engineering cycle in artificial intelligence and data science.',
  },
  {
    period: '2022 — 2024',
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
    period: 'Aug — Nov 2024',
    title: 'English Instructor',
    org: 'Zenith Academy',
    detail: 'Taught English to groups of students while completing the engineering cycle.',
  },
];

export const LEADERSHIP: Entry[] = [
  {
    period: '2024 — 2025',
    title: 'HR Manager',
    org: 'Ingeniums Club',
    detail: 'Ran recruitment and internal coordination for the student club.',
  },
  {
    period: '2024 — 2025',
    title: 'Finance Manager',
    org: 'GDG SBA',
    detail: 'Managed the budget and sponsorship tracking for the Google Developer Group chapter.',
  },
];

/**
 * Kept empty until a certification or award is actually issued.
 * The About page hides the whole section while this list is empty.
 */
export const CERTIFICATIONS: CertificationEntry[] = [];
