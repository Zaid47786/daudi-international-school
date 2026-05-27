/* eslint-disable no-undef */
// Run with: node database/init.js
import db from "./db.js";
console.log("Database initialised at:", process.env.DB_PATH || "./dis.db");
db.close();