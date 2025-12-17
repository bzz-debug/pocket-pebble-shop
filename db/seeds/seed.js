require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const { db } = require("../../connect.js");

async function seedSessionTable() {
  try {
    await db.query(`
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL PRIMARY KEY,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  );
`);

    await db.query(`
  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

`);
    console.log("Session table created!");
  } catch (error) {
    console.error("Error creating session table:", error);
  } finally {
    db.end();
  }
}

seedSessionTable();
