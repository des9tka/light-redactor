import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";

const $notes = pgTable("notes", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	imageUrl: text("image_url"),
	userId: text("user_id").notNull(),
	editorState: text("editor_state"),
});

type NoteType = typeof $notes.$inferInsert;

export type {NoteType};
export {$notes};
