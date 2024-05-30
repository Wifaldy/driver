import express from "express";
import { APP_PORT, APP_HOST } from "./libs/utils";
import router from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get("/", (_req: Request, res: Response) => {
//   res.send("Hello, world!");
// });

app.use("/api/v1", router);

app.listen(<number>APP_PORT, APP_HOST, () => {
  console.log(`Server is running at http://${APP_HOST}:${APP_PORT}`);
});
