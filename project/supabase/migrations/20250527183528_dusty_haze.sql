/*
  # Initial Schema Setup for Diplomafy

  1. New Tables
    - certificates
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - template_id (text)
      - title (text)
      - event_name (text)
      - custom_fields (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - recipients
      - id (uuid, primary key)
      - certificate_id (uuid, references certificates)
      - name (text)
      - email (text)
      - custom_data (jsonb)
      - unique_code (text)
      - sent_at (timestamptz)
      - viewed_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  template_id text NOT NULL,
  title text NOT NULL,
  event_name text NOT NULL,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recipients table
CREATE TABLE IF NOT EXISTS recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id uuid REFERENCES certificates ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  custom_data jsonb DEFAULT '{}'::jsonb,
  unique_code text UNIQUE NOT NULL,
  sent_at timestamptz,
  viewed_at timestamptz
);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;

-- Certificates policies
CREATE POLICY "Users can create certificates"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own certificates"
  ON certificates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own certificates"
  ON certificates
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recipients policies
CREATE POLICY "Users can manage recipients for own certificates"
  ON recipients
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM certificates 
      WHERE certificates.id = recipients.certificate_id 
      AND certificates.user_id = auth.uid()
    )
  );

-- Public verification policy
CREATE POLICY "Anyone can verify certificates"
  ON recipients
  FOR SELECT
  TO anon
  USING (unique_code IS NOT NULL);