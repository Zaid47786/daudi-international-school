/* eslint-env node */
/**
 * Run with: node database/init.js
 * Applies schema.sql to create all tables from scratch.
 */
import db from "./db.js";
console.log("Database initialised at:", process.env.DB_PATH || "./database/dis.db");
db.close();