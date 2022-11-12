import express from "express";
import { router } from "./routes";
import { InitService } from "./services/InitService";
import { NODE_CONFIGS } from "./constants";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({ version: "1.0" });
});

app.use("/api/v1", router);

app.listen(NODE_CONFIGS.PORT, async () => {
  try {
    await InitService.connectMongo();
    console.log(
      `[server]: Server is running at https://localhost:${NODE_CONFIGS.PORT}`
    );
  } catch (error) {
    console.error(error);
  }
});
