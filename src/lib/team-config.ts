// Team Management Configuration
// Defines types and structure for team members

export type TeamSection = 
  | 'Leadership'
  | 'Advisers'
  | 'Associate Advisers'
  | 'Operations Team'
  | 'Advice Support Team'
  | 'Client Services Team';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  section: TeamSection;
  image_url: string;
  bio: string;
  email: string;
  phone: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export const TEAM_SECTIONS: { value: TeamSection; label: string }[] = [
  { value: 'Leadership', label: 'Our Leadership Team' },
  { value: 'Advisers', label: 'Our Advisers' },
  { value: 'Associate Advisers', label: 'Our Associate Advisers' },
  { value: 'Operations Team', label: 'Our Operations Team' },
  { value: 'Advice Support Team', label: 'Our Advice Support Team' },
  { value: 'Client Services Team', label: 'Our Client Services Team' },
];

export const DEFAULT_TEAM_MEMBERS: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  role: '',
  section: 'Leadership',
  image_url: '',
  bio: '',
  email: '',
  phone: '',
  order_index: 0,
};

