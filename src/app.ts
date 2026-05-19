import express, {
  type Application,
  type Request,
  type Response,
} from "express";

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


app.use('/api/user', userRoute)



export default app;