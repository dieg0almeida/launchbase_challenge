CREATE TABLE "recipes" (
  id SERIAL PRIMARY KEY,
  title text,
  chef_id int,
  image text,
  ingredients text[],
  preparation text [],
  information text,
  created_at timestamp DEFAULT (now()),
  updated_at timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  id SERIAL PRIMARY KEY,
  name text,
  avatar_url text,
  created_at timestamp DEFAULT (now()),
  updated_at timestamp DEFAULT (now())
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