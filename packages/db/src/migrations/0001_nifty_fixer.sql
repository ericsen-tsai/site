-- Add the role column with a default value
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" VARCHAR(255) NOT NULL DEFAULT 'user';

-- Update existing rows to have the 'user' role
UPDATE "user" SET "role" = 'user' WHERE "role" IS NULL;

-- Create an index on the role column for better query performance
CREATE INDEX IF NOT EXISTS idx_user_role ON "user" ("role");

UPDATE "user" SET "role" = 'admin' WHERE email = 'bommer95175@gmail.com';