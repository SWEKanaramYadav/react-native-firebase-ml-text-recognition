
import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';


const App = () => {
  const [image, setImage] = useState();
  const [result, setResult] = useState({});

  const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);

  const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);

  const onImageSelect = async (media) => {
    if (!media.didCancel) {
      setImage(media.uri);
      let parse = JSON.parse(media)
      console.log("media.uri", media.uri);
      console.log("media.uri", parse.uri);
      const processingResult = await vision().cloudDocumentTextRecognizerProcessImage(media.uri);
      console.log('Found text in document: ', processed.text);

      // processed.blocks.forEach(block => {
      //   console.log('Found block with text: ', block.text);
      //   console.log('Confidence in block: ', block.confidence);
      //   console.log('Languages found in block: ', block.recognizedLanguages);
      // });
      setResult(processingResult);
    }
  };

  

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 30 }}>{result.text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
  },
});

export default App;
