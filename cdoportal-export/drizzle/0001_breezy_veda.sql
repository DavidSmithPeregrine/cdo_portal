CREATE TABLE `agency_directory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`agency` varchar(255) NOT NULL,
	`email` varchar(320),
	`profileUrl` varchar(2048),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agency_directory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`itemType` enum('news','policy','job','resource') NOT NULL,
	`itemId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feed_updates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`feedType` enum('news','policy','jobs') NOT NULL,
	`feedSource` varchar(255) NOT NULL,
	`lastFetchedAt` timestamp NOT NULL,
	`itemsCount` int DEFAULT 0,
	`status` enum('success','error') DEFAULT 'success',
	`errorMessage` text,
	CONSTRAINT `feed_updates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`externalId` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`agency` varchar(255) NOT NULL,
	`location` text,
	`remote` boolean DEFAULT false,
	`salaryMin` int,
	`salaryMax` int,
	`clearanceLevel` varchar(100),
	`jobUrl` varchar(2048) NOT NULL,
	`source` varchar(100) NOT NULL,
	`postedAt` timestamp NOT NULL,
	`closingAt` timestamp,
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `job_listings_id` PRIMARY KEY(`id`),
	CONSTRAINT `job_listings_externalId_unique` UNIQUE(`externalId`)
);
--> statement-breakpoint
CREATE TABLE `news_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`summary` text,
	`url` varchar(2048) NOT NULL,
	`source` varchar(255) NOT NULL,
	`category` enum('policy','technology','workforce','ethics','community') NOT NULL,
	`publishedAt` timestamp NOT NULL,
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `news_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `policy_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`summary` text,
	`url` varchar(2048) NOT NULL,
	`source` varchar(255) NOT NULL,
	`category` enum('laws_regulations','federal_guidance','standards_practices') NOT NULL,
	`publishedAt` timestamp,
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `policy_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`url` varchar(2048) NOT NULL,
	`category` varchar(100) NOT NULL,
	`publishingOrg` varchar(255),
	`lastUpdated` varchar(100),
	`registrationRequired` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_searches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`searchParams` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_searches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `agency_idx` ON `agency_directory` (`agency`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `bookmarks` (`userId`);--> statement-breakpoint
CREATE INDEX `item_idx` ON `bookmarks` (`itemType`,`itemId`);--> statement-breakpoint
CREATE INDEX `feed_idx` ON `feed_updates` (`feedType`,`feedSource`);--> statement-breakpoint
CREATE INDEX `agency_idx` ON `job_listings` (`agency`);--> statement-breakpoint
CREATE INDEX `posted_idx` ON `job_listings` (`postedAt`);--> statement-breakpoint
CREATE INDEX `source_idx` ON `job_listings` (`source`);--> statement-breakpoint
CREATE INDEX `published_idx` ON `news_articles` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `news_articles` (`category`);--> statement-breakpoint
CREATE INDEX `source_idx` ON `news_articles` (`source`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `policy_documents` (`category`);--> statement-breakpoint
CREATE INDEX `published_idx` ON `policy_documents` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `resources` (`category`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `saved_searches` (`userId`);