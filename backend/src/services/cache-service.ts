import client from "../main/config/redis";

type ISaveArray<T> = {
  data: T[];
  key: string;
  expireIn: number;
};

export class CacheService {
  public async saveArray<T>(data: ISaveArray<T>) {
    const parsedData = JSON.stringify(data.data);
    await client.set(data.key, parsedData, { EX: data.expireIn });
  }

  public async getArray<T>(key: string): Promise<T[] | null> {
    const data = await client.get(key);
    if (!data) return null;
    const parsedData = JSON.parse(data) as T[];
    return parsedData;
  }
}
