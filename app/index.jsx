import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { checkApiHealth } from '../hook/api';

export default function HomeScreen() {
  const router = useRouter();
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkAPIConnection();
  }, []);

  const checkAPIConnection = async () => {
    try {
      await checkApiHealth();
      setApiStatus('connected');
    } catch (error) {
      setApiStatus('disconnected');
      console.log('API connection failed:', error);
    }
  };

  const navigateToCamera = () => {
    if (apiStatus !== 'connected') {
      Alert.alert(
        "Connection Error",
        "Cannot connect to the model API. Make sure the Flask server is running.",
        [
          { text: "Try Again", onPress: checkAPIConnection },
          { text: "OK" }
        ]
      );
      return;
    }
    router.push('/camera');
  };

  const handleImageUpload = async () => {
    if (apiStatus !== 'connected') {
      Alert.alert(
        "Connection Error",
        "Cannot connect to the model API. Make sure the Flask server is running.",
        [
          { text: "Try Again", onPress: checkAPIConnection },
          { text: "OK" }
        ]
      );
      return;
    }

    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant permission to access your photo library.');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      
      // Navigate to results screen with the image data
      router.push({
        pathname: '/results',
        params: { imageUri, base64Image }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Plant Disease Detector</Text>
            <Text style={styles.subtitle}>Detect diseases in corn, potato, and tomato plants</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/plant.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.apiStatus}>
            <Text style={styles.apiStatusLabel}>API Status:</Text>
            <View style={styles.statusIndicatorContainer}>
              <View 
                style={[
                  styles.statusIndicator, 
                  apiStatus === 'connected' ? styles.statusConnected : 
                  apiStatus === 'disconnected' ? styles.statusDisconnected :
                  styles.statusChecking
                ]} 
              />
              <Text style={styles.apiStatusText}>
                {apiStatus === 'connected' ? 'Connected' : 
                 apiStatus === 'disconnected' ? 'Disconnected' :
                 'Checking...'}
              </Text>
            </View>
            {apiStatus === 'disconnected' && (
              <TouchableOpacity onPress={checkAPIConnection} style={styles.retryButton}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.actionContainer}>
            <Button 
              title="Take Photo" 
              onPress={navigateToCamera} 
              style={styles.button}
            />
            <Button 
              title="Upload Photo" 
              onPress={handleImageUpload} 
              type="outline"
              style={styles.button}
            />
          </View>

          <TouchableOpacity 
            style={styles.aboutLink}
            onPress={() => router.push('/about')}
          >
            <Text style={styles.aboutLinkText}>About This App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.padding,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.primaryLight,
    textAlign: 'center',
    marginTop: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: Layout.padding,
  },
  image: {
    width: '100%',
    height: 200,
  },
  apiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: Layout.borderRadius,
    marginHorizontal: Layout.padding,
  },
  apiStatusLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusConnected: {
    backgroundColor: Colors.success,
  },
  statusDisconnected: {
    backgroundColor: Colors.error,
  },
  statusChecking: {
    backgroundColor: Colors.warning,
  },
  apiStatusText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  retryButton: {
    marginLeft: 10,
    padding: 4,
  },
  retryText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  actionContainer: {
    padding: Layout.padding,
    marginTop: 10,
  },
  button: {
    marginBottom: 16,
  },
  aboutLink: {
    alignItems: 'center',
    padding: 16,
    marginTop: 'auto',
  },
  aboutLinkText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
