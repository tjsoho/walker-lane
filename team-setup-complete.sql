-- ============================================
-- Team Management Database Setup
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This creates tables, indexes, triggers, and RLS policies
-- ============================================

-- ============================================
-- 1. CREATE UPDATED_AT TRIGGER FUNCTION (if not exists)
-- ============================================
-- This function is used by the triggers to auto-update updated_at timestamps

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. CREATE TABLES
-- ============================================

-- Team Sections Table (for dynamic categories)
CREATE TABLE IF NOT EXISTS team_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  section_id UUID NOT NULL REFERENCES team_sections(id) ON DELETE CASCADE,
  image_url TEXT DEFAULT '',
  hover_image_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_team_sections_order ON team_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_team_members_section_id ON team_members(section_id);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(section_id, order_index);

-- ============================================
-- 4. CREATE TRIGGERS
-- ============================================

CREATE TRIGGER update_team_sections_updated_at
  BEFORE UPDATE ON team_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE team_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running)
DROP POLICY IF EXISTS "Authenticated users full access to team_sections" ON team_sections;
DROP POLICY IF EXISTS "Public can read team_sections" ON team_sections;
DROP POLICY IF EXISTS "Authenticated users full access to team_members" ON team_members;
DROP POLICY IF EXISTS "Public can read team_members" ON team_members;

-- Team Sections Policies
CREATE POLICY "Authenticated users full access to team_sections"
  ON team_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read team_sections"
  ON team_sections
  FOR SELECT
  TO anon
  USING (true);

-- Team Members Policies
CREATE POLICY "Authenticated users full access to team_members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can read team_members"
  ON team_members
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- 6. INSERT DEFAULT TEAM SECTIONS
-- ============================================

INSERT INTO team_sections (name, display_name, order_index) VALUES
  ('leadership', 'Our Leadership Team', 0),
  ('advisers', 'Our Advisers', 1),
  ('associate-advisers', 'Our Associate Advisers', 2),
  ('operations-team', 'Our Operations Team', 3),
  ('advice-support-team', 'Our Advice Support Team', 4),
  ('client-services-team', 'Our Client Services Team', 5)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Next steps:
-- 1. Run the team-migration-complete.sql script to populate existing team data
-- 2. Go to /admin/team to manage your team members
-- 3. Add new sections and members as needed

