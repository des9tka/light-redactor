CREATE TABLE IF NOT EXISTS "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"image_url" text DEFAULT '/',
	"user_id" text NOT NULL,
	"editor_state" text
);
