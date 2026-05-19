import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const loginUserIntoDB = async(payload : {
    email : string , 
    password : string
}) => {
    const {email, password} = payload ;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `,
    [email]
    );
    
    if(userData.rows.length === 0){
        throw new Error("Invalid Cridential!")
    }
    const user = userData.rows[0]
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Wrong Password!")
    }
    // console.log(matchPassword);

    // generate token

    const jwtPayload = {
        id : user?.id,
        name : user?.name ,
        is_active : user?.is_active,
        email : user?.email
    }

    const secret = process.env.JSONSECRET;

    const accessToken = jwt.sign(jwtPayload , secret as string , {
        expiresIn : "1d"
    })
    // console.log(accessToken);

    return {accessToken};

}

export const authService = {
    loginUserIntoDB,
}