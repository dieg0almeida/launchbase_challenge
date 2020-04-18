DROP DATABASE foodfy;
CREATE DATABASE foodfy;

CREATE TABLE "recipes" (
  id SERIAL PRIMARY KEY,
  title text,
  chef_id int,
  ingredients text[],
  preparation text [],
  information text,
  created_at timestamp DEFAULT (now()),
  updated_at timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  id SERIAL PRIMARY KEY,
  name text,
  file_id INTEGER REFERENCES files(id),
  created_at timestamp DEFAULT (now()),
  updated_at timestamp DEFAULT (now())
);

CREATE TABLE files(
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT NOT NULL
);

CREATE TABLE recipe_files(
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE
);

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id") ON DELETE CASCADE;