CREATE TABLE `error_explanations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`error_id` integer NOT NULL,
	`explanation` text NOT NULL,
	`solution` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (`error_id`) REFERENCES `terminal_errors`(`id`) ON UPDATE no action ON DELETE no action
);
