import { Api } from "../shared/utils/axios";

export interface ICreatePlaylist {
  name: string;
  description: string;
  file?: File;
  isPublic: boolean;
}

type mapper = Record<string, unknown>;

async function create(data: ICreatePlaylist) {
  const formData = new FormData();
  const mappedData: mapper = { ...data };
  for (const key in mappedData) {
    const value = mappedData[key];
    formData.append(key, value as unknown as string);
  }
  const response = await Api.post("/playlist", formData);
  return response.data;
}

export default {
  create,
};
