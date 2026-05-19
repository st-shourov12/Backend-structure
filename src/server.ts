import app from "./app";

import dotenv from "dotenv";
import { initDB } from "./db";

dotenv.config();

const port = process.env.PORT

const main = () => {
  initDB();

  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });
};
main()
