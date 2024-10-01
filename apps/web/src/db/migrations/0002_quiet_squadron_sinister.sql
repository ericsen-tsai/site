CREATE TABLE IF NOT EXISTS "guestbook_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guestbook_comments" ADD CONSTRAINT "guestbook_comments_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
