import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';



export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState('back');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is needed to take photos.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.6,
          base64: true,
        });
        setCapturedImage(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const processImage = async () => {
    if (capturedImage) {
      try {
        const base64Image = `data:image/jpeg;base64,${capturedImage.base64}`;

        // Navigate to results screen with image data
        router.push({
          pathname: '/results',
          params: {
            imageUri: capturedImage.uri,
            base64Image
          }
        });
      } catch (error) {
        console.error('Error processing image:', error);
        Alert.alert('Error', 'Failed to process image');
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
  };



  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Header title="Take Photo" showBackButton />

      <View style={styles.container}>
        {capturedImage ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: capturedImage.uri }}
              style={styles.previewImage}
            />
            <View style={styles.previewActions}>
              <Button
                title="Retake"
                onPress={retakePicture}
                type="outline"
                style={styles.previewButton}
              />
              <Button
                title="Use Photo"
                onPress={processImage}
                style={styles.previewButton}
              />
            </View>
          </View>
        ) : (
          <>
            <CameraView style={styles.camera}
              ref={cameraRef}
              facing={cameraType}
              onCameraReady={onCameraReady}
              ratio="4:3"

            />
            <View style={styles.controlsContainer}>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraType}
                >
                  <Text style={styles.flipText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                  disabled={!isCameraReady}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <View style={styles.placeholderButton} />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  flipButton: {
    padding: 15,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  flipText: {
    color: Colors.white,
    fontSize: 16,
  },
  placeholderButton: {
    width: 50,
    height: 50,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    flex: 1,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 20,
    paddingHorizontal: Layout.padding,
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});