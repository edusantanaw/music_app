import { createClient } from "redis";

const client = createClient({
    socket: {
        host: "localhost",
        port: 6379
    }
});

export async function connectRedis() {
  await client.connect();
}

export async function disconnectRedis() {
  await client.disconnect();
}

export default client;
