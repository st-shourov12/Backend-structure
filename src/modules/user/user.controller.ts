import type { Request, Response } from "express";
// import { pool } from "../../db";
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


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB()
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
}


const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string)

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
}


const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {name, password, is_active, age} = req.body;
  
  try {
    const result = await userService.updateUserFromDB(req.body , id as string)

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
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  
  try {
    const result = await userService.deleteUserFromDB(id as string)

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


}



export const userController = {
    creatUser,
    getAllUsers,
    getSingleUser,
    updateUser, 
    deleteUser
}