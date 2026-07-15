/**
 * Database Configuration Placeholder
 * 
 * In the future, this file will export the configured PostgreSQL/PostGIS client
 * using 'pg' or a query builder like 'kysely'.
 */

require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'smartroad_rwanda',
};

module.exports = {
  dbConfig,
  // placeholder for query function
  query: async (text, params) => {
    console.log('Mock DB Query:', text);
    return { rows: [] };
  }
};
