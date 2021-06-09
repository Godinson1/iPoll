import http from "http";
import { RedisClient } from "redis";
import app from "./app";
import { promisify } from "util";
import { mongoConnection, redisConnection } from "./configurations";

// setting server post
const PORT = process.env.PORT || 5000;

let client: RedisClient;

const startServer = async () => {
  // creatinng the server
  const server = http.createServer(app);
  mongoConnection.on("open", () =>
    console.log("Connection to MongoDB Atlas established successfully")
  );
  client = await redisConnection();
  client.on("error", (err) => console.error(err));
  client.on("connect", () =>
    console.log("Redis database connected successfully!")
  );

  const setAsync = promisify(client.set).bind(client);
  const getAsync = promisify(client.get).bind(client);

  //Set Total Votes
  const isExist = await getAsync("total_app_votes");
  if (isExist === "0") await setAsync(`total_app_votes`, "0");

  server.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
};

startServer();

export { client };
