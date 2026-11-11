export type SkillGroup = {
  label: string;
  items: string[];
};

// Grouped exactly as on the CV, so the two artifacts agree.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Artificial Intelligence',
    items: ['Machine learning', 'Deep learning', 'NLP', 'Computer vision'],
  },
  {
    label: 'Data & Cybersecurity',
    items: ['Data analysis', 'Feature engineering', 'Intrusion detection'],
  },
  {
    label: 'Systems & HPC',
    items: ['Linux', 'Parallel computing', 'Networking'],
  },
  {
    label: 'Software Engineering',
    items: ['Python', 'C / C++', 'Java', 'APIs', 'Docker', 'Git'],
  },
];
