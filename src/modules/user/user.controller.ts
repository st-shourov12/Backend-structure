import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const creatUser = async (req: Request, res: Response) => {
  const { name, email, password, is_active, age, created_at, updated_at } =
    req.body;

  try {
    const result = await userService.createUserIntoDB(req.body)
    res.status(201).json({
      message: `User ${name} created successfully `,

      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}

export const userController = {
    creatUser,
}