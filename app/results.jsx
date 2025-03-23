import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Button from '../components/Button';
import DiseaseCard from '../components/DiseaseCard';
import LoadingOverlay from '../components/LoadingOverlay';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { predictDisease } from '../hook/api';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { imageUri, base64Image } = params;
  
  const [loading, setLoading] = useState(true);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [localImageUri, setLocalImageUri] = useState(imageUri); // Use local file URI

  useEffect(() => {
    if (base64Image) {
      saveBase64ToFile(base64Image); // Convert base64 to local file
      analyzePlantImage();
    } else if (imageUri) {
      setLocalImageUri(imageUri);
      analyzePlantImage();
    } else {
      setError("No image data found");
      setLoading(false);
    }
  }, []);

  // Convert Base64 to Local File
  const saveBase64ToFile = async (base64) => {
    try {
      // Generate a unique filename using timestamp
      const uniqueFilename = `plant_image_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.cacheDirectory}${uniqueFilename}`;
  
      // Save the image
      await FileSystem.writeAsStringAsync(fileUri, base64.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
  
      console.log("📂 Image saved at:", fileUri);
      setLocalImageUri(fileUri);
    } catch (error) {
      console.error("❌ Error saving image:", error);
      setError("Failed to save image.");
    }
  };

  const handleNewScan = async () => {
    if (imageUri) {
      try {
        await FileSystem.deleteAsync(imageUri, { idempotent: true });
        console.log("🗑️ Deleted previous image:", imageUri);
      } catch (error) {
        console.error("❌ Error deleting image:", error);
      }
    }
    router.push('/'); // Navigate back
  };

  // Analyze Image
  const analyzePlantImage = async () => {
    try {
      setLoading(true);
      const result = await predictDisease(base64Image);
      setPredictionResult(result);
      setLoading(false);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Header title="Disease Detection Results" showBackButton />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {loading && <LoadingOverlay message="Analyzing plant image..." />}

        {localImageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: localImageUri }} style={styles.image} />
          </View>
        )}
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Retry" onPress={analyzePlantImage} style={styles.errorButton} />
          </View>
        ) : (
          predictionResult && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Detection Results</Text>
              
              <DiseaseCard 
                disease={predictionResult.disease} 
                confidence={predictionResult.confidence} 
              />
              
              <View style={styles.actionsContainer}>
                <Button 
                  title="New Scan" 
                  onPress={handleNewScan} 
                  style={styles.actionButton}
                />
              </View>
            </View>
          )
        )}
      </ScrollView>
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
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Layout.padding,
  },
  imageContainer: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  errorContainer: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    padding: Layout.padding,
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorButton: {
    minWidth: 150,
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  actionsContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  actionButton: {
    minWidth: 200,
  },
});
