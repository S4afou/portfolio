export type Achievement = {
  /** Human-readable period, shown on the timeline. */
  period: string;
  /** Numeric sort key in YYYYMM form, newest first. */
  sort: number;
  title: string;
  org: string;
  detail: string;
  /** Certifications use the same shape, so they slot into the timeline as data. */
  kind: 'achievement' | 'certification';
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    period: 'Sep 2025',
    sort: 202509,
    title: 'Network & Security Engineering Intern',
    org: 'Space Techniques Center (CTS), Arzew',
    detail:
      'Deployed VLANs, trunks, and SSH on Cisco routers, and integrated a FortiGate 400E firewall to filter traffic.',
    kind: 'achievement',
  },
  {
    period: 'Aug – Nov 2024',
    sort: 202408,
    title: 'English Instructor',
    org: 'Zenith Academy',
    detail: 'Taught English to groups of students while completing the engineering cycle.',
    kind: 'achievement',
  },
  {
    period: '2024 – 2025',
    sort: 202406,
    title: 'HR Manager',
    org: 'Ingeniums Club',
    detail: 'Ran recruitment and internal coordination for the student club.',
    kind: 'achievement',
  },
  {
    period: '2024 – 2025',
    sort: 202405,
    title: 'Finance Manager',
    org: 'GDG SBA',
    detail: 'Managed the budget and sponsorship tracking for the Google Developer Group chapter.',
    kind: 'achievement',
  },
  {
    period: '2022',
    sort: 202207,
    title: 'Baccalaureate in Mathematics — Highest Honors',
    org: '16.39 / 20',
    detail: 'Graduated with the highest distinction before entering the ESI-SBA preparatory cycle.',
    kind: 'achievement',
  },
];

export function sortedAchievements(): Achievement[] {
  return [...ACHIEVEMENTS].sort((a, b) => b.sort - a.sort);
}

export function recentAchievements(limit: number): Achievement[] {
  return sortedAchievements().slice(0, limit);
}
