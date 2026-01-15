// Team Management Configuration
// Defines types and structure for team members

export interface TeamSection {
  id: string;
  name: string; // Unique identifier (slug)
  display_name: string; // Display name for frontend
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  section_id: string;
  image_url: string;
  hover_image_url: string; // Optional hover image
  bio: string; // Optional - if empty, no modal
  qualifications: string; // Optional - qualifications list
  email: string;
  phone: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_TEAM_SECTION: Omit<TeamSection, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  display_name: '',
  order_index: 0,
};

export const DEFAULT_TEAM_MEMBER: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  role: '',
  section_id: '',
  image_url: '',
  hover_image_url: '',
  bio: '',
  qualifications: '',
  email: '',
  phone: '',
  order_index: 0,
};

