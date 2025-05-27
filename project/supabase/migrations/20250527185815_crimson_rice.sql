/*
  # Add role field to profiles table and create admin user

  1. Changes
    - Add role field to profiles table
    - Update existing policies to consider role
    - Add initial admin user
*/

-- Add role column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user(admin_email text, admin_password text)
RETURNS void AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Create user in auth.users
  user_id := (SELECT id FROM auth.users WHERE email = admin_email);
  
  IF user_id IS NULL THEN
    user_id := (
      SELECT id FROM auth.users 
      WHERE email = admin_email 
      AND raw_user_meta_data->>'is_admin' = 'true'
      LIMIT 1
    );
    
    IF user_id IS NULL THEN
      INSERT INTO auth.users (
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data
      )
      VALUES (
        admin_email,
        crypt(admin_password, gen_salt('bf')),
        now(),
        jsonb_build_object('is_admin', true)
      )
      RETURNING id INTO user_id;
    END IF;
  END IF;

  -- Create or update admin profile
  INSERT INTO public.profiles (
    id,
    company_name,
    role,
    subscription_plan,
    subscription_status
  )
  VALUES (
    user_id,
    'Admin',
    'admin',
    'enterprise',
    'active'
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin',
      subscription_plan = 'enterprise',
      subscription_status = 'active';
END;
$$ LANGUAGE plpgsql;

-- Create initial admin user (change email and password in production)
SELECT create_admin_user('admin@diplomafy.com', 'admin123');

-- Update policies to consider admin role
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR (
    SELECT role FROM profiles WHERE id = auth.uid()
  ) = 'admin');

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING ((
    SELECT role FROM profiles WHERE id = auth.uid()
  ) = 'admin');