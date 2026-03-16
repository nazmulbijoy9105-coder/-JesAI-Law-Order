import { createDatabase } from "@kilocode/app-builder-db";
import * as schema from "./schema";

const dbUrl = process.env.DB_URL;
const dbToken = process.env.DB_TOKEN;

export const db = dbUrl && dbToken ? createDatabase(schema) : null;

export const isDbConnected = () => db !== null;
