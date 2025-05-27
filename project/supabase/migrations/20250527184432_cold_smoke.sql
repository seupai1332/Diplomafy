/*
  # Add INSERT policy for profiles table
  
  1. Changes
    - Add new RLS policy to allow authenticated users to create their own profile
    
  2. Security
    - Policy ensures users can only create a profile with their own user ID
    - Maintains existing security model while enabling user registration flow
*/

CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);