-- Drop existing tables if they exist (cleanup)
DROP TABLE IF EXISTS waitlist CASCADE;
DROP TABLE IF EXISTS spiritual_guides CASCADE;

-- Create waitlist table for app launch interested users
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create spiritual_guides table for spiritual guide registrations
CREATE TABLE spiritual_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialty TEXT NOT NULL,
  experience TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

CREATE INDEX idx_spiritual_guides_email ON spiritual_guides(email);
CREATE INDEX idx_spiritual_guides_created_at ON spiritual_guides(created_at DESC);
CREATE INDEX idx_spiritual_guides_specialty ON spiritual_guides(specialty);
CREATE INDEX idx_spiritual_guides_country ON spiritual_guides(country);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE spiritual_guides ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated read on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow anon read on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow public insert on spiritual_guides" ON spiritual_guides;
DROP POLICY IF EXISTS "Allow authenticated read on spiritual_guides" ON spiritual_guides;
DROP POLICY IF EXISTS "Allow anon read on spiritual_guides" ON spiritual_guides;

-- Create policies to allow public inserts and reads (for admin panel)
-- Anyone can insert into waitlist
CREATE POLICY "Allow public insert on waitlist" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Anyone can read waitlist (for admin panel to work)
CREATE POLICY "Allow anon read on waitlist" ON waitlist
  FOR SELECT
  USING (true);

-- Anyone can insert into spiritual_guides
CREATE POLICY "Allow public insert on spiritual_guides" ON spiritual_guides
  FOR INSERT
  WITH CHECK (true);

-- Anyone can read spiritual_guides (for admin panel to work)
CREATE POLICY "Allow anon read on spiritual_guides" ON spiritual_guides
  FOR SELECT
  USING (true);

-- Comments for documentation
COMMENT ON TABLE waitlist IS 'Stores email addresses of users interested in the app launch';
COMMENT ON TABLE spiritual_guides IS 'Stores registration information for spiritual guides wanting to join the platform';

COMMENT ON COLUMN waitlist.email IS 'User email address';
COMMENT ON COLUMN waitlist.created_at IS 'Timestamp when the user joined the waitlist';

COMMENT ON COLUMN spiritual_guides.first_name IS 'Spiritual guide first name';
COMMENT ON COLUMN spiritual_guides.last_name IS 'Spiritual guide last name';
COMMENT ON COLUMN spiritual_guides.email IS 'Spiritual guide email address';
COMMENT ON COLUMN spiritual_guides.country IS 'Country code (e.g., BR, US, ES)';
COMMENT ON COLUMN spiritual_guides.phone IS 'Phone number with country prefix';
COMMENT ON COLUMN spiritual_guides.specialty IS 'Spiritual specialty (tarot, runes, astrology, etc.)';
COMMENT ON COLUMN spiritual_guides.experience IS 'Experience level (beginner, intermediate, advanced, professional)';
COMMENT ON COLUMN spiritual_guides.message IS 'Additional message or information from the guide';
COMMENT ON COLUMN spiritual_guides.created_at IS 'Timestamp when the guide registered';
