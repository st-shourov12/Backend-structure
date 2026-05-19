import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // use true only if you have the CA cert
  },
});

export const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(20),
                email VARCHAR(20) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()

            )
        `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS profile(
                id SERIAL PRIMARY KEY,
                user_id INT UNIQUE REFERENCES users(id) on DELETE CASCADE,
                bio TEXT,
                address TEXT,
                phone VARCHAR(15),
                gender VARCHAR(10),
                
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
        )
      `)  




    console.log("database connected succcessfully");
    return;
  } catch (error) {
    console.log(error);
  }
};






// &uselibpqcompat=true

// ssl: {
//         rejectUnauthorized: false // use true only if you have the CA cert
//     }
