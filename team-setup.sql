-- ============================================
-- Team Members Table Setup
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CREATE TEAM MEMBERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN (
    'Leadership',
    'Advisers',
    'Associate Advisers',
    'Operations Team',
    'Advice Support Team',
    'Client Services Team'
  )),
  image_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_team_members_section ON team_members(section);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(section, order_index);

-- ============================================
-- 3. CREATE UPDATED_AT TRIGGER
-- ============================================

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Authenticated users can do everything
CREATE POLICY "Authenticated users full access to team_members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Public can read team members
CREATE POLICY "Public can read team_members"
  ON team_members
  FOR SELECT
  TO anon
  USING (true);

-- ============================================
-- 5. INSERT DEFAULT TEAM MEMBERS
-- ============================================

-- Leadership Team
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Josh Cratchley', 'Principal', 'Leadership', 0),
  ('Patrick Casey', 'Principal', 'Leadership', 1),
  ('Sam Carroll', 'Principal', 'Leadership', 2),
  ('Joel Taylor', 'Principal', 'Leadership', 3)
ON CONFLICT DO NOTHING;

-- Advisers
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Miles Tauber', 'Adviser', 'Advisers', 0),
  ('David Vaughan', 'Adviser', 'Advisers', 1),
  ('Davin Kim', 'Adviser', 'Advisers', 2)
ON CONFLICT DO NOTHING;

-- Associate Advisers
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Charis Tepoot', 'Associate Adviser', 'Associate Advisers', 0)
ON CONFLICT DO NOTHING;

-- Operations Team
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Rebecca Carroll', 'Operations', 'Operations Team', 0),
  ('Sara Jaceniuk', 'Operations', 'Operations Team', 1),
  ('Katie Kavalekas', 'Operations', 'Operations Team', 2)
ON CONFLICT DO NOTHING;

-- Advice Support Team
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Patricia Peters', 'Advice Support', 'Advice Support Team', 0),
  ('Kylie Shaw', 'Advice Support', 'Advice Support Team', 1),
  ('Mathew Wu', 'Advice Support', 'Advice Support Team', 2)
ON CONFLICT DO NOTHING;

-- Client Services Team
INSERT INTO team_members (name, role, section, order_index) VALUES
  ('Tracey Parkin', 'Client Services', 'Client Services Team', 0),
  ('Thuy Chieu', 'Client Services', 'Client Services Team', 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- SETUP COMPLETE
-- ============================================

