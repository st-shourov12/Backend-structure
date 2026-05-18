import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import {  pool } from "./db";
import { userRoute } from "./modules/user/user.route";


const app: Application = express();


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));





app.get("/", (req: Request, res: Response) => {

  res.status(200).json({
    message: "Express server",
    author: "Shourov",
  });
});


app.use('/api/users', userRoute)



app.get("/api/user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
            SELECT * FROM users
        `);
    res.status(200).json({
      success: true,
      message: "Users Retrive successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.get("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
            SELECT * FROM users WHERE id=$1
        `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
       
      });
    }
    res.status(200).json({
      success: true,
      message: "User Retrive successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});


app.put("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {name, password, is_active, age} = req.body;
  
  try {
    const result = await pool.query(
        `
            UPDATE users 
            SET 
            name=COALESCE($1,name), 
            password=COALESCE($2,password), 
            is_active = COALESCE($3,is_active), 
            age = COALESCE($4,age)
            WHERE  id=$5 
            RETURNING *
        `,
      [name, password, is_active, age,id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
       
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});


app.delete("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  
  try {
    const result = await pool.query(`
        DELETE FROM users WHERE id=$1
    `,[id])

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
       
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }


})



export default app;