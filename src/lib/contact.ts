import { SITE } from './site';

/**
 * One vocabulary for every contact action on the site. The subject is prefilled so
 * replies can be triaged without asking the visitor what the message is about.
 */
export const CONTACT_SUBJECTS = {
  general: 'Portfolio enquiry',
  internship: 'PFE / internship enquiry',
  project: (title: string) => `Question about ${title}`,
} as const;

export function mailto(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];

  if (body) params.push(`body=${encodeURIComponent(body)}`);

  return `mailto:${SITE.email}?${params.join('&')}`;
}
