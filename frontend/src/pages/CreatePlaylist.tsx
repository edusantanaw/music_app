import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Container } from "./create-playlist";
import playlistService from "../services/playlist-service";
import { useAuthContext } from "../shared/hooks/useAuthContext";

export interface ICreatePlaylist {
  name: string;
  description: string;
  coverImage?: File;
  isPublic: boolean;
  userId: string;
}

const CreatePlaylist = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const { handleLogout } = useAuthContext();

  function handleCover(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("seted");
      setImage(files[0]);
      return;
    }
    setImage(null);
  }

  async function handleCreate() {
    try {
      const data = await playlistService.create({
        file: image ?? undefined,
        name,
        description,
        isPublic,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <form>
        <TextField
          label="Nome"
          name="name"
          placeholder="nome"
          type="text"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Descrição"
          name="description"
          placeholder="Descrição"
          type="text"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Cover"
          type="file"
          variant="outlined"
          onChange={handleCover}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label="Publica"
          />
        </FormGroup>
        <Button variant="outlined" type="button" onClick={handleCreate}>
          Create
        </Button>
      </form>
      <Button onClick={handleLogout}>Logout</Button>
      <img src="http://localhost:9000/playlist2/87fc6ef14a5c84ebc687f8d20def7b49-CamScanner%2025-09-2024%2011.17%20(1)_1.jpg" alt="img" />
    </Container>
  );
};

export default CreatePlaylist;
