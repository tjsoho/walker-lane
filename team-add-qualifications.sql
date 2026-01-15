-- ============================================
-- Add Qualifications Column to Team Members
-- Walker Lane Private Wealth
-- ============================================
-- Run this script in your Supabase SQL Editor
-- This adds a qualifications column and populates it for leadership team
-- ============================================

-- Add qualifications column if it doesn't exist
ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS qualifications TEXT DEFAULT '';

-- Update leadership team members with their qualifications
DO $$
DECLARE
    leadership_section_id UUID;
BEGIN
    -- Get leadership section ID
    SELECT id INTO leadership_section_id
    FROM team_sections
    WHERE name = 'leadership'
    LIMIT 1;

    IF leadership_section_id IS NOT NULL THEN
        -- Update Josh Cratchley
        UPDATE team_members
        SET qualifications = 'Certified Financial Planner (FPAA)
Bachelor of Business (Financial Planning) UTS'
        WHERE name = 'Josh Cratchley' AND section_id = leadership_section_id;

        -- Update Patrick Casey
        UPDATE team_members
        SET qualifications = 'Bachelor of Commerce (Economics)
Graduate Diploma of Financial Planning'
        WHERE name = 'Patrick Casey' AND section_id = leadership_section_id;

        -- Update Sam Carroll
        UPDATE team_members
        SET qualifications = 'Bachelor of Business (Financial Services)
Advanced Diploma of Financial Planning
Certificate IV Finance & Mortgage Broking'
        WHERE name = 'Sam Carroll' AND section_id = leadership_section_id;

        -- Update Joel Taylor
        UPDATE team_members
        SET qualifications = 'Bachelor of Business
Advanced Diploma of Financial Planning
Self-Managed Super Fund course (Kaplan)'
        WHERE name = 'Joel Taylor' AND section_id = leadership_section_id;

        RAISE NOTICE 'Qualifications updated successfully!';
    END IF;
END $$;

-- ============================================
-- SCRIPT COMPLETE
-- ============================================
-- The qualifications column has been added and populated
-- for all 4 leadership team members
-- ============================================

