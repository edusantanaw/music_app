import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [files, setFiles] = useState<MediaLibrary.Asset[]>([]);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!permissionResponse) {
      requestPermission();
    }
  }, [permissionResponse]);

  async function fetchFiles() {
    if (permissionResponse?.granted) {
      const assets = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });
      setFiles(assets.assets.filter((e) => e.filename.endsWith(".m4a")));
    } else {
      console.warn("Permissão negada");
    }
  }

  async function playSong(e: MediaLibrary.Asset) {
    if (currentSound) {
      await currentSound.stopAsync();
    }
    const { sound } = await Audio.Sound.createAsync({
      uri: e.uri,
    });
    await sound.playAsync();
    setCurrentSound(sound);
    setPaused(false)
  }

  async function switchPlay() {
    if (!currentSound) return;
    if (paused) {
      await currentSound.playAsync();
    } else {
      await currentSound.pauseAsync();
    }
    setPaused((c)=> !c)
  }

  return (
    <View>
      <Button title="Pedir Permissão" onPress={requestPermission} />
      <Button title="Listar Arquivos" onPress={fetchFiles} />
      {currentSound && (
        <Button onPress={switchPlay} title={paused ? "Tocar" : "Pausar"} />
      )}
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text onPress={() => playSong(item)}>{item.filename}</Text>
        )}
      />
    </View>
  );
}
