-- ============================================
-- Add Team Members Script
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This adds all team members with names and roles
-- Images can be added manually through the admin interface
-- ============================================

DO $$
DECLARE
    advisers_section_id UUID;
    associate_advisers_section_id UUID;
    operations_team_section_id UUID;
    advice_support_team_section_id UUID;
    client_services_team_section_id UUID;
BEGIN
    -- Get section IDs
    SELECT id INTO advisers_section_id FROM team_sections WHERE name = 'advisers' LIMIT 1;
    SELECT id INTO associate_advisers_section_id FROM team_sections WHERE name = 'associate-advisers' LIMIT 1;
    SELECT id INTO operations_team_section_id FROM team_sections WHERE name = 'operations-team' LIMIT 1;
    SELECT id INTO advice_support_team_section_id FROM team_sections WHERE name = 'advice-support-team' LIMIT 1;
    SELECT id INTO client_services_team_section_id FROM team_sections WHERE name = 'client-services-team' LIMIT 1;

    -- Insert Advisers
    IF advisers_section_id IS NOT NULL THEN
        INSERT INTO team_members (name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        SELECT * FROM (VALUES
            ('Miles Tauber', 'Adviser', advisers_section_id, '', '', '', '', '', 0),
            ('David Vaughan', 'Adviser', advisers_section_id, '', '', '', '', '', 1),
            ('Davin Kim', 'Adviser', advisers_section_id, '', '', '', '', '', 2)
        ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        WHERE NOT EXISTS (
            SELECT 1 FROM team_members 
            WHERE name = v.name AND section_id = advisers_section_id
        );
    END IF;

    -- Insert Associate Advisers
    IF associate_advisers_section_id IS NOT NULL THEN
        INSERT INTO team_members (name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        SELECT * FROM (VALUES
            ('Charis Tepoot', 'Associate Adviser', associate_advisers_section_id, '', '', '', '', '', 0)
        ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        WHERE NOT EXISTS (
            SELECT 1 FROM team_members 
            WHERE name = v.name AND section_id = associate_advisers_section_id
        );
    END IF;

    -- Insert Operations Team
    IF operations_team_section_id IS NOT NULL THEN
        INSERT INTO team_members (name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        SELECT * FROM (VALUES
            ('Rebecca Carroll', 'Operations', operations_team_section_id, '', '', '', '', '', 0),
            ('Sara Jaceniuk', 'Operations', operations_team_section_id, '', '', '', '', '', 1),
            ('Katie Kavalekas', 'Operations', operations_team_section_id, '', '', '', '', '', 2)
        ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        WHERE NOT EXISTS (
            SELECT 1 FROM team_members 
            WHERE name = v.name AND section_id = operations_team_section_id
        );
    END IF;

    -- Insert Advice Support Team
    IF advice_support_team_section_id IS NOT NULL THEN
        INSERT INTO team_members (name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        SELECT * FROM (VALUES
            ('Patricia Peters', 'Advice Support', advice_support_team_section_id, '', '', '', '', '', 0),
            ('Kylie Shaw', 'Advice Support', advice_support_team_section_id, '', '', '', '', '', 1),
            ('Mathew Wu', 'Advice Support', advice_support_team_section_id, '', '', '', '', '', 2)
        ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        WHERE NOT EXISTS (
            SELECT 1 FROM team_members 
            WHERE name = v.name AND section_id = advice_support_team_section_id
        );
    END IF;

    -- Insert Client Services Team
    IF client_services_team_section_id IS NOT NULL THEN
        INSERT INTO team_members (name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        SELECT * FROM (VALUES
            ('Tracey Parkin', 'Client Services', client_services_team_section_id, '', '', '', '', '', 0),
            ('Thuy Chieu', 'Client Services', client_services_team_section_id, '', '', '', '', '', 1)
        ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
        WHERE NOT EXISTS (
            SELECT 1 FROM team_members 
            WHERE name = v.name AND section_id = client_services_team_section_id
        );
    END IF;

    RAISE NOTICE 'Team members inserted successfully!';
END $$;

-- ============================================
-- SCRIPT COMPLETE
-- ============================================
-- Total members added:
-- - 3 Advisers
-- - 1 Associate Adviser
-- - 3 Operations Team members
-- - 3 Advice Support Team members
-- - 2 Client Services Team members
-- ============================================
-- Next steps:
-- 1. Go to /admin/team
-- 2. Add images for each member manually
-- 3. Add bios if needed
-- ============================================

