CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text,
  "chef_id" int,
  "image" text,
  "ingredients" text[],
  "preparation" text [],
  "information" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()) ON UPDATE (now())
);

CREATE TABLE "chefs" (
  id SERIAL PRIMARY KEY,
  name text,
  avatar_url text,
  created_at timestamp DEFAULT (now())
);