import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jerseys_sizes" AS ENUM('PP', 'P', 'M', 'G', 'GG', 'XG');
  CREATE TYPE "public"."enum_jerseys_fit_line" AS ENUM('mens', 'womens', 'kids');
  CREATE TYPE "public"."enum_jerseys_edition" AS ENUM('home', 'away', 'third');
  CREATE TYPE "public"."enum_order_requests_status" AS ENUM('pending', 'contacted', 'completed', 'cancelled');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "clubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"league" varchar NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jerseys_sizes" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_jerseys_sizes",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "jerseys_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "jerseys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"club_id" integer NOT NULL,
  	"fit_line" "enum_jerseys_fit_line" NOT NULL,
  	"edition" "enum_jerseys_edition" NOT NULL,
  	"season" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "order_requests_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"jersey_id" integer NOT NULL,
  	"size" varchar NOT NULL,
  	"quantity" numeric NOT NULL,
  	"price_at_order" numeric NOT NULL
  );
  
  CREATE TABLE "order_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_name" varchar NOT NULL,
  	"total_price" numeric NOT NULL,
  	"status" "enum_order_requests_status" DEFAULT 'pending' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"clubs_id" integer,
  	"jerseys_id" integer,
  	"order_requests_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clubs" ADD CONSTRAINT "clubs_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jerseys_sizes" ADD CONSTRAINT "jerseys_sizes_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jerseys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jerseys_images" ADD CONSTRAINT "jerseys_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jerseys_images" ADD CONSTRAINT "jerseys_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jerseys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jerseys" ADD CONSTRAINT "jerseys_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "order_requests_items" ADD CONSTRAINT "order_requests_items_jersey_id_jerseys_id_fk" FOREIGN KEY ("jersey_id") REFERENCES "public"."jerseys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "order_requests_items" ADD CONSTRAINT "order_requests_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."order_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jerseys_fk" FOREIGN KEY ("jerseys_id") REFERENCES "public"."jerseys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_order_requests_fk" FOREIGN KEY ("order_requests_id") REFERENCES "public"."order_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "clubs_logo_idx" ON "clubs" USING btree ("logo_id");
  CREATE INDEX "clubs_updated_at_idx" ON "clubs" USING btree ("updated_at");
  CREATE INDEX "clubs_created_at_idx" ON "clubs" USING btree ("created_at");
  CREATE INDEX "jerseys_sizes_order_idx" ON "jerseys_sizes" USING btree ("order");
  CREATE INDEX "jerseys_sizes_parent_idx" ON "jerseys_sizes" USING btree ("parent_id");
  CREATE INDEX "jerseys_images_order_idx" ON "jerseys_images" USING btree ("_order");
  CREATE INDEX "jerseys_images_parent_id_idx" ON "jerseys_images" USING btree ("_parent_id");
  CREATE INDEX "jerseys_images_image_idx" ON "jerseys_images" USING btree ("image_id");
  CREATE INDEX "jerseys_club_idx" ON "jerseys" USING btree ("club_id");
  CREATE INDEX "jerseys_updated_at_idx" ON "jerseys" USING btree ("updated_at");
  CREATE INDEX "jerseys_created_at_idx" ON "jerseys" USING btree ("created_at");
  CREATE INDEX "order_requests_items_order_idx" ON "order_requests_items" USING btree ("_order");
  CREATE INDEX "order_requests_items_parent_id_idx" ON "order_requests_items" USING btree ("_parent_id");
  CREATE INDEX "order_requests_items_jersey_idx" ON "order_requests_items" USING btree ("jersey_id");
  CREATE INDEX "order_requests_updated_at_idx" ON "order_requests" USING btree ("updated_at");
  CREATE INDEX "order_requests_created_at_idx" ON "order_requests" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_clubs_id_idx" ON "payload_locked_documents_rels" USING btree ("clubs_id");
  CREATE INDEX "payload_locked_documents_rels_jerseys_id_idx" ON "payload_locked_documents_rels" USING btree ("jerseys_id");
  CREATE INDEX "payload_locked_documents_rels_order_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("order_requests_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "clubs" CASCADE;
  DROP TABLE "jerseys_sizes" CASCADE;
  DROP TABLE "jerseys_images" CASCADE;
  DROP TABLE "jerseys" CASCADE;
  DROP TABLE "order_requests_items" CASCADE;
  DROP TABLE "order_requests" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_jerseys_sizes";
  DROP TYPE "public"."enum_jerseys_fit_line";
  DROP TYPE "public"."enum_jerseys_edition";
  DROP TYPE "public"."enum_order_requests_status";`)
}
