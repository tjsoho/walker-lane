-- ============================================
-- Team Data Migration Script
-- Populates existing team member data
-- Run this AFTER team-setup.sql
-- ============================================

-- First, ensure we have the leadership section
DO $$
DECLARE
    leadership_section_id UUID;
BEGIN
    -- Get or create leadership section
    SELECT id INTO leadership_section_id
    FROM team_sections
    WHERE name = 'leadership'
    LIMIT 1;

    -- If section doesn't exist, create it
    IF leadership_section_id IS NULL THEN
        INSERT INTO team_sections (name, display_name, order_index)
        VALUES ('leadership', 'Our Leadership Team', 0)
        RETURNING id INTO leadership_section_id;
    END IF;

    -- Insert existing team members (only if they don't exist)
    INSERT INTO team_members (
        name,
        role,
        section_id,
        image_url,
        hover_image_url,
        bio,
        email,
        phone,
        order_index
    )
    SELECT * FROM (VALUES
        (
            'Josh Cratchley',
            'Chief Executive Officer & Founding Partner',
            leadership_section_id,
            '/images/Josh Cratchley_02.jpg',
            '/images/Josh Cratchley_05.jpg',
            'With more than 20 years'' experience in financial services, Josh pairs strategic expertise with a strong focus on delivering real value to clients and advisers. Starting his career in accounting, he moved into financial advice in 2010 and went on to co-found Plenary Wealth in 2013.

In 2018, Josh co-founded Walker Lane, where he now serves as CEO and Chief Financial Officer. In this dual role, he leads the strategic direction and financial management of the business, while continuing to deliver expert advice to clients. His ability to balance high-level leadership with hands-on advisory work reflects his deep commitment to both the profession and the people he serves.

Recognised for his grounded approach and clear, actionable advice, Josh combines deep technical knowledge with a strong focus on people. His leadership reflects Walker Lane''s broader vision—to support and grow exceptional advice businesses built on integrity, trust and meaningful value.',
            '',
            '',
            0
        ),
        (
            'Patrick Casey',
            'Chairman & Founding Partner',
            leadership_section_id,
            '/images/Pat Casey_02.jpg',
            '/images/Pat Casey_03.jpg',
            'Pat Casey is a seasoned financial services executive with over 23 years of experience in wealth management and financial planning. Having held senior leadership roles at Colonial First State and Suncorp Group, he played a key role in transforming their financial advice businesses.

Driven by a desire to make a more personal impact, Pat shifted his focus from large-scale corporate roles to providing strategic advice to individuals and families. His deep expertise in wealth-building strategies and long-term financial planning enables clients to achieve financial freedom with clarity and confidence.

As Co-Founder and Chairman of Walker Lane, he shapes the firm''s strategic direction, leveraging his deep expertise in AFSL operations, governance, and regulatory engagement to support the growth and success of high-quality financial advice businesses.',
            '',
            '',
            1
        ),
        (
            'Sam Carroll',
            'Responsible Manager & Founding Partner',
            leadership_section_id,
            '/images/Sam Carroll_01.jpg',
            '/images/Sam Carroll_05.jpg',
            'Sam Carroll is a highly experienced financial services professional with over 20 years in the industry. He began his career in a family-founded financial planning practice with a 29-year legacy, where he developed a strong understanding of business continuity, client relationships, and the lasting value of quality advice. In 2019, he took on full leadership of the firm, successfully guiding its succession and future direction.

As Co-Founder of Walker Lane, Sam helps shape the group''s strategic vision and growth. As one of two Responsible Managers on the Walker Lane licence, he is committed to building a strong, supportive community of advice businesses.

In his role as a Financial Adviser, Sam works with a diverse range of clients—from young professionals and families to business owners and retirees. He thrives on simplifying complex financial decisions and providing clear, personalised advice that helps clients build lasting financial confidence and security.',
            '',
            '',
            2
        ),
        (
            'Joel Taylor',
            'Head of Growth & Risk',
            leadership_section_id,
            '/images/Joel Taylor_01.jpg',
            '/images/Joel Taylor_02.jpg',
            'Joel Taylor is an accomplished financial services executive with 20 years'' experience across financial advice, investments, and compliance. As Head of Growth at Walker Lane and a non-voting risk member of the AAC, he plays a key role in maintaining strong regulatory standards and governance frameworks.

A specialist in Best Interests Duty and compliance, Joel has extensive experience designing risk frameworks and organisational structures, establishing and managing multiple investment services, and holding senior leadership roles—including Responsible Manager, General Manager, and Managing Director—across several AFSLs.

His career spans both major institutions such as AMP, TAL, MLC, and CBA, as well as mid-tier AFSLs, giving him a comprehensive perspective on the financial services industry. Joel is recognised as a trusted authority in regulatory compliance, risk management, and financial services leadership.',
            '',
            '',
            3
        )
    ) AS v(name, role, section_id, image_url, hover_image_url, bio, email, phone, order_index)
    WHERE NOT EXISTS (
        SELECT 1 FROM team_members 
        WHERE name = v.name AND section_id = leadership_section_id
    );
END $$;

